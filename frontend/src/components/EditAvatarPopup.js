import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

function EditAvatarPopup(props) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation({});

  const handleSubmit = evt => {
    evt.preventDefault();
    props.onUpdateAvatar(values);
  }

  useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}

      isLoading={props.isLoading}

      handleEscClose={props.handleEscClose}
      closePopupClickOnOverlay={props.closePopupClickOnOverlay}

      isDisabled={!isValid}

      name="edit-avatar"
      title="Обновить аватар"
      textForButton="Сохранить"
      textWhenLoading="Сохраняем..."
      >
      <label className="popup__label">
        <input className="popup__input popup__input_type_url-avatar"
               placeholder="Ссылка на картинку" type="url" name="avatar"
               required
               value={values.avatar || ''} onChange={handleChange}
        />
        <span className={`popup__error avatar-error ${errors.avatar ? 'popup__error_type_active' : ''}`}>
          {errors.avatar}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;