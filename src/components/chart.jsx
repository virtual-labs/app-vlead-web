import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
  BarChart,
  ComposedChart,
} from "recharts";
import {
  pageviews_per_month_data,
  Cummalative_pageviews_all_collages_data,
  Top5_Labs_data,
  Cummalative_pageviews_for_domains_data,
} from "./fetch";
import React, { useEffect, useState } from "react";

export const Pageviews_per_month = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [data1, setdata1] = useState({});
  useEffect(() => {
    const abcd = async () => {
      setdata1(await pageviews_per_month_data());
      setIsRegistered(true);
    };
    abcd();
  }, []);

  if (!isRegistered) return (
    <LineChart
      width={400}
      height={380}
      data={data1}
      margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
    ></LineChart>);
  const CustomYAxisLabel = ({ value }) => {
    const offset = 15;
    return (
      <text
        x={-120}
        y={offset}
        textAnchor="middle"
        dominantBaseline="hanging"
        transform="rotate(-90)"
        fontSize={20}
      >
        {value}
      </text>
    );
  };
  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number > 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  };
  return (
    <LineChart
      width={400}
      height={310}
      data={data1}
      margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
    >
      <XAxis dataKey="name" interval={51} />
      <YAxis
        dy={5}
        tickFormatter={DataFormater}
        label={<CustomYAxisLabel value={"Users"} />}
      />
      <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
      <Line
        type="monotone"
        dataKey="pageviews"
        name="Users per Week"
        dot={false}
      />
    </LineChart>
  );
};

export const Cummalative_pageviews_all_collages = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [data1, setdata1] = useState({});

  useEffect(() => {
    const abcd = async () => {
      setdata1(await Cummalative_pageviews_all_collages_data());
      setIsRegistered(true);
    };
    abcd();
  }, []);

  if (!isRegistered) return <></>;

  const CustomYAxisLabel = ({ value }) => {
    const offset = 15;
    return (
      <text
        x={-120}
        y={offset}
        textAnchor="middle"
        dominantBaseline="hanging"
        transform="rotate(-90)"
        fontSize={20}
      >
        {value}
      </text>
    );
  };

  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number > 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  };
  return (
    <LineChart
      width={400}
      height={380}
      data={data1}
      margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
    >
      <XAxis dataKey="name" interval={51} />
      <YAxis
        tickFormatter={DataFormater}
        type="number"
        domain={[0, 20000000]}
        name="sdchb"
        label={<CustomYAxisLabel value={"Pageviews"} />}
      ></YAxis>
      <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
      <Legend wrapperStyle={{ fontSize: 15, color: "white", marginLeft: 40 }} />
      <Line type="monotone" dataKey="AMRT" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="COEP" stroke="#82ca9d" dot={false} />
      <Line type="monotone" dataKey="DLBG" stroke="#ffc658" dot={false} />
      <Line type="monotone" dataKey="IIITH" stroke="#ff7f50" dot={false} />
      <Line type="monotone" dataKey="IITB" stroke="#00b5ad" dot={false} />
      <Line type="monotone" dataKey="IITD" stroke="#ffa07a" dot={false} />
      <Line type="monotone" dataKey="IITG" stroke="#008080" dot={false} />
      <Line type="monotone" dataKey="IITK" stroke="#ff6347" dot={false} />
      <Line type="monotone" dataKey="IITKGP" stroke="#1E90FF" dot={false} />
      <Line type="monotone" dataKey="IITR" stroke="#6A5ACD" dot={false} />
      <Line type="monotone" dataKey="NITK" stroke="#48D1CC" dot={false} />
    </LineChart>
  );
};
export const Top5_Labs = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [data1, setdata1] = useState({});

  useEffect(() => {
    const abcd = async () => {
      setdata1(await Top5_Labs_data());
      setIsRegistered(true);
    };
    abcd();
  }, []);

  if (!isRegistered) return <></>;
  const CustomYAxisLabel = ({ value }) => {
    const offset = 15;
    return (
      <text
        x={-120}
        y={offset}
        textAnchor="middle"
        dominantBaseline="hanging"
        transform="rotate(-90)"
        fontSize={20}
      >
        {value}
      </text>
    );
  };
  const DataFormater = (number) => {
    if (number > 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number > 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number > 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  };
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <ComposedChart
      width={400}
      height={300}
      data={data1}
      margin={{
        top: 20,
        right: 30,
        left: 20,
      }}
    >
      <XAxis
        dataKey="name"
        interval={0}
        tick={false}
        label={{
          value: "Labs",
          fontSize: "20px",
          fill: "black",
        }}
      />
      <YAxis
        tickFormatter={DataFormater}
        type="number"
        label={<CustomYAxisLabel value={"Pageviews"} />}
      />
      <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
      <Bar
        dataKey="pageviews"
        fill="#8884d8"
        shape={<TriangleBar />}
        stackId="a"
      >
        {data1.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 5]} />
        ))}
      </Bar>
      <Line type="monotone" dataKey="college" stroke="white" />
    </ComposedChart>
  );
};

export const Cummalative_pageviews_for_domains = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [data1, setdata1] = useState({});
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9F2B68"];
  useEffect(() => {
    const abcd = async () => {
      setdata1(await Cummalative_pageviews_for_domains_data());
      setIsRegistered(true);
    };
    abcd();
  }, []);

  if (!isRegistered) return <></>;
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "black",
            padding: "5px",
            border: "1px solid #cccc",
            color: "white",
          }}
        >
          {`${label} : ${payload[0].value}% :`}
        </div>
      );
    }
    return null;
  };
  const CustomYAxisLabel = ({ value }) => {
    const offset = 0;
    return (
      <text
        x={-120}
        y={offset}
        textAnchor="middle"
        dominantBaseline="hanging"
        transform="rotate(-90)"
        fontSize={20}
      >
        {value}
      </text>
    );
  };
  const CustomizedAxisTick = ({ x, y, payload }) => (
    <text x={x} y={y} dy={5} fontSize={14} textAnchor="end">
      {payload.value.length > 7
        ? `${payload.value.substring(0, 7)}...`
        : payload.value}
    </text>
  );
  return (
    <BarChart width={360} height={300} layout="vertical" data={data1}>
      <XAxis
        interval={0}
        tick={false}
        type="number"
        label={{
          value: "Percentage",
          fontSize: "20px",
          fill: "Black",
        }}
      />
      <YAxis
        width={100}
        dx={5}
        dataKey="name"
        interval={0}
        type="category"
        label={<CustomYAxisLabel value={"Domains"} />}
        tick={<CustomizedAxisTick />}
      />
      <Bar color="#9F2B68" dataKey="Percentage" nameKey="name">
        {data1.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
      <Tooltip content={<CustomTooltip />} />
    </BarChart>
  );
};
