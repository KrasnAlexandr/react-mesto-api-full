import logo from "../images/header-logo.svg";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import React, {useState} from "react";
const Header = props => {
  const [menuOpen, setMenuState] = useState(false);
  const toggleMenu = () => {
    setMenuState(!menuOpen);
  }
  const onSignOutInMenu = () => {
    setMenuState(!menuOpen);
    props.onSignOut();
  }

  return (
    <>
      {menuOpen &&
        <div className="header__menu">
          <p className="header__email">{props.email}</p>
          <Link to="/sign-in" className="header__link_type_menu" onClick={onSignOutInMenu}>Выйти</Link>
        </div>
      }

      <header className="header">
        <a href="components/App#" target="_self"><img className="header__logo" src={logo} alt="логотип проекта" /></a>
        <Switch>
          <Route path='/sign-up'>
            <Link to="/sign-in" className="header__link">Войти</Link>
          </Route>

          <Route path='/sign-in'>
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          </Route>

          <Route path='/'>
            <>
              <div className="header__container">
                <p className="header__email">{props.email}</p>
                <Link to="/sign-in" className="header__link" onClick={props.onSignOut} >Выйти</Link>
              </div>

              {menuOpen
                ? <div onClick={toggleMenu} className="header__button_type_close"></div>
                : <div onClick={toggleMenu} className="header__button_type_open"></div>
              }


            </>
          </Route>
        </Switch>
      </header>
    </>
  );
}
export default withRouter(Header);
