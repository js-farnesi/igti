import React, { Component } from 'react';

export default class Toogle extends Component {
  handleChange = (event) => {
    // console.log(event.target.checked);
    const { onToogle } = this.props;
    // console.log(this.props);

    const isChecked = event.target.checked;
    onToogle(isChecked);
  };

  render() {
    const { enable, description } = this.props;
    return (
      <div className="switch">
        <label>
          {description}
          <input
            type="checkbox"
            checked={enable}
            onChange={this.handleChange}
          />
          <span className="lever"></span>
        </label>
      </div>
    );
  }
}
