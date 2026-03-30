// src/App.tsx
import "./App.css";
import { useIframePrint } from "./useIframePrint";

function PrintContent() {
  return (
    <>
      <div className="document">
        <header>
          <h1>Document Title</h1>
        </header>
        <main>
          <p>This is the main content of the document.</p>
          <p>It can include multiple paragraphs, images, and other elements.</p>
          <p className="no-print">This content will not be printed.</p>
        </main>
        <footer>
          <p>Document Footer</p>
        </footer>
      </div>
    </>
  );
}

function App() {
  const { print } = useIframePrint();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Vite React Template",
          text: "",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.warn("Web Share API is not supported in this browser.");
    }
  };

  return (
    <>
      <button
        onClick={() => {
          print(<PrintContent />);
        }}
      >
        Print
      </button>
      <button onClick={handleShare}>Share</button>
    </>
  );
}

export default App;
