import React from 'react';
import './App.css';
import axios from 'axios';
import ShoppingListSelectorComponent from './ShoppingListSelector/shoppingListSelectorComponent';
import 'semantic-ui-css/semantic.min.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listNames: null,
      listName: null,
      category: null,
      items: null
    }
  }

  componentDidMount() {
    this.getListNames()
  }

  getListNames() {
    axios.get('http://localhost:8000/api/shoppingListList/lists/')
      .then(res => this.setState({ listNames: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      this.state.listName == null && this.state.listNames != null ? (
        <ShoppingListSelectorComponent listNames={this.state.listNames} />
      ) : null
    )
  }
}

export default App;
