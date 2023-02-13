import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ReportMoreVoidAndReturns.module.scss";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";

import { MdArrowBackIos, MdDeleteOutline } from 'react-icons/md';
import { MultiSelect } from "react-multi-select-component";
import { alpha, Box, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { BsPlusLg } from "react-icons/bs";
import icon1 from "../../images/icon-branch.svg";
import icon2 from "../../images/icon-calendar.svg";
import icon3 from "../../images/icon-call.svg";
import icon4 from "../../images/icon-export.svg";
import icon5 from "../../images/icon-call.svg";
import iconRefresh from "../../images/icon-refresh.svg";
import iconFilter from "../../images/icon-filter.svg";
import Modals from "../../components/Modals/ReportMoreVoidAndReturnsM";

import { Groupname, BusinessDate, Export, ActionDropdown } from "./Dropdowns";
import { Branches } from "../Menucategories/Dropdowns";

interface Data {
  product: string;
  branch: string;
  branchreference: string;
  type: string;
  ordercreator: string;
  approvedby: string;
  time: string;
  quantity: string;
  amount: string;
  reason: string;
  iswasted: string;
}

const rows = [
  {
    product: "Margerita",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "COLA",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "COLA",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "COLA",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "Ravioli burrata pink sauce",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "truffle risotto",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "COLA",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "CEASAR SALAD",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "FETTUCINI ALFREDO",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "SPAGHETTI AL' BOLOGNESE",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "SPARKLINGWATER",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "FRESH TRUFFLE FRIES",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "FRESH TRUFFLE FRIES",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "COLLA",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "COLLA",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "FRESH TRUFFLE FRIES",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "BURRATA SALAD",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
  {
    product: "MUSHROOM CROQUETTE",
  branch: "Prego",
  branchreference: "Bo1",
  type: "Void",
  ordercreator: "Casheer1",
  approvedby: "Abdulwahab Dakheel",
  time: "December 01, 04:29pm",
  quantity: "1",
  amount: "SAR58",
  reason: "Customer Cancelled",
  iswasted: "Yes",
  },
];

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
function scxSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "product",
    numeric: false,
    disablePadding: true,
    label: "Product",
  },
  {
    id: "branch",
    numeric: true,
    disablePadding: false,
    label: "Branch",
  },
  {
    id: "branchreference",
    numeric: true,
    disablePadding: false,
    label: "Branch Reference",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "ordercreator",
    numeric: true,
    disablePadding: false,
    label: "Order Creator",
  },
  {
    id: "approvedby",
    numeric: true,
    disablePadding: false,
    label: "Approved By"
  },
  
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Time",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "reason",
    numeric: true,
    disablePadding: false,
    label: "Reason",
  },
  {
    id: "iswasted",
    numeric: true,
    disablePadding: false,
    label: "Is Wasted",
  },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
  } = props;
  

  return (
    <TableHead>
      <TableRow>
<>  {headCells.map((headCell) => (
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
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}</>
         
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
        <div className={`${cx.mainTitleRow} ${cx.topTable}`}>
          <ul className={`${cx.rightActionIcons}`}>
            <li>
              <button
                className={`${cx.filterBtn} btn`}
                onClick={() => {
                  handleShow("void return filter", true);
                  console.log("check");
                }}
              >
                <img src={iconFilter} className={`${st.icon}`} />
                Filters
              </button>
            </li>
            <li>
              <Dropdown className={`${cx.plusDropdown}`}>
                <Dropdown.Toggle id="dropdown-basic">
                  <BsPlusLg />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ul className={`${cx.dropDownUl} ${cx.dropScroll}`}>
                  <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" checked />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Unselect All
                      </label>
                    </li>
                    <li>
                      <label
                        className={`${cx.checkbox}`}
                      >
                        <input type="checkbox"  checked />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Product 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" checked />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Branch
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" checked />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Branch Reference 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Type 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Order Creator 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                         Apporved By 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        order Reference 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Time 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Quantity
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Amount 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Reason 
                      </label>
                    </li>
                    <li>
                      <label className={`${cx.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${cx.checkmark}`}></span>{" "}
                        Is Wasted 
                      </label>
                    </li>
                  </ul>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </Toolbar>
      <Modals show={show} handleClose={handleClose} modalName={modalName} />
    </>
  );
};

function EnhancedTable() {
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("product");

  // Avoid a layout jump when reaching the last page with empty rows.

  function redirectToAnotherPage(id: string) {
    navigate(`${id}`);
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="cxTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `scxSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {scxSort(rows, getComparator(order, orderBy)).map((row, index) => {
                  const labelId = `enhanced-cx-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.product}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {row.product}
                      </TableCell>
                      <TableCell align="left">{row.branch}</TableCell>
                      <TableCell align="left">{row.branchreference}</TableCell>
                      <TableCell align="left">{row.type}</TableCell>
                      <TableCell align="left">{row.ordercreator}</TableCell>
                      <TableCell align="left">{row.approvedby}</TableCell>
                      <TableCell align="left">{row.time}</TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
                      <TableCell align="left">{row.reason}</TableCell>
                      <TableCell align="left">{row.iswasted}</TableCell>
                    </TableRow>
                  );
                })}
        
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default function ReportsMoreVoidAndReturns() {
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
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          
          
        <NavLink to="/reports/report-more" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Voids and Returns</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Export />
              {/* <Groupname /> */}
              <Branches/>
              <BusinessDate />
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
          <Card>
            <Card.Body>
              <div className={`${cx.dataTableBox}`}>
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
