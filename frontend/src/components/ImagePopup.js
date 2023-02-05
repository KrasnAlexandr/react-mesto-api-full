import { useEffect } from "react";

function ImagePopup(props) {

  useEffect(() => {
    if (props.card) {
      document.addEventListener('keydown', props.handleEscClose);
      document.addEventListener('mousedown', props.closePopupClickOnOverlay);
    }

    return () => {
      document.removeEventListener('keydown', props.handleEscClose);
      document.removeEventListener('mousedown', props.closePopupClickOnOverlay);
    }
  }, [props.card, props.handleEscClose, props.closePopupClickOnOverlay])

  return (
    <div className={`popup popup_type_zoom ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__container-image">
        <button type="button" className="popup__close-button" title="Закрыть увеличенное фото" onClick={props.onClose}></button>
        <figure className="popup__figure">
          <img className="popup__zoom-image" src={`${props.card?.link}`} alt={`${props.card?.name}`}/>
          <figcaption className="popup__figure-caption">{`${props.card?.name}`}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;