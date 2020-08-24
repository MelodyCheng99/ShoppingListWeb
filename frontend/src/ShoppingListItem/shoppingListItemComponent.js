import React from 'react'
import { Checkbox, Popup } from 'semantic-ui-react'

import './shoppingListItemComponent.css'

function ShoppingListItem(props) {
    let buyBy = '---'
    if (props.item.due_date != null) {
        buyBy = props.item.due_date
    }

    return (
        <div className="itemContainer">
            <Popup
                key={props.item.item}
                header={'Need to buy by: ' + buyBy} 
                content={props.item.description}
                trigger={
                    props.item.bought ? 
                        <Checkbox label={props.item.item} defaultChecked /> :
                        <Checkbox label={props.item.item} />
                }
            />
            <button className="editButton"
                onClick={
                    () => props.onEdit(
                            props.item.id, 
                            props.item.item, 
                            props.item.description, 
                            props.item.due_date
                        )
                }>  &#x270D;</button>
        </div>
    )
}

export default ShoppingListItem