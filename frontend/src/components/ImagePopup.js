import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
        <section className={`popup popup_action_fullscreen ${card && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className={`button button_action_close ${card ? '' : 'button_action_close-inactive'}`} onClick={onClose}/>
                <figure className="figure">
                    <img className="figure__picture" src={card ? card.link : ''} alt={card ? card.name : ''}/>
                    <figcaption className="figure__caption">{card ? card.name : ''}</figcaption>
                </figure>
            </div>
        </section>
  );
}
export default ImagePopup;
