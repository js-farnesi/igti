import React from 'react';

export default function Candidate({ candidate }) {
  const { name, percentage, votes } = candidate;
  return (
    <div>
      {name} - {votes}
    </div>
  );
}
