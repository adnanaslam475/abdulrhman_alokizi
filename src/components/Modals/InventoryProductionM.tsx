import React, { useEffect, useState } from "react";
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
  customertagoptions,
  customertimezone,
  ingredientsoptions,
} from "../../constants/dropdownconstants";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  production_addproduction,
  production_get_branchListItems,
} from "../../redux_toolkit/reducer/inventoryProductionApiReducer";

const localdata = JSON.parse(localStorage.getItem("___data")!)?.id;

const Modals = (props: any) => {
  const production_get_branchCount = useSelector(
    (state: any) =>
      state.inventoryProductionApiReducer.production_get_branchCount
  );

  const dispatch = useDispatch();
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  const [productionBranches, setProductionBranches] = useState<any[]>([]);
  const [addInventoryProduction, setAddInventoryProduction] = useState({
    branch_id: "",
    admin_id: localdata,
  });

  function allSourceData(data: any) {
    setAddInventoryProduction((prev: any) => {
      return { ...prev, branch_id: data.value };
    });
  }

  useEffect(() => {
    const branches: any[] = [];
    production_get_branchListItems?.map((item: any, index: number) => {
      branches.push({
        label: item.english_name,
        value: item.id,
      });
    });
    setProductionBranches(branches);
  }, [production_get_branchCount]);

  return (
    <>
      {/* ############################################################
 ######################## INVENTORY ITEMS MODALS ########################### */}

      {/* START new production */}
      {props.modalName === "new production" && (
        <Modal
          scrollable
          className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ""}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Production</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Branch
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            Where items will be produced.
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
                    options={productionBranches}
                    onChange={allSourceData}
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
                  setAddInventoryProduction({
                    branch_id: "",
                    admin_id: localdata,
                  });
                }}
              >
                Close
              </Button>
              <Button
                className={`${cx.btnSubmit}`}
                onClick={() => {
                  dispatch(production_addproduction(addInventoryProduction));
                  props.handleClose();
                  setAddInventoryProduction({
                    branch_id: "",
                    admin_id: localdata,
                  });
                }}
              >
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END new production*/}

      {/* START filter */}
      {props.modalName === "filter" && (
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
                  <Form.Label>Type</Form.Label>
                  <Form.Select>
                    <option>Any</option>
                  </Form.Select>
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
      {/* END filter */}

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
    </>
  );
};

export default Modals;
