import React from 'react';
import {
  Route, Switch, Redirect, useHistory,
} from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [infoOk, setInfoOk] = React.useState(null);

  const history = useHistory();

  function handleEditProfileClick() { setIsEditProfilePopupOpen(true); }
  function handleAddPlaceClick() { setIsAddPlacePopupOpen(true); }
  function handleEditAvatarClick() { setIsEditAvatarPopupOpen(true); }
  function handleCardClick(card) { setSelectedCard(card); }

  function handleUpdateUser(data) {
      const token = localStorage.getItem('token')
    api.updateProfile(data, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((item) => (item._id === card._id ? newCard : item));
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c !== card);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(card) {
    api.postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setUserData(email);
          setLoggedIn(true);
          setMessage('???????? ????????????????!');
          setInfoOk(true);
          setIsInfoTooltipOpen(true);
        } else if (data.status === 400) {
          throw new Error('???? ???????????????? ???????? ???? ??????????!');
        } else if (data.status === 401 || data.status === 404) {
          throw new Error('???? ?????????? ???????????? email ?????? ????????????!');
        } else {
          throw new Error('???????????? ??????????????!');
        }
      })
      .catch((e) => {
        setInfoOk(false);
        setIsInfoTooltipOpen(true);
        setMessage(e.message);
      });
  };
  const handleRegister = (password, email) => {
    auth.register(password, email)
      .then((res) => {
        if (res.status === 200) {
          setMessage('?????????????????????? ???????????? ??????????????!');
          setInfoOk(true);
          setIsInfoTooltipOpen(true);
          history.push('/sign-in');
        }
        else if (res.status === 500) {
          throw new Error('???????????? ??????????????!');
        } else {
          throw new Error('??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.');
        }
      })
      .catch((e) => {
        setInfoOk(false);
        setIsInfoTooltipOpen(true);
        setMessage(e.message);
      });
  };
  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            setUserData(res.email);
            setLoggedIn(true);
          }
        })
        .catch((e) => console.log(e));
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);
  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  React.useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('token');
      auth.getContent(token)
          .then((user) => {
            setCurrentUser(user);
          })
          .then(() => {
              api.getInitialCards(token)
                  .then((data) => { setCards(data.reverse()); })
                  .catch((err) => {
                      console.log(err);
                  });
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, [loggedIn]);
  return (
      <CurrentUserContext.Provider value={currentUser}>
          <Switch>
              <Route path ="/sign-up">
                    <Register handleRegister={handleRegister} linkPath={'/sign-in'} linkText={'??????????'}/>
                <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  infoMessage={message}
                  infoOk={infoOk}
                />
              </Route>
              <Route path ="/sign-in">
                  <Login handleLogin={handleLogin} linkPath={'/sign-up'} linkText={'??????????????????????'} />
                <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  infoMessage={message}
                  infoOk={infoOk}
                />
              </Route>
              <>
                  <div className="page">
                    <Header userData={userData} linkPath={'/sign-in'} linkText={'??????????'} signOut={handleSignOut} />
                    <Route path="/">
                        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                    </Route>
                    <ProtectedRoute
                                    loggedIn={loggedIn}
                                    component={Main}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onImageClick={handleCardClick}>
                    </ProtectedRoute>
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <InfoTooltip
                      isOpen={isInfoTooltipOpen}
                      onClose={closeAllPopups}
                      infoMessage={message}
                      infoOk={infoOk}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                      <AddPlacePopup
                      isOpen={isAddPlacePopupOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlaceSubmit}
                      />
                    <EditProfilePopup />
                    <PopupWithForm
                        name={'submit'}
                        title={'???? ???????????????'}
                        children={''}
                        onClose={closeAllPopups}
                    />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <Footer />
                  </div>
              </>
          </Switch>
      </CurrentUserContext.Provider>
  );
}

export default App;
