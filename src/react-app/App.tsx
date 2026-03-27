// src/App.tsx
import "./App.css";
import { usePrint } from "./usePrint";

function App() {
  const { print } = usePrint();

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
      <button onClick={() => print(<div>Print Content</div>)}>Print</button>
      <button onClick={handleShare}>Share</button>
    </>
  );
}

export default App;
