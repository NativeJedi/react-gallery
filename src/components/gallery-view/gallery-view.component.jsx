import './gallery-view.styles.scss';
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { getImageDetails } from '../../api/requests';
import GalleryZoom from '../gallery-zoom/gallery-zoom.component';
import Loader from '../loader/loader.component';

const GalleryView = ({
  currentPictureId,
  onClose,
  pictures,
  isAllLoaded,
  onLimit,
  setPictureId,
}) => {
  const [loadedPictures, setLoadedPictures] = useState({});
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const indexOfCurrentPicture = useMemo(() => {
    return pictures.findIndex(({ id }) => id === currentPictureId);
  }, [pictures, currentPictureId]);

  const inputUrl = useRef(null);

  const onNext = () => {
    const nextPicture = pictures[indexOfCurrentPicture + 1];

    if (nextPicture) {
      setPictureId(nextPicture.id);
    }
  };

  const onPrev = () => {
    const prevPicture = pictures[indexOfCurrentPicture - 1];

    if (prevPicture) {
      setPictureId(prevPicture.id);
    }
  };

  useEffect(() => {
    const isLastPicture = indexOfCurrentPicture === pictures.length - 1;

    if (isLastPicture && !isAllLoaded) {
      onLimit();
    }
  }, [pictures, isAllLoaded, indexOfCurrentPicture, onLimit]);

  useEffect(() => {
    const pictureInCache = loadedPictures[currentPictureId];
    if (pictureInCache) {
      setPicture(pictureInCache);
      return;
    }

    setIsLoading(true);
    getImageDetails(currentPictureId).then((loadedPicture) => {
      const { id } = loadedPicture;

      setLoadedPictures((prevPictures) => ({
        ...prevPictures,
        [id]: loadedPicture,
      }));
      setPicture(loadedPicture);
      setIsLoading(false);
    });
  }, [currentPictureId, pictures, loadedPictures]);

  if (isLoading) {
    return (
      <div className="gallery-view">
        <Loader loading={isLoading} />
      </div>
    );
  }

  const {
    full_picture: imgUrl,
    author,
    camera,
    tags,
  } = picture || {};

  const sharePhoto = () => {
    inputUrl.current.select();

    document.execCommand('copy');
  };

  return (
    <div className="gallery-view">
      <button
        type="button"
        className="btn-default gallery-view__close"
        onClick={onClose}
      >
        &#10005;
      </button>

      <button
        type="button"
        className="btn-default gallery-view__control gallery-view__control--next"
        onClick={onNext}
      >
        &#10095;
      </button>

      <div className="gallery-view__body">
        <GalleryZoom imgUrl={imgUrl} />

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
          <div className="gallery-view__row">
            <button type="button" onClick={sharePhoto}>Share</button>

            <input
              className="gallery-view__url-input"
              value={imgUrl}
              ref={inputUrl}
              readOnly
            />
          </div>
        </footer>
      </div>

      <button
        type="button"
        className="btn-default gallery-view__control gallery-view__control--prev"
        onClick={onPrev}
      >
        &#10094;
      </button>
    </div>
  );
};

export default GalleryView;
