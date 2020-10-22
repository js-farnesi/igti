import React, { Component } from 'react';

export default class InputFullSalary extends Component {
  render() {
    const { color = 'black', value, percentage = 0, label } = this.props;

    // console.log(this.props);

    const formattedPercentage = percentage > 0 ? `(${percentage})` : '';
    const formattedValue = `${value} ${formattedPercentage}`;
    // console.log(formatedValue);

    return (
      <div className="input-field col s12 m6 l3">
        <input id="inputReadOnly" value={formattedValue} readOnly />
        <label className="active" htmlFor="inputReadOnly">
          {label}
        </label>
      </div>
    );
  }
}
