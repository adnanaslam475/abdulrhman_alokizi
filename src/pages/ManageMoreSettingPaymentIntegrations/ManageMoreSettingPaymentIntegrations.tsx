import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreSettingPaymentIntegrations.module.scss";
import cy from "../../components/Modals/Modals.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";

import STCPay from "../../images/STCPay.svg";
import Paymob from "../../images/Paymob.svg";
import network from "../../images/network.svg";
import Modals from "../../components/Modals/ManageMoreSettingsPaymentIntegrationsM";


export default function ManageMoreSettingPaymentIntegrations() {
  
  // Modals

  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Payment Integrations Settings </h5>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                
                <div className={`${cx.paymentIntegrations}`}>
                  <div className={`${cx.paymentBox}`}>
                      <img src={STCPay} className={`${st.icon}`} />
                      <h4>STCPay</h4>
                  </div>
                    <NavLink to="#" className={`btn`} 
                     onClick={() => {
                  handleShow("payment integrations", true);
                  console.log("check");
                }}>
                      Settings
                    </NavLink>
                </div>
                <div className={`${cx.paymentIntegrations}`}>
                  <div className={`${cx.paymentBox}`}>
                      <img src={network} className={`${st.icon}`} />
                      <h4>Network International</h4>
                  </div>
                    <NavLink to="#" className={`btn`}   onClick={() => {
                  handleShow("Network International settings", true);
                  console.log("check");
                }}>
                      Settings
                    </NavLink>
                </div>
                <div className={`${cx.paymentIntegrations}`}>
                  <div className={`${cx.paymentBox}`}>
                      <img src={Paymob} className={`${st.icon}`} />
                      <h4>Paymob</h4>
                  </div>
                    <NavLink to="#" className={`btn`}   onClick={() => {
                  handleShow("Paymob settings", true);
                  console.log("check");
                }}>
                      Settings
                    </NavLink>
                </div>
                
                <Modal.Footer  className= {`${cy.bottomRight}`}>
                </Modal.Footer>

              </div>
              
         
            </Card.Body>
          </Card>
        </div>
        
      </section>
      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
