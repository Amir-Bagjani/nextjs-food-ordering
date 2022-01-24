import Axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (username !== `` && password !== ``) {
      setError(false);
      try {
        await Axios.post(`http://localhost:3000/api/login`, {
          username,
          password,
        });
        setError(false);
        router.push("/admin");
      } catch (err) {
        setError(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Admin Panell</h1>
        <label>Username: admin</label>
        <input
          placeholder="Username"
          className={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password: 123456</label>
        <input
          placeholder="Password"
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleClick}>
          Signin
        </button>
        {error && <div className={styles.error}>Wrong Credential!</div>}
      </div>
    </div>
  );
};
export default Login;
