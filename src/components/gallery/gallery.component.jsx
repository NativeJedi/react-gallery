import './gallery.styles.scss';
import React, {
  useState,
  useRef,
} from 'react';
import GalleryItem from '../gallery-item/gallery-item.component';
import GalleryView from '../gallery-view/gallery-view.component';
import Loader from '../loader/loader.component';
import Modal from '../modal/modal.component';
import useImages from '../../hooks/use-images.hook';

const Gallery = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [shownPictureId, setPictureId] = useState(null);

  const loaderRef = useRef(null);

  const [images, isAllLoaded, loadMore] = useImages(loaderRef);

  return (
    <div className="gallery">
      <h1 className="gallery__title">Gallery</h1>

      <div className="gallery__items">
        {
          images.map(({ id, cropped_picture: imgUrl }) => (
            <GalleryItem
              key={id}
              imgUrl={imgUrl}
              showPicture={() => {
                setIsOpened(true);
                setPictureId(id);
              }}
            />
          ))
        }
      </div>

      <Loader
        loading={!isAllLoaded}
        loaderRef={loaderRef}
      />

      <Modal isOpened={isOpened}>
        <GalleryView
          pictures={images}
          currentPictureId={shownPictureId}
          onLimit={loadMore}
          isAllLoaded={isAllLoaded}
          setPictureId={setPictureId}
          onClose={() => setIsOpened(false)}
        />
      </Modal>
    </div>
  );
};

export default Gallery;
