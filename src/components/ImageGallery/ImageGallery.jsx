import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ data, onClickImg }) => {
  return (
    <ul className={styles.gallery}>
      {data.map(el => (
        <ImageGalleryItem key={el.id} data={el} onClickImg={onClickImg} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })),
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGallery;
