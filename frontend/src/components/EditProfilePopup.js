import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
        <PopupWithForm
            name={'edit'}
            title={'Редактировать профиль'}
            children={
                <>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_profile_name" type="text" name="name" id="profile-name"
                               defaultValue={name} required minLength="2" maxLength="40" onChange={handleNameChange}/>
                        <span id="profile-name-error" className="error"/>
                    </div>
                    <div className="popup__input-container">
                        <input className="popup__input popup__input_profile_about" type="text" name="about" id="profile-about"
                               defaultValue={description} required minLength="2" maxLength="200" onChange={handleDescriptionChange}/>
                        <span id="profile-about-error" className="error"/>
                    </div>
                </>
            }
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
  );
}

export default EditProfilePopup;
