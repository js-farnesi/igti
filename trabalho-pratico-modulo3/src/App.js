import React, { Component } from 'react';
import InputFullSalary from './components/InputFullSalary';
import { calculateSalaryFrom } from './helpers/salary';
import InputReadOnly from './components/InputReadOnly';
import ProgressBarSalary from './components/ProgressBarSalary';

const COLOR_DESC_INSS = '#e67e22';
const COLOR_DESC_IRPF = '#c0392b';
const COLOR_NET_SALARY = '#16a085';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
  }
  handleFullSalaryChange = (newValue) => {
    this.setState({ fullSalary: newValue });
  };
  render() {
    const { fullSalary } = this.state;

    const salaryObject = calculateSalaryFrom(fullSalary);

    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
      percentINSS,
      percentIRPF,
      percentNetSalary,
    } = salaryObject;
    // console.log(salaryObject);

    return (
      <div className="container">
        <h1>Trabalho prático - Módulo 3</h1>
        <div className="row">
          <InputFullSalary
            currentValue={fullSalary}
            onSalaryChange={this.handleFullSalaryChange}
          />
        </div>
        <div className="row">
          <InputReadOnly label="Base INSS" value={baseINSS} />
          <InputReadOnly
            label="Desconto INSS"
            value={discountINSS}
            percentage={percentINSS}
            color={COLOR_DESC_INSS}
          />
          <InputReadOnly label="Base IRPF" value={baseIRPF} />
          <InputReadOnly
            label="Desconto IRPF"
            value={discountIRPF}
            percentage={percentIRPF}
            color={COLOR_DESC_IRPF}
          />
          <InputReadOnly
            label="Salário líquido"
            value={netSalary}
            percentage={percentNetSalary}
            color={COLOR_NET_SALARY}
          />
        </div>

        <ProgressBarSalary
          percentINSS={percentINSS}
          colorINSS={COLOR_DESC_INSS}
          percentIRPF={percentIRPF}
          colorIRPF={COLOR_DESC_IRPF}
          percentNetSalary={percentNetSalary}
          colorNetSalary={COLOR_NET_SALARY}
        />
      </div>
    );
  }
}
