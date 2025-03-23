import React from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import deltetImage from "../../../assets/delete.png";

export default function DeletConfirmation({show,handleClose,deleteFunction,deleteItem}) {
  return (
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <div  className="">
          <img src={deltetImage} alt="No Data" className="img-fluid mb-3" width={200} />
          <h3>Delete This deleteItem ?</h3>
          <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="text-align-center">
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button
          variant="primary btn btn-danger"
          onClick={deleteFunction}
        >
          Delete this {deleteItem}
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}
