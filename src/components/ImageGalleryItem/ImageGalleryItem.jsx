import css from './image-gallery-item.module.scss';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ items, searchFullSizeImg }) => {
  const elements = items.map(({ id, webformatURL, largeImageURL }) => (
    <li
      onClick={() => searchFullSizeImg({ largeImageURL })}
      key={id}
      className={css.gallery_item}
    >
      <img src={webformatURL} alt="" />
    </li>
  ));
  return elements;
};

export default ImageGalleryItem;

ImageGalleryItem.defaultProps = {
  items: [],
};

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
  searchFullSizeImg: PropTypes.func.isRequired,
};
