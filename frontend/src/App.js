import React from 'react';
import ShoppingListSelectorComponent from './ShoppingListSelector/shoppingListSelectorComponent';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <ShoppingListSelectorComponent />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
