'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

interface VideoGeneratorProps {
  lyrics?: string;
  audioFile?: File;
  settings: {
    style: string;
    animation: string;
    primaryColor: string;
    secondaryColor: string;
    fontSize: number;
    showParticles: boolean;
    showWaveform: boolean;
  };
  onComplete: () => void;
  onVideoReady?: (blob: Blob) => void;
}

export default function VideoGenerator({ lyrics, audioFile, settings, onComplete, onVideoReady }: VideoGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFrequencyData, setAudioFrequencyData] = useState<Uint8Array>(new Uint8Array(128));
  const lines = useMemo(() => lyrics?.split('\n').filter(line => line.trim()) || ['Sample Text'], [lyrics]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1920;
    canvas.height = 1080;

    // Start recording
    const stream = canvas.captureStream(30); // 30 FPS
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: 5000000, // 5 Mbps for high quality
    });

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      if (onVideoReady) {
        onVideoReady(blob);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);

    let animationFrame: number;
    let lineIndex = 0;
    let opacity = 0;
    let fadeDirection = 1;
    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];

    // Initialize particles
    if (settings.showParticles) {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
        });
      }
    }

    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, settings.primaryColor);
      gradient.addColorStop(1, settings.secondaryColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      if (settings.showParticles) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
      }

      // Draw waveform
      if (settings.showWaveform) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < canvas.width; i += 10) {
          const y = canvas.height / 2 + Math.sin(i * 0.02 + Date.now() * 0.003) * 50;
          if (i === 0) {
            ctx.moveTo(i, y);
          } else {
            ctx.lineTo(i, y);
          }
        }
        ctx.stroke();
      }

      // Draw text
      const text = lines[lineIndex] || 'Sample Text';
      ctx.font = `bold ${settings.fontSize * 2}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Text shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;

      // Apply animation
      ctx.save();
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      switch (settings.animation) {
        case 'fade':
          ctx.globalAlpha = opacity;
          break;
        case 'slide':
          ctx.translate((1 - opacity) * -200, 0);
          break;
        case 'bounce':
          ctx.translate(0, (1 - opacity) * -100);
          break;
        case 'zoom':
          const scale = 0.5 + opacity * 0.5;
          ctx.translate(centerX, centerY);
          ctx.scale(scale, scale);
          ctx.translate(-centerX, -centerY);
          break;
        case 'wave':
          ctx.translate(0, Math.sin(Date.now() * 0.005) * 20);
          break;
        case 'spin':
          ctx.translate(centerX, centerY);
          ctx.rotate((1 - opacity) * Math.PI * 2);
          ctx.translate(-centerX, -centerY);
          break;
      }

      ctx.fillStyle = 'white';
      ctx.fillText(text, centerX, centerY);
      ctx.restore();

      // Update opacity for fade effect
      opacity += fadeDirection * 0.02;
      if (opacity >= 1) {
        opacity = 1;
        fadeDirection = -1;
      } else if (opacity <= 0) {
        opacity = 0;
        fadeDirection = 1;
        lineIndex = (lineIndex + 1) % lines.length;
        setCurrentLine(lineIndex);

        // Complete after showing all lines
        if (lineIndex === 0 && lineIndex !== 0) {
          setIsGenerating(false);
          onComplete();
          return;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Auto-complete after cycling through all lines (3 seconds per line)
    const timeout = setTimeout(() => {
      setIsGenerating(false);
      setIsRecording(false);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      onComplete();
    }, lines.length * 3000); // 3 seconds per line

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [lines, settings, onComplete, onVideoReady]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full rounded-lg shadow-2xl"
        style={{ maxHeight: '70vh' }}
      />
      {isGenerating && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm">
                Generating... Line {currentLine + 1} of {lines.length}
              </span>
            </div>
            {isRecording && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-400">REC</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}









