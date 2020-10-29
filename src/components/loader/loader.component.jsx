import React from 'react';
import ReactLoader from 'react-loader-spinner';
import './loader.styles.scss';

const Loader = ({ loaderRef, loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="loader"
    >
      <ReactLoader
        type="Grid"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  );
}

export default Loader;
