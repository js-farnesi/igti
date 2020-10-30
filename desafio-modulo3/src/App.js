import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Installments from './components/Installments';

export default function App() {
  const [initialValue, setInitialValue] = useState(1000);
  const [monthlyInterest, setMonthlyInterest] = useState(0.5);
  const [monthlyPeriod, setMonthlyPeriod] = useState(1);
  // quanto menos variáveis de estado melhor
  // const [installments, setInstallments] = useState([]);

  useEffect(() => {
    calculateInterest(initialValue, monthlyInterest, monthlyPeriod);
  }, [initialValue, monthlyInterest, monthlyPeriod]);

  const calculateInterest = (initialValue, monthlyInterest, monthlyPeriod) => {
    const newInstallments = [];

    let currentId = 1;
    let currentValue = initialValue;
    let percentage = 0;

    for (let i = 1; i <= monthlyPeriod; i++) {
      const percentValue = (currentValue * Math.abs(monthlyInterest)) / 100;

      currentValue =
        monthlyInterest >= 0
          ? currentValue + percentValue
          : currentValue - percentValue;

      percentage = (currentValue / initialValue - 1) * 100;

      newInstallments.push({
        id: currentId++,
        value: currentValue,
        difference: currentValue - initialValue,
        percentage,
        profit: monthlyInterest > 0,
      });
    }
    setInstallments(newInstallments);
  };

  const handleChangeData = (newValue, newInterest, newPeriod) => {
    if (newValue !== null) {
      setInitialValue(newValue);
      return;
    }

    if (newInterest !== null) {
      setMonthlyInterest(newInterest);
      return;
    }

    setMonthlyPeriod(newPeriod);
  };

  // Para pegar o valor atualizado coloque antes do return e não dentro da função
  // console.log(newInstallments);

  return (
    <div>
      <h1>React Juros Compostos</h1>
      <Form
        data={{ initialValue, monthlyInterest, monthlyPeriod }}
        // o prefixo on sabe que não é dado, é um evento
        onChangeData={handleChangeData}
      />
      <Installments data={installments} />
    </div>
  );
}
