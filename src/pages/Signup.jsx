import { useState } from "react";
import { signup } from "../services/authService";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

function Signup({ setCurrentPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Call your existing auth service to create the user in Firebase Auth
      const userCredential = await signup(name, email, password);
      const user = userCredential.user;

      // 2. Automatically save the user profile and initial dark theme preference to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role: "student",
        theme: "dark",
        createdAt: serverTimestamp(),
      });

      // 3. Redirect to home page if successful
      if (setCurrentPage) setCurrentPage("home");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-900 via-slate-900 to-emerald-900">
      <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white/10 backdrop-blur border border-white/10">
        <h2 className="text-center text-2xl font-semibold mb-6 text-emerald-200">Create Account</h2>

        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name Field */}
          <div className="flex items-center bg-slate-800/60 rounded">
            <span className="px-4 text-slate-200">??</span>
            <input
              className="w-full px-4 py-3 rounded-r bg-transparent text-white placeholder-slate-300"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="flex items-center bg-slate-800/60 rounded">
            <span className="px-4 text-slate-200">??</span>
            <input
              className="w-full px-4 py-3 rounded-r bg-transparent text-white placeholder-slate-300"
              type="email"
              placeholder="Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-slate-800/60 rounded">
            <span className="px-4 text-slate-200">??</span>
            <input
              className="w-full px-4 py-3 rounded-r bg-transparent text-white placeholder-slate-300"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-white py-3 rounded font-semibold"
          >
            SIGN UP
          </button>

          <div className="text-center text-sm text-slate-300 mt-3">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setCurrentPage && setCurrentPage('login')}
              className="underline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
