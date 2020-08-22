import React from 'react'
import ShoppingListItem from '../ShoppingListItem/shoppingListItemComponent'

import './nonCategorizedListComponent.css'

function NonCategorizedList(props) {
    let itemViews = []
    props.items.forEach(item => {
        itemViews.push(
            <ShoppingListItem item={item} />
        )
    })

    return (
        <div className="screenContainer">
            <span className="title"><b>Items</b></span>
            {itemViews}
        </div>
    )
}

export default NonCategorizedList