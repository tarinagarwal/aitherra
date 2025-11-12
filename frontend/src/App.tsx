import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { LandingPage } from "./features/landing/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background-primary">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Add more routes here */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
