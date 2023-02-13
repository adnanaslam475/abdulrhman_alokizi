import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreSettingSmsProviders.module.scss";
import cy from "../../components/Modals/Modals.module.scss";
import {
  Card,
  Modal,
} from "react-bootstrap";

import { NavLink } from "react-router-dom";

import msegat from "../../images/Msegat.svg";

import Modals from "../../components/Modals/ManageMoreSettingsSmsProviderM";



export default function ManageMoreSettingSmsProviders() {
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
                  <h5>SMS Providers Settings </h5>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                
                <div className={`${cx.paymentIntegrations}`}>
                  <div className={`${cx.paymentBox}`}>
                      <img src={msegat} className={`${st.icon}`} />
                      <h4>Msegat</h4>
                  </div>
                    <NavLink to="#" className={`btn`} onClick={() => {
                  handleShow("sms provider", true);
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
