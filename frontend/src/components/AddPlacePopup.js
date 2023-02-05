import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

function AddPlacePopup(props) {
  const { values, errors, isValid,handleChange, resetForm } = useFormWithValidation({});

  const handleSubmit = evt => {
    evt.preventDefault();

    props.onAddPlace(values);
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

      name="elements"
      title="Новое место"
      textForButton="Создать"
      textWhenLoading="Создаём..."
      >
      <label className="popup__label">
        <input className="popup__input popup__input_type_element"
               placeholder="Название" type="text" name="name"
               minLength="2" maxLength="30" required
               value={values.name || ''} onChange={handleChange}/>
        <span className={`popup__error element-error ${errors.name ? 'popup__error_type_active' : ''}`}>
          {errors.name}
        </span>
      </label>

      <label className="popup__label">
        <input className="popup__input popup__input_type_url-element"
               placeholder="Ссылка на картинку" type="url" name="link"
               required
               value={values.link || ''} onChange={handleChange}
        />
        <span className={`popup__error url-error ${errors.link ? 'popup__error_type_active' : ''}`}>
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
