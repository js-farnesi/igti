import React, { Component } from 'react';

export default class Users extends Component {
  constructor() {
    super();

    this.state = {
      secondsVisible: 0,
    };

    this.interval = null;
  }

  componentDidMount() {
    console.log('componentDidMount the Users...');
    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;

      this.setState({
        secondsVisible: secondsVisible + 1,
      });
    }, 1000);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate the Users...');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount the Users...');
    clearInterval(this.interval);
  }

  render() {
    // Iriamos fazer destructuring do secondsVisible. Mas secondVisible não pertence a props, pertence a state
    // const { users, secondsVisible } = this.props;
    const { users } = this.props;
    const { secondsVisible } = this.state;
    // console.log(this.props.users);
    // return <div>Componente Users</div>;

    // console.log(users);
    return (
      <div>
        <p>Componente Users visível por {secondsVisible} segundos</p>
        {users.map((user) => {
          const { name, login, picture } = user;
          // console.log(user.name.first);
          // return <p>{name.first}</p>;
          return <p key={login.uuid}>{name.first}</p>;
        })}
      </div>
    );
  }
}
