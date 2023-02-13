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
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import food from "../../images/edit-images.png";

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
      {/* START create role */}
      {props.modalName ==="Create role" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Role </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}></Tooltip>
                        }
                      >
                        <span
                          className={`${cx.tooltips} ms-2`}
                          style={{ top: "1px" }}
                        >
                          <AiOutlineInfoCircle />
                        </span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}></Tooltip>
                        }
                      >
                        <span
                          className={`${cx.tooltips} ms-2`}
                          style={{ top: "1px" }}
                        >
                          <AiOutlineInfoCircle />
                        </span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
             
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                        <h5>Authorities</h5>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Toggle All</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Order Authorities </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Read Orders</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Order </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Order Tags  </Form.Label>
                </Form.Group>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Customer Authorities </b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Read Customers</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Read Customer Insights</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Customer </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Customer House Account  </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Customer Loyalty  </Form.Label>

                     
                </Form.Group>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Inventory Authorities </b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Read Inventory Items</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Inventory Items</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Read Suppliers</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Suppliers </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Purchase Order  </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Purchase Order</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Purchase Order</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Approve Purchase Order</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Approve Purchase Order</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Transfer Orders</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Transfer Orders</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Transfers</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Send & Receive Transfers</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Purchasing
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Purchasing
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Production
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Quantity Adjustment
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Quantity Adjustment
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Cost Adjustment
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Cost Adjustment
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Inventory Count
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Inventory Count
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Read Order Transaction
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Inventory Spot Check
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Inventory Spot Check
                     </Form.Label>

                     
                </Form.Group>

                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Menu Authorities </b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Read Menu</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Menu</Form.Label>
                </Form.Group>

                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Other Authorities </b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Manage Ingredients</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Costs</Form.Label>
                </Form.Group>

                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Admin Authorities</b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Manage Branches</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Coupons
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Devices
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Discounts
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Gift Cards 
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Promotions
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Settings
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Delivery Zones 
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Timed Events 
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Users
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Apps
                  </Form.Label>
                </Form.Group>


                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b>Report Authorities </b> </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>View Cost Analysis Report</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Inventory Control Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Inventory Levels Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Inventory Transactions Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Other Reports
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Sales Reports
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Cost Adjustment History Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View DOT Pay Reports
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Menu Cost Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Inventory Items Cost Report
                  </Form.Label>
                </Form.Group>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b>Dashboard Authorities </b> </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Access General Dashboard</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Branches Dashboard
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Inventory Dashboard
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Call Center Dashboard
                  </Form.Label>
                  
                </Form.Group>
                
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Cashier App Authorities </b> </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Access Cash Register</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Device Managements
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Reports
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Act as Drivers
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Act as Waiters
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Add Open Charge
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Add Open Price Product
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Apply Ahead Orders
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Apply Predefined Discounts
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Apply Open Discount
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Edit Product Sent To Kitchen
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Join Orders
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Drawer Operations
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Perform End Of Day
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Print Receipt
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Return Order 
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Split Order 
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Done Order 
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Void Order and Product 
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Perform Payment
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Edit Order Opens by Other Users
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Change Table Owners
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Register Users Fingerprint
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Send To Kitchen Before Payment
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Kitchen Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Edit Table Layout 
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Close Till/Shift With Active Orders
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Product Availability
                  </Form.Label>
                  
                </Form.Group>
                

              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer  className= {`${cx.bottomRight}`}>
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



      {/* Edit Role  */}
      {props.modalName ==="Edit role" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Role </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}></Tooltip>
                        }
                      >
                        <span
                          className={`${cx.tooltips} ms-2`}
                          style={{ top: "1px" }}
                        >
                          <AiOutlineInfoCircle />
                        </span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name Localized
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}></Tooltip>
                        }
                      >
                        <span
                          className={`${cx.tooltips} ms-2`}
                          style={{ top: "1px" }}
                        >
                          <AiOutlineInfoCircle />
                        </span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
             
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                        <h5>Authorities</h5>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Toggle All</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Order Authorities </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Read Orders</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Order </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Order Tags  </Form.Label>
                </Form.Group>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Customer Authorities </b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Read Customers</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Read Customer Insights</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Customer </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Customer House Account  </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Customer Loyalty  </Form.Label>

                     
                </Form.Group>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Inventory Authorities </b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Read Inventory Items</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Inventory Items</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Read Suppliers</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Suppliers </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Purchase Order  </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Purchase Order</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Purchase Order</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Approve Purchase Order</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Approve Purchase Order</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Transfer Orders</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Transfer Orders</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Transfers</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Send & Receive Transfers</Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Purchasing
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Purchasing
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Production
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Quantity Adjustment
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Quantity Adjustment
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Cost Adjustment
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Cost Adjustment
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Inventory Count
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Inventory Count
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Read Order Transaction
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Create Inventory Spot Check
                     </Form.Label>
                     <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Submit Inventory Spot Check
                     </Form.Label>

                     
                </Form.Group>

                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Menu Authorities </b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Read Menu</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Menu</Form.Label>
                </Form.Group>

                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Other Authorities </b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Manage Ingredients</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Costs</Form.Label>
                </Form.Group>

                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Admin Authorities</b></Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Manage Branches</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Coupons
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Devices
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Discounts
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Gift Cards 
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Promotions
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Settings
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Delivery Zones 
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Timed Events 
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Users
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Apps
                  </Form.Label>
                </Form.Group>


                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b>Report Authorities </b> </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>View Cost Analysis Report</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Inventory Control Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Inventory Levels Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Inventory Transactions Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Other Reports
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Sales Reports
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Cost Adjustment History Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View DOT Pay Reports
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Menu Cost Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Inventory Items Cost Report
                  </Form.Label>
                </Form.Group>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b>Dashboard Authorities </b> </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Access General Dashboard</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Branches Dashboard
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Inventory Dashboard
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Call Center Dashboard
                  </Form.Label>
                  
                </Form.Group>
                
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> <b> Cashier App Authorities </b> </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/>Access Cash Register</Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Device Managements
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Reports
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Act as Drivers
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Act as Waiters
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Add Open Charge
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Add Open Price Product
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Apply Ahead Orders
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Apply Predefined Discounts
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Apply Open Discount
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Edit Product Sent To Kitchen
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Join Orders
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Access Drawer Operations
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Perform End Of Day
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Print Receipt
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Return Order 
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Split Order 
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> View Done Order 
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Void Order and Product 
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Perform Payment
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Edit Order Opens by Other Users
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Change Table Owners
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Register Users Fingerprint
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Send To Kitchen Before Payment
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Kitchen Report
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Edit Table Layout 
                  </Form.Label>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Close Till/Shift With Active Orders
                  </Form.Label>
                  
                  <Form.Label className={`${cx.checkboxlabel}`}>
                     < input type="checkbox" className={`${cx.checkboxinput}`}/> Manage Product Availability
                  </Form.Label>
                  
                </Form.Group>
                

              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer  className= {`${cx.bottomRight}`}>
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
    </>
  );
};

export default Modals;
