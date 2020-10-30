import React from 'react';
import {
  formatPercentage,
  formatMoney,
  formatMoneyPositiveNegative,
} from '../helpers/formatHerlpers';

export default function Installment({ data }) {
  const { id, value, difference, percentage, profit } = data;

  const classGoodValue = 'green-text darken-4';
  const classGoodPercentage = 'blue-text darken-4';
  const classBadValue = 'red-text darken-4';
  const classBadPercentage = 'orange-text darken-4';

  const classValue = profit ? classGoodValue : classBadValue;
  const classPercentage = profit ? classGoodPercentage : classBadPercentage;

  return (
    <div className="col s6 m3 l2">
      <div style={styles.flexRow}>
        <span style={{ marginRight: '7px' }}>{id}</span>
        <div>
          <div className={classValue}>{formatMoney(value)}</div>
          <div className={classValue}>
            {formatMoneyPositiveNegative(difference)}
          </div>
          <div className={classPercentage}>{formatPercentage(percentage)}</div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    border: '1px solid lightgrey',
    borderRadius: '4px',
    padding: '4px',
    margin: '4px',
  },
};
