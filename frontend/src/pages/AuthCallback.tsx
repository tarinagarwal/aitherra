import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        navigate("/", { replace: true });
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        const data = await response.json();
        login(data.access_token, data.user);
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Auth error:", error);
        navigate("/", { replace: true });
      }
    };

    handleCallback();
  }, [navigate, login]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Completing authentication...</p>
      </div>
    </div>
  );
}
