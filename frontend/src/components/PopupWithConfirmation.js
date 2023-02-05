import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation(props) {

  const handleSubmit = evt => {
    evt.preventDefault();

    props.onDeleteCard();
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}

      isLoading={props.isLoading}

      handleEscClose={props.handleEscClose}
      closePopupClickOnOverlay={props.closePopupClickOnOverlay}

      name="delete-card"
      title="Вы уверены?"
      textForButton="Да"
      textWhenLoading="Удаляем..."
    />
  );
}

export default PopupWithConfirmation;