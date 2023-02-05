import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import useFormWithValidation from "../hooks/useFormWithValidation";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation({});

  const handleSubmit = evt => {
    evt.preventDefault();
    props.onUpdateUser(values);
  }

  useEffect(() => {
    currentUser && resetForm(currentUser);
  }, [currentUser, resetForm, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}

      isLoading={props.isLoading}

      handleEscClose={props.handleEscClose}
      closePopupClickOnOverlay={props.closePopupClickOnOverlay}

      isDisabled={!isValid}

      name="profile"
      title="Редактировать профиль"
      textForButton="Сохранить"
      textWhenLoading="Сохраняем..."
      >
      <label className="popup__label">
        <input className="popup__input popup__input_type_name"
               placeholder="Имя" type="text" name="name"
               minLength="2" maxLength="30" required
               value={values.name} onChange={handleChange} />
        <span className={`popup__error name-error ${errors.name? "popup__error_type_active" : ''}`}>
          {errors.name}
        </span>
      </label>

      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          placeholder="занятие" type="text" name="about"
          minLength="2" maxLength="30" required
          value={values.about} onChange={handleChange} />
        <span className={`popup__error description-error ${errors.about? "popup__error_type_active" : ''}`}>
          {errors.about}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
