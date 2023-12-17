import axios from "axios"

export const fetchImagesByQuery = async (searchQuery, page = 1) => {
    const response = await axios.get(`https://pixabay.com/api/?key=6950737-29a0d5130824bfea54194711c&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    return response;
} 