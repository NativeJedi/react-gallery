import {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { getImages } from '../api/requests';
import useObserver from './use-observer.hook';

const useImages = (loaderRef) => {
  const [currentPage, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [prevY, setPrevY] = useState(0);

  const loadMore = () => setPage((page) => page + 1);

  const handleObserve = (entries) => {
    const [loaderElem] = entries;
    const { y } = loaderElem.boundingClientRect;

    const isScrolledDown = y > prevY;

    if (loaderElem.isIntersecting && isScrolledDown) {
      loadMore();
      setPrevY(y);
    }
  };

  const [setObserve, removeObserve] = useObserver({
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
  }, [isAllLoaded]);

  return [images, isAllLoaded, loadMore];
};

export default useImages;