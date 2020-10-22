import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';

export default class Counter extends Component {
  constructor() {
    super();

    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  // handleButtonDownClick = () => {
  //   const { currentCounter, steps } = this.state;

  //   this.setState({
  //     currentCounter: currentCounter - 1,
  //     steps: steps + 1,
  //   });
  // };

  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state;

    //   this.setState({
    //     currentCounter: currentCounter + 1,
    //     steps: steps + 1,
    //   });
    // };

    this.setState({
      currentCounter:
        clickType === '+' ? currentCounter + 1 : currentCounter - 1,
      steps: steps + 1,
    });
  };

  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <span className={css.counterValue}>{currentCounter}</span>
        <IncrementButton onIncrement={this.handleButtonClick} />
        <span className={css.counterValue}>({steps})</span>
      </div>
    );
  }
}
