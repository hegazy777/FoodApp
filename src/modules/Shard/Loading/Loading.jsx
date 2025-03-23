import React from "react";

export default function Loading() {
  return (
    <div className="text-center">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading Data...</span>
    </div>
  </div>
  );
}
