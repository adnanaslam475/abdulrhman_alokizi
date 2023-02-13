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
import { SingleFilterDropdown } from "../Dropdown/Dropdowns";
import { ingredientsoptions } from "../../constants/dropdownconstants";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  get_transferorder_destinationList,
  get_transferorder_warehouseList,
  transferorder_add,
} from "../../redux_toolkit/reducer/inventoryTransferOrderApiReducer";
import { notify } from "../../constants/notifyconstants";

const localdata = JSON.parse(localStorage.getItem("___data")!)?.id;

const Modals = (props: any) => {
  const get_transferorder_warehouseCount = useSelector(
    (state: any) =>
      state.inventoryTransferOrderApiReducer.get_transferorder_warehouseCount
  );
  const get_transferorder_destinationCount = useSelector(
    (state: any) =>
      state.inventoryTransferOrderApiReducer.get_transferorder_destinationCount
  );

  const dispatch = useDispatch();
  const [warehouse, setWarehouse] = useState<any[]>([]);
  const [destination, setDestination] = useState<any[]>([]);
  const [addInventoryTransferOrder, setAddInventoryTransferOrder] = useState({
    warehouse_id: "",
    destination_id: "",
    admin_id: localdata,
  });
  function ValidateTransferOrderData(){
    if (addInventoryTransferOrder.warehouse_id == "") {
     notify("Warehouse is required")
     return false
   }
   else if (addInventoryTransferOrder.destination_id == "") {
     notify("Destination is required")
     return false
   }
   return true
 }
  function allWarehouseData(data: any) {
    console.log(data);
    setAddInventoryTransferOrder((prev: any) => {
      return { ...prev, warehouse_id: data.value };
    });
  }
  function allDestinationData(data: any) {
    console.log(data);
    setAddInventoryTransferOrder((prev: any) => {
      return { ...prev, destination_id: data.value };
    });
  }

  useEffect(() => {
    const warehouse: any[] = [];
    get_transferorder_warehouseList?.map((item: any, index: number) => {
      warehouse.push({
        label: item.name,
        value: item.id,
      });
    });
    setWarehouse(warehouse);
  }, [get_transferorder_warehouseCount]);

  useEffect(() => {
    const destination: any[] = [];
    get_transferorder_destinationList?.map((item: any, index: number) => {
      destination.push({
        label: item.name,
        value: item.id,
      });
    });
    setDestination(destination);
  }, [get_transferorder_destinationCount]);

  return (
    <>
      {/* ############################################################
 ######################## INVENTORY TRANSFER ORDER MODALS ########################### */}

      {/* START New Transfer Order */}
      {props.modalName === "new transfer orders" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Transfer Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                    Warehouse
                    {["top"].map((placement) => (
                      <OverlayTrigger
                        key={placement}
                        overlay={
                          <Tooltip id={`tooltip-${placement}`}>
                            Select the warehouse where items will be sent from.
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
                  {/* <SingleFilterDropdown options={ingredientsoptions} /> */}
                  <Select
                    isSearchable={true}
                    options={warehouse}
                    onChange={allWarehouseData}
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
                    options={destination}
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
                  setAddInventoryTransferOrder({
                    warehouse_id: "",
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

                  dispatch(transferorder_add(addInventoryTransferOrder));
                  props.handleClose();
                  setAddInventoryTransferOrder({
                    warehouse_id: "",
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
      {/* END New Transfer Order */}

      {/* START Transfer Order Filter */}
      {props.modalName === "transfer orders filter" && (
        <Modal
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
                  <Form.Select>
                    <option value="1">Any</option>
                    <option value="2">Draft</option>
                    <option value="3">Pending</option>
                    <option value="3">Closed</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Warehouse</Form.Label>
                  <SingleFilterDropdown options={ingredientsoptions} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Supplier</Form.Label>
                  <SingleFilterDropdown options={ingredientsoptions} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Destination</Form.Label>
                  <SingleFilterDropdown options={ingredientsoptions} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Creator</Form.Label>
                  <SingleFilterDropdown options={ingredientsoptions} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Submitter</Form.Label>
                  <SingleFilterDropdown options={ingredientsoptions} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Updated After</Form.Label>
                  <SingleFilterDropdown options={ingredientsoptions} />
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
      {/* END Transfer Order Filter */}
    </>
  );
};

export default Modals;
