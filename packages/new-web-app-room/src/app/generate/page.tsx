'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VideoGenerator from '@/components/VideoGenerator';

export default function GeneratePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<any>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('videoSettings');
    if (data) {
      setSettings(JSON.parse(data));
    } else {
      router.push('/create');
    }
  }, [router]);

  useEffect(() => {
    if (!isComplete) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isComplete]);

  const handleDownload = () => {
    if (!videoBlob) {
      alert('Video is still processing. Please wait...');
      return;
    }

    // Create download link
    const url = URL.createObjectURL(videoBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${settings.name || 'music-video'}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = () => {
    setIsComplete(false);
    setProgress(0);
    setVideoBlob(null);
  };

  const handleVideoReady = (blob: Blob) => {
    setVideoBlob(blob);
  };

  if (!settings) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
              </svg>
            </div>
            <span className="text-xl font-bold">VideoSync</span>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {isComplete ? 'Video Complete!' : 'Generating Your Video'}
          </h1>
          <p className="text-gray-400">
            {isComplete 
              ? 'Your animated music video is ready to download' 
              : 'Please wait while we create your animated music video'}
          </p>
        </div>

        {/* Progress Bar */}
        {!isComplete && (
          <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Rendering frames and applying effects...</span>
            </div>
          </div>
        )}

        {/* Video Preview */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 mb-8">
          <VideoGenerator
            lyrics={settings.content}
            settings={settings}
            onComplete={() => setIsComplete(true)}
            onVideoReady={handleVideoReady}
          />
        </div>

        {/* Video Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Video Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Project Name:</span>
                <span className="font-semibold">{settings.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type:</span>
                <span className="font-semibold capitalize">{settings.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Style:</span>
                <span className="font-semibold capitalize">{settings.style}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Animation:</span>
                <span className="font-semibold capitalize">{settings.animation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Resolution:</span>
                <span className="font-semibold">1920x1080 (Full HD)</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold mb-4">Effects Applied</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {settings.showParticles ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="text-sm">Particle Effects</span>
              </div>
              <div className="flex items-center gap-2">
                {settings.showWaveform ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <span className="text-sm">Audio Waveform</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Text Animation</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Color Gradient</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/customize"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition"
          >
            Back to Customize
          </Link>
          {isComplete && (
            <>
              <button
                onClick={handleRegenerate}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition"
              >
                Regenerate
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Video
              </button>
            </>
          )}
        </div>

        {/* Tips */}
        {isComplete && (
          <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold mb-1">Pro Tip</h4>
                <p className="text-sm text-gray-300">
                  Try different styles and animations to create unique videos. You can also adjust colors to match your brand or mood!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}





