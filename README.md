# First Aid Advisor

A modern web application that provides instant first aid guidance using Google's Gemini AI. Built with Next.js and TypeScript, this application helps users get quick, reliable first aid information in emergency situations.

## Features

- Real-time AI-powered first aid advice
- Modern, responsive user interface
- Chat-based interaction
- Integration with Google's Gemini AI
- Health information search functionality

## Tech Stack

- **Framework**: Next.js 15.3.0
- **Language**: TypeScript
- **AI Integration**: Google Gemini API
- **UI Components**: React 19.0.0
- **Development Tools**: 
  - Turbopack for fast builds
  - ESLint for code quality
  - Tailwind CSS for styling

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Google Gemini API key

## Environment Setup

1. Clone the repository
2. Create a `.env.local` file with:
   ```env
   GEMINI_API_KEY=AI*******************************

   ```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
first-aid-advisor/
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── components/    # React components
│   └── page.tsx       # Main page
├── utils/             # Utility functions
└── public/            # Static assets
```

## API Endpoints

- `POST /api/chat`: Handles chat interactions with Gemini AI
- Health information search integration

## Development

```bash
# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Important Notes

- This application is for first aid guidance only
- Always call emergency services for serious situations
- The AI provides general first aid information, not medical diagnosis
