import React from 'react'
import { Dropdown, Confirm } from 'semantic-ui-react'
import CategorizedList from '../CategorizedList/categorizedListComponent'

import './shoppingListSelectorComponent.css'
import axios from 'axios'
import CreateShoppingList from '../CreateShoppingList/createShoppingListComponent'

class ShoppingListSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listNames: [],
            shoppingListOptions: [],
            listNameId: null,
            listName: null,
            items: null,
            createShoppingList: false,
            toDeleteShoppingList: false
        }

        this.onCancelDelete = this.onCancelDelete.bind(this)
        this.deleteShoppingList = this.deleteShoppingList.bind(this)
    }

    componentDidMount() {
        this.getShoppingListNames()
    }

    getShoppingListNames() {
        axios.get('http://localhost:8000/api/shoppingListList/lists/')
            .then(res => this.setState({ 
                listNames: res.data,
                shoppingListOptions: res.data.map(listName => {
                    return {
                        key: listName.id,
                        value: listName.list_name,
                        text: listName.list_name
                    }
                })
            }))
            .catch(err => console.log(err));
    }

    handleDropdownChange = (e, { value }) => {
        this.setState({
            listNameId: this.state.listNames.find(listName =>
                listName.list_name === value
            ).id,
            listName: value
        })
    }

    handleSelectList() {
        if (this.state.listNameId != null && this.state.listName != null) {
            axios.get(`http://localhost:8000/api/shoppingListList/${this.state.listNameId}/items`)
                .then(res => this.setState({ items: res.data }))
                .catch(err => console.log(err));
        }
    }

    createShoppingList() {
        this.setState({
            createShoppingList: true
        })
    }

    toDeleteShoppingList() {
        this.setState({
            toDeleteShoppingList: true
        })
    }

    onCancelDelete() {
        this.setState({
            toDeleteShoppingList: false
        })
    }

    deleteShoppingList() {
        axios.delete(`http://localhost:8000/api/shoppingListList/${this.state.listNameId}`)
            .then(_ => {
                axios.get('http://localhost:8000/api/shoppingListList/lists/')
                    .then(res => this.setState({ 
                        listNames: res.data,
                        shoppingListOptions: res.data.map(listName => {
                            return {
                                key: listName.id,
                                value: listName.list_name,
                                text: listName.list_name
                            }
                        }),
                        toDeleteShoppingList: false
                    }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.items != null) {
            return <CategorizedList 
                items={this.state.items} 
                listName={this.state.listName} 
                listNameId={this.state.listNameId} />
        } else if (this.state.createShoppingList) {
            return <CreateShoppingList />  
        } else {
            return (
                <div>
                    <div className="mainScreen">
                        <div className="dropdownContainer">
                            <Dropdown
                                placeholder='Select Shopping List'
                                search
                                selection
                                options={this.state.shoppingListOptions}
                                onChange={this.handleDropdownChange}
                            />
                        </div>

                        <button
                            className="button goToListButton"
                            onClick={() => this.handleSelectList()}
                        >
                            Go To Selected Shopping List
                        </button>
                    </div>

                    <div className="createAndDeleteButtonsContainer">
                        <button
                            className="button createListButton"
                            onClick={() => this.createShoppingList()}
                        >
                            Create New Shopping List
                        </button>
                        <button
                            className="button deleteListButton"
                            onClick={() => this.toDeleteShoppingList()}
                        >
                            Delete Selected Shopping List
                        </button>
                    </div>

                    <Confirm
                        content={'Are you sure you want to delete ' + this.state.listName + '?'}
                        open={this.state.toDeleteShoppingList}
                        onCancel={this.onCancelDelete}
                        onConfirm={this.deleteShoppingList} />
                </div>
            )
        }
    }
}

export default ShoppingListSelector