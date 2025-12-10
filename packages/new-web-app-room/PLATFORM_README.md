# VideoSync - Animated Music Video Generator

An AI-powered platform that transforms lyrics and music into stunning animated music videos with synchronized text, visual effects, and customizable styles.

## Features

### 🎵 Dual Input Methods
- **Lyrics Input**: Paste song lyrics to generate text-based animated videos
- **Audio Upload**: Upload MP3, WAV, or other audio files for beat-synchronized videos

### 🎨 Customization Options
- **6 Visual Styles**: Neon Glow, Minimal, Retro Wave, Cinematic, Graffiti, Elegant
- **6 Animation Types**: Fade In, Slide, Bounce, Zoom, Wave, Spin
- **Color Customization**: Choose primary and secondary colors with live preview
- **Text Size Control**: Adjust font size from 24px to 96px
- **Visual Effects**: Toggle particle effects and audio waveforms

### 🎬 Video Generation
- Real-time canvas-based animation rendering
- Synchronized text animations with music beats
- Particle effects and waveform visualizations
- Progress tracking during generation
- Full HD output (1920x1080)

### 📁 Project Management
- Save and organize multiple projects
- Filter by type (lyrics/audio)
- Edit and regenerate videos
- Download completed videos

## Pages

### Home (`/`)
Landing page with feature overview and call-to-action buttons

### Create (`/create`)
- Tab-based interface for lyrics or audio input
- Drag-and-drop audio file upload
- Project naming
- Input validation

### Customize (`/customize`)
- Visual style selection
- Animation type picker
- Color customization with color pickers
- Text size slider
- Effects toggles
- Live preview panel

### Generate (`/generate`)
- Real-time video generation with canvas
- Progress bar and status updates
- Video details and effects summary
- Download and regenerate options

### Projects (`/projects`)
- Grid view of all projects
- Filter by type
- Project thumbnails with metadata
- Edit, download, and delete actions

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Animation**: HTML5 Canvas API
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Storage**: SessionStorage for project data

## How It Works

1. **Input**: User provides lyrics or uploads audio file
2. **Customize**: Choose visual style, animations, colors, and effects
3. **Generate**: Canvas-based renderer creates animated video with:
   - Gradient backgrounds based on selected colors
   - Animated text with chosen animation style
   - Optional particle effects
   - Optional audio waveform visualization
4. **Export**: Download the generated video (MP4 format in production)

## Animation System

The platform uses HTML5 Canvas to render animations in real-time:

- **Text Animations**: 6 different animation styles (fade, slide, bounce, zoom, wave, spin)
- **Particle System**: Dynamic particles that move across the screen
- **Waveform**: Animated sine wave that responds to audio (simulated)
- **Color Gradients**: Smooth transitions between primary and secondary colors

## Future Enhancements

To make this a production-ready platform, consider adding:

1. **Backend Integration**
   - User authentication and accounts
   - Cloud storage for projects
   - Database for project metadata

2. **Advanced Audio Processing**
   - Real beat detection using Web Audio API
   - Automatic BPM analysis
   - Lyric timing synchronization

3. **Video Export**
   - Canvas to MP4 conversion using FFmpeg.js or MediaRecorder API
   - Multiple resolution options (720p, 1080p, 4K)
   - Format options (MP4, WebM, GIF)

4. **AI Integration**
   - Automatic style suggestion based on lyrics sentiment
   - AI-generated background visuals
   - Smart color palette generation

5. **Social Features**
   - Share videos directly to social media
   - Public gallery of user creations
   - Collaboration features

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

## License

This is a demo project created for educational purposes.

