import React, { Component } from 'react';
import { getNewTimestamp } from './helpers/dateTimeHelper';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      clickArray: [],
    };
  }

  handleClick = () => {
    // perigoso fazer a variável receber o this.state.clickArray
    // objeto na memória aponta para o endereço na memória, não é feito uma cópia diretamente
    // const newClickArray = this.state.clickArray;
    const newClickArray = Object.assign([], this.state.clickArray);
    newClickArray.push(getNewTimestamp());

    this.setState({ clickArray: newClickArray });
  };

  componentDidUpdate() {
    document.title = this.state.clickArray.length.toString();
  }

  render() {
    const { clickArray } = this.state;
    return (
      <div>
        <h1>
          React e <em>class Components</em>
        </h1>

        <button onClick={this.handleClick}>Clique aqui</button>

        <ul>
          {clickArray.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
