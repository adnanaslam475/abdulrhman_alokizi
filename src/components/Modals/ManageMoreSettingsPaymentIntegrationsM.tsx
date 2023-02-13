import React, { Fragment, useState } from "react";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import cx from "./Modals.module.scss";

import { FilterDropdown } from "../Dropdown/Dropdowns";

import {
    reportsordertags,
  } from "../../constants/dropdownconstants";

const Modals = (props: any) => {
  const options = [
    {
      value: "1",
      label: "Pick up",
    },
    {
      value: "2",
      label: "Delivery",
    },
  ];
  const deliveryzone = [
    {
      value: "1",
      label: "Shipping",
    },
    {
      value: "2",
      label: "Ordered",
    },
  ];
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setsubModalName(modalname);
    setsubShow(status);
  };
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName("");
  };

  return (
    <>

{props.modalName === "payment integrations" && (
    <Modal
      
      className={`${cx.ctsModal}`}
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>STCPay Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12} lg={12}>
            <Form.Group className={`${cx.formField}`}>
              <Form.Label className={`${cx.checkboxlabel}`}>
              Merchant ID *
              </Form.Label>
              <Form.Control type="number"/>
            </Form.Group>
          </Col>
          <Col md={12} lg={12}>
            <Form.Group className={`${cx.formField}`}>
              <Form.Label className={`${cx.checkboxlabel}`}>
              Payment Method *
              </Form.Label>
              <FilterDropdown options={reportsordertags}/>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className={`${cx.bottomRight}`}>
        <div>
          <Button
            className={`${cx.btnClose}`}
            onClick={() => {
              props.handleClose();
              setOrderType("");
            }}
          >
            Close
          </Button>
          <Button className={`${cx.btnSubmit}`}>Save</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )}

{props.modalName === "Network International settings" && (
    <Modal

      className={`${cx.ctsModal}`}
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Network International settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12} lg={12}>
            <Form.Group className={`${cx.formField}`}>
              <Form.Label className={`${cx.checkboxlabel}`}>
              User Name*
              </Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
          </Col>
          <Col md={12} lg={12}>
            <Form.Group className={`${cx.formField}`}>
              <Form.Label className={`${cx.checkboxlabel}`}>
              Api Key*
              </Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className={`${cx.bottomRight}`}>
        <div>
          <Button
            className={`${cx.btnClose}`}
            onClick={() => {
              props.handleClose();
              setOrderType("");
            }}
          >
            Close
          </Button>
          <Button className={`${cx.btnSubmit}`}>Save</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )}

  
{props.modalName === "Paymob settings" && (
    <Modal

      className={`${cx.ctsModal}`}
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Paymob settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12} lg={12}>
            <Form.Group className={`${cx.formField}`}>
              <Form.Label className={`${cx.checkboxlabel}`}>
              Api Key*
              </Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className={`${cx.bottomRight}`}>
        <div>
          <Button
            className={`${cx.btnClose}`}
            onClick={() => {
              props.handleClose();
              setOrderType("");
            }}
          >
            Close
          </Button>
          <Button className={`${cx.btnSubmit}`}>Save</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )}
    </>
  );
};

export default Modals;
