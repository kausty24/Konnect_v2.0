import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditCustomerProfile from '../EditProfile/EditCustomerProfile'

export default function ProfileModal(props) {
  const [lgShow, setLgShow] = useState(false);
  const customer = JSON.parse(localStorage.getItem("customer"));

  

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
          <EditCustomerProfile customer={customer}/> 
        </Modal.Body>
      </Modal>
    </>
  );
}
