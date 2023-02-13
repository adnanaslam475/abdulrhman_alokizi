import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Reportsspeedservice.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillInfoCircle } from 'react-icons/ai';
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
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { BsPlusLg } from "react-icons/bs";
import icon1 from "../../images/icon-branch.svg";
import iconFilter from "../../images/icon-filter.svg";
import Modals from "../../components/Modals/ReportsSpeedserviceM";

import { Groupname, BusinessDate, Export, ActionDropdown } from "./Dropdowns";

interface Data {
  branch: string;
  averageordertakingtime: string;
  averageorderprice: string;
  averagedelay: string;
  maximumdelay: string;
  ordercount: string;
}

const rows = [
  {
    branch: "فرع الاحساء",
    averageordertakingtime: "-",
    averageorderprice: "SAR 64.22",
    averagedelay: "-",
    maximumdelay: "-",
    ordercount: "702"

  },
  {
    branch: "فرع الاحساء",
    averageordertakingtime: "-",
    averageorderprice: "SAR 64.22",
    averagedelay: "-",
    maximumdelay: "-",
    ordercount: "702"

  },
  {
    branch: "فرع الاحساء",
    averageordertakingtime: "-",
    averageorderprice: "SAR 64.22",
    averagedelay: "-",
    maximumdelay: "-",
    ordercount: "702"

  },
  {
    branch: "فرع الاحساء",
    averageordertakingtime: "-",
    averageorderprice: "SAR 64.22",
    averagedelay: "-",
    maximumdelay: "-",
    ordercount: "702"

  },
  {
    branch: "فرع الاحساء",
    averageordertakingtime: "-",
    averageorderprice: "SAR 64.22",
    averagedelay: "-",
    maximumdelay: "-",
    ordercount: "702"

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
function stableSort<T>(
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
    id: "branch",
    numeric: false,
    disablePadding: true,
    label: "Branch",
  },
  {
    id: "averageordertakingtime",
    numeric: true,
    disablePadding: false,
    label: "Average Order Taking Time",
  },
  {
    id: "averageorderprice",
    numeric: true,
    disablePadding: false,
    label: "Average Order Price",
  },
  {
    id: "averagedelay",
    numeric: true,
    disablePadding: false,
    label: "Average Delay",
  },
  {
    id: "maximumdelay",
    numeric: true,
    disablePadding: false,
    label: "Maximum Delay",
  },
  {
    id: "ordercount",
    numeric: true,
    disablePadding: false,
    label: "Order Count",
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
              {headCell.label} <AiFillInfoCircle/>
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
        <div className={`${table.mainTitleRow} ${cx.topTable}`}>
          <ul className={`${table.rightActionIcons}`}>
            <li>
              <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("speed filter", true);
                  console.log("check");
                }}
              >
                <img src={iconFilter} className={`${st.icon}`} />
                Filters
              </button>
            </li>
            <li>
              <Dropdown className={`${table.plusDropdown}`}>
                <Dropdown.Toggle id="dropdown-basic">
                  <BsPlusLg />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ul className={`${table.dropDownUl} ${cx.dropScroll}`}>
                  <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" checked />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Unselect All
                      </label>
                    </li>
                    <li>
                      <label
                        className={`${table.checkbox} ${table.disabled}`}
                      >
                        <input type="checkbox" disabled checked />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Branch
                      </label>
                    </li>
                    <li>
                      <label
                        className={`${table.checkbox}`}
                      >
                        <input type="checkbox"  checked />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Average Order Taking Time
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" checked />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Average Order Price
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" checked />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Average Delay
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Maximum Delay
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Order Count
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Delayed Order Count
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Net Sales
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Unique Agents Count
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Average Acceptance Time
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
  const [orderBy, setOrderBy] = React.useState<keyof Data>("branch");

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
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.branch}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {row.branch}
                      </TableCell>
                      <TableCell align="left">{row.averageordertakingtime}</TableCell>
                      <TableCell align="left">{row.averageorderprice}</TableCell>
                      <TableCell align="left">{row.averagedelay}</TableCell>
                      <TableCell align="left">{row.maximumdelay}</TableCell>
                      <TableCell align="left">{row.ordercount}</TableCell>
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

export default function Reportsspeedservice() {
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
          
          
        <NavLink to="/reports/analysis" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Speed of Service</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Export />
              <Groupname />
              <BusinessDate />
            </div>
          </div>
        </div>

        <div className={`${st.pageWrapperInside}`}>
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
