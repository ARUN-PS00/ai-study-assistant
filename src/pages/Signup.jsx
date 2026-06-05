import { useState } from "react";
import { signup } from "../services/authService";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password);
      alert("Account created successfully!");
    } catch (error) {
      alert(error.message);
    }
  };
return (
  <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg border">
    <h2 className="text-2xl font-bold mb-6 text-center">
      Sign Up
    </h2>

    <form onSubmit={handleSignup}>
        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full border rounded-lg p-3 mb-4"
/>

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full border rounded-lg p-3 mb-4"
/>
<button
  type="submit"
  className="w-full bg-sky-600 text-white p-3 rounded-lg hover:bg-sky-700"
>
  Create Account
</button>
      </form>
    </div>
  );
}

export default Signup;