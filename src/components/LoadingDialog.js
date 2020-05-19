import React from 'react';
import './style/LoadingDialog.css';

const LoadingDialog = () => {
  return (
    <>
      <div className="loader">
        <div className="inner line-one" />
        <div className="inner line-two" />
        <div className="inner line-three" />
      </div>
      <span className="loader-text">Loading</span>
    </>
  );
};

export default LoadingDialog;
