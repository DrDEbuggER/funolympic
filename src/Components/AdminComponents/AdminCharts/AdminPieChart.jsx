import {ResponsiveContainer, PieChart, Pie, Cell} from 'recharts'

export const AdminPieChart = ({data}) => {
    // const data = [
    //     { name: 'New Users', Total: 50},
    //     { name: 'Active Users', Total: 1200},
    //     { name: 'Banned Users', Total: 100},
    //   ];
    const COLORS = ["#00C49F","#FA9494", "#FF8042"];
    return (
        <ResponsiveContainer height={"100%"} width={"100%"}> 
            <PieChart>
                <Pie data={data} height={250} width={400} startAngle={-180} endAngle={270} dataKey="Total" fill="#00C49F" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label paddingAngle="5">
                {
                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}