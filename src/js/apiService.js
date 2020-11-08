import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const API_KEY = '18992222-0ffbc097a98d577b6731791a7';
const BASE_URL = 'https://pixabay.com/api';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const response = await fetch(
        `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
      );

      const newHits = await response.json();
      this.incrementPage();

      return newHits.hits;
    } catch (info) {
      this.noMorePicturesLeft();
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  errorMessage() {
    error({
      title: 'Что-то пошло не так',
      text: 'Но ничего страшного, мы над этим работаем',
      delay: 5000,
      closerHover: true,
    });
  }

  noMorePicturesLeft() {
    info({
      title: 'Опа, картинки закончились',
      text: 'Попробуйте поискать что нибудь другое',
      delay: 5000,
      closerHover: true,
    });
  }
}
