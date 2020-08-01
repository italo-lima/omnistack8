import React, { useState } from "react";

import logo from "../../assets/logo.svg";
import "./login.css";
import api from "../../services/api";

function Login({ history }) {
  const [username, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { data } = await api.post("/devs", { username });

    history.push(`/dev/${data._id}`);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="TinDev" />
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Login;
