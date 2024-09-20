import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <main>
        <section>
          <div className="flex flex-col items-center">
            <p className="text-3xl mb-4"> Kochanet </p>

            <form>
              <div className="flex flex-col">
                <label htmlFor="email-address">Email address:</label>
                <input
                  className="rounded-xl px-2 text-[#09363F]"
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password">Password:</label>
                <input
                  className="rounded-xl px-2 text-[#09363F]"
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="mt-4 flex w-full justify-center rounded-full bg-[#30CEAF] py-2 font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]"
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
            </form>

            <p className="text-sm text-white text-center mt-2">
              No account yet? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
