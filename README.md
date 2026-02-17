# Interactive Knowledge Map

A visual graph-based knowledge modeling tool built to demonstrate advanced frontend engineering skills.

This project showcases interactive node systems, dynamic graph rendering, guided presentation flows, and polished UI architecture — all implemented entirely on the client side.

🔗 **Live Demo:**  
https://interactive-knowledge-map-six.vercel.app/

📂 **Repository:**  
https://github.com/MagedMaher550/interactive-knowledge-map

---

## 🚀 Project Purpose

This project was built as a **frontend portfolio showcase** targeting frontend engineering roles.

It focuses on:

- Graph-based UI systems
- Scalable component architecture
- Typed domain modeling
- Presentation-driven UX
- Responsive design
- Clean state management

---

## 🛠 Tech Stack

- **Next.js 16 (App Router)**
- **React 19**
- **TypeScript**
- **React Flow** (graph rendering)
- **Framer Motion** (animations)
- **Tailwind CSS v4**
- **ESLint**

Package manager: **Yarn**

---

## 🏗 Architecture

- Single-page application
- Fully client-side
- No backend
- No database
- No authentication
- LocalStorage persistence
- Modular component structure
- Strictly typed domain models

All core state lives in the root page and flows downward through props.

---

## ✨ Core Features

### 1. Interactive Graph Canvas
- Built with React Flow
- Pan & zoom support
- Dynamic node creation
- Edge management
- Camera controls
- Responsive layout

---

### 2. Node Management
- Click node → opens detail panel
- Edit title, description, category
- Connect nodes dynamically
- Safe deletion with confirmation
- Outgoing connections scroll independently
- Mobile full-width behavior under 425px

---

### 3. Presentation Mode
- Create step-based guided presentations
- Highlight specific nodes per step
- Automatic edge derivation
- Reorder steps
- Inline renaming
- Step deletion
- "Start Presentation" disabled when no steps exist

---

### 4. Search & Navigation
- Real-time node filtering
- Instant selection
- Camera repositioning

---

### 5. Onboarding
- Informative onboarding modal
- Lightweight and non-intrusive
- No heavy tutorial logic

---

### 6. Local Persistence
- Graph state stored in `localStorage`
- No backend dependency

---

## 🎯 Design Decisions

### No Forced Seed Data
Users start from a clean state and build their own knowledge structure.

### No Global Edit Mode
Editing happens directly inside the node panel to reduce unnecessary UI complexity.

### Lightweight Onboarding
A modal introduction replaces complex tutorial logic to avoid overengineering.

### Derived Presentation Edges
Edges are automatically derived from selected nodes to simplify authoring.

---

## 📂 Project Structure (Simplified)

```
app/
components/
  canvas/
  panel/
  presentation/
  onboarding/
  ui/
data/
lib/
  presentation/
  storage/
  types.ts
```

---

## 🧪 Local Development

Clone the repository:

```bash
git clone https://github.com/MagedMaher550/interactive-knowledge-map.git
```

Install dependencies:

```bash
yarn install
```

Run development server:

```bash
yarn dev
```

Build production:

```bash
yarn build
```

Start production:

```bash
yarn start
```

---

## 🌍 Deployment

Deployed on Vercel.  
No environment variables required.

---

## 📌 What This Project Demonstrates

- Advanced React component architecture
- Typed domain modeling with TypeScript
- Graph UI engineering
- Derived state patterns
- Clean separation of concerns
- Responsive modal engineering
- Production-level UI polish
- Performance-conscious rendering

---

## 🔮 Potential Future Enhancements

- Export / import graph JSON
- Shareable presentation links
- Undo / redo history
- Collaborative editing
- Keyboard shortcuts
- Drag-to-connect edges

---

## 👤 Author

**Maged Maher**  
Frontend Engineer  

GitHub: https://github.com/MagedMaher550
