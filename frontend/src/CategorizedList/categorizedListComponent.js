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
                <button key={category} className="button categoryButton">
                    {category}
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
            <div>
                <div className="categoriesContainer">
                    {categoryViews}
                </div>
                <div className="itemsContainer">
                    {itemViews}
                </div>
            </div>
        )
    }
}

export default CategorizedList