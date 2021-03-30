import React from 'react';

function PopupWithForm({
  title, name, children, isOpen, onClose, onSubmit,
}) {
  return (
        <section className={`popup popup_action_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="button button_action_close" onClick={onClose}/>
                <form className={`popup__form popup__form_action_${name}`} method="post" name={name} onSubmit={onSubmit}>
                    <h2 className="popup__heading">{title}</h2>
                    {children}
                    <button type="submit" className="button button_action_submit">Сохранить</button>
                </form>
            </div>
        </section>
  );
}
export default PopupWithForm;
