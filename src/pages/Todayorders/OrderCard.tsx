import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Todayorders.module.scss";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

export default function OrderCard(props: any) {
  let { todaysOrderData, orderType, count, tooltipDesc, getTodaysOrders } =
    props;
  return (
    <Fragment>
      <div className={`${cx.orderCard}`}>
        <CardHeader
          orderType={orderType}
          count={count}
          tooltipdesc={tooltipDesc}
        />

        <div className={`${cx.Body}`}>
          {count > 0 &&
            todaysOrderData.map((order: any) => (
              <CardBody
                key={order.referanceid}
                customer={order.customer}
                price={order.price}
                branch={order.branch}
                cashier_name={order.cashier_name}
                created_at={order.created_at}
                updated_at={order.updated_at}
                order_id={order.order_id}
                number={order.number}
                orderType={orderType}
                getTodaysOrders={getTodaysOrders}
              />
            ))}
          {count === 0 && (
            <div className={`${cx.noOrder}`}>
              <span className="text-lg">You don't have {orderType} orders</span>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
