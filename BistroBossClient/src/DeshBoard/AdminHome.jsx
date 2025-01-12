import React from "react";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid , PieChart, Pie, Legend} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: TotalCount = [] } = useQuery({
    queryKey: ["totaoCount"],
    queryFn: async () => {
      const { data } = await axiosSecure("/adminStats");
      return data;
    },
  });
  // pieChart
  const { data: chart = [] } = useQuery({
    queryKey: ["order-status"],
    queryFn: async () => {
      const res = await axiosSecure("/order-status");
      return res.data;
    },
  });
  // custom shape for the bar chart
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
  // [piechart]
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const pieChart = chart.map(data =>{
  return {name: data._id , value:data.revenue}
})
  return (
    <div className="w-2/3 mx-auto mt-10">
      <h2 className="text-3xl text-center">
        <span> Hi Welcome </span>
        {user?.displayName ? user?.displayName : "Back "}
      </h2>
      <div className="stats shadow flex ">
        {/* revenue */}
        <div className="stat">
          <div className="stat-figure text-secondary">{/*  icon  */}</div>
          <div className="stat-title">Revinew</div>
          <div className="stat-value">{TotalCount.revenue}$</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
        {/* 2nd */}
        <div className="stat">
          <div className="stat-figure text-secondary">{/*  icon */}</div>
          <div className="stat-title">User</div>
          <div className="stat-value">{TotalCount.user}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            {/* ekhane icon hobe */}
          </div>
          <div className="stat-title">Order</div>
          <div className="stat-value">{TotalCount.cartItem}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
        {/* 3rd */}
        <div className="stat">
          <div className="stat-figure text-secondary">
            {/* ekhanbe icon hob */}
          </div>
          <div className="stat-title">Menu Item</div>
          <div className="stat-value">{TotalCount.menuItem}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="1/2">
          <BarChart
            width={500}
            height={300}
            data={chart}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* id means category */}
            <XAxis dataKey="_id" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chart.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        {/* dddddddddddd */}
        <div className="w-1/2">
        <PieChart width={400} height={400}>
          <Pie
            data={pieChart}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChart.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend></Legend>
        </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
