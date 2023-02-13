import React, { Fragment, useEffect, useState } from "react";
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
// import Select from "react-select";
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import {
  languagetag,
  tagoptions,
  // customertagoptions,
  // customertimezone,
  // itemoption,
  // ingredientsoptions,
} from "../../constants/dropdownconstants";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleError,
  handleLoading,
  userCreate,
  userFilterValue,
  userList,
} from "../../redux_toolkit/reducer/manageUserApiReducer";
import { CircularProgress } from "@mui/material";

const initialFilter = {
  name: "",
  employee_num: "",
  phone: "",
  email: "",
  branch: "",
  tag: "",
  role: "",
  email_veirified: "",
  has_role: "",
  has_console_access: "",
  has_app_access: "",
  deleted: "",
  update_after: "",
};

const addUserObj = {
  name: "",
  language: "",
  email: "",
  password: "",
  login_pin: "",
  displaylocalizename: false,
  adminid: "",
};

const editUserObj = {
  name: "",
  language: "",
  email: "",
  password: "",
  login_pin: "",
  displaylocalizename: false,
  adminid: "",
};

const Modals = (props: any) => {
  const userCreateCount = useSelector(
    (state: any) => state.manageUserApiReducer.userCreateCount
  );
  const [number, setNumber] = useState<any>();
  const ststtss = useSelector((state: any) => state.manageUserApiReducer);
  const dispatch = useDispatch();
  const [ordertype, setOrderType] = useState("");
  const [inventoryItems, setinventoryItems] = useState(false);
  const [addUser, setAddUser] = useState(addUserObj);

  const [filters, setFilters] = useState(initialFilter);

  const handlechange = (e: any) => {
    const { name, id, value, checked } = e.target;
    if (props.modalName === "Add user") {
      setAddUser((p) => ({
        ...p,
        [name || id]: name == "displaylocalizename" ? checked : value,
      }));

      ststtss.error && dispatch(handleError());
    } else if (props.modalName === "manage filter") {
      console.log("all-----------", name, id, value, checked);
      setFilters((p) => ({
        ...p,
        [name || id]: value,
      }));
    } else if (props.modalName === "manaxxxge filter") {
      setFilters((p) => ({
        ...p,
        [name || id]: value,
      }));
    }
  };

  // const orderTypehandler = (event: any) => {
  //   setOrderType(event.label);
  // };

  // let sizeadvanceoptions = advanceOptions ? 6 : 12;

  // const [subshow, setsubShow] = useState(false);
  // const [submodalName, setsubModalName] = useState("");

  // const subdeliveryAddress = (modalname: string, status: boolean) => {
  //   setsubModalName(modalname);
  //   setsubShow(status);
  // };

  // const subhandleClose = () => {
  //   setsubShow(false);
  //   setsubModalName("");
  // };

  useEffect(() => {
    let data: any = JSON.parse(localStorage.getItem("___data")!);
    setAddUser((prev: any) => {
      return { ...prev, adminid: data?.id };
    });
  }, []);

  useEffect(() => {
    if (ststtss.status) {
      props.handleClose();
      setAddUser(addUserObj);
      userFilterValue.type = "all";
      dispatch(userList(userFilterValue));
    }
  }, [userCreateCount]);

  useEffect(() => {
    setAddUser((prev: any) => {
      return { ...prev, login_pin: number };
    });
  }, [number]);

  console.log("edituser");

  return (
    <>
      {/* ############################################################
 ######################## Manage  MODALS ########################### */}
      {/* START manage Filter */}
      {props.modalName === "manage filter" && (
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
                  <Form.Control
                    value={filters.name}
                    onChange={handlechange}
                    name="name"
                    id="name"
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label> Employee Number</Form.Label>
                  <Form.Control
                    value={filters.employee_num}
                    onChange={handlechange}
                    name="name"
                    id="name"
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    value={filters.name}
                    onChange={handlechange}
                    name="email"
                    id="email"
                    type="email"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={filters.phone}
                    onChange={handlechange}
                    name="phone"
                    id="phone"
                    type="number"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Branch </Form.Label>
                  <NavLink
                    className={`${cx.rightLabel}`}
                    to="#"
                    onClick={() => {
                      setinventoryItems(true);
                    }}
                  >
                    Select by tags?
                  </NavLink>
                  <FilterDropdown
                    // postdata={postdata}
                    options={tagoptions}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Role</Form.Label>
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
                  <Form.Label>Email Verifed</Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Has Roles</Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Has Console Access</Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Has App Access </Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Deleted</Form.Label>
                  <FilterDropdown options={tagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Update after</Form.Label>
                  <Form.Control type="text" />
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

      {/* START Add user*/}
      {props.modalName === "Add user" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add User </Modal.Title>
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
                  <Form.Control
                    type="text"
                    value={addUser.name}
                    name="name"
                    id="name"
                    onChange={handlechange}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Language
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
                  <Form.Control
                    type="text"
                    value={addUser.language}
                    onChange={handlechange}
                    name="language"
                    id="language"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Email
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
                  <Form.Control
                    type="text"
                    value={addUser.email}
                    onChange={handlechange}
                    name="email"
                    id="email"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Password
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
                  <Form.Control
                    type="text"
                    value={addUser.password}
                    onChange={handlechange}
                    name="password"
                    id="password"
                  />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Row>
                  <Col md={7} lg={7}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Login Pin
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
                      <Form.Control
                        type="text"
                        defaultValue={number}
                        disabled
                      />
                    </Form.Group>
                  </Col>

                  <Col md={5} lg={5}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label className={`${cx.labelHide}`}>.</Form.Label>
                      <button
                        type="button"
                        className="form-control"
                        onClick={() => {
                          const number = Math.floor(
                            10000 + Math.random() * 90000
                          );
                          setNumber(number);
                        }}
                      >
                        Generate
                      </button>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    {" "}
                    <input
                      type="checkbox"
                      name="displaylocalizename"
                      id="displaylocalizename"
                      className={`${cx.checkboxinput}`}
                      onChange={handlechange}
                      checked={addUser.displaylocalizename}
                      defaultChecked={addUser.displaylocalizename}
                    />
                    Display Localize Name
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>
            {!ststtss.status && (
              <p style={{ color: "red" }} className="">
                {ststtss.error}
              </p>
            )}
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
              <Button
                type="button"
                style={{}}
                disabled={ststtss.loading}
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  dispatch(handleLoading(true));
                  dispatch(userCreate(addUser));
                }}
              >
                {ststtss.loading ? (
                  <CircularProgress style={{ color: "white" }} size={20} />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/* START Edit user*/}
      {props.modalName === "edit user" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
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
                  <Form.Control type="text" placeholder="GM" />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Language
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
                  <Form.Label>
                    Employee Number
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
                    Phone
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
                    Email
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
                  <Form.Control
                    type="email"
                    placeholder="ahmed-nemri@hey-f.com"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Row>
                  <Col md={7} lg={7}>
                    <Form.Group className={`${cx.formField}`}>
                      <Form.Label>
                        Login Pin
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
                <Form.Label className={`${cx.checkboxlabel}`}>
                  <input type="checkbox" className={`${cx.checkboxinput}`} />
                  Display Localize Name
                </Form.Label>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>
                Delete User
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

      {/* notification */}

      {props.modalName === "notificaion" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Notifications</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    Toggle ALL
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User submits a cost adjustment transaction.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User submits a purchasing transaction.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User submits an inventory count transaction.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User submits a quantity adjustment transaction.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User returns items to a supplier.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User receives inventory items from a transfer transaction.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User submits a production transaction.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User sends inventory items from a warehouse or branch.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    Inventory item is not available anymore.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User submits a purchase order for review and needs approval.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    Inventory item reaches its maximum quantity level.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    Inventory item reaches its minimum quantity level.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    User submits a transfer order for review.
                  </Form.Label>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label className={`${cx.checkboxlabel}`}>
                    <input type="checkbox" className={`${cx.checkboxinput}`} />
                    There is a transfer transaction waiting to be received.
                  </Form.Label>
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
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/* change password  */}

      {props.modalName === "change Password" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Password </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Change New Password</Form.Label>
                  <Form.Control type="text" />
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

      {/* START Import */}
      {props.modalName === "import" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Import users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <p>
                    <input type="file" />
                  </p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption}`}>
                Download Template
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
              <Button className={`${cx.btnSubmit}`}>Submit</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Import */}

      {/* END Sort Category Popup */}

      {/*  add tags */}
      {props.modalName === "manage add tags" && (
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
                  <FilterDropdown options={tagoptions} />
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

      {/* START Add user */}
    </>
  );
};

export default Modals;
