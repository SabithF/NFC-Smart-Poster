# NFC Smart Poster — README
> A full-stack React + Node/Express + MongoDB app for NFC Smart poster for branding scans,” challenges, badges, and voucher unlocks. 
This README includes setup, run instructions, API docs, and common troubleshooting tips you can paste straight into GitHub.


---


## Features
-Uniquely identifies the deivce and creates a hashed value.
-Create-or-return user on first visit (atomic upsert; StrictMode-safe)
-Scan posters (QR/NFC) → returns a question + options + next clue
-Submit quiz → awards badges, tracks progress, unlocks voucher after N badges
-Leaderboard (by scanCount)
-Solid CORS/proxy dev setup and clear error handling paths

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm or pnpm
- MongoDB

### Backend Setup
```bash
cd server
npm install
