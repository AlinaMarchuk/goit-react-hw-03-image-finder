import axios from 'axios';

async function getPicturesData(keyWord, page) {
  const API_KEY = '34995597-96e6671fd94897f552a2a272c';
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: keyWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  return await axios.get(`https://pixabay.com/api/?${searchParams}`);
}

export default getPicturesData;
