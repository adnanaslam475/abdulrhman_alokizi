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
import Select from "react-select";
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import {
  tagoptions,
  customertagoptions,
  customertimezone,
  itemoption,
  ingredientsoptions,
} from "../../constants/dropdownconstants";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import {
  transfer_add,
  transfer_get_source_destinationListItems,
} from "../../redux_toolkit/reducer/inventoryTransferApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../constants/notifyconstants";

const localdata = JSON.parse(localStorage.getItem("___data")!)?.id;

const Modals = (props: any) => {
  const transfer_get_source_destinationCount = useSelector(
    (state: any) =>
      state.inventoryTransferApiReducer.transfer_get_source_destinationCount
  );

  const dispatch = useDispatch();
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [sourceDestination, setSource_destination] = useState<any[]>([]);
  const [inventoryItems, setinventoryItems] = useState(false);
  let sizeadvanceoptions = advanceOptions ? 6 : 12;
  const [addInventoryTransfer, setAddInventoryTransfer] = useState({
    source_id: "",
    destination_id: "",
    admin_id: localdata,
  });
  function ValidateTransferOrderData(){
     if (addInventoryTransfer.source_id == "") {
      notify("Source is required")
      return false
    }
    else if (addInventoryTransfer.destination_id == "") {
      notify("Destination is required")
      return false
    }
    return true
  }
  function allSourceData(data: any) {
    setAddInventoryTransfer((prev: any) => {
      return { ...prev, source_id: data.value };
    });
  }
  function allDestinationData(data: any) {
    setAddInventoryTransfer((prev: any) => {
      return { ...prev, destination_id: data.value };
    });
  }

  useEffect(() => {
    const source_destination: any[] = [];
    transfer_get_source_destinationListItems?.map(
      (item: any, index: number) => {
        source_destination.push({
          label: item.name,
          value: item.id,
        });
      }
    );
    setSource_destination(source_destination);
  }, [transfer_get_source_destinationCount]);

  return (
    <>
      {/* ############################################################
 ######################## INVENTORY ITEMS MODALS ########################### */}

      {/* START new transfer */}
      {props.modalName === "new transfer" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Transfer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Source
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            Branch or Warehouse where items will be sent from.
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
                  <Select
                    isSearchable={true}
                    options={sourceDestination}
                    onChange={allSourceData}
                    placeholder="-- Select --"
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Destination
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            Branch or Warehouse where items will be sent to.
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
                  <Select
                    isSearchable={true}
                    options={sourceDestination}
                    onChange={allDestinationData}
                    placeholder="-- Select --"
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
                  setAddInventoryTransfer({
                    source_id: "",
                    destination_id: "",
                    admin_id: localdata,
                  });
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  if(ValidateTransferOrderData()){
                  dispatch(transfer_add(addInventoryTransfer));
                  props.handleClose();
                  setAddInventoryTransfer({
                    source_id: "",
                    destination_id: "",
                    admin_id: localdata,
                  });
                }
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END new transfer*/}

      {/* START transfer filter */}
      {props.modalName === "transfer filter" && (
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
                  <Form.Label>Status </Form.Label>
                  <Form.Select>
                    <option>Any</option>
                    <option>Draft</option>
                    <option>Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Type</Form.Label>
                  <Form.Select>
                    <option>Any</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ? (
                    <Form.Label className="d-block">
                      Branch
                      <NavLink
                        className={`${cx.rightLabel}`}
                        to="#"
                        onClick={() => {
                          setinventoryItems(false);
                        }}
                      >
                        Select branches?
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
                  <FilterDropdown options={ingredientsoptions} />
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
                  <FilterDropdown options={customertagoptions} />
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
      {/* END transfer filter */}

      {/* START edit item transfer */}
      {props.modalName === "edit item transfer" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    style={{ height: "150px" }}
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
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END edit item transfer */}

      {/* START edit import files */}
      {props.modalName === "import files" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Import Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Notes</Form.Label>
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
                Download Files
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
      {/* END import files */}

      {/* START add items */}
      {props.modalName === "add items" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
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
                  {inventoryItems ? (
                    <Form.Label className="d-block">
                      Items
                      <NavLink
                        className={`${cx.rightLabel}`}
                        to="#"
                        onClick={() => {
                          setinventoryItems(false);
                        }}
                      >
                        Select branches?
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
      {/* END add items */}

      {/* START quantities */}
      {props.modalName === "quantities" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Item Quantities</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Juice (1)</Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Pizza (1)</Form.Label>
                  <Form.Control type="number" />
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
      {/* END quantities */}

      {/* START reject */}
      {props.modalName === "reject" && (
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
                    Are you sure you want to receive items ?
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
      {/* END reject */}

      {props.modalName === "transferitemsfilter" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Item: Dough Scrapper</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Quantity (2) * </Form.Label>
                  <Form.Control type="number" placeholder="1" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Quantity (1) * </Form.Label>
                  <Form.Control type="number" placeholder="0" />
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

      {/*  Edit Transaction */}

      {props.modalName === "Edit transaction" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Transactions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Source </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Destination </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    style={{ height: "150px" }}
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
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Modals;
