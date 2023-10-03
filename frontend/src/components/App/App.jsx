import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../Movies/SavedMovies/SavedMovies";
import Register from "../Auth/Register/Register";
import Login from "../Auth/Login/Login";
import Profile from "../Main/Profile/Profile";
import ErrorNotFound from "../NotFoundError/NotFoundError";
import {
  badRequest,
  errorUnauthorized,
  errorConflict,
  errorValidation,
  errorIncorrectUserId,
  errorIncorrectMovieId,
  errorIncorrectCredentials,
  errorMessagUnauthorized,
  errorNotUniqueEmail,
  errorRegistration,
  errorLogin,
  errorUpdateProfile,
  noticeUpdateProfile,
} from "../../utils/constants";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCurrentUser, isSetCurrentUser] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isErrorMessage, setIsErrorMessage] = useState("");
  const [isNotice, setIsNotice] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLanding = pathname === "/";
  const isMoviesPage = pathname === "/movies";
  const isSavedMoviesPage = pathname === "/saved-movies";

  useEffect(() => {
    setIsErrorMessage("");
    setIsNotice("");
  }, [pathname]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .checkToken(token)
        .then((userData) => {
          if (userData) {
            isSetCurrentUser(userData);
            setIsLoggedIn(true);
            navigate(pathname, { replace: true });
          } else {
            handleLogout();
          }
        })
        .catch((err) => {
          if (err === errorUnauthorized) {
            console.log(errorMessagUnauthorized);
          } else if (err === badRequest) {
            console.log(errorIncorrectUserId);
          } else {
            console.log(err);
          }
        });
    } else {
      handleLogout();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getMovies()
        .then((savedMovies) => {
          setSavedMovies(savedMovies.reverse());
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies.reverse()))
        })
        .catch((err) => {
          if (err === errorUnauthorized) {
            console.log(errorMessagUnauthorized);
          } else {
            console.log(err);
          }
        });
      }
  }, [isLoggedIn]);

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err === errorConflict) {
          setIsErrorMessage(errorNotUniqueEmail);
        } else if (err === badRequest) {
          setIsErrorMessage(errorValidation);
        } else {
          setIsErrorMessage(errorRegistration);
        }
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        setIsLoggedIn(true)
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        if (err === errorUnauthorized) {
          setIsErrorMessage(errorIncorrectCredentials);
        } else {
          setIsErrorMessage(errorLogin);
        }
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    isSetCurrentUser({});
    setSavedMovies([]);
    navigate("/", { replace: true });
  }

  function handleupdateUserData(name, email) {
    mainApi
      .updateDataUser(name, email)
      .then((userData) => {
        isSetCurrentUser(userData);
        setIsEditMode(false);
        setIsNotice(noticeUpdateProfile);
      })
      .catch((err) => {
        if (err === errorUnauthorized) {
          console.log(errorMessagUnauthorized);
        } else if (err === errorConflict) {
          setIsErrorMessage(errorNotUniqueEmail);
        } else if (err === badRequest) {
          setIsErrorMessage(errorValidation);
        } else {
          setIsErrorMessage(errorUpdateProfile);
        }
      })
      .finally(() => {
        setIsSubmitted(false);
      });
  }

  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((savedMovie) => {
        localStorage.setItem('savedMovies', JSON.stringify([savedMovie, ...savedMovies]))
        setSavedMovies([savedMovie, ...savedMovies]);

      })
      .catch((err) => {
        if (err === errorUnauthorized) {
          console.log(errorMessagUnauthorized);
        } else if (err === badRequest) {
          console.log(errorValidation);
        } else {
          console.log(err);
        }
      });
  }

  async function handleDeleteMovie(movieId) {
    return new Promise((resolve, reject) => {
      mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies((savedMovies) => {
          localStorage.setItem('savedMovies', JSON.stringify( savedMovies.filter((savedMovie) => savedMovie._id !== movieId)))
          return savedMovies.filter((savedMovie) => savedMovie._id !== movieId)
        });
        resolve('success');
      })
      .catch((err) => {
        if (err === errorUnauthorized) {
          console.log(errorMessagUnauthorized);
        } else if (err === badRequest) {
          console.log(errorIncorrectMovieId);
        } else {
          console.log(err);
        }
        reject('error')
      })
    })
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={isCurrentUser}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} isLanding={isLanding} />
                <Main />
                <Footer />
              </>
            }
          ></Route>
          <Route
            exact
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Register
                  isErrorMessage={isErrorMessage}
                  setIsErrorMessage={setIsErrorMessage}
                  isSubmitted={isSubmitted}
                  setIsSubmitted={setIsSubmitted}
                  onRegister={handleRegister}
                />
              )
            }
          ></Route>
          <Route
            exact
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/movies" replace />
              ) : (
                <Login
                  isErrorMessage={isErrorMessage}
                  setIsErrorMessage={setIsErrorMessage}
                  isSubmitted={isSubmitted}
                  setIsSubmitted={setIsSubmitted}
                  onLogin={handleLogin}
                />
              )
            }
          ></Route>
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <Movies
                    savedMovies={savedMovies}
                    isMoviesPage={isMoviesPage}
                    isSavedMoviesPage={isSavedMoviesPage}
                    onSave={handleSaveMovie}
                    onDelete={handleDeleteMovie}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <SavedMovies
                    savedMovies={savedMovies}
                    isSavedMoviesPage={isSavedMoviesPage}
                    onDelete={handleDeleteMovie}
                  />
                  <Footer />
                </>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <>
                  <Header isLoggedIn={isLoggedIn} />
                  <Profile
                    isErrorMessage={isErrorMessage}
                    setIsErrorMessage={setIsErrorMessage}
                    isNotice={isNotice}
                    setIsNotice={setIsNotice}
                    isEditMode={isEditMode}
                    onEdit={setIsEditMode}
                    onUpdate={handleupdateUserData}
                    onLogout={handleLogout}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                  />
                </>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="*" element={<ErrorNotFound />}></Route>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
