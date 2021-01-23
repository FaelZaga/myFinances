import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer>
        <LineChart data={this.props.data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="incomes" stroke="#0c61aa" strokeWidth={6} />
          <Line type="monotone" dataKey="expenses" stroke="#b91c1c" strokeWidth={6} />
          <Line type="monotone" dataKey="balance" stroke="#000" strokeWidth={6} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
