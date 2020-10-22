import React, { Component } from 'react';
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import Steps from './Steps';
import Value from './Value';

export default class Counter2 extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentCounter: 2,
  //     steps: 0,
  //   };
  // }

  // handleButtonClick = (clickType) => {
  //   const { currentCounter, steps } = this.state;

  //   this.setState({
  //     currentCounter:
  //       clickType === '+' ? currentCounter + 1 : currentCounter - 1,
  //     steps: steps + 1,
  //   });
  // };
  handleButtonClick = (clickType) => {
    console.log(clickType);
    this.props.onCount(clickType);
  };

  render() {
    const { countValue, currentStep } = this.props;

    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={countValue} />
        <IncrementButton onIncrement={this.handleButtonClick} />
        <Steps currentStep={currentStep} />
      </div>
    );
  }
}
