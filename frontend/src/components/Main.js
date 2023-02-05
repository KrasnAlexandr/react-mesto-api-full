import Card from "./Card.js";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import loadingImage from '../images/loading.png';
function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__main">
          <button type="button" className="profile__avatar-button" title="Изменить аватар профиля" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar || loadingImage} alt="аватар профиля" />
          </button>
          <div className="profile__container">
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : "Загрузка..."}</h1>
              <button type="button" className="profile__edit-button" title="Редактировать профиль" onClick={props.onEditProfile}></button>
              <p className="profile__description">{currentUser.about ? currentUser.about : "пожалуйста подождите"}</p>
            </div>
          </div>
        </div>
        <button type="button" className="profile__add-button" title="Добавить место" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__box">
          {props.cards.map(card => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
