import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// production builds ship prerendered HTML, so attach to it; the dev server starts empty
if (container.firstElementChild) hydrateRoot(container, <App />);
else createRoot(container).render(<App />);
