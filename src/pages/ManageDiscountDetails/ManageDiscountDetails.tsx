import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageDiscountDetails.module.scss";
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
// import icon4 from "../../images/icon-printer.svg";
import copy from "../../images/copy.svg";
import iconsetting from "../../images/iconsetting.svg";
import { NavLink, useParams } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import Modals from "../../components/Modals/ManageDiscountsM";
import { useDispatch, useSelector } from "react-redux";
import { discountDetailPerId, discountDetails, discountTagListItems } from "../../redux_toolkit/reducer/manageDiscountApiReducer";
import { productTagModifier } from "../../redux_toolkit/reducer/menuProductsApiReducer";

export default function ManageDiscountDetails() {
  const editDiscountCount = useSelector((state:any)=>state.manageDiscountApiReducer.editDiscountCount)
  const discountDetailCount = useSelector((state:any)=>state.manageDiscountApiReducer.discountDetailCount)
  const discountBranchCount = useSelector((state:any)=>state.manageDiscountApiReducer.discountBranchCount)
  const discountTagCount = useSelector((state:any)=>state.manageDiscountApiReducer.discountTagCount)
  const dispatch = useDispatch();
  const param = useParams();
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [details, setDetails] = useState<any>()
  const [tags, setTags] = useState<any>()
  const handleShow = (modalname: string, status: boolean) => {
    console.log(modalname, status, "handleShow");
    setModalName(modalname);
    setShow(status);
  };
  const handleClose = () => {
    setModalName("");
    setShow(false);
  };

  useEffect(()=>{
    dispatch(discountDetails({discount_id: param?.id}))
  },[editDiscountCount, discountBranchCount, discountTagCount])

  useEffect(()=>{
    setDetails(discountDetailPerId)
    setTags(discountTagListItems)
  },[discountDetailCount, discountTagCount])


  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <NavLink to="/manage/discounts" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>{details?.english_name}</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("edit discount", true);
                }}
              >
                Edit Discount
              </button>
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside} ${st.setWidth}`}>
          <Card>
            <Card.Body className={`${cx.cardBody}`}>
              <div className={`${cx.contentBox}`}>
                <Row>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name</label>
                    <p>{details?.english_name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Name Localized  </label>
                    <p>{details?.arabic_name}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Qualification</label>
                    <p>{details?.type}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Discount Amount </label>
                    <p>{details?.discount_type=="Fixed" ? details?.amount : `${details?.amount}%`}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Minimum Order Price</label>
                    <p>{details?.minimum_order_price}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Maximum Discount </label>
                    <p>{details?.maximum_discount}</p>
                  </Col>

                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Reference</label>
                    <p>{details?.reference}</p>
                  </Col>
                  <Col lg={6} className={`${cx.formField}`}>
                    <label>Taxable</label>
                    <p>{details?.taxable==="1" ? "Yes" : "No"}</p>
                  </Col>
                </Row>
              </div>


              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Applies On Branches</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("Applies On Branches", true);
                    }}
                  >
                    + Edit Branches
                  </button>
                </div>
              </div>

              <div className={`${cx.contentBox}`}>
                <div className={`table-responsive`}>
                  <Table className={`${table.tableCt} ${cx.tableCt}`}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        details?.branch.map((item:any,index:number)=>{
                          return (
                            <tr>
                        <td>{item?.branch?.english_name}</td>
                        <td>{item?.branch?.ref_number}</td>
                      </tr>
                          )
                        })
                      }
                      
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className={`${cx.pageTitle}`}>
                <div className={`${cx.rowTitleLeft}`}>
                  <h5>Limit To Customer Tags</h5>
                </div>
                <div className={`${cx.rowTitleRight}`}>
                  <button
                    className={`btn`}
                    onClick={() => {
                      dispatch(productTagModifier({type:"tag"}))
                      handleShow("add customer tags", true);
                    }}
                  >
                    Add Customer Tags
                  </button>
                </div>
              </div>
              <div className={`${cx.contentBox}`}>
              <ul className={`${cx.tagsList}`}>
              {tags?.length > 0 ?
                    tags?.map((item: any,index:number) => {
                      return (
                        <li key={index}>
                          <span>{item?.name}</span>
                        </li>
                      );
                    }) :
                    <div className={`p-4 text-center ${table.noData}`}>
                    Make sure all active orders are uploaded. You will lose all data on the device if you delete it! </div>
                  }
               </ul>
              </div>

            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
