import React from 'react'
import { Checkbox } from 'semantic-ui-react'

import './shoppingListItemComponent.css'

function ShoppingListItem(props) {
    return (
        <div className="itemContainer">
            {
                props.item.bought ? 
                    <Checkbox label={props.item.item} defaultChecked /> :
                    <Checkbox label={props.item.item} />
            }
        </div>
    )
}

export default ShoppingListItem