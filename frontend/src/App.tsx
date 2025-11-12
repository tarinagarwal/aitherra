import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import { LandingPage } from "./features/landing/LandingPage";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

function AppRoutes() {
  const { user, loading } = useAuth();

  // If user is authenticated but not onboarded, force them to onboarding
  if (!loading && user && !user.isOnboarded) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  // Normal routes for everyone else
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute requireOnboarding={false}>
            <Onboarding />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      {/* Add more protected routes here */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const isOnboarding = !loading && user && !user.isOnboarded;

  return (
    <div className="min-h-screen bg-background-primary">
      {!isOnboarding && <Navbar />}
      <AppRoutes />
      {!isOnboarding && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
