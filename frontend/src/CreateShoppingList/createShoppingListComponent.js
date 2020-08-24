import React from 'react'
import ShoppingListSelector from '../ShoppingListSelector/shoppingListSelectorComponent'
import { Input } from 'semantic-ui-react'
import axios from 'axios'

import './createShoppingListComponent.css'

class CreateShoppingList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            listNames: null
        }
    }

    handleChange = (e, { value }) => {
        this.setState({
            name: value
        })
    }

    createShoppingList() {
        axios.post('http://localhost:8000/api/shoppingListList/', {
            list_name: this.state.name
        })
            .then(_ => {
                axios.get('http://localhost:8000/api/shoppingListList/lists/')
                    .then(res => this.setState({ listNames: res.data }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.listNames != null) {
            return <ShoppingListSelector listNames={this.state.listNames} />
        } else {
            return (
                <div className="createShoppingListContainer">
                    <span className="textClass">Shopping List Name</span>
                    <Input
                        type="text"
                        placeholder="Name"
                        onChange={this.handleChange} />
                    <button className="createShoppingListButton"
                        onClick={() => this.createShoppingList()}
                    >+ Create Shopping List</button>
                </div>
            )
        }
    }
}

export default CreateShoppingList