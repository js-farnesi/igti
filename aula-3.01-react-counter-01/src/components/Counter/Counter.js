import React, { Component } from 'react';
import css from './counter.module.css';

export default class Counter extends Component {
  constructor() {
    super();

    this.currentCounter = 2;
  }

  handleClick = () => {
    console.log('click');
    //não reflete a alteração de valor, nem chamando o render() porque o atributo this.currentCounter = 2; é inútil para o React que trabalha com o state
    this.currentCounter--;
    this.render();
  };

  render() {
    return (
      <div className={css.counterContainer}>
        <button
          onClick={this.handleClick}
          className="waves-effect waves-light btn red darken-4"
        >
          +
        </button>
        <span className={css.counterValue}>{this.currentCounter}</span>
        <button className="waves-effect waves-light btn green darken-4">
          -
        </button>
      </div>
    );
  }
}
