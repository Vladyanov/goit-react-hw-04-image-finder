import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from '../shared/Modal/Modal';

import { searchImages } from 'shared/services/img-api';

export class App extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: null,
  };

  searchImg = ({ search }) => {
    this.setState({ search, page: 1, items: [] });
  };

  searchFullSizeImg = ({ largeImageURL }) => {
    this.setState({
      showModal: true,
      largeImageURL,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: null,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      searchImages(search, page);
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchImages(search, page);
      this.setState(({ items }) => ({
        items: [...items, ...data.hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { items, error, loading, showModal, largeImageURL } = this.state;
    const { searchImg, loadMore, searchFullSizeImg, closeModal } = this;

    return (
      <>
        <Searchbar onSubmit={searchImg} />
        <ImageGallery>
          <ImageGalleryItem
            items={items}
            searchFullSizeImg={searchFullSizeImg}
          />
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
  }
}
