import React, { Fragment, useState } from "react";
import { Button, Modal, Row, Col, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import cx from './Modals.module.scss';
import Select from 'react-select';
import { FilterDropdown, SingleFilterDropdown } from "../Dropdown/Dropdowns";
import { tagoptions, customertagoptions, customertimezone, itemoption, ingredientsoptions } from '../../constants/dropdownconstants'
import { AiFillInfoCircle, AiOutlineInfoCircle } from 'react-icons/ai';
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
    
 {/* ############################################################
 ######################## INVENTORY ITEMS MODALS ########################### */}

      {/* START create category */} 
      {
        props.modalName === 'create category' &&
        <Modal  className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Inventory category name, like Vegetables or Fruits.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Enter the localized name in a 2nd language of your choice.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Reference
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Unique code for the category.<br/>
                          The reference may only contain letters, numbers, dashes and underscores.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
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
      {/* END create category*/}



      {/* START cost filter */}
      {
        props.modalName === 'cost filter' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
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
                  <Form.Label>Deleted </Form.Label>
                  <Form.Select>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  </Form.Select>
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
          <div><NavLink to="#" className={`${cx.rightOption}`}>Clear</NavLink></div> 
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
      {/* END cost filter */}

      {
        props.modalName === 'edit category' &&
        <Modal  className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Inventory category name, like Vegetables or Fruits.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Name Localized
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Enter the localized name in a 2nd language of your choice.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Reference
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Unique code for the category.<br/>
                          The reference may only contain letters, numbers, dashes and underscores.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" />
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

    </>
  );
};

export default Modals;
