import './gallery-view.styles.scss';
import React from 'react';
import PropTypes from 'prop-types';

const GalleryView = ({
  picture: {
    full_picture: imgUrl,
    author,
    camera,
    tags,
  },
}) => (
  <picture className="gallery-view">
    <div className="gallery-view__img-wrap">
      <img className="gallery-view__img" src={imgUrl} alt="Gallery item" />
    </div>

    <footer className="gallery-view__footer">
      <div className="gallery-view__row">
        <span className="gallery-view__label">Author:</span>
        <span className="gallery-view__value">{author}</span>
      </div>
      <div className="gallery-view__row">
        <span className="gallery-view__label">Camera:</span>
        <span className="gallery-view__value">{camera}</span>
      </div>
      <div className="gallery-view__row">
        <span className="gallery-view__label">Hash tags:</span>
        <span className="gallery-view__value">{tags}</span>
      </div>
    </footer>
  </picture>
);

GalleryView.propTypes = {
  picture: PropTypes.shape({
    full_picture: PropTypes.string,
    author: PropTypes.string,
    camera: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};

export default GalleryView;
