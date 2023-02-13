import { borderRadius } from "@mui/system";
import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip
} from "recharts";



export default function AreaCharts({data}:any) {
  return (
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={<CustomTooltip />} />
      <Area type="monotone" dataKey="uv" stroke="#5498FD" fill="#5498FD"/>
    </AreaChart>
  );
}


const CustomTooltip = ({ payload, label }: any) => {
      return (
        <div className="custom-tooltip" style={{background:'black',color:'white', width:'140px', height: '70px', borderRadius:'10px', textAlign:'center', paddingTop:'10px'}}>
            Date:<br />
          <p className="intro">SAR {label}</p>
        </div>
      );
  };