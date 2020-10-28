import React from 'react';
import Candidate from './Candidate';
import Card from './Card';
import FlipeMove from 'react-flip-move';

export default function Candidates({ candidates }) {
  return (
    <div>
      <FlipeMove>
        {candidates.map((candidate, index) => {
          const { id } = candidate;
          return (
            <div key={id}>
              <Card>
                <Candidate candidate={candidate} position={index + 1} />
              </Card>
            </div>
          );
        })}
      </FlipeMove>
    </div>
  );
}
