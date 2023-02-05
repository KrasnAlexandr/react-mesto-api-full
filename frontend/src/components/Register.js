import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
const Register = props => {
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
    props.handleRegistration({ password, email });
  };

  return (
    <>
      <div className='authorization'>

        <h2 className="authorization__title">Регистрация</h2>

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

          <button className="authorization__button" type="submit" title="Зарегистрироваться">Зарегистрироваться</button>

          <p className="authorization__paragraph">Уже зарегистрированы? <Link to="/sign-in" className="authorization__link">Войти</Link></p>
        </form>
      </div>
    </>
  );
}
export default withRouter(Register);