import React from "react";
import { Fragment } from "react";
import cx from "../Modals/Modals.module.scss";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface TooltipOptions {
  infoText: String;
}

export default function SharedTooltip(props: TooltipOptions) {
  let { infoText } = props;
  return (
    <Fragment>
      {["top"].map((placement) => (
        <OverlayTrigger
          key={placement}
          overlay={<Tooltip id={`tooltip-${placement}`}>{infoText}</Tooltip>}
        >
          <span className={`${cx.tooltips} ms-2`} style={{ top: "1px" }}>
            <AiOutlineInfoCircle />
          </span>
        </OverlayTrigger>
      ))}
    </Fragment>
  );
}
