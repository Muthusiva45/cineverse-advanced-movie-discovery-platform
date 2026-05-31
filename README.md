# CineVerse – Advanced Movie Discovery Platform

CineVerse is a premium Netflix-inspired movie discovery platform built with React, Vite, Tailwind CSS, Framer Motion, GSAP, and the OMDb API. It delivers advanced search, saved lists, movie comparison, personal analytics, responsive layouts, localStorage state management, and a cinematic user experience.

## Features

- Advanced movie search with debounce, type filters, year filters, sorting, and pagination
- Watchlist and favorites saved locally with localStorage
- Recently viewed movies with a dedicated dashboard view
- Movie comparison for ratings, runtime, genre, director, cast, awards, and box office
- Personal dashboard with watchlist, favorites, recent activity, average rating, and top genre stats
- Premium responsive UI inspired by Netflix, Letterboxd, IMDb, and modern SaaS dashboards
- Cinematic animations using Framer Motion and GSAP
- Dark mode and clean white mode with persistent theme settings
- Full-page animated loader, toast notifications, scroll progress, and back-to-top controls
- OMDb API integration with graceful loading, error, empty, and fallback poster states

## Tech Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- GSAP
- React Router DOM
- Axios
- React Icons
- Swiper
- OMDb API
- LocalStorage

## Screenshots

Add project screenshots here:

- Home page
- Advanced search
- Movie details
- Compare page
- Dashboard
- White mode

## Live Demo

Live demo: `https://your-vercel-project-url.vercel.app`

## GitHub Repository

GitHub repo: `https://github.com/YOUR_USERNAME/cineverse-movie-app`

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/cineverse-movie-app.git
cd cineverse-movie-app
```

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your OMDb API key:

```env
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

Required variable:

```env
VITE_OMDB_API_KEY=your_omdb_api_key_here
```

For the current Vercel setup requested during project preparation:

```env
VITE_OMDB_API_KEY=c4655d77
```

Keep real keys in `.env` or your hosting provider dashboard. Do not commit `.env`.

## Deployment

### Vercel

Use these settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Environment Variable: `VITE_OMDB_API_KEY=c4655d77`

Deployment steps:

1. Push the project to GitHub.
2. Open Vercel and import the GitHub repository.
3. Select `Vite` as the framework preset.
4. Add the OMDb API key in Project Settings > Environment Variables.
5. Deploy.

### Netlify

Use these settings:

- Build Command: `npm run build`
- Publish Directory: `dist`
- Environment Variable: `VITE_OMDB_API_KEY`

## Portfolio Project Content

**Title:** CineVerse – Advanced Movie Discovery Platform

**Description:** Premium Netflix-inspired movie discovery platform built using React, Vite, Tailwind CSS, Framer Motion, and OMDb API. Features advanced search, watchlist, favorites, movie comparison, analytics dashboard, responsive UI, localStorage state management, and cinematic user experience.

**Tech Stack:** React, Vite, Tailwind CSS, Framer Motion, OMDb API, React Router, Axios, LocalStorage

**Highlights:**

- Advanced movie search
- Watchlist and favorites
- Movie comparison
- Personal dashboard
- Recently viewed movies
- Responsive premium UI
- Cinematic animations
- API integration

## Credits

Designed and developed by Shiva.

Movie data provided by the [OMDb API](https://www.omdbapi.com/).

This project is not affiliated with Netflix, IMDb, Letterboxd, or OMDb.

## License

This project is released under the MIT License.
