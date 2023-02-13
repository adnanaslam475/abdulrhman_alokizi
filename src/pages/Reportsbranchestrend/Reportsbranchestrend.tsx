import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Reportsbranchestrend.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { HiInformationCircle } from 'react-icons/hi';
import iconFilter from "../../images/icon-filter.svg";
import Select, {
  components,
  ControlProps,
} from "react-select";
import { MdArrowBackIos, MdDeleteOutline } from 'react-icons/md';
import icon1 from "../../images/icon-branch.svg";
import Modals from "../../components/Modals/ReportsBranchestrendM";
import { Groupname, BusinessDate, Export, ActionDropdown } from "./Dropdowns";
import AreaCharts from "../../components/Charts/AreaChart";

export default function Reportsbranchestrend() {
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

  const Control = ({ children, ...props }: ControlProps) => {
    // @ts-ignore
    const { emoji, onEmojiClick } = props.selectProps;
    const style = { cursor: "pointer" };

    return (
      <components.Control {...props}>
        <span onMouseDown={onEmojiClick} style={style}>
          <img src={icon1} className={`${st.icon}`} />
        </span>
        {children}
      </components.Control>
    );
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
    },
    {
      name: "Page B",
      uv: 3000,
    },
    {
      name: "Page C",
      uv: 2000,
    },
    {
      name: "Page D",
      uv: 1900,
    },
    {
      name: "Page E",
      uv: 1890,
    },
    {
      name: "Page F",
      uv: 1200,
    },
    {
      name: "Page G",
      uv: 500,
    }
  ];
  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          
          
        <NavLink to="/reports/analysis" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Branches Trend</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Export />
              <Groupname />
              <BusinessDate />
              <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("branches filter", true);
                  console.log("check");
                }}
              >
                <img src={iconFilter} className={`${st.icon}`} />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${cx.dataTableBox}`}>
                <Row className="align-items-center">
                  <Col md="6">
                    <div className={`${cx.grapTitle}`}>
                      <h5>فرع الاحساء 0</h5>
                      <p>-100% <HiInformationCircle/></p>
                    </div>
                  </Col>
                  <Col md="6">
                    <AreaCharts data={data} />
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
