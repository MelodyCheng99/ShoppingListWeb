import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import './shoppingListSelectorComponent.css'

function ShoppingListSelector(props) {
    const shoppingListOptions = props.listNames.map(listName => {
        return {
            key: listName,
            text: listName
        }
    })

    return (
        <div className="mainScreen">
            <span className="textClass">
                Select shopping list from dropdown menu, or create a new shopping list
            </span>
            <br />
            <Dropdown
                placeholder='Select Shopping List'
                search
                selection
                options={shoppingListOptions}
            />
        </div>
    )
}

export default ShoppingListSelector