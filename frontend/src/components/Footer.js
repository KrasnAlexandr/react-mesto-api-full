import {Route, Switch, withRouter} from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <Switch>
        <Route path='/sign-up'>
          <></>
        </Route>

        <Route path='/sign-in'>
          <></>
        </Route>

        <Route path='/'>
          <div className="header__container">
            <p className="footer__copyright">&#169; 2023 Краснянский Александр</p>
          </div>
        </Route>
      </Switch>
    </footer>
  );
}
export default withRouter(Footer);
