import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";

export const SimpleDropDown = ({ options }: any, props:any) => {
  const [age, setAge] = React.useState(props?.data);
  const dispatch = useDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event,"event")
    setAge(event.target.value);
  };
  return (
    <Fragment>
      <Box sx={{ minWidth: "100%" }}>
        <TextField
          id="outlined-select-currency"
          select
          sx={{ width: "100%", borderRadius: "50px 50px 0 0" }}
          defaultValue={age}
          onChange={handleChange}
        >
          {options.map((item: any, index:number) => (
            <MenuItem key={index} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Fragment>
  );
};
