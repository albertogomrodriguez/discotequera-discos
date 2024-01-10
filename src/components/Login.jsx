import React, { useState } from "react";

function Login({ handleLogin, handleLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const validUsername = "usuario";
    const validPassword = "contraseña";

    if (username === validUsername && password === validPassword) {
      handleLogin(username);
    } else {
      setErrorMessage(
        "Credenciales incorrectas. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="loginCentradito">
      <h1 className="bold">Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <label className="label">Nombre de usuario:</label>
        <br />
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />

        <label className="label">Contraseña:</label>
        <br />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />

        {errorMessage !== "" && <p>{errorMessage}</p>}

        <button id="buttonLoggin" type="submit">
          Iniciar sesión
        </button>
        <br />
      </form>
      <br />
    </div>
  );
}

export default Login;
