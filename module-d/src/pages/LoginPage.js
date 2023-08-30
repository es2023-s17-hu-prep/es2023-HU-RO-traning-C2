import React, { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import lockClosed from "../assets/lock-closed.png";
import mail from "../assets/mail.png";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import axios from "axios";
import { useDineEaseContext } from "../context/DineEaseContext";

/**
 * Login Page
 */
const LoginPage = () => {
  const { setToken } = useDineEaseContext();
  const [error, setError] = useState();
  const navigate = useNavigate();

  /**
   * State for the fields
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handle the form submission
   */
  function handleSubmit(e) {
    e.preventDefault();

    // issue the api call
    axios
      .post("/login", { email, password })
      .then((res) => {
        setToken(res.data.token);
        navigate("/");
      })
      .catch((e) => setError(e.response.data.message));
  }

  return (
    <AuthLayout title="Sign in to DineEase">
      <h1 className="font-bold text-3xl">Sign in</h1>
      <p>
        You can{" "}
        <Link to="/register" className="font-semibold text-primary-dark">
          Register here!
        </Link>
      </p>

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        {error && <Alert>{error}</Alert>}

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          icon={<img src={mail} alt="Mail Icon" />}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          icon={<img src={lockClosed} alt="Lock Icon" />}
        />

        <Button className="mt-8" rounded>
          Log In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
