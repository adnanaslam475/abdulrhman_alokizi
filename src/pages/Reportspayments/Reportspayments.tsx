import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./Reportspayments.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Select, {
  components,
  ControlProps,
  Props,
  StylesConfig,
} from "react-select";
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
import Modals from "../../components/Modals/ReportsPaymentsM";
import { Branches, BusinessDate, Export, ActionDropdown } from "./Dropdowns";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const datas = [
  {
    name: 'Shabaka',
    pv: 800,
  },
  {
    name: 'Cash',
    pv: 967,
  },
];


interface Data {
  paymentmethod: string;
  amount: string;
  count: string;
  returnamount: string;
  returncount: string;
  netamount: string;
  tips: string;
}

const rows = [
  {
    paymentmethod: "Shabaka",
    amount: "SAR 5,974",
    count: "614",
    returnamount: "SAR 0",
    returncount: "0",
    netamount: "SAR 5,974",
    tips: "SAR 0",
  },
  {
    paymentmethod: "Shabaka",
    amount: "SAR 5,974",
    count: "614",
    returnamount: "SAR 0",
    returncount: "0",
    netamount: "SAR 5,974",
    tips: "SAR 0",
  },
  {
    paymentmethod: "Shabaka",
    amount: "SAR 5,974",
    count: "614",
    returnamount: "SAR 0",
    returncount: "0",
    netamount: "SAR 5,974",
    tips: "SAR 0",
  },
  {
    paymentmethod: "Shabaka",
    amount: "SAR 5,974",
    count: "614",
    returnamount: "SAR 0",
    returncount: "0",
    netamount: "SAR 5,974",
    tips: "SAR 0",
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
    id: "paymentmethod",
    numeric: false,
    disablePadding: true,
    label: "Payment Method",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Amount",
  },
  {
    id: "count",
    numeric: true,
    disablePadding: false,
    label: "Count",
  },
  {
    id: "returnamount",
    numeric: true,
    disablePadding: false,
    label: "Return Amount",
  },
  {
    id: "returncount",
    numeric: true,
    disablePadding: false,
    label: "Return Count",
  },
  {
    id: "netamount",
    numeric: true,
    disablePadding: false,
    label: "Net Amount",
  },
  {
    id: "tips",
    numeric: true,
    disablePadding: false,
    label: "Tips",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

   

  return (

    <TableHead>
      <TableRow>

    
        {numSelected === 0 ? <>  {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "left" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
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
          : <>
          </>}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

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
                        Branch
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" checked />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Branch Reference
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Gross Sales
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        (Gross Sales %)
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Net Sales With Tax
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Taxes
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Discount Amount
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Gross Sales Without Tax
                      </label>
                    </li>
                    <li>
                      <label className={`${table.checkbox}`}>
                        <input type="checkbox" />
                        <span className={`${table.checkmark}`}></span>{" "}
                        Net Sales
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
  const [orderBy, setOrderBy] = React.useState<keyof Data>("paymentmethod");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.paymentmethod);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const TablePaginationActions = (event: any) => {
    console.log(event, "TablePaginationActions");
    return (
      <>
        <div className={`${table.pagination}`}></div>
      </>
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function defaultLabelDisplayedRows({ from, to, count }: any) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  function redirectToAnotherPage(id: string) {
    navigate(`${id}`);
  }
  return (

    <Box sx={{ width: "100%" }}>
        <ResponsiveContainer   width={'100%'} height={300}>
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={datas}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="pv" barSize={20} fill="#413ea0" />
          <Line dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>

      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.paymentmethod);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.paymentmethod)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.paymentmethod}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {row.paymentmethod}
                      </TableCell>
                      <TableCell align="left">{row.amount}</TableCell>
                      <TableCell align="left">{row.count}</TableCell>
                      <TableCell align="left">{row.returnamount}</TableCell>
                      <TableCell align="left">{row.returncount}</TableCell>
                      <TableCell align="left">{row.netamount}</TableCell>
                      <TableCell align="left">{row.tips}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          count={rows.length}
          // component={TablePaginationActions}
          labelDisplayedRows={defaultLabelDisplayedRows}
          labelRowsPerPage=" "
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default function Reportspayments() {
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
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Payments</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Export />

              <Branches />

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
