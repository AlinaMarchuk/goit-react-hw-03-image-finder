import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ data, onClickImg }) => {
  const { webformatURL, largeImageURL, id } = data;
  return (
    <li
      className={styles.galleryItem}
      onClick={() => {
        onClickImg(largeImageURL);
      }}
    >
      <img
        className={styles.image}
        src={webformatURL}
        alt={id}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  data: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
