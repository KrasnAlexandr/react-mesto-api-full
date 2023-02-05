import { useEffect } from "react";
const InfoTooltip = props => {

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keydown', props.handleEscClose);
      document.addEventListener('mousedown', props.closePopupClickOnOverlay);
    }

    return () => {
      document.removeEventListener('keydown', props.handleEscClose);
      document.removeEventListener('mousedown', props.closePopupClickOnOverlay);
    }
  }, [props.isOpen, props.handleEscClose, props.closePopupClickOnOverlay])

  return (
    <div className={`popup popup_type_authorization ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" title="Закрыть уведомление" onClick={props.onClose}></button>
        <figure className="popup__figure_type_authorization">
          <img className="popup__status-image" src={props.message.src} alt="Статус регистрации"/>
          <figcaption className="popup__figure-caption_type_authorization">
            {`${props.message.text}`}
          </figcaption>
        </figure>
      </div>
    </div>
  );
};
export default InfoTooltip;