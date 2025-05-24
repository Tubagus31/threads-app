import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginInput from "../components/LoginInput";
import { asyncSetAuthUser } from "../states/authUser/action";
import { FaTwitter } from "react-icons/fa";

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    if (email === "" || !email) {
      alert('"Email" is not allowed to be empty');
      return;
    }

    if (password === "" || !password) {
      alert('"Password" is not allowed to be empty');
      return;
    }

    return dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1>
          <FaTwitter />
        </h1>
      </header>
      <article className="login-page__main">
        <h2>
          Connect <strong>The World</strong>, One Thought at a Time
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
