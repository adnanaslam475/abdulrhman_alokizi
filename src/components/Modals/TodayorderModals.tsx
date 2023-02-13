import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import cx from "./Modals.module.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { moduleModule, removeBranch } from "../../redux_toolkit/reducer/todaysOrderModalsReducer";
import GlobalContext from "../../store/global-context";

const Modals = (props: any) => {
  const filterStatus = useSelector(
    (state: any) => state.todaysOrderModalsReducer.filterStatus
  );
  const globalGtx = useContext(GlobalContext);
  const dispatch = useDispatch();
  const [refnumber, setRefnumber] = useState("");
  const [refafter, setRefafter] = useState("");
  const [newnumber, setNewnumber] = useState("");
  const [businessdate, setBusinessdate] = useState("");
  const [ordertype, setOrderType] = useState("");

  const orderFilter = () => {
    let formdata = new FormData();
    formdata.append("ref_number", refnumber);
    formdata.append("ref_after", refafter);
    formdata.append("number", newnumber);
    formdata.append("business_date", businessdate);

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/todayorder_filter`,
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      data: formdata,
    };
    axios(config)
      .then(function (response) {
        let filteredData = {
          data : response.data,
          text : "Applied Successfully",
        }
        dispatch(moduleModule(filteredData));
        props.handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  return (
    <>
      {/* ############################################################
 ######################## TODAY ORDER MODALS ########################### */}

      {/* START Todays Order Filter */}
      {props.modalName === "today order filter" && (
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
              onClick={() => {
                orderFilter();
                dispatch(removeBranch())
              }}
            >
              Apply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* END Todays Order Filter */}
    </>
  );
};

export default Modals;
