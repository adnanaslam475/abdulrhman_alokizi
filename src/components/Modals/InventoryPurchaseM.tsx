import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import cx from "./Modals.module.scss";
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import {
  customertagoptions,
  choosefilter,
  reportsordertags,
} from "../../constants/dropdownconstants";
import { NavLink } from "react-router-dom";
import SharedTooltip from "../Tooltip/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import {
  addEditInventoryPurchaseOrder,
  getSupplier,
  getSupplierBranches,
} from "../../redux_toolkit/reducer/inventoryPurchaseOrderApiReducer";
import Select from "react-select";
import { notify } from "../../constants/notifyconstants";

const Modals = (props: any) => {
  const dispatch = useDispatch();
  const getSupplierBranchesCountShowList = useSelector(
    (state: any) =>
      state.inventoryPurchaseOrderApiReducer.get_supplier_branchCount
  );
  const [inventoryItems, setinventoryItems] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);
  const [supplier, setSupplier] = useState<any[]>([]);

  const [addInventoryPurchaseOrder, setAddInventoryPurchaseOrder] = useState({
    suppliers_id: "",
    branch_id: "",
    notes: "",
    admin_id: JSON.parse(localStorage.getItem("___data")!)?.id,
    delivery_date: "",
  });
  function ValidatePOData() {
    if (addInventoryPurchaseOrder.suppliers_id == "") {
      notify("Supplier is required")
      return false
    }
    else if (addInventoryPurchaseOrder.branch_id == "") {
      notify("Destination is required")
      return false
    }
    else if (addInventoryPurchaseOrder.delivery_date == "") {
      notify("Delivery Date is required")
      return false
    } 
    else if (addInventoryPurchaseOrder.notes == "") {
      notify("Notes is required")
      return false
    }
   
    return true
  }
  function allSupplierData(data: any) {
    setAddInventoryPurchaseOrder((prev: any) => {
      return { ...prev, suppliers_id: data.value };
    });
  }
  function allSupplierBranchData(data: any) {
    setAddInventoryPurchaseOrder((prev: any) => {
      return { ...prev, branch_id: data.value };
    });
  }

  useEffect(() => {
    const supplier: any[] = [];
    getSupplier?.map((item: any, index: number) => {
      supplier.push({
        label: item.supplier_name,
        value: item.id,
      });
    });

    setSupplier(supplier);
    const branches: any[] = [];
    getSupplierBranches?.map((item: any, index: number) => {
      branches.push({
        label: item.english_name,
        value: item.id,
      });
    });
    setBranches(branches);
  }, [getSupplierBranchesCountShowList]);
  return (
    <>
      {/* ####################### INVENTORY PURCHASE ORDER MODALS ######################## */}

      {/* START New Purchase Orders */}
      {props.modalName === "new purchase orders" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Purchase Orders</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Supplier
                    <SharedTooltip infoText="Choose a supplier to request items from." />
                  </Form.Label>
                  {/* <SingleFilterDropdown
                    options={supplier}
                    postdata={allSupplierData}
                  /> */}
                  <Select
                    isSearchable={true}
                    options={supplier}
                    onChange={allSupplierData}
                    placeholder="-- Select --"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Destination
                    <SharedTooltip infoText="Where requested items will be received." />
                  </Form.Label>
                  {/* <SingleFilterDropdown
                    options={branches}
                    postdata={allSupplierBranchData}
                  /> */}
                  <Select
                    isSearchable={true}
                    options={branches}
                    onChange={allSupplierBranchData}
                    placeholder="-- Select --"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Delivery Date
                    <SharedTooltip infoText="Date" />
                  </Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e: any) => {
                      setAddInventoryPurchaseOrder((prev: any) => {
                        return { ...prev, delivery_date: e.target.value };
                      });
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Notes{" "}
                    <SharedTooltip infoText="You can make additional notes to this transaction." />
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    style={{ height: "150px" }}
                    onChange={(e: any) => {
                      setAddInventoryPurchaseOrder((prev: any) => {
                        return { ...prev, notes: e.target.value };
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
                  setAddInventoryPurchaseOrder({
                    suppliers_id: "",
                    branch_id: "",
                    notes: "",
                    admin_id: JSON.parse(localStorage.getItem("___data")!)?.id,
                    delivery_date: "",
                  });
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  if(ValidatePOData()){
                  dispatch(
                    addEditInventoryPurchaseOrder(addInventoryPurchaseOrder)
                  );
                  props.handleClose();
                  setAddInventoryPurchaseOrder({
                    suppliers_id: "",
                    branch_id: "",
                    notes: "",
                    admin_id: JSON.parse(localStorage.getItem("___data")!)?.id,
                    delivery_date: "",
                  });
                }}
              }
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END New Purchase Orders */}

      {/* START purchase Filter */}
      {props.modalName === "purchase order filter" && (
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
                  <Form.Label>Reference</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Business Date</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Status</Form.Label>
                  <FilterDropdown options={choosefilter} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ? (
                    <Form.Label className="d-block">
                      Destination
                      <NavLink
                        className={`${cx.rightLabel}`}
                        to="#"
                        onClick={() => {
                          setinventoryItems(false);
                        }}
                      >
                        Select Items?
                      </NavLink>
                    </Form.Label>
                  ) : (
                    <Form.Label className="d-block">
                      Branch
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
                  )}
                  <FilterDropdown options={customertagoptions} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Supplier</Form.Label>
                  <FilterDropdown options={customertagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Creator</Form.Label>
                  <FilterDropdown options={customertagoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Submitter</Form.Label>
                  <FilterDropdown options={reportsordertags} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Updated After </Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Delivery Date </Form.Label>
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
      {/* END purchase Filter */}

      {/* START Create Purchasing */}
      {props.modalName === "create purchasing" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Purchasing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Invoice Number</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Items</Form.Label>
                  <FilterDropdown options={customertagoptions} />
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
      {/* END Create Purchasing */}

      {/* START purchasing delete */}
      {props.modalName === "purchasing delete" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    This PO is not fully received, are you sure you want to
                    close it?
                  </Form.Label>
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
                style={{ backgroundColor: "#FA8072", borderColor: "#FA8072" }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END purchasing delete */}
    </>
  );
};

export default Modals;
