import React, { useState } from 'react';

const BANDMEMBERS = [
  {
    id: 1,
    name: 'Neil Peart',
    instrument: 'Bateria',
  },
  {
    id: 2,
    name: 'Alex Lifeson',
    instrument: 'Guitarra',
  },
  {
    id: 3,
    name: 'Geddy Lee',
    instrument: 'Baixo',
  },
];

export default function Band() {
  const [bandMembers, setbandMembers] = useState(BANDMEMBERS);
  const [bandName, setbandName] = useState('Rusty');
  // constructor() {
  //   super();
  //   this.state = {
  //     bandName: 'Rush',
  //     bandMembers: [
  //       {
  //         id: 1,
  //         name: 'Neil Peart',
  //         instrument: 'Bateria',
  //       },
  //       {
  //         id: 2,
  //         name: 'Alex Lifeson',
  //         instrument: 'Guitarra',
  //       },
  //       {
  //         id: 3,
  //         name: 'Geddy Lee',
  //         instrument: 'Baixo',
  //       },
  //     ],
  //   };
  // }

  // const { bandName, bandMembers } = this.state;

  return (
    <div>
      <h4>{bandName}</h4>
      <ul>
        {bandMembers.map(({ id, name, instrument }) => {
          return (
            <li key={id}>
              {name} - {instrument}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
