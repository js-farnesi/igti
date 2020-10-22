import React, { Component } from 'react';
import Toogle from './components/toogle/Toogle';
import Users from './components/users/Users';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
      showUsers: false,
    };
  }

  async componentDidMount() {
    console.log('componentDidMount the app...');
    const res = await fetch(
      'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    );

    const json = await res.json();

    // console.log(json);

    this.setState({
      users: json.results,
    });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate the app...');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount the app...');
  }
  // handleShowUsers = (event) => {
  //   // console.log(event.target.checked);
  //   this.setState({ showUsers: event.target.checked });
  // };
  // Alteramos de events, uma vez que o evento foi trabalhado no componente filho, isChecked é um booleand
  handleShowUsers = (isChecked) => {
    // console.log(event.target.checked);
    this.setState({ showUsers: isChecked });
  };
  render() {
    const { showUsers, users } = this.state;
    // console.log(showUsers);
    // return <div>{JSON.stringify(this.state.users)}</div>;
    return (
      <div>
        <h3>React Lifecycle</h3>

        <Toogle
          description="Mostrar usuários"
          enable={showUsers}
          onToogle={this.handleShowUsers}
        />
        <hr />
        {/* {showUsers && <div>Users</div>} */}
        {/* {showUsers ? <div>Users</div> : <div>Não posso mostrar nada</div>} */}
        {showUsers && <Users users={users} />}
      </div>
    );
  }
}
