import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import CategorizedList from '../CategorizedList/categorizedListComponent'

import './shoppingListSelectorComponent.css'
import axios from 'axios'

class ShoppingListSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listNames: props.listNames,
            shoppingListOptions: [],
            listNameId: null,
            listName: null,
            items: null
        }
    }

    componentDidMount() {
        this.getShoppingListOptions()
    }

    getShoppingListOptions() {
        this.setState({
            shoppingListOptions: this.state.listNames.map(listName => {
                return {
                    key: listName.id,
                    value: listName.list_name,
                    text: listName.list_name
                }
            })
        })
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

    render() {
        if (this.state.items != null) {
            return <CategorizedList 
                items={this.state.items} 
                listName={this.state.listName} 
                listNameId={this.state.listNameId} />
        } else {
            return (
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
                    <button
                        className="button createListButton"
                        // onClick={}
                    >
                        Create New Shopping List
                    </button>
                </div>
            )
        }
    }
}

export default ShoppingListSelector