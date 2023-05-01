import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import getPicturesData from 'Api/getData';
import styles from './App.module.css';

export class App extends React.Component {
  state = {
    inputValue: '',
    picturesData: [],
    page: 1,
    totalPages: 1,
    loading: false,
    isModal: false,
    clickedImg: '',
  };

  handleSubmit = inputQuery => {
    this.setState({ inputValue: inputQuery });
    this.setState({ page: 1 });
  };

  loaderClick = () => {
    this.setState(prevState => ({
      ...prevState,
      page: prevState.page + 1,
    }));
  };

  handleImageClick = url => {
    this.setState({ isModal: true, clickedImg: url });
  };

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.setState({ isModal: false });
    }
  };

  handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.setState({ isModal: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    this.state.inputValue !== prevState.inputValue &&
      this.setState({ picturesData: [] });

    if (
      this.state.inputValue !== prevState.inputValue ||
      this.state.page !== prevState.page
    ) {
      this.setState({ loading: true });
      getPicturesData(this.state.inputValue, this.state.page)
        .then(response => {
          if (response.data.hits.length === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.',
              { theme: 'colored' }
            );
          } else {
            this.setState(prevState => ({
              picturesData: [...prevState.picturesData, ...response.data.hits],
              totalPages: Math.ceil(
                response.data.totalHits / response.data.hits.length
              ),
            }));

            if (this.state.page === 1) {
              toast.info(
                `Hooray! We found ${response.data.totalHits} images.`,
                { theme: 'colored' }
              );
            }
          }
        })
        .catch(error => {
          toast.error(error.message, { theme: 'colored' });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  }

  render() {
    const { loading, picturesData, page, totalPages } = this.state;

    return (
      <div className={styles.container}>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        <ImageGallery data={picturesData} onClickImg={this.handleImageClick} />
        {picturesData.length !== 0 && page !== totalPages && (
          <Button onClick={this.loaderClick} />
        )}
        <ToastContainer autoClose={3000} />
        {this.state.isModal && (
          <Modal
            onBackdrop={this.handleBackdrop}
            onKeyDown={this.handleKeyDown}
          >
            {this.state.clickedImg}
          </Modal>
        )}
      </div>
    );
  }
}
