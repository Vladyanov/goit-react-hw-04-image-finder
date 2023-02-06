import { useCallback, useEffect, useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from '../shared/Modal/Modal';

import { searchImages } from 'shared/services/img-api';

export const App = () => {
  const [search, setSeacrch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageUrl] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(search, page);
          setItems(prevItems => [...prevItems, ...data.hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const searchImg = useCallback(({ search }) => {
    setSeacrch(search);
    setPage(1);
    setItems([]);
  }, []);

  const searchFullSizeImg = useCallback(({ largeImageURL }) => {
    setShowModal(true);
    setLargeImageUrl(largeImageURL);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setLargeImageUrl(null);
  }, []);

  return (
    <>
      <Searchbar onSubmit={searchImg} />
      <ImageGallery>
        <ImageGalleryItem items={items} searchFullSizeImg={searchFullSizeImg} />
      </ImageGallery>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {Boolean(items.length) && <Button onClick={loadMore} />}
      {showModal && (
        <Modal close={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
};
