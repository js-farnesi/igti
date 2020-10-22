import React, { Component } from 'react';
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

    console.log(json);

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
  handleShowUsers = (event) => {
    // console.log(event.target.checked);
    this.setState({ showUsers: event.target.checked });
  };
  render() {
    const { showUsers, users } = this.state;
    // console.log(showUsers);
    // return <div>{JSON.stringify(this.state.users)}</div>;
    return (
      <div>
        <div className="switch">
          <label>
            Mostrar usuário
            <input type="checkbox" onChange={this.handleShowUsers} />
            <span className="lever"></span>
          </label>
        </div>
        <hr />
        {/* {showUsers && <div>Users</div>} */}
        {/* {showUsers ? <div>Users</div> : <div>Não posso mostrar nada</div>} */}
        {showUsers && <Users users={users} />}
      </div>
    );
  }
}
