import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

import CurrentUserContext from "../contexts/CurrentUserContext";

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import InfoTooltip from "./InfoTooltip";

import api from "../utils/Api";
import { getContent, login, register} from "../utils/auth";

import Login from "./Login";
import Register from "./Register";

import accepted from '../images/accepted.svg';
import rejected from '../images/rejected.svg';

import '../App.css';
function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  const [authMessage, setAuthMessage] = useState({src: "", text: ""});

  const [email, setEmail] = useState("")
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);


  const [isEditAvatarPopupOpen, setStateAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setStateProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setStateAddPlacePopup] = useState(false);
  const [isConfirmationPopupOpen, setStateConfirmationPopup] = useState(false);
  const [isInfoTooltipOpen, setStateInfoTooltipOpen] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [removedCard, setRemovedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditAvatarClick = () => {
    setStateAvatarPopup(true);
  }
  const handleEditProfileClick = () => {
    setStateProfilePopup(true);
  }
  const handleAddPlaceClick = () => {
    setStateAddPlacePopup(true);
  }
  const handleCardClick = card => {
    setSelectedCard(card);
  }
  const handleTrashButtonClick = card => {
    setStateConfirmationPopup(true);
    setRemovedCard(card);
  }
  const handleUpdateUser = newInfo => {
    setLoading(true);

    api.updateUserInfo(newInfo)
      .then(updatedInfo => {
        setCurrentUser(updatedInfo);
        closeAllPopups();
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }
  const handleUpdateAvatar = newAvatar => {
    setLoading(true);

    api.updateUserAvatar(newAvatar)
      .then(updatedInfo => {
        setCurrentUser(updatedInfo);
        closeAllPopups();
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }
  const handleAddPlaceSubmit = (data) => {
    setLoading(true);

    api.addNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }
  const closeAllPopups = () => {
    setStateAvatarPopup(false);
    setStateProfilePopup(false);
    setStateAddPlacePopup(false);
    setStateConfirmationPopup(false);
    setStateInfoTooltipOpen(false);
    setRemovedCard(null);
    setSelectedCard(null);
  }
  const handleCardLike = card => {
    const isLiked = card.likes.some(like => like === currentUser._id);

    (isLiked ? api.dislikeThisCard(card._id) : api.likeThisCard(card._id))
      .then(updatedCard => setCards(state => state.map(stateCard => stateCard._id === card._id ? updatedCard : stateCard)))
      .catch(err => console.error(err));
  }
  const handleCardDelete = () => {
    setLoading(true);

    api.deleteThisCard(removedCard._id)
      .then(() => {
        setCards(state => state.filter(stateCard => stateCard._id !== removedCard._id));
        closeAllPopups();
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }
  const handleEscClose = evt => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }
  const handleCloseClickOnOverlayPopup = evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(initialData => {
          const [info, cards] = initialData;

          const reverseCards = cards.reverse();

          setCurrentUser(info);
          setCards(reverseCards);
        })
        .catch(err => console.error(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt);
    }
  }, []);

  const checkToken = jwt => {
    getContent(jwt)
      .then(res => {
        setEmail(res.email)
        setLoggedIn(true)
        history.push("/")})
      .catch(err => console.log(err));
  }

  const handleRegistration = userData => {
    register(userData)
      .then(() => {
        setAuthMessage({ src: accepted, text: 'Вы успешно зарегистрировались и будете перенаправлены на страницу входа' });
        setTimeout(function (){
          history.push("/sign-in");
          setStateInfoTooltipOpen(false);
        }, 2000)
        })
      .catch((res) => {
        if (res.startsWith('Ошибка: 409')) {
          setAuthMessage({src: rejected, text: `Пользователь с почтой ${userData.email} уже зарегистрирован`});
        } else {
          setAuthMessage({src: rejected, text: `Что-то пошло не так, попробуйте еще раз`});
        }
      })
      .finally(() => setStateInfoTooltipOpen(true));
  }
  const handleLogin = userData => {
    login(userData)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        checkToken(res.token);
      })
      .catch(() => {
        setAuthMessage({ src: rejected, text: 'Неверный email или пароль' });
        setStateInfoTooltipOpen(true);
      })
  }
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setEmail("");
    setCurrentUser({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header email={email} onSignOut={handleSignOut}/>

      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleTrashButtonClick}
          onCardClick={handleCardClick}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
        />

        <Route path='/sign-up'>
          <Register handleRegistration={handleRegistration} />
        </Route>

        <Route path='/sign-in'>
          <Login handleLogin={handleLogin} />
        </Route>

        <Route path="/">
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>

      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}

        isLoading={isLoading}

        handleEscClose={handleEscClose}
        closePopupClickOnOverlay={handleCloseClickOnOverlayPopup}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}

        isLoading={isLoading}

        handleEscClose={handleEscClose}
        closePopupClickOnOverlay={handleCloseClickOnOverlayPopup}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}

        isLoading={isLoading}

        handleEscClose={handleEscClose}
        closePopupClickOnOverlay={handleCloseClickOnOverlayPopup}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}

        handleEscClose={handleEscClose}
        closePopupClickOnOverlay={handleCloseClickOnOverlayPopup}
      />

      <PopupWithConfirmation
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}

        isLoading={isLoading}

        handleEscClose={handleEscClose}
        closePopupClickOnOverlay={handleCloseClickOnOverlayPopup}
      />

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        message={authMessage}

        handleEscClose={handleEscClose}
        closePopupClickOnOverlay={handleCloseClickOnOverlayPopup}
      />

    </CurrentUserContext.Provider>
  );
}
export default withRouter(App);
