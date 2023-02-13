
import iconClose from "../../images/icon-close.svg";
import React, { useCallback, useState, useEffect } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ManageMorePriceTagDetailProduct.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";

import { MdArrowBackIos, MdDeleteOutline } from "react-icons/md";
import { alpha, Box, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import icon1 from "../../images/icon-branch.svg";
import iconFilter from "../../images/icon-filter.svg";
import Modals from "../../components/Modals/ManageMorePriceTagM";
import { priceTagViewDetails, singleProductPriceFunc } from "../../redux_toolkit/reducer/manageMorePriceTagsApiReducer";
import { useDispatch, useSelector } from "react-redux";

interface Data {
  name: string;
  orignalprice: string;
  price:string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
      },
      {
        id: "orignalprice",
        numeric: true,
        disablePadding: false,
        label: "Orignal Price",
      },
      {
        id: "price",
        numeric: true,
        disablePadding: false,
        label: "Price",
      },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        <>
          {" "}
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "left" : "left"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                // onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </>
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => {
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
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <div className={`${table.mainTitleRow} ${cx.topTable}`}>
          <ul className={`${table.rightActionIcons}`}>
            <li>
            <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("product tag filter", true);
                  console.log("check");
                }}
              >
                <img src={iconFilter} className={`${st.icon}`} />
               Filters
                <img src={iconClose} className={`${table.iconClose}`} />
              </button>
            </li>
          </ul>
        </div>
      </Toolbar>
      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
};

function EnhancedTable() {
  const priceTagState = useSelector((state:any)=>state.manageMorePriceTagsApiReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");

  // Avoid a layout jump when reaching the last page with empty rows.

  function redirectToAnotherPage(id: string) {
    navigate(`${id}`);
  }

  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");
  const [rows, setRows] = useState<any>()

  useEffect(()=>{
    setRows(priceTagViewDetails?.data?.products)
  },[priceTagState.priceTagPerIdCount])

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
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              rowCount={rows?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))?.map(
                (row:any, index:number) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row?.id}
                      onClick={() => {
                        let data = {
                          name: row?.name,
                          price: row?.price,
                          product_id: row?.product_id,
                          pricetag_id:row?.pricetag_id
                        }
                        dispatch(singleProductPriceFunc(data))
                        handleShow("edit details sec", true);
                      }}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row?.product_name}
                      </TableCell>
                      <TableCell align="left">{row?.original_price}</TableCell>
                      <TableCell align="left"> {row?.price} </TableCell>
                     
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Modals show={show} handleClose={handleClose} modalName={modalName} />
      </Paper>
    </Box>
  );
}

export default  function ManageMorePriceTagDetailProduct () {
  const [lgShow, setLgShow] = useState(false);

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
  const [selected, setSelected] = useState([]);
  const customValueRenderer = (selected: any, options: any) => {
    return (
      <>
        <img src={icon1} className={`${st.icon}`} /> All Branches
      </>
    );
  };
  return (
    <>
      <section >
      <div className={`${cx.pageTitle}`}>
                 <div className={`${cx.rowTitleLeft}`}>
                                  </div>
                 <div className={`${cx.rowTitleRight}`}>
                 <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("edit prices", true);
                    }}
                  >
                    Edit prices
                  </button>
                  <button
                    className={`btn`}
                    onClick={() => {
                      handleShow("add product", true);
                    }}
                  >
                    Add Products 
                  </button>
                </div>
              </div>
        <div >

          <Card>
            <Card.Body>
              <div className={`${table.dataTableBox}`}>
                <Box sx={{ width: 1 }}>
                  <EnhancedTable />
                </Box>
              </div>
            </Card.Body>
          </Card>
        </div>
      </section>

      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
}
