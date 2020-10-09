import './gallery.styles.scss';
import React from 'react';
import { getImageDetails, getImages } from '../../api/requests';
import GalleryItem from '../gallery-item/gallery-item.component';
import GalleryView from '../gallery-view/gallery-view.component';
import Modal from '../modal/modal.component';

export default class Gallery extends React.Component {
  state = {
    page: 1,
    pictures: [],
    pictureDetails: null,
  }

  async componentDidMount() {
    const { page } = this.state;

    const { pictures } = await getImages(page);

    this.setState({
      pictures,
    });
  }

  onNext = () => {
    const { pictureDetails, pictures } = this.state;

    const currentPictureIndex = pictures.findIndex(({ id }) => id === pictureDetails.id);
    const nextPicture = pictures[currentPictureIndex + 1];

    if (!nextPicture) {
      return;
    }

    this.getPictureDetails(nextPicture.id);
  }

  onPrev = () => {
    const { pictureDetails, pictures } = this.state;

    const currentPictureIndex = pictures.findIndex(({ id }) => id === pictureDetails.id);
    const prevPicture = pictures[currentPictureIndex - 1];

    if (!prevPicture) {
      return;
    }

    this.getPictureDetails(prevPicture.id);
  }

  onClose = () => {
    this.setState({
      pictureDetails: null,
    });
  }

  getPictureDetails = async (id) => {
    const pictureDetails = await getImageDetails(id);

    this.setState({
      pictureDetails,
    });
  }

  render() {
    const {
      pictures,
      pictureDetails,
    } = this.state;

    return (
      <div className="gallery">
        <h1 className="gallery__title">Gallery</h1>

        <div className="gallery__items">
          {
            pictures.map(({ id, cropped_picture: imgUrl }) => (
              <GalleryItem
                key={id}
                imgUrl={imgUrl}
                showPicture={() => this.getPictureDetails(id)}
              />
            ))
          }
        </div>

        {pictureDetails && (
          <Modal onClose={this.onClose} onNext={this.onNext} onPrev={this.onPrev}>
            <GalleryView picture={pictureDetails} />
          </Modal>
        )}
      </div>
    );
  }
}
