import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }
  return (
        <PopupWithForm
            name={'add'}
            title={'Новое место'}
            children={
                <>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_picture_name" placeholder="Название" type="text"
                               name="pictureName" id="picture-name" required minLength="2" maxLength="30" ref={nameRef}/>
                        <span id="picture-name-error" className="error"/>
                    </div>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_picture_link" placeholder="Ссылка на картинку" type="url"
                               name="pictureLink" id="picture-link" required ref={linkRef}/>
                        <span id="picture-link-error" className="error"/>
                    </div>
                </>}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
  );
}

export default AddPlacePopup;
