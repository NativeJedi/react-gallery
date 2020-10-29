import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './gallery-zoom.styles.scss';

const GalleryZoom = ({ imgUrl }) => (
  <TransformWrapper
    defaultScale={1}
    defaultPositionX={0}
    defaultPositionY={0}
  >
    {
      ({ zoomIn, zoomOut, resetTransform }) => (
        <>
          <div className="gallery-zoom-tools">
            <button type="button" onClick={zoomIn}>+</button>
            <button type="button" onClick={zoomOut}>-</button>
            <button type="button" onClick={resetTransform}>Reset</button>
          </div>
          <TransformComponent>
            <div className="gallery-zoom-wrapper">
              <img src={imgUrl} alt="Gallery item" />
            </div>
          </TransformComponent>
        </>
      )
    }
  </TransformWrapper>
);

export default GalleryZoom;
