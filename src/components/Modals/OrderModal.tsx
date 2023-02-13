import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import cx from "./Modals.module.scss";
import Select from "react-select";
import { FilterDropdown } from "../Dropdown/Dropdowns";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  filterOptions,
  moduleModule,
} from "../../redux_toolkit/reducer/orderModalsReducer";
import GlobalContext from "../../store/global-context";
import {
  type,
  branchDate,
  branchEndDate,
  branchIds,
  branchHide,
  refnumberFilter,
  refafterFilter,
  newnumberFilter,
  businessdateFilter,
} from "../../redux_toolkit/reducer/orderModalsReducer";
import { tagIngeModifier } from "../../redux_toolkit/reducer/menuProductsApiReducer";

interface OptionsFilter {
  label: string;
  value: string | number;
  key?: string;
  disabled?: boolean;
}

const Modals = (props: any) => {
  const globalGtx = useContext(GlobalContext);
  const counting = useSelector(
    (state: any) => state.orderModalsReducer.branchCount
  );
  const tostify = useSelector(
    (state: any) => state.orderModalsReducer.toastify
  );
  const filterStatus = useSelector(
    (state: any) => state.orderModalsReducer.filterStatus
  );
  const dispatch = useDispatch();
  //for tag listing //
  let { show, handleClose, modalName, data, postdata ,defaultTags} = props;
  let option: OptionsFilter[] = [];
  data?.forEach((element: any) => {
    option.push({ value: element?.id, label: element?.name });
  });
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
  const [advanceOptions, setadvanceOptions] = useState(false);
  const [inventoryItems, setinventoryItems] = useState(false);
  let sizeadvanceoptions = advanceOptions ? 6 : 12;

  const [ordertype, setOrderType] = useState("");
  const orderTypehandler = (event: any) => {
    setOrderType(event.label);
  };

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
  //for add tag //
  function newpostdata(tags: string) {
    postdata(tags);
  }
  //----Filter Api------//
  const [refnumber, setRefnumber] = useState("");
  const [refafter, setRefafter] = useState("");
  const [newnumber, setNewnumber] = useState("");
  const [businessdate, setBusinessdate] = useState("");

  const orderFilter = () => {
    console.log(businessdateFilter, businessdate, "businessdate");
    let formdata = new FormData();
    formdata.append("ref_number", filterStatus === true ? "" : refnumberFilter);
    formdata.append("ref_after", filterStatus === true ? "" : refafterFilter);
    formdata.append("number", filterStatus === true ? "" : newnumberFilter);
    formdata.append(
      "business_date",
      filterStatus === true ? "" : businessdateFilter
    );
    formdata.append("type", type);
    if (branchIds) formdata.append("branch", branchIds);
    if (branchDate) formdata.append("date", branchDate);
    if (branchEndDate) formdata.append("enddate", branchEndDate);

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/orders`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      data: formdata,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "orderFilter api data");
        let filteredData = {
          data: response.data.data,
          text: "Applied Successfully",
        };
        dispatch(moduleModule(filteredData));
        props.handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    orderFilter();
  }, [counting]);

  useEffect(() => {
    setRefnumber("");
    setRefafter("");
    setNewnumber("");
    setBusinessdate("");
  }, [globalGtx.refreshCount]);

  useEffect(() => {
    if (filterStatus === true) {
      setRefnumber("");
      setRefafter("");
      setNewnumber("");
      setBusinessdate("");
    }
  }, [filterStatus]);

  function defaultTagdata(modifier:OptionsFilter) {
console.log(modifier,"defaultTagdata");
  }

  return (
    <>
      {/* ############################################################
 ######################## ORDER MODALS ########################### */}

      {/* START New Call Center Order */}
      {props.modalName === "order call" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>New Call Center Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Customer Phone</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>New Customer Name</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Oder Type</Form.Label>
                  <Select
                    isSearchable={true}
                    options={options}
                    onChange={(e) => {
                      orderTypehandler(e);
                    }}
                    placeholder="Pick up"
                  />
                </Form.Group>
              </Col>

              {ordertype === "Delivery" && (
                <Col md={12} lg={12}>
                  <Form.Group className={`${cx.formField}`}>
                    <Form.Label>Address</Form.Label>
                    <button
                      className={`${cx.addressBtn}`}
                      onClick={() => {
                        subdeliveryAddress("delivery address", true);
                      }}
                    >
                      Add New Address?
                    </button>
                  </Form.Group>
                </Col>
              )}

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Branch</Form.Label>
                  <Form.Select>
                    <option>Mall 1</option>
                  </Form.Select>
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
      {/* END New Call Center Order */}

      {/* START Delivery Address */}
      {submodalName === "delivery address" && (
        <Modal
          scrollable
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Address</Modal.Title>
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
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    style={{ height: "150px" }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Delivery Zone</Form.Label>
                  <Select
                    isSearchable={true}
                    options={deliveryzone}
                    onChange={(e) => {
                      orderTypehandler(e);
                    }}
                    placeholder="Choose...
                    "
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={subhandleClose}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>Apply</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Delivery Address */}

      {/* START Order Filter */}
      {props.modalName === "order filter" && (
        <Modal
          scrollable
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
                  <Form.Label>Reference</Form.Label>
                  <Form.Control
                    defaultValue={refnumber}
                    type="text"
                    onChange={(e) => {
                      setRefnumber(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Reference After</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={refafter}
                    onChange={(e) => {
                      setRefafter(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={newnumber}
                    onChange={(e) => {
                      setNewnumber(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Business Date</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={businessdate}
                    onChange={(e) => {
                      setBusinessdate(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
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
              className={`${cx.btnSubmit}`}
              disabled={
                !(!!businessdate || !!newnumber || !!refafter || !!refnumber)
              }
              onClick={() => {
                let data = {
                  refnumber: refnumber,
                  refafter: refafter,
                  newnumber: newnumber,
                  businessdate: businessdate,
                };
                dispatch(filterOptions(data));
                dispatch(branchHide());
              }}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Order Filter */}

      {/* START Order add tags Filter */}
      {props.modalName === "order add tags" && (
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
                  <Form.Label>Tags</Form.Label>
                  <FilterDropdown options={option} postdata={newpostdata} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
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
              className={`${cx.btnSubmit}`}
              onClick={() => {
                props.addOrderTags();
                setOrderType("");
              }}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Order add tags Filter */}

      {/* START Order edit tags Filter */}
      {props.modalName === "order edit tags" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tags</Form.Label>
                  <FilterDropdown options={option} postdata={newpostdata} defaultdata={defaultTagdata} defaultoptions={defaultTags} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
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
              className={`${cx.btnSubmit}`}
              onClick={() => {
                props.addOrderTags();
                setOrderType("");
              }}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Order add tags Filter */}

      {/* START Order Remove tags Filter */}
      {props.modalName === "order remove tags" && (
        <Modal
          className={`${cx.ctsModal}`}
          show={props.show}
          onHide={props.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Tags</Form.Label>
                  <FilterDropdown options={option} postdata={newpostdata} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
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
              className={`${cx.btnSubmit}`}
              onClick={() => {
                props.removeOrderTags();
                setOrderType("");
              }}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Order Remove tags Filter */}
    </>
  );
};

export default Modals;
