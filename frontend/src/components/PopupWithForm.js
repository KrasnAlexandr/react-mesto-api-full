import { useEffect } from "react";

function PopupWithForm(props) {

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
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" title="Закрыть" onClick={props.onClose}></button>
        <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
          <h3 className="popup__title">{props.title}</h3>
          {props.children}
          <button
            disabled={props.isDisabled}
            className={`popup__submit-button ${props.isDisabled ? 'popup__submit-button_type_disabled' : ''}`}
            type="submit"
            title={props.textForButton}
          >
            {props.isLoading ? props.textWhenLoading : props.textForButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
