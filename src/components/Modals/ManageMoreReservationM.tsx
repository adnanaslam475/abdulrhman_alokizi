import React, { Fragment, useState } from "react";
import { Button, Modal, Row, Col, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import cx from './Modals.module.scss';
import Select from 'react-select';
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import { costanalysisitems, costcategories, costanalysisfilter, reportsfilterordertags, reportsordertags,timefilter  } from '../../constants/dropdownconstants'
import IoIosInformationCircleOutline, { AiOutlineInfoCircle } from 'react-icons/ai';
import { NavLink } from "react-router-dom";



const Modals = (props: any) => {
  const options = [
    {
      value: '1', label: 'Pick up',
    },
    {
      value: '2', label: 'Delivery',
    },
  ]
  const deliveryzone = [
    {
      value: '1', label: 'Shipping',
    },
    {
      value: '2', label: 'Ordered',
    },
  ]
  const [ordertype, setOrderType] = useState('')
  const [advanceOptions, setadvanceOptions] = useState(false)
  const [inventoryItems, setinventoryItems] = useState(false)
  const orderTypehandler = (event: any) => {
    setOrderType(event.label)
  }

  let sizeadvanceoptions = advanceOptions ? 6 : 12;


  const [subshow, setsubShow] = useState(false);
  const [submodalName, setsubModalName] = useState('');
  const subdeliveryAddress = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow")
    setsubModalName(modalname)
    setsubShow(status);
  }
  const subhandleClose = () => {
    setsubShow(false);
    setsubModalName('');
  };

  return (
    <>
 

      {
        props.modalName === 'Add Branches' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Branches</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                      Branches
                      </Form.Label> 
                   
                  <FilterDropdown options={costanalysisfilter} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div></div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
     
      {
        props.modalName === 'Edit Branches' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit فرع الاحساء branch reservation settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>

            <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label  className={`${cx.editbranchfield}`}>
                    Branch working hours are 06:00 - 04:00
                      </Form.Label> 
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                    Reservation Duration (minutes) *
                      </Form.Label> 
                   <Form.Control type="text" placeholder="30"/>
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ?
                    <Form.Label className="d-block">
                      Tables
                      <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(false) }}>Select by Tables</NavLink>
                    </Form.Label> :
                    <Form.Label className="d-block">
                      Sections
                      <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(true) }}>Select by Sections </NavLink>
                    </Form.Label>
                  }
                  <FilterDropdown options={ costanalysisitems} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                      Saturday
                      </Form.Label> 
                   
                  <FilterDropdown options={timefilter} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                      Sunday
                      </Form.Label> 
                   
                  <FilterDropdown options={timefilter} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                      Monday
                      </Form.Label> 
                   
                  <FilterDropdown options={timefilter} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                      Tuesday
                      </Form.Label> 
                   
                  <FilterDropdown options={timefilter} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                      Wednesday
                      </Form.Label> 
                   
                  <FilterDropdown options={timefilter} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                      Thursday
                      </Form.Label> 
                   
                  <FilterDropdown options={timefilter} />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  
                    <Form.Label className="d-block">
                      Friday
                      </Form.Label> 
                   
                  <FilterDropdown options={timefilter} />
                </Form.Group>
              </Col>

            </Row>
          </Modal.Body>
          <Modal.Footer>
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>
                Delete Reservation
              </NavLink>
            </div>
            <div>
              <Button className={`${cx.btnClose}`} onClick={() => { props.handleClose(); setOrderType('') }}>
                Close
              </Button>
              <Button className={`${cx.btnSubmit}`}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
     

    </>
  );
};

export default Modals;
