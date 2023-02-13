import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Reportsmenuengineering.module.scss";
import table from "../../datatable.module.scss";
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
import Modals from "../../components/Modals/ReportsMenuengineeringM";

import { Branches, BusinessDate, Export, ActionDropdown } from "./Dropdowns";

interface Data {
  product: string;
  sales: string;
  quantity: string;
  totalcost: string;
  itemprofit: string;
  totalprofit: string;
}

const rows = [
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
  },
  {
    product: "ايسكريم ليمون - Lemon Ice Cream",
    sales: "SAR 1,847.83",
    quantity: "77",
    totalcost: "SAR 0",
    itemprofit: "SAR 30.43",
    totalprofit: "SAR 474.78",
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
    id: "product",
    numeric: false,
    disablePadding: true,
    label: "Product",
  },
  {
    id: "sales",
    numeric: true,
    disablePadding: false,
    label: "Sales",
  },
  {
    id: "quantity",
    numeric: true,
    disablePadding: false,
    label: "Quantity",
  },
  {
    id: "totalcost",
    numeric: true,
    disablePadding: false,
    label: "Total Cost",
  },
  {
    id: "itemprofit",
    numeric: true,
    disablePadding: false,
    label: "Item Profit",
  },
  {
    id: "totalprofit",
    numeric: true,
    disablePadding: false,
    label: "Total Profit",
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
    rowCount,
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
        <div className={`${table.mainTitleRow} ${cx.topTable}`}>
          <ul className={`${table.rightActionIcons}`}>
            <li>
              <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("order filter", true);
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
                        Product
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" checked />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Sales
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Quantity
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Total Cost
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Item Profit
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Total Profit
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        (Profit Percentage %)
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Popularity
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Profit Category
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

  function redirectToAnotherPage(id: string) {
    navigate(`${id}`);
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar />
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
              {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

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
                      <TableCell align="left">{row.sales}</TableCell>
                      <TableCell align="left">{row.quantity}</TableCell>
                      <TableCell align="left">{row.totalcost}</TableCell>
                      <TableCell align="left">{row.itemprofit}</TableCell>
                      <TableCell align="left">{row.totalprofit}</TableCell>
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

export default function Reportssales() {
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
              <h5>Menu Engineering</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Export />
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
