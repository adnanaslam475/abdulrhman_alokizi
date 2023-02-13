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

      {/* START new quantity adjustment */} 
      {
        props.modalName === 'new quantity adjustment' &&
        <Modal  className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Quantity Adjustment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>
                  Branch
                    {['top'].map((placement) => (
                      <OverlayTrigger key={placement} overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          Where items will be produced.
                        </Tooltip>}>
                        <span className={`${cx.tooltips} ms-2`} style={{ top: '1px' }}><AiOutlineInfoCircle /></span>
                      </OverlayTrigger>
                    ))}
                  </Form.Label>
                  <SingleFilterDropdown options={customertimezone} />
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
      {/* END new quantity adjustment*/}



      {/* START filter */}
      {
        props.modalName === 'filter' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
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
                  {inventoryItems ? <Form.Label className="d-block">
                  Branch 
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(false) }}>Select branches?</NavLink>
                  </Form.Label> : <Form.Label className="d-block">
                  Branch 
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(true) }}>Select by tags?</NavLink>
                  </Form.Label>
                  }
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
      {/* END filter */}


      {/* START edit item transfer */} 
      {
        props.modalName === 'edit item transfer' &&
        <Modal scrollable className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" type="text" style={{ height: '150px' }} />
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
      {/* END edit item transfer */}



      {/* START quantity add items */} 
      {
        props.modalName === 'quantity add items' &&
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
      {/* END quantity add items */}



      {/* START quantity add product */} 
      {
        props.modalName === 'quantity add product' &&
        <Modal className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Products</Modal.Title>
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
                    <NavLink className={`${cx.rightLabel}`} to="#" onClick={() => { setinventoryItems(true) }}></NavLink>
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
      {/* END quantity add product */}


      
      {/* START item quantities */} 
      {
        props.modalName === 'item quantities' &&
        <Modal scrollable className={`${cx.ctsModal} ${advanceOptions ? cx.ctsModalSize : ''}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Deducted Item Quantity</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
           <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Juice (1)</Form.Label>
                  <Form.Control type="number" />
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
      {/* END item quantities */}
      
      {/* START new quantity confirm */}
      {
        props.modalName === 'new quantity confirm' &&
        <Modal className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Are you sure you want to submit adjustment ?</Form.Label>
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
      {/* END new quantity confirm */}

      {/* START new quantity delete */}
      {
        props.modalName === 'new quantity delete' &&
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
      {/* END new quantity delete*/}


      {/* START edit transaction */}
      {
        props.modalName === 'edit transaction' &&
        <Modal scrollable className={`${cx.ctsModal}`} show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Transaction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <Row>
              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Source <AiOutlineInfoCircle/> </Form.Label>
                  <FilterDropdown options={customertagoptions} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Destination <AiOutlineInfoCircle/> </Form.Label>
                  <FilterDropdown options={customertagoptions} />
                </Form.Group>
              </Col>

              <Col md={12} lg={12}>
                <Form.Group className={`${cx.formField}`}>
                  <Form.Label>Notes <AiOutlineInfoCircle/> </Form.Label>
                  <Form.Control as="textarea" type="text" style={{ height: '150px' }} />
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
      {/* END edit transaction */}

      {/* START quantity import files */} 
      {
        props.modalName === 'quantity import files' &&
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
      {/* END quantity import files */}

    </>
  );
};

export default Modals;
