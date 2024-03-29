import React, { useCallback, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./ReportMoreShifts.module.scss";
import table from "../../datatable.module.scss";
import { Card, Button, Row, Col, Modal, Form, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Select, { components, ControlProps } from "react-select";
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
import icon1 from "../../images/icon-branch.svg";
import iconFilter from "../../images/icon-filter.svg";
import iconClose from "../../images/icon-close.svg";
import Modals from "../../components/Modals/ReportMoreShiftsM";

import { MdArrowBackIos, MdDeleteOutline } from "react-icons/md";

import { ActionDropdown, Export, Group } from "./Dropdowns";
import { BusinessDate } from "../Menucategories/Dropdowns";

interface Data {
  user: string;
  branch: string;
  branchreference: string;
  clockedinat: string;
  clockedoutat: string;
  shiftduration: string;
  
}

const rows = [
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
  },
  {
    user: "wh1",
    branch: "	فرع الاحساء",
    branchreference :"B01",
    clockedinat: "September 05, 11:45am",
    clockedoutat: "September 06, 06:00am",
    shiftduration: " 18:01"
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

// This method is created for  cross-browser compatibility, if you don't
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
    id: "user",
    numeric: false,
    disablePadding: true,
    label: "User ",
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
    label: " Branch Reference",
  },
  {
    id: "clockedinat",
    numeric: true,
    disablePadding: false,
    label: "Clocked In At",
  },
  {
    id: "clockedoutat",
    numeric: true,
    disablePadding: false,
    label: "Clocked  Out At ",
  },

  {
    id: "shiftduration",
    numeric: true,
    disablePadding: false,
    label: "Shift Duration",
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

  console.log(numSelected, "numSelected");

  return (
    <TableHead>
      <TableRow>
        {numSelected === 0 ? (
          <>
            {headCells.map((headCell: any) => (
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
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </>
        ) : (
          <>
            <TableCell className="p-0" style={{ width: "220px" }}>
              <div className={`${table.actionCheckbox}`}>
                <div className={`${table.selectedCount}`}>
                  {numSelected} Selected
                </div>
                <div className={`${table.actionDropdown}`}>
                  <ActionDropdown />
                </div>
              </div>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </>
        )}
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
                  handleShow("report more shifts filter", true);
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
  const navigate = useNavigate();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("user");
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
      const newSelected = rows.map((n) => n.user);
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
                  const isItemSelected = isSelected(row.user);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.user}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.user}
                      </TableCell>
                      <TableCell align="left">{row.branch}</TableCell>
                      <TableCell align="left">{row.branchreference}</TableCell>
                      <TableCell align="left">{row.clockedinat}</TableCell>
                      <TableCell align="left">{row.clockedoutat}</TableCell>
                      <TableCell align="left">{row.shiftduration}</TableCell>
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

export default function ReportMoreShifts() {
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
        <NavLink to="/reports/report-More" className={`${st.backBtn}`}>
            <MdArrowBackIos className={`${st.icon}`} /> Back
          </NavLink>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Shifts</h5>
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
