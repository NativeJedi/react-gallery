import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { getImages } from '../api/requests';
import setObserver from '../utils/set-observer.util';

const useImages = (loaderRef) => {
  const [currentPage, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [prevY, setPrevY] = useState(0);

  const loadMore = () => setPage((page) => page + 1);

  const handleObserve = (entries) => {
    const [loaderElem] = entries;
    const { y } = loaderElem.boundingClientRect;
    const { pageYOffset } = window;
    const currentOffset = y + pageYOffset;
    const isScrolledDown = currentOffset > prevY;

    if (loaderElem.isIntersecting && isScrolledDown) {
      loadMore();
      setPrevY(currentOffset);
    }
  };

  const [setObserve, removeObserve] = setObserver({
    root: null,
    rootMargin: '400px',
    threshold: 1.0,
  }, handleObserve);

  const loadImages = useCallback(async () => {
    const { pictures, hasMore } = await getImages(currentPage);
    setImages((storedImages) => [...storedImages, ...pictures]);
    setIsAllLoaded(!hasMore);
  }, [currentPage]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    const unobserve = () => {
      removeObserve();
    };

    if (isAllLoaded) {
      removeObserve();
      return unobserve;
    }

    setObserve(loaderRef.current);

    return unobserve;
  }, [isAllLoaded, loaderRef, setObserve, removeObserve]);

  return [images, isAllLoaded, loadMore];
};

export default useImages;
