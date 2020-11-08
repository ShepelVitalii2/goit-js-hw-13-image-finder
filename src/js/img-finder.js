import 'core-js';

import imgCardTpl from '../templates/imgCardTpl.hbs';
import ApiImages from './apiService';
import LoadMoreBtn from './load-more-btn';
import animateScrollTo from 'animated-scroll-to';
import { onOpenModal } from './modal';
import { errorMessage, emptyStringMessage } from './pnotify-messages';
// import { info } from '@pnotify/core';

// import '@pnotify/core/dist/PNotify.css';
// import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  imgCardContainer: document.querySelector('.js-card-container'),
  imgContainer: document.querySelector('.gallery'),
  //   btnToHide: document.querySelector('.is-hidden'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const apiImages = new ApiImages();

refs.searchForm.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', fetchHits);
refs.imgContainer.addEventListener('click', onOpenModal);

async function onSearch(e) {
  e.preventDefault();
  clearImgContainer();
  apiImages.query = e.currentTarget.elements.query.value;

  try {
    loadMoreBtn.show();
    loadMoreBtn.disable();
    apiImages.resetPage();
    fetchHits();

    if (apiImages.query === '') {
      return emptyStringMessage();
    }
  } catch (error) {
    // apiImages.errorMessage();
    errorMessage();
  }
}

function animateScroll() {
  const indexToScroll = 12 * (apiImages.page - 1) - 11;
  const itemToScroll = refs.imgContainer.children[indexToScroll];
  const options = {
    speed: 500,
    verticalOffset: -10,
  };

  animateScrollTo(itemToScroll, options);
}

async function fetchHits() {
  loadMoreBtn.disable();

  try {
    const response = await apiImages.fetchImages();
    if (response.length < 11) {
      loadMoreBtn.hide();
    }
    if (response.length === 0) {
      noPicturesAtAll();
    }

    imagesMurkup(response);

    loadMoreBtn.enable();
  } catch (error) {
    loadMoreBtn.hide();
  }
  animateScroll();
}

function imagesMurkup(hits) {
  refs.imgCardContainer.insertAdjacentHTML('beforeend', imgCardTpl(hits));
}

function clearImgContainer() {
  refs.imgCardContainer.innerHTML = '';
}

// function emptyStringMessage() {
//   info({
//     title: 'Нет информации по поиску тегов',
//     text: 'Но ничего страшного, мы вам что-нибудь подберерем',
//     delay: 5000,
//     closerHover: true,
//   });
// }

// function noPicturesAtAll() {
//   info({
//     title: 'Такого у нас нет',
//     text: 'Давайте попробуем что нибудь другое',
//     delay: 5000,
//     closerHover: true,
//   });
// }
