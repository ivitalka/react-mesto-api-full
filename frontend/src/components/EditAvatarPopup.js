import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
        <PopupWithForm
            name={'update'}
            title={'Обновить аватар'}
            children={
                <>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_avatar_link" placeholder="Ссылка на аватар" type="url"
                               name="avatar" id="avatar-link" required ref={avatarRef}/>
                        <span id="avatar-link-error" className="error"/>
                    </div>
                </>
            }
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
  );
}

export default EditAvatarPopup;
