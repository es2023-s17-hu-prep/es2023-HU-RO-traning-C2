import React, { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import Input from "../components/ui/Input";
import lockClosed from "../assets/lock-closed.png";
import user from "../assets/user.png";
import mail from "../assets/mail.png";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import axios from "axios";
import { useDineEaseContext } from "../context/DineEaseContext";
import ButtonSecondary from "../components/ui/ButtonSecondary";
import { useNavigate } from "react-router-dom";

/**
 * Register Page
 */
const RegisterPage = () => {
  const { setToken } = useDineEaseContext();
  const [error, setError] = useState();
  const navigate = useNavigate();

  /**
   * State for the fields
   */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  /**
   * Handle the form submission
   */
  function handleSubmit(e) {
    e.preventDefault();

    // the passwords don't match
    if (password !== passwordConfirm) {
      setError("The two password must match");
      return;
    }

    // issue the api call
    axios
      .post("/register", { email, password, name })
      .then((res) => {
        setToken(res.data.token);
        navigate("/");
      })
      .catch((e) => setError(e.response.data.message));
  }

  return (
    <AuthLayout title="Sign up to DineEase">
      <h1 className="font-bold text-3xl">Register</h1>
      <p>If you don't have a DineEase account, you can create one here!</p>

      <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
        {error && <Alert>{error}</Alert>}

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          icon={<img src={user} alt="User Icon" />}
        />
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
        <Input
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          icon={<img src={lockClosed} alt="Lock Icon" />}
        />

        <Button className="mt-8" rounded>
          Register
        </Button>
        <ButtonSecondary
          type="button"
          onClick={() => navigate("/login")}
          rounded
        >
          Back to login
        </ButtonSecondary>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
