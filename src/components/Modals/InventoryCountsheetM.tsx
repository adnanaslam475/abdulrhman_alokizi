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

      {/* START add */} 
      {
        props.modalName === 'add' &&
        <Modal  className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Count Sheet</Modal.Title>
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
                          Count Sheet Name
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
                  Localized Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Count Sheet localized Name
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
      {/* END add*/}

      {/* START edit */} 
      {
        props.modalName === 'edit' &&
        <Modal  className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Count Sheet</Modal.Title>
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
                          Count Sheet Name
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
                  Localized Name
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Count Sheet localized Name
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
      {/* END edit*/}


 {/* START add items */} 
 {
        props.modalName === 'add items' &&
        <Modal className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  {inventoryItems ? <Form.Label className="d-block">
                  Items 
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(false) }}>Select branches?</NavLink>
                  </Form.Label> : <Form.Label className="d-block">
                  Items
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(true) }}>Select by tags?</NavLink>
                  </Form.Label>
                  }
                  <FilterDropdown options={ingredientsoptions} />
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
      {/* END add items */}


      {/* START delete */}
      {
        props.modalName === 'delete' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Are you sure you want to delete this?</Form.Label>
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
              <Button className={`${cx.btnSubmit}`} style={{ backgroundColor:'#FA8072', borderColor:'#FA8072' }}>
                Apply
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      }
      {/* END delete*/}


      {/* START import files */} 
      {
        props.modalName === 'import files' &&
        <Modal scrollable className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Import Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Notes</Form.Label>
                  <p><input type="file" /></p>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div><NavLink to="#" className={`${cx.rightOption}`}>Download Files</NavLink></div>
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
      {/* END import files */}



      
      {
        props.modalName === 'countsheetitems' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Item: mistake ice cream (sk-00552)</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Order unit 
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Order unit 
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="text" placeholder="unit" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Order To Storage
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Order To Storage
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="number" placeholder="1"/>
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Order Quantity (Unit) 
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                         Order Quantity (Unit) 
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Purchase Cost Per Unit (SAR) *

                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                            Purchase Cost Per Unit (SAR) *

                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <Form.Control type="number" />
                </Form.Group>
              </Col>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Item Supplier Code 
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                         Item Supplier Code 
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
          <div>
              <NavLink to="#" className={`${cx.rightOption} ${cx.rightRed}`}>
                Delete 
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
