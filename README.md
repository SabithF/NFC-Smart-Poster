# NFC Smart Poster for Brand promotion — README
> A full-stack React + Node/Express + MongoDB app for NFC Smart poster for branding scans,” challenges, badges, and voucher unlocks. 
This README includes setup, run instructions, API docs, and common troubleshooting tips you can paste straight into GitHub.


---


## Features
-  **Unique device identification** `deviceId` generated using `fingerprint.js` 
-  **Create-or-return user**  on NFC tag scanning
-  **Scan posters** → returns user details, progress, links to more information, link to the challenge
-  **Badges & progress** tracking; unlock **voucher** after N badges and view badges
-  **Leaderboard** (by `scanCount`)
-  Clean **env-based config** + **Vite proxy** 

---

## Getting Started

## Tech Stack
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express
- **Database:** MongoDB

## File Structure
```bash
NFC-Smart-Poster-/
├─ README.md                      
├─ .gitignore                     
├─ 
├─ client/                        
│  ├─ package.json
│  ├─ vite.config.js              
│  ├─ .env.development    #uploaded for demo purposes        
│  ├─ .env.production     #uploaded for demo purposes        
│  ├─ index.html
│  ├─ public/                    
│  ├─ eslint.config.js  
│  ├─ src/
│  │  ├─ main.jsx                
│  │  ├─ api/ posterApi.js
│  │  │           
│  │  ├─ hooks/
│  │  │  └─ uniqueDevice.js       
│  │  │  
│  │  ├─ components/              
│  │  │      
│  │  ├─ utils/
│  │  │  └─ fingerprint.js
│  │  └─ assets/                 
│  ├─ App.jsx     
│  ├─ main.jsx
│  ├─ tailwind.config.js 
│  ├── package.json
│  ├── package-lock.jscon 
│  ├── postcss.config.js│  
│  ├── package-lock.jscon 
│  ├── postcss.config.js
│  ├──App.css index.css        
└─ server/                        
   ├─ package.json
   ├─ server.js   
   ├─ node_modules                
   ├─ .env                 #uploaded for demo purposes        
   ├─ package-lock.jscon             
   ├─ database/
   │  └─ conn.js                  
   ├─ models/
   │  ├─ user.js                  
   │  ├─ poster.js                
   │  └─ voucher.js               
   ├─ routers/
   │  ├─ userRouter.js            
   │  └─ posterRoutes.js          
   ├─ controllers/
   │  └─ posterController.js     
   │  └─ voucherController.js
   └─ utils/
      ├─ randomNameGenerator.js   
      └─ generateUserNumber.js    

```

### Prerequisites
- Node.js ≥ 18
- npm or pnpm
- MongoDB:
  - **Local** MongoDB, or
  - **MongoDB Atlas** connection string (be sure to URL-encode your password)

### Clone & install

```bash
git clone https://github.com/SabithF/NFC-Smart-Poster
cd NFC-Smart-Poster-
```
### Backend Setup
```bash
cd server
npm install
npm start
```
Create a server/.env
```bash
PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority&appName=<app>
CORS_ORIGINS=https://your-frontend-link.com,https://www.your-frontend-dmoain.com

#env files are uplaoded for demonstration purposes

```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

Create `client/.env.production`
```bash
VITE_API_BASE_URL=http:/yourlocalip/api

# env files are uploaded for demonstration purposes
```

Example link structure for testing 
```bash
http://localhost:5173/quiz/<poster id>

poster id = p1, p2, p3, ...
```
 
