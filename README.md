# 🚀 Realtime Collaborative Canvas Board

A fully functional **realtime collaborative whiteboard** inspired by tools like Excalidraw, where multiple users can draw, edit, and interact on a shared canvas instantly — without any login.

---

## ✨ Features

### 🧠 Core Features

* 🎨 **Freehand Drawing (Pen Tool)**
* ⬛ **Shapes**: Rectangle, Circle, Line
* 🧽 **Eraser Tool**
* 🖐 **Infinite Canvas** with **Panning & Zoom**
* 🔗 **Shareable Rooms** (unique URL per room)
* ⚡ **Realtime Sync** (draw, move, resize)

---

### 🔄 Undo / Redo (Per User)

* Each user has **independent undo/redo history**
* Your actions do NOT affect other users

---

### 🧩 Advanced Features (Bonus)

* 🖱 **Selection Tool** (select & move shapes)
* 📏 **Resize Shapes** using corner handles
* 👥 **Live Cursor Tracking** (see other users' pointers)
* 🎯 Smooth UX similar to modern whiteboard apps

---

## 🏗 Tech Stack

### Frontend

* React.js
* Tailwind CSS
* HTML5 Canvas API

### Backend

* Node.js
* Express.js
* Socket.IO (Realtime communication)

---

## 📡 How It Works

```text
User Action → Socket Emit → Server Broadcast → Other Clients Update UI
```

* Drawing events are sent via sockets
* Server broadcasts updates to all users in the room
* Canvas re-renders based on shared state

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/realtime-canvas.git
cd realtime-canvas
```

---

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

---

### 3️⃣ Run the App

#### Start Backend

```bash
cd backend
npm start
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

---

### 4️⃣ Open in Browser

```text
http://localhost:5173
```

---

## 🔗 Usage

1. Click **Start Drawing**
2. Share the generated URL with others
3. Collaborate in realtime 🎉

---

## 📌 Project Structure

```text
frontend/
  ├── components/
  │   ├── CanvasBoard.jsx
  │   ├── Toolbar.jsx
  │   └── Shape.js
  ├── pages/
  │   └── RoomPage.jsx
  └── services/
      └── socket.js

backend/
  └── socket.js
```

---

## ⚡ Realtime Features Breakdown

| Feature              | Status  |
| -------------------- | ------- |
| Drawing Sync         | ✅       |
| Shape Sync           | ✅       |
| Move / Resize Sync   | ✅       |
| Undo/Redo (Per User) | ✅       |
| Cursor Tracking      | ⭐ Bonus |

---

## 🎯 Assignment Coverage

This project fulfills all core requirements:

* Infinite canvas ✔
* Drawing tools ✔
* Realtime collaboration ✔
* Shareable rooms ✔
* Per-user undo/redo ✔

Bonus features implemented:

* Selection & resizing
* Cursor tracking
* UI enhancements

---

## 🧠 Challenges Solved

* Handling **realtime synchronization** across multiple users
* Implementing **per-user undo/redo logic**
* Managing **canvas transformations (zoom + pan)**
* Designing **smooth drawing experience**

---

## 🔮 Future Improvements

* 🖼 Image upload support
* 📝 Text tool
* 🎨 Stroke width & color picker
* 👥 User presence (names + colors)
* 💾 Save/load canvas

---

## 📄 AI Usage Disclosure

This project was built with the assistance of AI tools (ChatGPT).
All prompts and usage are documented in `PROMPTS.md`.

---

## 🙌 Author

**Your Name**

* GitHub: https://github.com/your-username
* LinkedIn: https://linkedin.com/in/your-profile

---

## ⭐ Final Note

This project demonstrates **realtime systems, frontend engineering, and collaborative UX design**, making it suitable for internships and full-stack roles.

---

✨ *If you like this project, consider giving it a star!*
