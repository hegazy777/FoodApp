import React from "react";
import assetd from "../../../../src/assets/assetd.png"; 

export default function Header({ title, description }) {
  return (
    <div
      className="header-container d-flex align-items-center justify-content-center text-center" >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="caption  text-start" >
              <h3 className="fw-bold">{title}</h3>
              <p className="lead">{description}</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <img
              src={assetd}
              alt="Asset"
              className="img-fluid"
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}
