import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMorePriceTagDetailsPage.module.scss";
import Modals from "../../components/Modals/ManageMorePriceTagM";
import table from "../../datatable.module.scss";
import {
  Card,
  Tooltip,
  OverlayTrigger,
  Button,
  Modal,
  Form,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";
import icon1 from "../../images/icon-branch.svg";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";

import Tabs from "react-bootstrap/Tabs";
import { MdArrowBackIos } from "react-icons/md";
import ManageMorePriceDetailProduct from "../ManageMorePriceTagDetailProduct/ManageMorePriceTagDetailProduct";
import ManageMorePriceTagDetailCombo from "../ManageMorePriceTagDetailCombo/ManageMorePriceTagDetailCombo";
import ManageMorePriceDetailModiferoption from "../ManageMorePriceTagDetailModiferoption/ManageMorePriceTagDetailModiferoption";
import { priceTagPerId, priceTagViewDetails } from "../../redux_toolkit/reducer/manageMorePriceTagsApiReducer";
import { useDispatch, useSelector } from "react-redux";


export default function ManageMorePriceTagDetailsPage(): JSX.Element {
  const param = useParams();
  const dispatch = useDispatch();
  const [lgShow, setLgShow] = useState(false);

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

  const options = [
    {
      value: "1",
      label: "Orders",
    },
    {
      value: "2",
      label: "Orders Items",
    },
    {
      value: "3",
      label: "Orders Payment",
    },
    {
      value: "4",
      label: "Orders 1",
    },
  ];
  const priceTagState = useSelector((state:any)=>state.manageMorePriceTagsApiReducer)
  const [selected, setSelected] = useState([]);
  const customValueRenderer = (selected: any, options: any) => {
    return (
      <>
        <img src={icon1} className={`${st.icon}`} /> All Branches
      </>
    );
  };
 useEffect(()=>{
  dispatch(priceTagPerId({pricetag_id:`${param.id}`}))
 },[priceTagState.addPriceTagsCount, priceTagState.addProductsInPriceTagCount, priceTagState.editProductPriceCount, priceTagState.priceTagComboDeleteCount, priceTagState.priceTagComboDeleteCount, priceTagState.priceTagComboEditCount, priceTagState.priceTagComboAddCount, priceTagState.priceTagModifierAddDeleteCount, priceTagState.editModifierPricesCount])
  const [perIdData, setPerIdData] = useState<any>()
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

  useEffect(()=>{
    console.log(priceTagViewDetails,"priceTagViewDetails")
    setPerIdData(priceTagViewDetails)
  },[priceTagState.priceTagPerIdCount])
  return (
    <>
      <section className={`${st.pageWrapper}`}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <div className={`${st.pageTitle}`}>
        <NavLink to="/manage/manage-More/price-tags" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>{perIdData?.data?.name}</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
             
              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("Edit Price Tag", true);
                }}
              >
                Edit Price Tag 
              </button>
            </div>
            </div>
          <div >
            <Nav className={`${cx.headertabs}`}>
              <Nav.Item>
                <Nav.Link eventKey="first" className={`${cx.headertabslinks}`}>Product </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className={`${cx.headertabslinks}`}>Combos </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third" className={`${cx.headertabslinks}`}>Modifer Option</Nav.Link>
              </Nav.Item>
            </Nav>

            
                          
          </div>
          <div>
          </div>
        </div>

        
        <div className={`${st.pageWrapperInside}`}>
        <Tab.Content>
            <Tab.Pane eventKey="first">
           <ManageMorePriceDetailProduct/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
            <ManageMorePriceTagDetailCombo/>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
            <ManageMorePriceDetailModiferoption/>
            </Tab.Pane>
           
          </Tab.Content>
        </div>
        
    </Tab.Container>
      </section>
      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
