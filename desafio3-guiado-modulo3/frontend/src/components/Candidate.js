import React from 'react';
import Info from './Info';
import Name from './Name';
import Percentage from './Percentage';
import Picture from './Picture';
import Popularity from './Popularity';
import Position from './Position';
import Votes from './Votes';
import { formatPercentage } from '../helpers/formatHerlpers';

import css from './candidate.module.css';

export default function Candidate({ candidate, position }) {
  const { id, name, percentage, votes, popularity } = candidate;

  const imageSource = `${id}.jpg`;
  return (
    <div className={css.flexRow}>
      <Position>{position}</Position>
      <Picture imageSource={imageSource} description={name} />
      <Info>
        <Name> {name}</Name>
        <Votes value={votes} />
        <Percentage>{formatPercentage(percentage)}</Percentage>
        <Popularity value={popularity} />
      </Info>
      {/* {name} - {votes} */}
    </div>
  );
}
