import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onImageClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
        <main className="content">
            <section className="profile">
                <button className="button_action_update" onClick={onEditAvatar}>
                    <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="button button_action_edit" onClick={onEditProfile} />
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button type="button" className="button button_action_add" onClick={onAddPlace}/>

            </section>

            <section className="gallery">
                <ul className="gallery__list">
                    {cards.map((card) => <Card key={card._id}
                              card={card}
                              onImageClick={onImageClick}
                              onCardLike = {onCardLike}
                              onCardDelete={onCardDelete}
                        />)}
                </ul>
            </section>
        </main>
  );
}
export default Main;
