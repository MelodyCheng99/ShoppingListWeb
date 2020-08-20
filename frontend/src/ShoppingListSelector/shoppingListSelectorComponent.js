import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import './shoppingListSelectorComponent.css'

class ShoppingListSelector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listNames: props.listNames,
            shoppingListOptions: [],
            listName: null
        }
    }

    componentDidMount() {
        this.getShoppingListOptions()
    }

    getShoppingListOptions() {
        this.setState({
            shoppingListOptions: this.state.listNames.map(listName => {
                return {
                    key: listName,
                    value: listName,
                    text: listName
                }
            })
        })
    }

    render() {
        return (
            <div className="mainScreen">
                <div className="dropdownContainer">
                    <Dropdown
                        placeholder='Select Shopping List'
                        search
                        selection
                        options={this.state.shoppingListOptions}
                    />
                </div>
                <button
                    class="button goToListButton"
                    // onClick={}
                >
                    Go To Selected Shopping List
                </button>
                <button
                    class="button createListButton"
                    // onClick={}
                >
                    Create New Shopping List
                </button>
            </div>
        )
    }
}

export default ShoppingListSelector