import React, { Fragment, useState } from 'react';
import Counter from './components/Counter/Counter';
import Counter2 from './components/Counter/Counter2';
import Band from './components/Band';

export default function App() {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentCounter: 3,
  //     steps: 0,
  //   };
  // }
  const [currentCounter, setCurrentCounter] = useState(3);
  const [steps, setSteps] = useState(0);

  const handleCount = (clickType) => {
    const counter = clickType === '+' ? currentCounter + 1 : currentCounter - 1;
    setCurrentCounter(counter);
    setSteps(steps + 1);
    // this.setState({
    //   currentCounter:
    //     clickType === '+' ? currentCounter + 1 : currentCounter - 1,
    //   steps: steps + 1,
    // });
  };

  return (
    <Fragment>
      <h3>Band</h3>
      <Band />

      <h3>Counter</h3>
      <Counter />
      <Counter />
      <Counter />

      <h3>Counter 2</h3>
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
      <Counter2
        onCount={handleCount}
        countValue={currentCounter}
        currentStep={steps}
      />
    </Fragment>
  );
}

// import React from 'react';
// import Counter from './components/counter/Counter';

// function App() {
//   /**
//    * Renderizo abaixo 3 componentes Counter.
//    * Perceba que eles são independentes, ou seja
//    * cada um deles gerencia o seu próprio estado
//    */
//   return (
//     <div>
//       <Counter />
//       <Counter />
//       <Counter />
//     </div>
//   );
// }

// export default App;
