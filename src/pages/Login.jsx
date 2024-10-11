import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import styles from "./Login.module.css";
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/FakeAuthContext';
import Button from '../components/Button';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("arvin99@example.com");
  const [password, setPassword] = useState("Welcome1");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter your credentials');
      return;
    }
    login(email, password);
  }

  useEffect(function() {
    if (isAuthenticated) {
      navigate('/app', { replace: true});
    }
  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <PageNav></PageNav>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
