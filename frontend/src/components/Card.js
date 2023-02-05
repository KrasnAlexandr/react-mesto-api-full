import { useContext } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const isLiked = props.card.likes.some(like => like === currentUser._id);

  const handleClick = () => {
    props.onCardClick(props.card);
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  }

  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      {isOwn && <button type="button" className="element__trash-button" title="delete" onClick={handleDeleteClick}></button>}
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button type="button" className={`element__like-button ${isLiked ? "element__like-button_type_active" : ''}`} title="Like" onClick={handleLikeClick}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
