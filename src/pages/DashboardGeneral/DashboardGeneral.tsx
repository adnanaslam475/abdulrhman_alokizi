import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./DashboardGeneral.module.scss";
import table from "../../datatable.module.scss";
import {
  Card,
  Button,
  Row,
  Table,
  Col,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import icon4 from "../../images/icon-printer.svg";

import { Branches, BusinessDate, ActionDropdown } from "./Dropdowns";

import iconFilter from "../../images/icon-filter.svg";
import iconClose from "../../images/icon-close.svg";
import { NavLink } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";

import Modals from "../../components/Modals/DashboardM";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import BarChart from "./Barcharts";
import { PieChart } from "recharts";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        display: false,
      },
    },
    x: {
      ticks: {
        autoSkip: false,
        maxRotation: 85,
        minRotation: 85,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  borderDashOffset: 9,
};

const labels = [
  "13 Sep",
  "14 Sep",
  "15 Sep",
  "16 Sep",
  "17 Sep",
  "18 Sep",
  "19 Sep",
];

export const data = {
  labels,
  datasets: [
    {
      fill: {
        target: "origin",
        above: "rgb(255, 0, 0)", // Area will be red above the origin
        below: "rgb(0, 0, 255)", // And blue below the origin
      },
      label: "",
      data: [1, 220, 301, 801, 700, 500, 530, 830, 900, 925, 1000, 1210],
      borderColor: "#5498fd",
      backgroundColor: "#5498fd",
    },
  ],
};

export const toppeoductpieData = {
  labels: ["#5498FD","#76ACFD","#AACBFE","#BBD6FE",   "#DDEAFF"],
  datasets: [
    {
      label: "# of Votes",
      data: [3, 12, 4, 5, 4, 5],
      backgroundColor: [ "#5498FD","#76ACFD","#AACBFE","#BBD6FE",   "#DDEAFF"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff","#ffffff", "#ffffff"],
      borderWidth: 1,
    },
  ],
};

export const toppaymentpieData = {
  labels: [ "#5498FD","#76ACFD"],
  datasets: [
    {
      label: "# of Votes",
      data: [  15 ,4],
      backgroundColor: [ "#5498FD","#76ACFD"],
      borderColor: ["#ffffff", "#ffffff"],
      borderWidth: 1,
    },
  ],
};

export const topbranchespieData = {
  labels: ["#5498FD"],
  datasets: [
    {
      label: "# of Votes",
      data: [ 19],
      backgroundColor: [ "#5498FD"],
      borderColor: ["#ffffff"],
      borderWidth: 1,
    },
  ],

};

export default function DashboardGeneral() {
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
      <Row >
        <div className={`${cx.pageTitle}`}>
          <div className={`${cx.rowTitleLeft}`}></div>
          <div className={`${cx.rowTitleRight}`}>
            {/* <Branches /> */}
            <button className={`btn`}> Day</button>
            <button className={`btn`}> Week</button>
            <button className={`btn`}> Month</button>

            <BusinessDate />
            <button
              className={`btn`}
              onClick={() => {
                handleShow("Dashboard Branches Filter", true);
              }}
            >
              <img src={iconFilter} className={`mx-1 ${st.icon}`} />
              Filters
            </button>
          </div>
        </div>
      </Row>
      <Row>
        <Col md={6} lg={4} xl={3}>
          <div className={`${cx.cardBox}`}>
            <p>Income</p>
            <h3>646</h3>
            <div className={`${cx.graphBox}`}>
              <Line height={200} width={200} options={options} data={data} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className={`${cx.cardBox}`}>
            <p>Return (SAR)</p>
            <h3>51,257.826</h3>
            <div className={`${cx.graphBox}`}>
              <Line height={200} width={200} options={options} data={data} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className={`${cx.cardBox}`}>
            <p>Orders</p>
            <h3>646</h3>
            <div className={`${cx.graphBox}`}>
              <Line height={200} width={200} options={options} data={data} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className={`${cx.cardBox}`}>
            <p>Income</p>
            <h3>646</h3>
            <div className={`${cx.graphBox}`}>
              <Line height={200} width={200} options={options} data={data} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className={`${cx.cardBox}`}>
            <p>Income</p>
            <h3>646</h3>
            <div className={`${cx.graphBox}`}>
              <Line height={200} width={200} options={options} data={data} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className={`${cx.cardBox}`}>
            <p>Income</p>
            <h3>646</h3>
            <div className={`${cx.graphBox}`}>
              <Line height={200} width={200} options={options} data={data} />
            </div>
          </div>
        </Col>
        <Col md={6} lg={4} xl={3}>
          <div className={`${cx.cardBox}`}>
            <p>Income</p>
            <h3>646</h3>
            <div className={`${cx.graphBox}`}>
              <Line height={200} width={200} options={options} data={data} />
            </div>
          </div>
        </Col>
        <Row>
          <div className={`${cx.pageTitle}`}>
            <div className={`${cx.chartshead}`}>
              <h1>Hourly Sales</h1>
            </div>
          </div>
        </Row>
        <Col md={12} lg={12} xl={12}>
          <div className={`${cx.cardBox}`}>
            <BarChart />
          </div>
        </Col>

        <Col md={4} lg={4} xl={4}>
        <div className={`${cx.pageTitle}`}>
            <div className={`${cx.chartshead}`}>
              <h1>Top Products by Net Sales (SAR)</h1>
            </div>
          </div>
          <div className={`${cx.cardBox}`}>
            <Pie data={toppeoductpieData}/>
          </div>
        </Col>

        <Col md={4} lg={4} xl={4}>
        <div className={`${cx.pageTitle}`}>
            <div className={`${cx.chartshead}`}>
              <h1>Top Payments (SAR)</h1>
            </div>
          </div>
          <div className={`${cx.cardBox}`}>
            <Pie data={toppaymentpieData}/>
          </div>
        </Col>

        <Col md={4} lg={4} xl={4}>
        <div className={`${cx.pageTitle}`}>
            <div className={`${cx.chartshead}`}>
              <h1>Top Branches by Net Sales (SAR)</h1>
            </div>
          </div>
          <div className={`${cx.cardBox}`}>
            <Pie data={topbranchespieData}/>
          </div>
        </Col>
      </Row>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
