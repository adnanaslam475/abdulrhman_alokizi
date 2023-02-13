import React, { Children } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "12 PM",
    uv: 1520,
    pv: 1808,
    amt: 1100,
    cnt: 460
  },
  {
    name: "01 PM",
    uv: 4680,
    pv: 4680  ,
    amt: 989,
    cnt: 350
  },
  {
    name: "02 PM",
    uv: 1200,
    pv: 3986,
    amt: 1228,
    cnt: 480
  },
  {
    name: "03 PM",
    uv:2000 ,
    pv: 5402,
    amt: 1100,
    cnt: 460
  },
  {
    name: "04 PM",
    uv: 3000,
    pv: 1867,
    amt: 989,
    cnt: 350
  },
  {
    name: "05 PM",
    uv: 4000,
    pv: 2632,
    amt: 1228,
    cnt: 480
  },
  {
    name: "06 PM",
    uv: 1108,
    pv: 4683,
    amt: 1100,
    cnt: 460
  },
  {
    name: "07 PM",
    uv: 1098,
    pv: 3839,
    amt: 989,
    cnt: 350
  },
  {
    name: "08 PM",
    uv: 1200,
    pv: 7829,
    amt: 1228,
    cnt: 480
  },
  {
    name: "09 PM",
    uv: 3292,
    pv: 2282,
    amt: 1100,
    cnt: 460
  },
  {
    name: "10 PM",
    uv: 0,
    pv: 1108,
    amt: 1100,
    cnt: 460
  },
  {
    name: "11 PM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "12 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "01 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "02 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "03 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "04 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "05 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "06 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "07 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "08 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "09 AM",
    uv: 1108,
    pv: 0,
    amt: 1100,
    cnt: 460
  },
  {
    name: "10 AM",
    uv: 8000,
    pv: 1626,
    amt: 1100,
    cnt: 460
  },
  {
    name: "11 AM",
    uv: 9000,
    pv: 3827,
    amt: 1100,
    cnt: 460
  }
];



export default function BarChart() {
  return (
    <ResponsiveContainer width={'99%'} height={400}>
      <ComposedChart
        data={data}
        margin={{ top: 50, bottom: 10 }}
      >
               <XAxis dataKey="name" />
          <YAxis />
        <Tooltip />
        <Bar dataKey="pv" barSize={25} fill="#5498FD" />
      </ComposedChart>
    </ResponsiveContainer >
  );
}

