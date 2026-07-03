import { createRoot } from "react-dom/client";
import App from "./khadlaj-perfumes (1).jsx";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Missing #root element");
}

createRoot(rootEl).render(<App />);
