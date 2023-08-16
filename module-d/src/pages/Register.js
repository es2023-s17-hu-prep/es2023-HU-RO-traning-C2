import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import lockIcon from "../assets/lock-closed.png";
import mailIcon from "../assets/mail.png";
import userIcon from "../assets/user.png";
import Alert from "../components/Alert";
import Button from "../components/Button";
import ButtonSecondary from "../components/ButtonSecondary";
import Input from "../components/Input";
import AuthLayout from "../components/layouts/AuthLayout";
import { useDineEaseContext } from "../context/DineEaseContext";

/**
 * Register Page
 */
const Register = () => {
  const { setUser } = useDineEaseContext();

  /**
   * Field values
   */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  /**
   * Handle the submit event
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // confirm the password mathcing
    if (password !== passwordConfirmation) {
      setError("Passwords should match");
      return;
    }

    axios
      .post("/register", { email, password, name })
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
          <h1 className="text-3xl font-bold">Register</h1>
          <span>
            If you don't have a DineEase account, you can register one here
          </span>
        </div>

        {error && <Alert>{error}</Alert>}

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <Input
            placeholder="Name"
            leftIcon={<img src={userIcon} alt="Icon" />}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <Input
            placeholder="Confirm Password"
            type="password"
            leftIcon={<img src={lockIcon} alt="Icon" />}
            required
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Button>Register</Button>
          <ButtonSecondary type="button" onClick={(e) => navigate("/login")}>
            Back to login
          </ButtonSecondary>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
