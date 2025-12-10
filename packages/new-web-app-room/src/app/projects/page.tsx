'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  type: 'lyrics' | 'audio';
  style: string;
  createdAt: string;
  thumbnail: string;
  duration: string;
}

export default function ProjectsPage() {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Summer Vibes',
      type: 'lyrics',
      style: 'neon',
      createdAt: '2024-01-15',
      thumbnail: 'from-purple-600 to-pink-600',
      duration: '3:45',
    },
    {
      id: '2',
      name: 'Midnight Dreams',
      type: 'audio',
      style: 'cinematic',
      createdAt: '2024-01-14',
      thumbnail: 'from-blue-900 to-black',
      duration: '4:20',
    },
    {
      id: '3',
      name: 'Retro Nights',
      type: 'lyrics',
      style: 'retro',
      createdAt: '2024-01-13',
      thumbnail: 'from-pink-500 to-yellow-500',
      duration: '2:58',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'lyrics' | 'audio'>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

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
          <nav className="flex items-center gap-6">
            <Link href="/create" className="hover:text-purple-400 transition">Create</Link>
            <Link href="/projects" className="text-purple-400">Projects</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Projects</h1>
            <p className="text-gray-400">Manage and view your music videos</p>
          </div>
          <Link
            href="/create"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            + New Project
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'all'
                ? 'bg-purple-600'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('lyrics')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'lyrics'
                ? 'bg-purple-600'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            Lyrics
          </button>
          <button
            onClick={() => setFilter('audio')}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              filter === 'audio'
                ? 'bg-purple-600'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            Audio
          </button>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition group"
              >
                {/* Thumbnail */}
                <div className={`aspect-video bg-gradient-to-br ${project.thumbnail} relative`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/50">
                    <button className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg font-semibold hover:bg-white/30 transition">
                      Open Project
                    </button>
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-medium">
                    {project.duration}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      {project.type === 'lyrics' ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      )}
                      {project.type}
                    </span>
                    <span className="capitalize">{project.style}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition">
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="px-4 py-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-sm font-medium transition">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6">Create your first animated music video</p>
            <Link
              href="/create"
              className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Create Project
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

