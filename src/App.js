import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from './components/Nav';
import List from './components/List';

function App() {
  return (
    <React.Fragment>
      <Nav value = {"header"}/>
      <Nav value = {"sidharth_app"}/>
      <List />
    </React.Fragment>
  );
}

export default App;
