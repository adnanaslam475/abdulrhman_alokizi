import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import cx from "./Modals.module.scss";
import { FilterDropdown } from "../Dropdown/Dropdowns";
import { ingredientsoptions } from "../../constants/dropdownconstants";
import { NavLink } from "react-router-dom";
import SharedTooltip from "../Tooltip/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import {
  addEditInventorySupplier,
  addInventorySupplierType,
  inventorySupplierId,
  inventorySupplierList,
  inventorySupplierView,
  inventoryTagsForSupplier,
  singleInventorySupplierDetails,
  supplieradd_tag,
} from "../../redux_toolkit/reducer/inventorySupplierApiReducer";

const Modals = (props: any) => {
  const singleInventorySupplierCount = useSelector(
    (state: any) =>
      state.inventorySupplierApiReducer.singleInventorySupplierCount
  );
  const tagforsupplierCountShowList = useSelector(
    (state: any) => state.inventorySupplierApiReducer.tagforsupplierCount
  );
  const dispatch = useDispatch();
  const [tags, setTags] = useState<any[]>([]);
  const [allDataSupplier, setAllDataSupplier] = useState("");

  const [addInventorySupplier, setAddInventorySupplier] = useState({
    id: "",
    supplier_name: "",
    code: "",
    contact_name: "",
    email: "",
    phone: "",
    additional_email: "",
  });

  function ValidateData() {
    debugger
    if (addInventorySupplier.supplier_name == "") {
      notify("Name is required")
      return false
    }
    else if (addInventorySupplier.code == "") {
      notify("Supplier Code is required")
      return false
    }
    else if (addInventorySupplier.contact_name == "") {
      notify("Contact Name is required")
      return false
    }
    else if (addInventorySupplier.phone == "") {
      notify("Phone is required")
      return false
    }
    else if (addInventorySupplier.email == "") {
      notify("Primary Email is required")
      return false
    }
    else if (addInventorySupplier.additional_email == "") {
      notify("Additional Emails is required")
      return false
    }
    return true
  }
  const notify = (message: String) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  useEffect(() => {
    setAddInventorySupplier({
      id: singleInventorySupplierDetails?.id
        ? singleInventorySupplierDetails?.id
        : "",
      supplier_name: singleInventorySupplierDetails?.supplier_name
        ? singleInventorySupplierDetails?.supplier_name
        : "",
      code: singleInventorySupplierDetails?.code
        ? singleInventorySupplierDetails?.code
        : "",
      contact_name: singleInventorySupplierDetails?.contact_name
        ? singleInventorySupplierDetails?.contact_name
        : "",
      email: singleInventorySupplierDetails?.email
        ? singleInventorySupplierDetails?.email
        : "",
      phone: singleInventorySupplierDetails?.phone
        ? singleInventorySupplierDetails?.phone
        : "",
      additional_email: singleInventorySupplierDetails?.additional_email
        ? singleInventorySupplierDetails?.additional_email
        : "",
    });
  }, [singleInventorySupplierCount]);

  function allTagModifierData(data: string) {
    console.log(data, "allTagModifierData");
    setAllDataSupplier(data);
  }

  useEffect(() => {
    const tags: any[] = [];
    inventoryTagsForSupplier?.map((item: any, index: number) => {
      tags.push({
        label: item.name,
        value: item.id,
      });
    });
    setTags(tags);
  }, [tagforsupplierCountShowList]);

  return (
    <>
      {/* ############################################################
 ######################## INVENTORY SUPPLIERS MODALS ########################### */}

      {/* START add suppliers */}
      {props.modalName === "add suppliers" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Suppliers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    <SharedTooltip infoText="Supplier Company Name." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, supplier_name: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Supplier Code
                    <SharedTooltip infoText="Unique code for this supplier. The code may only contain letters and numbers." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, code: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Contact Name
                    <SharedTooltip infoText="Supplier contact name." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, contact_name: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Phone
                    <SharedTooltip infoText="Supplier phone number." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, phone: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Primary Email
                    <SharedTooltip infoText="Enter an email to send Purchase Orders from dot." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, email: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Additional Emails
                    <SharedTooltip infoText="Emails will be added as a CC to the Purchase Orders email that will be sent by dot, separate multiple emails by a comma (,)" />
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: "50px" }}
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, additional_email: e.target.value };
                      });
                    }}
                  />
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
                  setAddInventorySupplier({
                    id: "",
                    supplier_name: "",
                    code: "",
                    contact_name: "",
                    email: "",
                    phone: "",
                    additional_email: "",
                  });
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  if (ValidateData()) {
                    dispatch(addEditInventorySupplier(addInventorySupplier));
                    props.handleClose();
                    setAddInventorySupplier({
                      id: "",
                      supplier_name: "",
                      code: "",
                      contact_name: "",
                      email: "",
                      phone: "",
                      additional_email: "",
                    });
                    dispatch(inventorySupplierView());
                  }
                }
                }
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END add suppliers */}

      {/* START edit suppliers */}
      {props.modalName === "edit suppliers" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Suppliers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Name
                    <SharedTooltip infoText="Supplier Company Name." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventorySupplier?.supplier_name}
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, supplier_name: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Supplier Code
                    <SharedTooltip infoText="Unique code for this supplier. The code may only contain letters and numbers." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventorySupplier?.code}
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, code: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Contact Name{" "}
                    <SharedTooltip infoText="Supplier contact name." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventorySupplier?.contact_name}
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, contact_name: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Phone <SharedTooltip infoText=" Supplier phone number." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventorySupplier?.phone}
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, phone: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Primary Email{" "}
                    <SharedTooltip infoText="Enter an email to send Purchase Orders from dot." />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={addInventorySupplier?.email}
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, email: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Additional Emails{" "}
                    <SharedTooltip infoText="Emails will be added as a CC to the Purchase Orders email that will be sent by dot, separate multiple emails by a comma (,)" />
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    style={{ height: "50px" }}
                    defaultValue={addInventorySupplier?.additional_email}
                    onChange={(e: any) => {
                      setAddInventorySupplier((prev: any) => {
                        return { ...prev, additional_email: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>
                Delete
              </NavLink>
            </div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
                  setAddInventorySupplier({
                    id: "",
                    supplier_name: "",
                    code: "",
                    contact_name: "",
                    email: "",
                    phone: "",
                    additional_email: "",
                  });
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  if (ValidateData()) {
                    dispatch(addEditInventorySupplier(addInventorySupplier));
                    props.handleClose();
                    setTimeout(() => {
                      dispatch(inventorySupplierView(addInventorySupplier?.id));
                      setAddInventorySupplier({
                        id: "",
                        supplier_name: "",
                        code: "",
                        contact_name: "",
                        email: "",
                        phone: "",
                        additional_email: "",
                      });
                      dispatch(inventorySupplierList());
                    }, 500);
                  }
                }
                }
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END edit suppliers */}

      {/* START suppliers Filter */}
      {props.modalName === "suppliers filter" && (
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
                  <Form.Label>Code</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Deleted</Form.Label>
                  <Form.Select>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tag</Form.Label>
                  <FilterDropdown options={ingredientsoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Updated After</Form.Label>
                  <Form.Control type="date" />
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
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END suppliers Filter */}

      {/* START Inventory Items */}
      {props.modalName === "inventory items" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Items</Form.Label>
                  <FilterDropdown options={ingredientsoptions} />
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
                }}
              >
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Inventory Items */}

      {/* START add tags */}
      {props.modalName === "add tags" && (
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
                    Tags <SharedTooltip infoText="To select the needed tags." />
                  </Form.Label>
                  <FilterDropdown
                    options={tags}
                    postdata={allTagModifierData}
                  />
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
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  addInventorySupplierType === "tags" &&
                    dispatch(
                      supplieradd_tag({
                        supplier_id: inventorySupplierId,
                        tag_id: allDataSupplier,
                      })
                    );
                  props.handleClose();
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END add tags */}

      {props.modalName === "updateInventoryitem" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Item: mistake ice cream (sk-00552)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Order unit <SharedTooltip infoText="Order unit" />
                  </Form.Label>
                  <Form.Control type="text" placeholder="unit" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Order To Storage{" "}
                    <SharedTooltip infoText="Order To Storage" />
                  </Form.Label>
                  <Form.Control type="number" placeholder="1" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Order Quantity (Unit){" "}
                    <SharedTooltip infoText="Order Quantity (Unit) " />
                  </Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Purchase Cost Per Unit (SAR) *{" "}
                    <SharedTooltip infoText=" Purchase Cost Per Unit (SAR) *" />
                  </Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Item Supplier Code{" "}
                    <SharedTooltip infoText="Item Supplier Code" />
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>
                Delete
              </NavLink>
            </div>
            <div>
              <Button
                className={`${cx.btnClose}`}
                onClick={() => {
                  props.handleClose();
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
