import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import st from "../../style.module.scss";
import icon1 from "../../images/icon-branch.svg";
import icon2 from "../../images/icon-calendar.svg";
import icon3 from "../../images/icon-call.svg";
import icon4 from "../../images/icon-export.svg";
import cx from "./Menucategories.module.scss";
import {
  Modal,
  Row,
  Col,
  Form,
  Dropdown,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import { Box, ChakraProvider, VStack, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  Calendar,
  CalendarDefaultTheme,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
} from "@uselessdev/datepicker";
import { addDays, subDays } from "date-fns";
// import axios from "axios";
import {
  // categoryListItems,
  // categoryList,
  // editMenuCategory,
  filterValue,
  multiDeleteCategory,
} from "../../redux_toolkit/reducer/menuCategoriesApiReducer";
import { useDispatch } from "react-redux";

export const Branches = () => {
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
    <div className={`${st.selectDropdown}`}>
      <MultiSelect
        options={options}
        defaultIsOpen={true}
        valueRenderer={customValueRenderer}
        value={selected}
        onChange={setSelected}
        labelledBy={"All Branches"}
        isCreatable={true}
        closeOnChangedValue={true}
      />
    </div>
  );
};

export const CustomContent = () => {
  const [dates, setDates] = React.useState({});

  const handleSelectDate = (dates: any) => setDates(dates);

  const today = new Date();

  const todays_date = () =>
    setDates({
      start: today,
      end: today,
    });

  const yesterday_date = () =>
    setDates({
      start: subDays(today, 1),
      end: subDays(today, 1),
    });

  const addSevenDays = () =>
    setDates({
      start: today,
      end: addDays(today, 7),
    });

  const subSevenDays = () =>
    setDates({
      start: subDays(today, 7),
      end: today,
    });
  const addMonthDays = () =>
    setDates({
      start: today,
      end: addDays(today, 30),
    });

  const subMonthDays = () =>
    setDates({
      start: subDays(today, 30),
      end: today,
    });

  return (
    <ChakraProvider theme={CalendarDefaultTheme}>
      <Calendar value={dates} onSelectDate={handleSelectDate}>
        <VStack
          spacing={4}
          bgColor="gray.50"
          p={4}
          alignItems="stretch"
          borderEndRadius="md"
          flex={1}
        >
          <Button
            onClick={todays_date}
            colorScheme="white"
            color="black"
            size="xs"
          >
            Today
          </Button>
          <Button
            onClick={yesterday_date}
            colorScheme="white"
            color="black"
            size="xs"
          >
            Yesterday
          </Button>
          <Button
            onClick={addSevenDays}
            colorScheme="white"
            color="black"
            size="xs"
          >
            This Week
          </Button>
          <Button
            onClick={subSevenDays}
            colorScheme="white"
            color="black"
            size="xs"
          >
            Last Week
          </Button>
          <Button
            onClick={addMonthDays}
            colorScheme="white"
            color="black"
            size="xs"
          >
            This Month
          </Button>
          <Button
            onClick={subMonthDays}
            colorScheme="white"
            color="black"
            size="xs"
          >
            Last Month
          </Button>
        </VStack>
        <Box position="relative">
          <CalendarControls>
            <CalendarPrevButton />
            <CalendarNextButton />
          </CalendarControls>

          <CalendarMonths>
            <CalendarMonth>
              <CalendarMonthName />
              <CalendarWeek />
              <CalendarDays />
            </CalendarMonth>
          </CalendarMonths>
        </Box>
      </Calendar>
    </ChakraProvider>
  );
};

export const BusinessDate = () => {
  return (
    <Dropdown className={`${st.calendarDropdown}`}>
      <Dropdown.Toggle id="dropdown-basic">
        <img src={icon2} className={`${st.icon}`} />
        Business Date
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <CustomContent />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const Export = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <img src={icon4} className={`${st.icon}`} />
        ExportExport / Import
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li>
            <NavLink to="#">Import categories</NavLink>
          </li>
          <li>
            <NavLink to="#">Export categories</NavLink>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ActionDropdown = (props: any) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
        <Dropdown.Menu>
          <ul>
            <li>
              <NavLink
                to="#"
                onClick={() => {
                  setShow(true);
                }}
              >
                {filterValue.type === "All" ? "Delete" : "Restore"}
              </NavLink>
            </li>
          </ul>
        </Dropdown.Menu>
      </Dropdown>

      <Modal className={`${cx.ctsModal}`} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={12} lg={12}>
              <Form.Group className={`${cx.formField}`}>
                <Form.Label>
                  Are you sure you want to delete this item?
                </Form.Label>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div></div>
          <div>
            <Button
              className={`${cx.btnClose}`}
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </Button>
            <Button
              className={`${cx.btnSubmit}`}
              style={{ backgroundColor: "#FA8072", borderColor: "#FA8072" }}
              onClick={() => {
                filterValue.type === "All"
                  ? dispatch(
                      multiDeleteCategory({
                        cat_ids: props.selectedId.join(","),
                        type: "delete",
                      })
                    )
                  : dispatch(
                      multiDeleteCategory({
                        cat_ids: props.selectedId.join(","),
                        type: "restore",
                      })
                    );
                handleClose();
              }}
            >
              Apply
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
