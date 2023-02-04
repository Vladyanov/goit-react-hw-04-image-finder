import PropTypes from 'prop-types';

import css from './image-gallery.module.scss';

const ImageGallery = ({ children }) => {
  return <ul className={css.gallery}>{children}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  children: PropTypes.element.isRequired,
};
