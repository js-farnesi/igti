import React from 'react';
import Candidate from './Candidate';
import Card from './Card';

export default function Candidates({ candidates }) {
  return (
    <div>
      {candidates.map((candidate) => {
        const { id } = candidate;
        return (
          <Card key={id}>
            <Candidate candidate={candidate} />
          </Card>
        );
      })}
    </div>
  );
}
