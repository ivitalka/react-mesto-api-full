import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({
  card, onImageClick, onCardLike, onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardRemoveButtonClassName = `button button_action_remove
        ${isOwn ? 'button button_action_remove-visible' : ''}`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `button button_action_like
         ${isLiked ? 'button button_action_like-active' : ''}`;
  const handleClick = () => {
    onImageClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  return (
        <>
            <li className="gallery__item" id={card._id}>
                <button type="button" className={cardRemoveButtonClassName} onClick={handleDeleteClick}/>
                <img className="gallery__picture" src={card.link} alt={card.name}
                     onClick={handleClick}
                />
                <h2 className="gallery__heading">{card.name}</h2>
                <div className="gallery__container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <p className="gallery__like-counter">{card.likes.length}</p>
                </div>
            </li>
        </>
  );
}

export default Card;
