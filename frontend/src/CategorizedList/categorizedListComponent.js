import React from 'react'
import ShoppingListItem from '../ShoppingListItem/shoppingListItemComponent'

import './categorizedListComponent.css'

class CategorizedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.items,
            categories: Object.keys(props.items['categorized_items'])
        }
    }

    render() {
        let categoryViews = []
        this.state.categories.forEach(category => {
            categoryViews.push(
                <button key={category} className="categoryButton">
                    &#8594; {category}
                </button>
            )
        })

        let itemViews = []
        this.state.items['non_categorized_items'].forEach(item => {
            itemViews.push(
                <ShoppingListItem item={item} />
            )
        })

        return (
            <div className="screenContainer">
                <span className="title"><b>Categories</b></span>
                {categoryViews}

                <span className="title"><b>Items</b></span>
                {itemViews}
            </div>
        )
    }
}

export default CategorizedList