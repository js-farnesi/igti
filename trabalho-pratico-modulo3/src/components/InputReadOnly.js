import React, { Component } from 'react';
import { formatMoney, formatPercentage } from '../helpers/formatters';

export default class InputFullSalary extends Component {
  render() {
    const { color = 'black', value, percentage = 0, label } = this.props;

    // ID dinâmico para evitar problemas, uma vez que não temos looping
    const id = 'input' + label;
    // console.log(this.props);

    const formattedPercentage =
      percentage > 0 ? `(${formatPercentage(percentage)})` : '';
    const formattedValue = `${formatMoney(value)} ${formattedPercentage}`;
    // console.log(formatedValue);

    return (
      <div className="input-field col s12 m6 l3">
        <input
          id={id}
          value={formattedValue}
          readOnly
          style={{ color, fontWeight: 'bold' }}
        />
        <label className="active" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
}
