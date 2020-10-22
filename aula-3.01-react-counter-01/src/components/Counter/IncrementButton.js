import React, { Component } from 'react';

export default class IncrementButton extends Component {
  handleButtonClick = () => {
    this.props.onIncrement('+');
  };

  render() {
    // console.log(this.props);
    return (
      <button
        // onClick={this.handleButtonUpClick}
        // no this então passamos a receber o props.onIncrement o que não é muito legal, está muito direto
        // onClick={this.props.onIncrement}
        // Mas é boa prática colocar o
        onClick={this.handleButtonClick}
        className="waves-effect waves-light btn green darken-4"
      >
        +
      </button>
    );
  }
}
