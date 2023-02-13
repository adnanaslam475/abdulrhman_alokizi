import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMoreSettings.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Table, Col, Modal, Form, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from 'react-icons/md';  
import Modals from "../../components/Modals/OrderModal";



export default function ManageMoreSettings() {

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
        <div className={`${st.pageTitle}`}>
        <NavLink to="/manage/manage-more" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Settings </h5>
            </div>
           
          </div>
          <div >
                <div className={`${cx.headertabs}`}>
                    <NavLink to="/manage/manage-more/settings/general" className={`${cx.headertabslinks}`}>
                    General
                    </NavLink>
                    <NavLink to="/manage/manage-more/settings/loyalty" className={`${cx.headertabslinks}`}>
                    Loyalty
                    </NavLink>
                    <NavLink to="/manage/manage-more/settings/receipt" className={`${cx.headertabslinks}`}>
                    Receipt
                    </NavLink>
                    <NavLink to="/manage/manage-more/settings/call-center" className={`${cx.headertabslinks}`}>
                    Call Center
                    </NavLink>
                    <NavLink to="/manage/manage-more/settings/cashier-app" className={`${cx.headertabslinks}`}>
                    Cashier App
                    </NavLink>
                    <NavLink to="/manage/manage-more/settings/display-app" className={`${cx.headertabslinks}`}>
                    Display App
                    </NavLink>
                    <NavLink to="/manage/manage-more/settings/payment-integrations" className={`${cx.headertabslinks}`}>
                    Payment Integrations
                    </NavLink>
                    <NavLink to="/manage/manage-more/settings/sms-providers" className={`${cx.headertabslinks}`}>
                    SMS Providers
                    </NavLink>
                    <NavLink to="/manage/manage-more/settings/inventory-transactionst" className={`${cx.headertabslinks}`}>
                    Inventory Transactions
                    </NavLink>
                </div>
            </div>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
