import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 100 },
    { name: "Group D", value: 300 },
];
const COLORS = ["#6ED73E", "#A5A6F6", "#094D46", "#F178B6"];

class CustomChart extends PureComponent {
    static demoUrl =
        "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o";

    render() {
        return (
            <PieChart width={800} height={400} >
                <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={1}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        );
    }
}


export default CustomChart;