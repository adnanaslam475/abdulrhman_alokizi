import React, { Fragment } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Todayorders.module.scss";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { AiFillInfoCircle } from "react-icons/ai";

export default function CardHeader(props: any) {
  let { orderType, count, tooltipdesc } = props;

  return (
    <Fragment>
      <div className={`${cx.Head}`}>
        <h2>
          {orderType}
          <span className={`${cx.count}`}>{count}</span>
        </h2>
        {["top"].map((placement) => (
          <OverlayTrigger
            key={placement}
            overlay={
              <Tooltip id={`tooltip-${placement}`}>{tooltipdesc}</Tooltip>
            }
          >
            <span className={`${st.tooltips} ms-2`} style={{ top: "2px" }}>
              <AiFillInfoCircle />
            </span>
          </OverlayTrigger>
        ))}
      </div>
    </Fragment>
  );
}
