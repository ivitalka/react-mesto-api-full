import React from 'react';

function InfoTooltip({
  isOpen, onClose, infoMessage, infoOk,
}) {
  return (
    <section className={`popup popup_action_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className={'button button_action_close'} onClick={onClose}/>
        <div className={`popup__info ${infoOk ? 'popup__info_state_ok' : 'popup__info_state_error'}`}>
          <h3 className="message popup__message">{infoMessage}</h3>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
