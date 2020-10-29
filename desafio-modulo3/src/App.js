import React, { useState, useEffect } from 'react';
import Form from './components/Form';

export default function App() {
  const [initialValue, setInitialValue] = useState(1000);
  const [monthlyInterest, setMonthlyInterest] = useState(1);
  const [monthlyPeriod, setMonthlyPeriod] = useState(1);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    calculateInterest(initialValue, monthlyInterest, monthlyPeriod);
  }, [initialValue, monthlyInterest, monthlyPeriod]);

  const calculateInterest = (initialValue, monthlyInterest, monthlyPeriod) => {
    const newInstallments = [];

    let currentId = 1;
    let currentValue = initialValue;
    let percentage = 0;

    for (let i = 1; i <= monthlyPeriod; i++) {
      const percentValue = (currentValue * monthlyInterest) / 100;

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

  return (
    <div>
      <h1>React Juros Compostos</h1>)
      <Form
        data={{ initialValue, monthlyInterest, monthlyPeriod }}
        onChangeData={handleChangeData}
      />
    </div>
  );
}
