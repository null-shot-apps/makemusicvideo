'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Style = 'neon' | 'minimal' | 'retro' | 'cinematic' | 'graffiti' | 'elegant';
type Animation = 'fade' | 'slide' | 'bounce' | 'zoom' | 'wave' | 'spin';

export default function CustomizePage() {
  const router = useRouter();
  const [projectData, setProjectData] = useState<any>(null);
  const [style, setStyle] = useState<Style>('neon');
  const [animation, setAnimation] = useState<Animation>('fade');
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
  const [secondaryColor, setSecondaryColor] = useState('#ec4899');
  const [fontSize, setFontSize] = useState(48);
  const [showParticles, setShowParticles] = useState(true);
  const [showWaveform, setShowWaveform] = useState(true);

  useEffect(() => {
    const data = sessionStorage.getItem('projectData');
    if (data) {
      setProjectData(JSON.parse(data));
    } else {
      router.push('/create');
    }
  }, [router]);

  const styles = [
    { id: 'neon', name: 'Neon Glow', icon: '✨', gradient: 'from-purple-600 to-pink-600' },
    { id: 'minimal', name: 'Minimal', icon: '⚪', gradient: 'from-gray-600 to-gray-800' },
    { id: 'retro', name: 'Retro Wave', icon: '🌅', gradient: 'from-pink-500 to-yellow-500' },
    { id: 'cinematic', name: 'Cinematic', icon: '🎬', gradient: 'from-blue-900 to-black' },
    { id: 'graffiti', name: 'Graffiti', icon: '🎨', gradient: 'from-red-500 to-orange-500' },
    { id: 'elegant', name: 'Elegant', icon: '💎', gradient: 'from-indigo-600 to-purple-600' },
  ];

  const animations = [
    { id: 'fade', name: 'Fade In', icon: '🌫️' },
    { id: 'slide', name: 'Slide', icon: '➡️' },
    { id: 'bounce', name: 'Bounce', icon: '⬆️' },
    { id: 'zoom', name: 'Zoom', icon: '🔍' },
    { id: 'wave', name: 'Wave', icon: '🌊' },
    { id: 'spin', name: 'Spin', icon: '🌀' },
  ];

  const handleGenerate = () => {
    const settings = {
      ...projectData,
      style,
      animation,
      primaryColor,
      secondaryColor,
      fontSize,
      showParticles,
      showWaveform,
    };
    sessionStorage.setItem('videoSettings', JSON.stringify(settings));
    router.push('/generate');
  };

  if (!projectData) {
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

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Customize Your Video</h1>
          <p className="text-gray-400">Choose styles, animations, and effects</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visual Style */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">Visual Style</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id as Style)}
                    className={`p-4 rounded-lg border-2 transition ${
                      style === s.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="font-semibold text-sm">{s.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Animation */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">Text Animation</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {animations.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAnimation(a.id as Animation)}
                    className={`p-4 rounded-lg border-2 transition ${
                      animation === a.id
                        ? 'border-pink-500 bg-pink-500/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{a.icon}</div>
                    <div className="font-semibold text-sm">{a.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">Colors</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Color</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-16 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Color</label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-16 h-16 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 px-4 py-2 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text Size */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">Text Size</h2>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="24"
                  max="96"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-2xl font-bold w-20 text-right">{fontSize}px</span>
              </div>
            </div>

            {/* Effects */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold mb-4">Effects</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Particle Effects</span>
                  <input
                    type="checkbox"
                    checked={showParticles}
                    onChange={(e) => setShowParticles(e.target.checked)}
                    className="w-6 h-6 rounded"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Audio Waveform</span>
                  <input
                    type="checkbox"
                    checked={showWaveform}
                    onChange={(e) => setShowWaveform(e.target.checked)}
                    className="w-6 h-6 rounded"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div 
                className="aspect-video rounded-lg overflow-hidden relative"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <p 
                    className="text-center font-bold text-white drop-shadow-lg"
                    style={{ fontSize: `${fontSize * 0.3}px` }}
                  >
                    Sample Lyrics
                  </p>
                </div>
                {showParticles && (
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Style:</span>
                  <span className="font-semibold">{styles.find(s => s.id === style)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Animation:</span>
                  <span className="font-semibold">{animations.find(a => a.id === animation)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Text Size:</span>
                  <span className="font-semibold">{fontSize}px</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Link
            href="/create"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition"
          >
            Back
          </Link>
          <button
            onClick={handleGenerate}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 rounded-lg font-semibold transition"
          >
            Generate Video
          </button>
        </div>
      </main>
    </div>
  );
}

