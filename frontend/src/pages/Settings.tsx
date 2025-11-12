import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { User, Check, X, Loader2 } from "lucide-react";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/user/username`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to update username");
      }

      const data = await response.json();
      updateUser(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-slate-400">Please log in to access settings</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-indigo-500/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Account Settings
          </h1>
          <p className="text-slate-400 mb-8">Manage your account preferences</p>

          {/* Profile Section */}
          <div className="mb-8 pb-8 border-b border-indigo-500/10">
            <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
            <div className="flex items-center gap-4">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-20 h-20 rounded-full border-2 border-indigo-500/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
              )}
              <div>
                <p className="text-lg font-semibold text-white">{user.name}</p>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Username Section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Username</h2>
            <form onSubmit={handleUpdateUsername} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Your username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    @
                  </span>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-zinc-900 border border-indigo-500/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="username"
                    minLength={3}
                    maxLength={30}
                    pattern="[a-zA-Z0-9_]+"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  3-30 characters. Letters, numbers, and underscores only.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <X className="w-5 h-5 text-red-400" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <Check className="w-5 h-5 text-green-400" />
                  <p className="text-sm text-green-400">
                    Username updated successfully!
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || username === user.username}
                className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Username"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
