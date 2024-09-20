import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main>
      <section>
        <div className="flex flex-col items-center">
          <p className="text-3xl mb-4"> Kochanet </p>

          <form>
            <div className="flex flex-col">
              <label htmlFor="email-address">Email address:</label>
              <input
                className="rounded-xl px-2"
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password:</label>
              <input
                className="rounded-xl px-2"
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="mt-4 flex w-full justify-center rounded-full bg-[#30CEAF] py-2 font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]"
              onClick={onSubmit}
            >
              Sign up
            </button>
          </form>

          <p className="text-sm text-white text-center mt-2">
            Already have an account? <NavLink to="/">Sign in</NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
