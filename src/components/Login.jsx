import React, { useState } from "react";

function Login({ handleLogin, handleLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Supongamos que aquí realizas la lógica de autenticación con el nombre de usuario y la contraseña
    // Puedes hacer una solicitud a tu servidor, verificar las credenciales, etc.

    // Lógica de autenticación local (¡solo un ejemplo, debes adaptarlo según tus necesidades!)
    const validUsername = "usuario";
    const validPassword = "contraseña";

    if (username === validUsername && password === validPassword) {
      // Autenticación exitosa
      // Llama a la función handleLogin proporcionada por el padre
      handleLogin(username);
    } else {
      // Autenticación fallida
      setErrorMessage(
        "Credenciales incorrectas. Por favor, inténtalo de nuevo."
      );
    }
  };

  const handleLogoutClick = () => {
    // Aquí puedes realizar acciones adicionales antes de llamar a handleLogout si es necesario
    console.log("Haciendo acciones antes del cierre de sesión...");

    // Llama a la función handleLogout para cerrar sesión
    handleLogout();
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
