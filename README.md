# দক্ষ (Dokkho)

**দক্ষ (Dokkho)** is a mobile-first service marketplace designed to connect local service providers (electricians, plumbers, tutors, etc.) with users through a **simple phone OTP–based authentication system**, optimized for low-tech users in Bangladesh.

---

## Application Flow Overview

The application follows a clear, step-by-step onboarding flow:


All global states (authenticated user, role, onboarding data) are managed using **React Context API**.

---

## Pages & Routes Description

### 1. Home

**Route:** `/`

The Home page is the public landing page of the application.

**Responsibilities**
- Entry point of the app
- Navigation starting point for Dokkho authentication
- Accessible to all users

---

### 2. Phone Login

**Route:** `/dokkho/login`

Users authenticate using their mobile phone number.

**How it works**
- User enters a Bangladeshi phone number (`BD +880`)
- Firebase Phone Authentication is used
- Invisible reCAPTCHA is initialized automatically
- An OTP (One-Time Password) is sent to the user’s phone

**Key Points**
- No email or password required
- Designed for fast and easy onboarding
- Navigation to OTP verification happens only after OTP is successfully sent

---

### 3. Verify OTP

**Route:** `/dokkho/verify-otp`

Users verify their phone number by entering a 6-digit OTP.

**How it works**
- User enters the OTP using a custom 6-box input UI
- OTP is verified using Firebase `confirmationResult.confirm()`
- On successful verification:
  - Firebase automatically creates/authenticates the user
  - User data is stored in global context
  - User is redirected to Role Selection

**Key Points**
- Secure OTP verification handled entirely by Firebase
- No manual user creation required
- Custom UX with auto-focus and backspace handling

---

### 4. Role Selection

**Route:** `/dokkho/role`

After successful authentication, users select how they want to use Dokkho.

**Available Roles**
- **Service Seeker** – wants to find local services
- **Service Provider** – wants to offer services

**How it works**
- Selected role is saved in global context
- Role is persisted (e.g., localStorage) to survive page refresh
- Navigation is role-based:
  - Service Seeker → Home / seeker flow
  - Service Provider → Provider onboarding flow

---

## Overall Working Description

1. User visits the Home page
2. User navigates to Dokkho Phone Login
3. User enters phone number and receives OTP
4. User verifies OTP
5. Firebase authenticates and creates the user
6. User selects a role (Seeker or Provider)
7. App routes the user based on the selected role
8. Global state is maintained using Context API

---

## Tech Stack (Frontend)

- React.js
- React Router
- Context API
- Tailwind CSS
- Firebase Authentication (Phone OTP)

---

## Design Principles

- Phone-first authentication
- Minimal typing and simple UI
- Step-by-step guided flow
- Built for low-tech users
- Scalable architecture for future backend, SDK, and WebSocket features

---

This README covers the **authentication and role selection flow** of **দক্ষ (Dokkho)**.  
Additional documentation will be added as provider onboarding, backend, and real-time features are implemented.

