import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import logo from "../../assets/logo.svg";
import like from "../../assets/like.svg";
import dislike from "../../assets/dislike.svg";
import itsamatch from "../../assets/itsamatch.png";

import "./main.css";
import api from "../../services/api";

export default function Main({ match }) {
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const response = await api.get("/devs", {
        headers: {
          user: match.params.id,
        },
      });

      setUsers(response.data);
    }

    loadUser();
  }, [match.params.id]);

  useEffect(() => {
    const socket = io("http://localhost:3333", {
      query: { user: match.params.id },
    });

    socket.on("match", (dev) => {
      setMatchDev(dev);
    });
  }, [match.params.id]);

  async function handleLike(id) {
    //2º parametro é o corpo da requisição (no caso do post)
    await api.post(`/devs/${id}/like`, null, {
      headers: {
        user: match.params.id,
      },
    });

    const newsUsers = users.filter((user) => user._id !== id);
    setUsers(newsUsers);
  }

  async function handleDislike(id) {
    //2º parametro é o corpo da requisição (no caso do post)
    await api.post(`/devs/${id}/dislike`, null, {
      headers: {
        user: match.params.id,
      },
    });

    const newsUsers = users.filter((user) => user._id !== id);
    setUsers(newsUsers);
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="TinDev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>Co-founder e CEO @Rocketseat </p>
              </footer>
              <div className="buttons">
                <button onClick={() => handleLike(user._id)} type="button">
                  <img src={like} alt="Like" />
                </button>
                <button onClick={() => handleDislike(user._id)} type="button">
                  <img src={dislike} alt="Dislike" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty"> Acabou :(</div>
      )}

      {matchDev && (
        <div className="match-container">
          <img src={itsamatch} alt="Its a match" />

          <img className="avatar" src={matchDev.avatar} alt="User" />
          <strong>{matchDev.name}</strong>
          <p>{matchDev.bio}</p>

          <button type="submit" onClick={() => setMatchDev(null)}>
            {" "}
            Fechar{" "}
          </button>
        </div>
      )}
    </div>
  );
}
