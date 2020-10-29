import React from 'react';
import './gallery-item.styles.scss';

const GalleryItem = ({ imgUrl, showPicture }) => (
  <div
    role="button"
    tabIndex="0"
    className="gallery-item"
    onClick={showPicture}
    onKeyUp={(e) => e.code === 'Enter' && showPicture()}
  >
    <img src={imgUrl} alt="Gallery item" />
  </div>
);

export default GalleryItem;
