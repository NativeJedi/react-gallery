const setObserver = (options, observeCallback) => {
  const observer = new IntersectionObserver(
    observeCallback,
    options,
  );

  const setObserve = (target) => observer.observe(target);

  const removeObserve = () => observer.disconnect();

  return [setObserve, removeObserve];
};

export default setObserver;
