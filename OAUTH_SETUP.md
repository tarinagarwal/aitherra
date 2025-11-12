# Google OAuth Setup Guide

## Overview

This project uses Google OAuth 2.0 for user authentication. Users can sign in with their Google account, and the system automatically generates a unique username from their email.

## Features Implemented

- ✅ Google OAuth 2.0 authentication
- ✅ Automatic username generation from email
- ✅ Profile avatar from Google account
- ✅ JWT token-based session management
- ✅ Profile dropdown in navbar
- ✅ Username change functionality
- ✅ Responsive design matching landing page theme

## Setup Instructions

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen
6. Set application type to "Web application"
7. Add authorized redirect URIs:
   - `http://localhost:5173/auth/callback` (for development)
8. Copy the Client ID and Client Secret

### 2. Configure Backend

Update `python-backend/.env`:

```env
GOOGLE_CLIENT_ID="your-actual-google-client-id"
GOOGLE_CLIENT_SECRET="your-actual-google-client-secret"
GOOGLE_REDIRECT_URI="http://localhost:5173/auth/callback"
JWT_SECRET_KEY="generate-a-secure-random-key-here"
```

### 3. Install Dependencies

Backend:

```bash
cd python-backend
pip install -r requirements.txt
```

Frontend:

```bash
cd frontend
npm install
```

### 4. Generate Prisma Client

```bash
cd python-backend
prisma generate
```

### 5. Start the Application

Backend:

```bash
cd python-backend
python run.py
```

Frontend:

```bash
cd frontend
npm run dev
```

## How It Works

### Authentication Flow

1. User clicks "Continue with Google" button
2. Frontend requests OAuth URL from backend
3. User is redirected to Google's consent screen
4. After approval, Google redirects to `/auth/callback` with code
5. Frontend exchanges code for user data via backend
6. Backend creates/updates user in database
7. Backend generates JWT token
8. Frontend stores token and user data in localStorage
9. User is redirected to home page

### Username Generation

- Username is extracted from email (before @)
- Special characters are replaced with underscores
- If username exists, random 4-digit number is appended
- Example: `john.doe@gmail.com` → `john_doe` or `john_doe1234`

### API Endpoints

#### Authentication

- `GET /api/auth/google/url` - Get Google OAuth URL
- `POST /api/auth/google` - Exchange code for token

#### User Management

- `GET /api/user/me` - Get current user info
- `PUT /api/user/username` - Update username

## UI Components

### Navbar

- Shows Google login button when not authenticated
- Shows profile avatar with dropdown when authenticated
- Dropdown includes:
  - User info (name, username)
  - Dashboard link
  - Change Username link
  - Sign Out button

### Settings Page

- View profile information
- Change username with validation
- Real-time error/success feedback

## Security Features

- JWT tokens with expiration (7 days)
- Token verification on protected routes
- Username validation (3-30 chars, alphanumeric + underscore)
- Unique username enforcement
- CORS protection
- Secure token storage

## Git Commits

1. ✅ Add OAuth and JWT dependencies
2. ✅ Update User model with OAuth fields
3. ✅ Add OAuth and JWT configuration
4. ✅ Add JWT utilities
5. ✅ Add username generation utility
6. ✅ Implement Google OAuth endpoints
7. ✅ Add user profile endpoints
8. ✅ Integrate routes into main router
9. ✅ Add AuthContext and integrate with app
10. ✅ Add Google login button and callback
11. ✅ Add profile avatar and dropdown
12. ✅ Add settings page with username change

## Troubleshooting

### "Failed to exchange code for token"

- Verify Google Client ID and Secret are correct
- Check redirect URI matches exactly in Google Console

### "Invalid token"

- Token may have expired (7 days)
- Clear localStorage and log in again

### "Username already taken"

- Try a different username
- System will auto-generate unique username on signup

## Next Steps

- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add 2FA support
- [ ] Add social profile links
- [ ] Implement user preferences
