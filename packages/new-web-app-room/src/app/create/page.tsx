'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'lyrics' | 'audio'>('lyrics');
  const [lyrics, setLyrics] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('audio/') || file.name.endsWith('.mp3') || file.name.endsWith('.wav'))) {
      setAudioFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleContinue = () => {
    if (activeTab === 'lyrics' && lyrics.trim()) {
      // Store data in sessionStorage
      sessionStorage.setItem('projectData', JSON.stringify({
        type: 'lyrics',
        content: lyrics,
        name: projectName || 'Untitled Project'
      }));
      router.push('/customize');
    } else if (activeTab === 'audio' && audioFile) {
      sessionStorage.setItem('projectData', JSON.stringify({
        type: 'audio',
        fileName: audioFile.name,
        name: projectName || 'Untitled Project'
      }));
      router.push('/customize');
    }
  };

  const canContinue = (activeTab === 'lyrics' && lyrics.trim()) || (activeTab === 'audio' && audioFile);

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

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create New Project</h1>
          <p className="text-gray-400">Choose how you want to start your music video</p>
        </div>

        {/* Project Name */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Project Name (Optional)</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="My Awesome Music Video"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Tab Selector */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`flex-1 py-4 px-6 rounded-lg font-semibold transition ${
              activeTab === 'lyrics'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Paste Lyrics
            </div>
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`flex-1 py-4 px-6 rounded-lg font-semibold transition ${
              activeTab === 'audio'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Upload Audio
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 min-h-[400px]">
          {activeTab === 'lyrics' ? (
            <div>
              <label className="block text-lg font-semibold mb-4">Enter Your Lyrics</label>
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="Paste your song lyrics here...&#10;&#10;Example:&#10;Verse 1:&#10;Walking down the street&#10;Feeling the beat&#10;&#10;Chorus:&#10;This is my song&#10;Singing all day long"
                className="w-full h-80 px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500 transition resize-none font-mono text-sm"
              />
              <p className="text-sm text-gray-400 mt-2">
                {lyrics.trim().split('\n').filter(line => line.trim()).length} lines • {lyrics.trim().split(/\s+/).filter(word => word).length} words
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-lg font-semibold mb-4">Upload Audio File</label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
                  isDragging
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                {audioFile ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{audioFile.name}</p>
                      <p className="text-sm text-gray-400">{(audioFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button
                      onClick={() => setAudioFile(null)}
                      className="text-sm text-red-400 hover:text-red-300 transition"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg mb-2">Drag and drop your audio file here</p>
                      <p className="text-sm text-gray-400 mb-4">or</p>
                      <label className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg cursor-pointer transition">
                        Browse Files
                        <input
                          type="file"
                          accept="audio/*,.mp3,.wav"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">Supported formats: MP3, WAV, OGG, M4A</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Link
            href="/"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition"
          >
            Cancel
          </Link>
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`flex-1 px-8 py-4 rounded-lg font-semibold transition ${
              canContinue
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105'
                : 'bg-gray-600 cursor-not-allowed opacity-50'
            }`}
          >
            Continue to Customize
          </button>
        </div>
      </main>
    </div>
  );
}

