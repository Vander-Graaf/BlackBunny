import React from "react";

const Login = ({ password, setPassword, handleLogin, error }) => (
  <div className="align-login">
    <div className="login-box">
      <h2 className="login-text">Страница редактирования</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введите пароль"
        className="login-input"
      />
      <button onClick={handleLogin} className="password-enter-btn">
        Войти
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  </div>
);

export default Login;
