import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '32003639-db0e7b4889ce58836b14df3bc',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', {
    params: {
      q,
      page,
    },
  });
  return data;
};
