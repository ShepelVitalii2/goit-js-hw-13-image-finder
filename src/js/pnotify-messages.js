import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function errorMessage() {
  error({
    title: 'Что-то пошло не так',
    text: 'Но ничего страшного, мы над этим работаем',
    delay: 5000,
    closerHover: true,
  });
}

function noMorePicturesLeft() {
  info({
    title: 'Опа, картинки закончились',
    text: 'Попробуйте поискать что нибудь другое',
    delay: 5000,
    closerHover: true,
  });
}

function emptyStringMessage() {
  info({
    title: 'Нет информации по поиску тегов',
    text: 'Но ничего страшного, мы вам что-нибудь подберерем',
    delay: 5000,
    closerHover: true,
  });
}

function noPicturesAtAll() {
  info({
    title: 'Такого у нас нет',
    text: 'Давайте попробуем что нибудь другое',
    delay: 5000,
    closerHover: true,
  });
}

export {
  errorMessage,
  noMorePicturesLeft,
  emptyStringMessage,
  noPicturesAtAll,
};
