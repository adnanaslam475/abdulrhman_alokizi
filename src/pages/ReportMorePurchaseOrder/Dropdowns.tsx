import React, { useState } from "react";
import st from "../../style.module.scss";
import icon2 from "../../images/icon-calendar.svg";
import icon4 from "../../images/icon-export.svg";
import { Dropdown } from "react-bootstrap";
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

export const Groupname = () => {
  return (

    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        Group By None
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li><NavLink to="#">None</NavLink></li>
          <li><NavLink to="#">Branch</NavLink></li>
          <li><NavLink to="#">Orde Source</NavLink></li>
          <li><NavLink to="#">Order Type</NavLink></li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const Branches = () => {
  return (

    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        <img src={icon4} className={`${st.icon}`} />
        Branches
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li><NavLink to="#">None</NavLink></li>
          <li><NavLink to="#">Cashier</NavLink></li>
          <li><NavLink to="#">Category</NavLink></li>
          <li><NavLink to="#">Charge</NavLink></li>
          <li><NavLink to="#">Combo</NavLink></li>
          <li><NavLink to="#">Creator</NavLink></li>
          <li><NavLink to="#">Customer</NavLink></li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
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
        Business  Date 
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
        Export
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li><NavLink to="#">To CSV</NavLink></li>
          <li><NavLink to="#">To Excel</NavLink></li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const ActionDropdown = () => {
  return (

    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        Actions
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <ul>
          <li><NavLink to="#">Add Tags</NavLink></li>
          <li><NavLink to="#">Remove Tags</NavLink></li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
