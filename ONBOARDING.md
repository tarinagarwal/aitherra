# Onboarding System Documentation

## Overview

The onboarding system collects user preferences and creates a personalized learning experience. Users must complete onboarding before accessing the main application.

## Flow

1. User authenticates via Google OAuth
2. If `isOnboarded = false`, redirect to `/onboarding`
3. User completes 5-step onboarding process
4. User data is saved to database
5. User is redirected to `/dashboard`

## Onboarding Steps

### Step 1: Experience Level

- **Beginner**: Just starting coding journey
- **Intermediate**: Knows basics, wants to level up
- **Advanced**: Experienced developer seeking mastery

### Step 2: Time Commitment

- 2-3 hours/week (Light learning)
- 5-7 hours/week (Steady progress)
- 10-15 hours/week (Serious commitment)
- 20+ hours/week (Intensive learning)

### Step 3: Primary Language

Choose from:

- Python 🐍
- JavaScript ⚡
- Java ☕
- C++ ⚙️
- C# 🎯
- Go 🔷
- Rust 🦀
- TypeScript 📘

### Step 4: Learning Goals (Multi-select)

- Career Change 💼
- Improve Skills 📈
- Build Projects 🚀
- Ace Interviews 🎯
- Freelancing 💰
- Personal Hobby 🎨

### Step 5: Learning Style

- **Visual Learner**: Diagrams and videos
- **Hands-On**: Coding and building projects
- **Reading & Writing**: Documentation and tutorials
- **Mixed Approach**: Combination of all methods

## Database Schema

```prisma
model User {
  // ... existing fields
  isOnboarded       Boolean  @default(false)
  experienceLevel   String?  // "beginner", "intermediate", "advanced"
  timeCommitment    Int?     // hours per week
  primaryLanguage   String?  // "python", "javascript", etc.
  learningGoals     String[] @default([])
  learningStyle     String?  // "visual", "hands-on", "reading", "mixed"
}
```

## API Endpoints

### GET `/api/onboarding/status`

Check if user has completed onboarding.

**Headers**: `Authorization: Bearer <token>`

**Response**:

```json
{
  "isOnboarded": true,
  "data": {
    "experienceLevel": "intermediate",
    "timeCommitment": 10,
    "primaryLanguage": "python",
    "learningGoals": ["career", "projects"],
    "learningStyle": "hands-on"
  }
}
```

### POST `/api/onboarding/complete`

Complete user onboarding.

**Headers**: `Authorization: Bearer <token>`

**Body**:

```json
{
  "experienceLevel": "intermediate",
  "timeCommitment": 10,
  "primaryLanguage": "python",
  "learningGoals": ["career", "projects"],
  "learningStyle": "hands-on"
}
```

**Response**:

```json
{
  "success": true,
  "message": "Onboarding completed successfully",
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "username": "...",
    "isOnboarded": true
  }
}
```

## Protected Routes

All routes except `/`, `/auth/callback`, and `/onboarding` require:

1. User to be authenticated
2. User to have completed onboarding (`isOnboarded = true`)

## UI/UX Features

- ✨ Beautiful gradient backgrounds with blur effects
- 📊 Progress bar showing completion percentage
- 🎨 Smooth transitions and animations
- 📱 Fully responsive design
- ♿ Accessible with keyboard navigation
- 🎯 Clear visual feedback for selections
- 🔒 Cannot skip or bypass onboarding

## Future Enhancements

- Add ability to update preferences later
- Skill assessment quiz
- Personalized curriculum generation based on preferences
- Learning path recommendations
- Progress tracking dashboard
