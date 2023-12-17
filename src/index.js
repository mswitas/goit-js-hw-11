import Notiflix from "notiflix";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createImageDiv } from "./js/create-image-div";
import { fetchImagesByQuery } from "./js/pixabay-api";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import { fluentScroll } from "./js/fluent-scroll";


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreWrapper = document.querySelector('.load-more-wrapper');
const loadMore = document.querySelector('.load-more');
const endOfScroll = document.querySelector('.end-of-scroll');
let searchQuery;
let page = 1;
let totalPages;

var lightbox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    page = 1;
    gallery.innerHTML = '';
    loadMoreWrapper.classList.add('visually-hidden');
    endOfScroll.classList.add('visually-hidden');
    searchQuery = this.searchQuery.value;
    fetchImagesByQuery(searchQuery)
        .then(response => {
            const totalHits = response.data.totalHits;
            totalPages = Math.ceil(totalHits / 40);

            if (totalPages > 1) {
                loadMoreWrapper.classList.remove('visually-hidden');
            } else {
                endOfScroll.classList.remove('visually-hidden');
            }

            if (totalHits > 0) {
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            } else {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }

            const imagesArray = response.data.hits;
            imagesArray.map(imageObject => {
                const htmlCode = createImageDiv(imageObject);
                gallery.insertAdjacentHTML('beforeend', htmlCode);
            });
            lightbox.refresh();
        })
        .catch(error => {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
            console.log(error)
        });
});

loadMore.addEventListener('click', () => {
    page++;

    if (page == totalPages) {
        loadMoreWrapper.classList.add('visually-hidden');
        endOfScroll.classList.remove('visually-hidden');
    }

    console.log(page);
    fetchImagesByQuery(searchQuery, page)
        .then(response => {
            const imagesArray = response.data.hits;
            imagesArray.map(imageObject => {
                const htmlCode = createImageDiv(imageObject);
                gallery.insertAdjacentHTML('beforeend', htmlCode);
            });
            lightbox.refresh();
            fluentScroll();
        })
        .catch(error => {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
            console.log(error)
        });
        
});

