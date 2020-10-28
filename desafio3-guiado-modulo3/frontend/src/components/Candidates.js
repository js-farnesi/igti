import React from 'react';
import Candidate from './Candidate';
import Card from './Card';
import FlipeMove from 'react-flip-move';

export default function Candidates({
  candidates,
  previousVotes,
  previousPercentages,
}) {
  return (
    <div>
      <FlipeMove>
        {candidates.map((candidate, index) => {
          const { id } = candidate;

          const previousVoteObject = previousVotes.find(
            (item) => item.id === id
          );

          const previousVote = !!previousVoteObject
            ? previousVoteObject.votes
            : 0;

          const previousPercentageObject = previousPercentages.find(
            (item) => item.id === id
          );

          const previousPercentage = !!previousPercentageObject
            ? previousPercentageObject.percentage
            : 0;

          return (
            <div key={id}>
              <Card>
                <Candidate
                  previousPercentage={previousPercentage}
                  previousVote={previousVote}
                  candidate={candidate}
                  position={index + 1}
                />
              </Card>
            </div>
          );
        })}
      </FlipeMove>
    </div>
  );
}
