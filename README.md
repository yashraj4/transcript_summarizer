# Workflow Builder Lite 🚀

An elegant, hosted web application for building and running automated text processing workflows. Built with Next.js, Vanilla CSS, and modern web standards.

## ✨ Features

- **Visual Workflow Builder**: Drag-and-drop intuition to sequence text operations.
- **Available Steps**:
  - 🧹 **Clean Text**: Normalize whitespace and format.
  - 📝 **Summarize**: Generate concise summaries (Mock/AI-simulated).
  - 🔑 **Extract Key Points**: Identify crucial information.
  - 🏷️ **Tag Category**: Automatically classify content.
- **Run History**: Persistent local storage of your last 5 workflow executions.
- **System Status Dashboard**: Real-time health checks for backend services.
- **Premium UI**: Glassmorphism design, smooth animations, and responsive layout.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS (CSS Modules & Variables) - No external UI libraries.
- **State Management**: React Hooks & Context.
- **Persistence**: LocalStorage API.
- **Deployment**: Dockerized for easy hosting.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Docker.

### Local Development

1.  Clone the repository:
    ```bash
    git clone <repo-url>
    cd workflow-builder-lite
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Deployment

To run the application with a single command (as requested):

```bash
docker-compose up --build
```
This will start the application on port 3000.

## 📝 Usage

1.  Go to the **Builder** page.
2.  Click "Add Step" to insert processing steps like "Clean Text" or "Summarize".
3.  Reorder or remove steps as needed.
4.  Enter text in the **Input Text** area (or use "Load Demo Text").
5.  Click **Run Workflow**.
6.  View the output of each step in the **Results** panel.
7.  Check **History** to review past runs.

## ⚠️ Known Limitations

- The current version uses a **Heuristic Engine** to simulate AI responses (summarization, extraction) to ensure zero-cost operation and instant availability.
- "Tag Category" is rule-based in this Lite version.
- Data persistence is client-side only (LocalStorage).
