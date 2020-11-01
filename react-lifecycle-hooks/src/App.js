import React, { useState, useEffect } from 'react';
import Toggle from './components/Toggle/Toggle';
import Items from './components/User/Items';

export default function App() {
  const [items, setItems] = useState([]);
  const [showData, setShowData] = useState(false);
  // constructor() {
  //   super();

  //   this.state = {
  //     showData: false,
  //     items: [],
  //   };

  //   this.interval = null;
  // }

  // this.setState({
  //   showData: checked,
  // });

  useEffect(() => {
    const fecthUsers = async () => {
      const res = await fetch(
        'https://randomuser.me/api/?seed=rush&nat=br&results=10'
      );
      const json = await res.json();
      setItems(json.results);
    };

    fecthUsers();
  }, []);

  const handleToggle = (ischecked) => {
    setShowData(ischecked);
    // async componentDidMount() {
    //   const res = await fetch(
    //     'https://randomuser.me/api/?seed=rush&nat=br&results=10'
    //   );
    //   const json = await res.json();

    //   const items = json.results.map((item) => {
    //     const { name, picture, login } = item;

    //     return {
    //       id: login.uuid,
    //       name: name.first,
    //       picture: picture.large,
    //     };
    //   });

    //   setTimeout(() => {
    //     this.setState({ items });
    //   }, 5000);
    // }
  };

  return (
    <div style={{ padding: '10px' }}>
      <h1>Abra o console!</h1>

      <div>
        <Toggle description="Exibir lista" onToggle={handleToggle} />
      </div>

      {showData && <Items values={items} />}
    </div>
  );
}
