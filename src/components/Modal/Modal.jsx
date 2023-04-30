import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onKeyDown);
  }

  render() {
    const { imageUrl, onBackdrop } = this.props;

    return (
      <div className={styles.overlay} onClick={onBackdrop}>
        <div className={styles.modal}>
          <img src={imageUrl} alt={imageUrl} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onBackdrop: PropTypes.func.isRequired,
};

export default Modal;
