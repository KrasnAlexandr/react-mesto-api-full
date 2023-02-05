import { useState } from "react";
import { withRouter } from "react-router-dom";
const Login = props => {
  const [userData, setUserData] = useState({ email: '', password: '' } );
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const { password, email } = userData;
    props.handleLogin({ password, email });
  };

  return (
    <div className='authorization'>

      <h2 className="authorization__title">Вход</h2>

      <form onSubmit={handleSubmit} className="authorization__form" name="login">

        <input
          type="email"
          name="email"
          className="authorization__input"
          placeholder="Email"
          required
          value={userData.email || ""}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="authorization__input"
          placeholder="Пароль"
          required
          minLength="8"
          value={userData.password || ""}
          onChange={handleChange}
        />

        <button className="authorization__button" type="submit" title="Войти">
          Войти
        </button>
      </form>
    </div>
  );
}
export default withRouter(Login);