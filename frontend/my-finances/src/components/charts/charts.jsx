import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
    {
        name: 'AUGUST', Incomes: 4000, Expenses: 2400, Balance: 2400,
    },
    {
        name: 'SEPTEMBER', Incomes: 3000, Expenses: 1398, Balance: 2210,
    },
    {
        name: 'OCTOBER', Incomes: 2000, Expenses: 2800, Balance: 2290,
    },
    {
        name: 'NOVEMBER', Incomes: 2780, Expenses: 1908, Balance: 2000,
    },
    {
        name: 'DECEMBER', Incomes: 1890, Expenses: 1800, Balance: 2181,
    },
    {
        name: 'TODAY', Incomes: 2390, Expenses: 2800, Balance: 2500,
    }
];

export default class Example extends PureComponent {

  render() {
    return (
      <LineChart
        width={1200}
        height={400}
        data={data}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Incomes" stroke="#0c61aa" strokeWidth={7} />
        <Line type="monotone" dataKey="Expenses" stroke="#b91c1c" strokeWidth={7} />
        <Line type="monotone" dataKey="Balance" stroke="#000" strokeWidth={7} />
      </LineChart>
    );
  }
}
