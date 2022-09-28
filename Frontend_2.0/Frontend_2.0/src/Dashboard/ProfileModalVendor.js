import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditVendorProfile from '../EditProfile/EditVendorProfile'

export default function ProfileModalVendor(props) {
  const [lgShow, setLgShow] = useState(false);
  const vendor = JSON.parse(localStorage.getItem("authVendor"));

  return (
    <>
      <Button
        className="btn btn-lg btn-success"
        onClick={() => setLgShow(true)}
      >
        Hi, {props.title}
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditVendorProfile vendor={vendor}/> 
        </Modal.Body>
      </Modal>
    </>
  );
}