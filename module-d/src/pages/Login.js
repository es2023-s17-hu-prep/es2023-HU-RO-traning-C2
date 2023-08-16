import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import lockIcon from "../assets/lock-closed.png";
import mailIcon from "../assets/mail.png";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import AuthLayout from "../components/layouts/AuthLayout";
import { useDineEaseContext } from "../context/DineEaseContext";

/**
 * Login Page
 */
const Login = () => {
  const { setUser } = useDineEaseContext();

  /**
   * Field values
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  /**
   * Handle the submit event
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", { email, password })
      .then((res) => {
        setUser(res.data);
        navigate("/");
      })
      .catch((e) => setError(e.message));
  };

  /**
   * Reset the error on any field change
   */
  useEffect(() => setError(""), [email, password]);

  return (
    <AuthLayout title="Sign in to DineEase">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-8">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <span>
            You can{" "}
            <Link
              to="/register"
              className="text-purple-normal font-semibold hover:underline"
            >
              Register here!
            </Link>
          </span>
        </div>

        {error && <Alert>{error}</Alert>}

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Email"
            type="email"
            leftIcon={<img src={mailIcon} alt="Icon" />}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Password"
            type="password"
            leftIcon={<img src={lockIcon} alt="Icon" />}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button>Login</Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
