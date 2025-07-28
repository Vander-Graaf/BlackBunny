import S from "./Login.module.css";

const Login = ({ password, setPassword, handleLogin, error }) => (
  <div className={S.align_container}>
    <div className={S.container}>
      <h2>Панель админа</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Введите пароль"
        className={S.password_input}
      />
      <button onClick={handleLogin} className={S.submit_btn}>
        Войти
      </button>
      {error && <p className={S.error_msg}>{error}</p>}
    </div>
  </div>
);

export default Login;
