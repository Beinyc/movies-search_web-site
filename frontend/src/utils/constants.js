const REGEX_NAME = "[A-zА-яёЁ\\s\\-]+";
const REGEX_EMAIL = "^[A-z0-9+_.\\-]+@[A-z0-9]+\\.[A-z0-9]{2,}$";

const badRequest = 400;
const errorUnauthorized = 401;
const errorConflict = 409;

const errorValidation = "Переданы неправильные данные";
const errorIncorrectUserId = "Передан неправильный _id пользователя";
const errorIncorrectMovieId = "Передан неправильный _id фильма";
const errorIncorrectCredentials = "Неправильные почта или пароль";
const errorMessagUnauthorized = "Необходима авторизация";
const errorNotUniqueEmail = "Пользователь с таким email уже зарегистрирован";
const errorRegistration = "При регистрации пользователя произошла ошибка";
const errorLogin = "При авторизации пользователя произошла ошибка";
const errorUpdateProfile = "При обновлении профиля произошла ошибка";
const errorGetMovies = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
const errorNoKeywords = "Нужно ввести ключевое слово";
const errorNotFoundMovies = "Ничего не найдено";

const noticeUpdateProfile = "Данные профиля успешно обновлены";

const viewPortExtraLarge = 1280;
const viewPortLarge = 990;
const viewPortMedium = 616;
const viewPortLite = 615;
const initialCardsExtraLarge = 16;
const initialCardsLarge = 12;
const initialCardsMedium = 8;
const initialCardsSmall = 5;
const moreCardsExtraLarge = 4;
const moreCardsLarge = 3;
const moreCardsMedium = 2;
const moreCardsSmall = 2;
const durationShortMovies = 40;

export {
  REGEX_NAME,
  REGEX_EMAIL,
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
  errorGetMovies,
  errorNoKeywords,
  errorNotFoundMovies,
  viewPortExtraLarge,
  viewPortLarge,
  viewPortMedium,
  initialCardsExtraLarge,
  initialCardsLarge,
  initialCardsMedium,
  initialCardsSmall,
  moreCardsExtraLarge,
  moreCardsLarge,
  moreCardsMedium,
  moreCardsSmall,
  noticeUpdateProfile,
  durationShortMovies,
  viewPortLite,
};
