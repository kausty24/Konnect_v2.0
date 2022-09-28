import { Button } from "@mui/material";
import { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import DynamicBiddingPage from './DynamicBiddingPage';
import PlaceBidForm from "./PlaceBidForm";

const BiddingModal = ({ order }) => {

    const [displayBidding, setDisplayBidding] = useState(false)


  return (
    <>
        <Button variant='contained' color="success" onClick={()=> {setDisplayBidding(true);} } disabled={order.lockoutTimeInMinutes === 0}>
            Place Bid
        </Button>
        <Modal size='xl' show={displayBidding} onHide={()=> {setDisplayBidding(false)}} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    #{order.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DynamicBiddingPage orderId={order.id} lockoutTimeInMinutes={order.lockoutTimeInMinutes}/>
                <PlaceBidForm orderId={order.id} lockoutTimeInMinutes={order.lockoutTimeInMinutes}/>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default BiddingModal