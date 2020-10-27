import React, { Component } from 'react';
import Country from './Country';

import css from './countries.module.css';

export default class Countries extends Component {
  render() {
    const { countries } = this.props;

    return (
      <div className={`${css.border} ${css.flexRow}`}>
        {countries.map((country) => {
          return <Country key={country.id} country={country} />;
        })}
      </div>
    );
  }
}

// export default class Countries extends Component {
//   render() {
//     const { countries } = this.props;

//     return (
//       <div>
//         <ul>
//           {countries.map((country) => {
//             // return <li key={country.id}>{country.name}</li>;
//             return (
//               <li key={country.id}>
//                 <Country country={country} />
//               </li>
//             );
//           })}
//           <li></li>
//         </ul>
//       </div>
//     );
//   }
// }
