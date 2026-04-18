# 🚀 Realtime Collaborative Canvas Board

A powerful **realtime collaborative whiteboard** inspired by tools like Excalidraw — built to enable multiple users to draw, edit, and interact on a shared canvas instantly, with **no authentication required**.

🔗 **Live Demo:**  
👉 https://realtime-canvas-board-frontend.onrender.com/

---

## ✨ Key Highlights

- ⚡ Realtime multi-user collaboration
- 🎯 Smooth and intuitive canvas experience
- 🔗 Instant shareable rooms (no login)
- 🧠 Infinite canvas with zoom & pan
- 🔄 Per-user undo/redo (advanced logic)

---

## 🧠 Core Features

### 🎨 Drawing Tools
- ✏️ Freehand Pen Tool
- ⬛ Rectangle
- ⚪ Circle
- ➖ Line
- 🧽 Eraser

---

### 🖐 Canvas Interaction
- Infinite canvas (no boundaries)
- Smooth panning (hand tool)
- Zoom in/out (scroll + buttons)

---

### 🔗 Collaboration
- Shareable room link
- Multiple users on same canvas
- Realtime updates via WebSockets

---

### 🔄 Undo / Redo (Per User)
- Each user has independent history
- Your undo does NOT affect others
- Works in realtime

---

### 🧩 Advanced Features
- 🖱 Selection & move shapes
- 📏 Resize shapes (corner handles)
- 👥 Live cursor tracking
- 🎯 Clean & intuitive UI/UX

---

## 🏗 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- HTML5 Canvas API

### Backend
- Node.js
- Express.js
- Socket.IO (Realtime Engine)

---

## 📡 Architecture

```text
User Action → Socket Emit → Server → Broadcast → Other Clients Update UI
````

* All drawing events are emitted via sockets
* Server synchronizes state across users
* Clients re-render canvas dynamically

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/gaurav-opensource/realtime-canvas-board
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

### 3️⃣ Run Application

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

### 4️⃣ Open App

```text
http://localhost:5173
```

---

## 🔗 Usage

1. Open the app
2. Click **Start Drawing**
3. Share the room link
4. Collaborate in realtime 🎉

---

## 📁 Project Structure

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

## ⚡ Realtime Feature Matrix

| Feature              | Status |
| -------------------- | ------ |
| Drawing Sync         | ✅      |
| Shape Sync           | ✅      |
| Move / Resize Sync   | ✅      |
| Undo/Redo (Per User) | ✅      |
| Cursor Tracking      | ⭐      |

---

## 🎯 Assignment Coverage

This project fully satisfies the requirements described in the assignment :

* Infinite canvas ✔
* Drawing tools ✔
* Realtime collaboration ✔
* Shareable rooms ✔
* Per-user undo/redo ✔

---

## 🧠 Challenges Solved

* 🔄 Realtime synchronization across multiple users
* 🧩 Per-user undo/redo logic (non-trivial)
* 🎯 Smooth drawing without lag
* 🔍 Canvas transformations (zoom + pan math)
* ⚡ Efficient rendering with dynamic state

---

## 🔮 Future Enhancements

* 🖼 Image upload support
* 📝 Text tool
* 🎨 Color picker & stroke width
* 👥 User names + colored cursors
* 💾 Save / load canvas

---

## 📄 AI Usage Disclosure

This project was developed with limited assistance from GitHub Copilot for minor code suggestions and improving development speed.

The overall architecture, core logic, and implementation were designed and written independently. Copilot was used only as a productivity aid (e.g., boilerplate or syntax suggestions), not for generating complete solutions.

All major features, including realtime synchronization and per-user undo/redo logic, were implemented through independent problem-solving and understanding.

---

## 🙌 Author

**Gaurav Yadav**

* GitHub: [https://github.com/gaurav-opensource](https://github.com/gaurav-opensource)
* LinkedIn: [https://linkedin.com/in/your-profile](https://www.linkedin.com/in/gauravyadav95/)

---

## ⭐ Final Thoughts

This project demonstrates:

* Realtime system design
* Advanced frontend engineering
* Collaborative UX thinking






