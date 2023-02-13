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
import Select from "react-select";
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import {
  costanalysisitems,
  costcategories,
  costanalysisfilter,
  reportsfilterordertags,
  reportsordertags,
} from "../../constants/dropdownconstants";
import IoIosInformationCircleOutline, {
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";

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
      {/* ############################################################
 ######################## ORDER MODALS ########################### */}

      {props.modalName === "order filter" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className="d-block">
                    Branches
                    <NavLink
                      className={`${cx.rightLabel}`}
                      to="#"
                      onClick={() => {
                        setinventoryItems(true);
                      }}
                    >
                      Select by tags?
                    </NavLink>
                  </Form.Label>
                  <FilterDropdown options={reportsordertags} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className="d-block">Reason</Form.Label>
                  <FilterDropdown options={reportsordertags} />
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className="d-block">Type </Form.Label>
                  <FilterDropdown options={reportsordertags} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className="d-block">Users </Form.Label>
                  <FilterDropdown options={reportsordertags} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
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
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Order Filter */}
    </>
  );
};

export default Modals;
