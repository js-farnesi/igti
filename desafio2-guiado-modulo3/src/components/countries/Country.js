import React, { Component } from 'react';

// export default class Country extends Component {
//   render() {
//     const { country } = this.props;
//     return <div>{country.name}</div>;
//   }
// }

import css from './countries.module.css';

export default class Country extends Component {
  render() {
    const { country } = this.props;
    const { name, flag } = country;

    return (
      <div className={`${css.country} ${css.border}`}>
        <img className={css.flag} src={flag} alt={name} />
        <span className={css.countryName}>{name}</span>
      </div>
    );
  }
}
