import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = ({ imgUrl, showPicture }) => (
  <div
    role="button"
    tabIndex="0"
    className="gallery-item"
    onClick={() => showPicture()}
    onKeyUp={(e) => e.code === 'Enter' && showPicture()}
  >
    <img src={imgUrl} alt="Gallery item" />
  </div>
);

GalleryItem.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  showPicture: PropTypes.func.isRequired,
};

export default GalleryItem;
