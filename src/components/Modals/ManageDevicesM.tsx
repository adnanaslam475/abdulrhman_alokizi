import React, { Fragment, useState, useEffect } from "react";
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
import {languagetag,
  tagoptions,
  customertagoptions,
  customertimezone,
  itemoption,
  ingredientsoptions,
  choosefilter,
  filtertagoptions,
  filterordertags,
  deviceType,
} from "../../constants/dropdownconstants";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import food from "../../images/edit-images.png";
import { branchData, branchGet, createDeviceData, userDeviceFilterValue, userDeviceList } from "../../redux_toolkit/reducer/manageDeviceApiReducer";
import { useDispatch, useSelector } from "react-redux";

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
  const createDeviceCount = useSelector((state:any)=>state.manageDeviceApiReducer.createDeviceCount)
  const dispatch = useDispatch();
  const [ordertype, setOrderType] = useState("");
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState("");
  const [createDevice, setCreateDevice] = useState({
    type:"",
    name:"",
    referance:"",
    branch:"",
  })
  const [type, setType] = useState("")
  const [reference, setReference] = useState<any>();
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setsubModalName(modalname);
    setsubShow(status);
  };
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName("");
  };

  function typeData(event: any) {
    console.log(event,"type")
    setReference("");
    setType(event.label)
    setCreateDevice((prev: any) => {
      return { ...prev, type: event.label };
    });
  }

  function branch(event: any) {
    setCreateDevice((prev: any) => {
      return { ...prev, branch: event.label };
    });
  }

  useEffect(()=>{
    props.handleClose();
    setReference("");
    userDeviceFilterValue.type = "all";
    dispatch(userDeviceList(userDeviceFilterValue));
  },[createDeviceCount])

  useEffect(()=>{
    dispatch(branchGet({type:"branch"}))
  },[])
  
  return (
    <>
      {/* ############################################################
 ######################## Manage  MODALS ########################### */}
      {/* START manage devices Filter */}
      {props.modalName === "devices filter" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Filter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label> Reference</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Code </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Type</Form.Label>
                  <FilterDropdown options={tagoptions} />
                
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Branch </Form.Label>
                  <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(true) }}>Select by tags?</NavLink>
                   
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tag</Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>In Use </Form.Label>
                  <FilterDropdown options={itemoption} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Online</Form.Label>
                  <FilterDropdown options={customertimezone} />
                </Form.Group>
              </Col>
              
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption}`}>
                Clear
              </NavLink>
            </div>
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
              <Button className={`${cx.btnSubmit}`}> Apply </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/* START Edit user*/}
      {props.modalName === "edit devices" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Devices</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name*
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
                  <Form.Control type="text"placeholder="GM" />
                </Form.Group>
              </Col>


              <Col md={12} lg={12}>
                <Row>
                  <Col md={7} lg={7}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Reference
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                  reference
                              </Tooltip>
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

                  <Col md={5} lg={5}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cx.labelHide}`}>.</Form.Label>
                      <button type="button" className="form-control">
                        Generate 
                      </button>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Branch
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
                  <FilterDropdown options={languagetag} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Menu Group 
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
                  <FilterDropdown options={languagetag} />
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
               
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Recive Online Orders 
                  </Form.Label>
                 
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption} `}>
                clear
              </NavLink>
            </div>
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

{/* Edit Device Settings  */}

{props.modalName === "edit devices settings" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Devices</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Call Number Start 
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
                    Call Number Reset
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
                  <Form.Label>Default Order Type for New Orders
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
                  <FilterDropdown options={choosefilter} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Disabled Order Types
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
                  <FilterDropdown options={choosefilter} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Kitchen Print Language
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
                  <FilterDropdown options={languagetag} />
                </Form.Group>
              </Col>
              
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Auto Apply Order Tags
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
                  <FilterDropdown options={filterordertags} />
                </Form.Group>
              </Col>


              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Send End of Day Report To Email
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
                  Send Shift Report To Email
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
                  Send Till Report To Email
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
                  <Form.Label>Assigned Tables
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
                  <FilterDropdown options={languagetag} />
                </Form.Group>
              </Col>
             
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Default price tag
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
                  <FilterDropdown options={languagetag} />
                </Form.Group>
              </Col>
             
              
              <Col md={12} lg={12}>
               
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Auto Pair With Other Devices
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
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Enable Barcode Scanners
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
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Auto Accept and Send Online Orders to Kitchen
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
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Print Online Order Info When Received
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
                 
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Auto Send Ahead Order to Kitchen
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
                 
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Disable Automatic Receipt Printing
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
                 
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Use Call Number from Master Cashier
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
                 
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Print Drawer Operations
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
                 
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Force Select Price Tag
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
                 
                  <Form.Label className={`${cx.checkboxlabel}`}>
                   < input type="checkbox" className={`${cx.checkboxinput}`}/> 
                   Force Select Seat
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
                 
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption} `}>
                clear
              </NavLink>
            </div>
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





     

      {/* START create Device */}
      {props.modalName === "create Device" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Device  </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Type
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
                  <Select
                    isSearchable={true}
                    options={deviceType}
                    onChange={(e:any) => {
                      typeData(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
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
                  <Form.Control type="text"  onChange={(e: any) => {
                    setCreateDevice((prev: any) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Row>
                  <Col md={7} lg={7}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Reference 
                        {["top"].map((placement) => (
                          <OverlayTrigger
                            key={placement}
                            overlay={
                              <Tooltip id={`tooltip-${placement}`}>
                                Stock keeping unit, a unique code for your item.
                              </Tooltip>
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
                      <Form.Control type="text"  defaultValue={reference} disabled/>
                    </Form.Group>
                  </Col>

                  <Col md={5} lg={5}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cx.labelHide}`}>.</Form.Label>
                      <button type="button" className="form-control" onClick={()=>{
                        const firstWord = type.slice(0,1)
                        const number = Math.floor(10 + Math.random()*90)
                        const totalCode = firstWord.concat(number.toString())
                        type.length === 0 ? alert("please fill type first") : setReference(totalCode)
                        setCreateDevice((prev: any) => {
                          return { ...prev, referance: totalCode };
                        });
                      }}>
                        Generate 
                      </button>
                    </Form.Group>
                  </Col>

                </Row>
              </Col>
              



              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Branch
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

                  <Select
                    isSearchable={true}
                    options={branchData}
                    onChange={(e:any) => {
                      branch(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                
                </Form.Group>
              </Col>
              
            </Row>
          </Modal.Body>
          <Modal.Footer>
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
              <Button className={`${cx.btnSubmit}`} onClick={()=>{
                dispatch(createDeviceData(createDevice))
              }}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}





      {/*  add tags */}


      {props.modalName === "device detail add tags" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Tags
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
                  <FilterDropdown options={filterordertags} />
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
    </>
  );
};

export default Modals;
