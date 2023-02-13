import React, { useEffect, useState } from "react";
import st from "../../style.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import table from "../../datatable.module.scss";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Box, Table } from "@mui/material";
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
import iconFilter from "../../images/icon-filter.svg";
import iconClose from "../../images/icon-close.svg";
import Modals from "../../components/Modals/InventoryTransfersM";
import { ActionDropdown, Export } from "./Dropdowns";
import ReactLoading from "react-loading";
import {
  inventoryTransferList,
  inventoryTransferListItems,
  transfer_get_source_destinationList,
  transfer_list_search_type,
} from "../../redux_toolkit/reducer/inventoryTransferApiReducer";
import { useDispatch, useSelector } from "react-redux";

interface Data {
  id: any;
  reference: any;
  source_name: any;
  destination_name: any;
  type: any;
  status: any;
  business_date: any;
  created_date: any;
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
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
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
    id: "reference",
    numeric: false,
    disablePadding: true,
    label: "Reference",
  },
  {
    id: "source_name",
    numeric: true,
    disablePadding: false,
    label: "Supplier",
  },
  {
    id: "destination_name",
    numeric: true,
    disablePadding: false,
    label: "Destination",
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "business_date",
    numeric: true,
    disablePadding: false,
    label: "Business Date",
  },
  {
    id: "created_date",
    numeric: true,
    disablePadding: false,
    label: "Created",
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
        <div className={`${table.mainTitleRow}`}>
          <ul className={`${table.filterList}`}>
            <li>
              <button className={`btn ${table.filterBtn} ${table.active}`}>
                All
              </button>{" "}
            </li>
            <li>
              <button className={`btn ${table.filterBtn}`}>Sending</button>{" "}
            </li>
            <li>
              <button className={`btn ${table.filterBtn}`}>Receiving</button>{" "}
            </li>
          </ul>
          <ul className={`${table.rightActionIcons}`}>
            <li>
              <button
                className={`${table.filterBtn} btn`}
                onClick={() => {
                  handleShow("transfer filter", true);
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
  const inventoryTransferShowList = useSelector(
    (state: any) => state.inventoryTransferApiReducer.inventoryTransferListCount
  );
  const transfer_addCount = useSelector(
    (state: any) => state.inventoryTransferApiReducer.transfer_addCount
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("source_name");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const [loaderStatus, setloaderStatus] = useState<any>(
    <ReactLoading type="cylon" color="#5498fd" />
  );
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    setloaderStatus(<ReactLoading type="cylon" color="#5498fd" />);
    const rowsData = inventoryTransferListItems?.map((item: any) => {
      return {
        id: item?.id,
        reference: item?.referance,
        source_name: item?.source_name,
        destination_name: item?.destination_name,
        type: item?.type,
        status: item?.status,
        business_date: item?.business_date,
        created_date: item?.created_date,
      };
    });
    setRows(rowsData);
    if (inventoryTransferListItems?.length === 0) {
      setloaderStatus(
        <h5 style={{ paddingTop: "15px" }}>
          Start adding your inventory items information to perform inventory
          transactions and use the items as your menu ingredients to track your
          business cost.
        </h5>
      );
    }
  }, [inventoryTransferShowList]);

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
      const newSelected = rows.map((n) => n?.id);
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

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  function defaultLabelDisplayedRows({ from, to, count }: any) {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  function redirectToAnotherPage(id: string) {
    navigate(`${id}`);
  }

  useEffect(() => {
    dispatch(inventoryTransferList(transfer_list_search_type));
    dispatch(transfer_get_source_destinationList());
  }, []);

  useEffect(() => {
    dispatch(inventoryTransferList(transfer_list_search_type));
  }, [transfer_addCount]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected?.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                      >
                        {row.reference ? row.reference : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.source_name ? row.source_name : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.destination_name ? row.destination_name : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.type ? row.type : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.status ? row.status : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.business_date ? row.business_date : "-"}
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          redirectToAnotherPage(row.id);
                        }}
                        align="left"
                      >
                        {row.created_date ? row.created_date : "-"}
                      </TableCell>
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
          count={rows?.length}
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

export default function Transfers() {
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

  return (
    <>
      <section className={`${st.pageWrapper}`}>
        <div className={`${st.pageTitle}`}>
          <div className={`${st.pageTitleRow}`}>
            <div className={`${st.rowTitleLeft}`}>
              <h5>Inventory Transfer</h5>
            </div>
            <div className={`${st.rowTitleRight}`}>
              <Export />

              <button
                className={`btn ${st.themeBtn}`}
                onClick={() => {
                  handleShow("new transfer", true);
                }}
              >
                New Transfer
              </button>
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
