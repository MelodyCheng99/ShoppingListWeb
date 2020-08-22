import React from 'react'
import ShoppingListItem from '../ShoppingListItem/shoppingListItemComponent'
import NonCategorizedList from '../NonCategorizedList/nonCategorizedListComponent'

import './categorizedListComponent.css'

class CategorizedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.items,
            categories: Object.keys(props.items['categorized_items']),
            selectedCategoryItems: null
        }
    }

    goToNonCategorizedList(category) {
        this.setState({
            selectedCategoryItems: this.state.items['categorized_items'][category]
        })
    }

    render() {
        if (this.state.selectedCategoryItems != null) {
            return <NonCategorizedList items={this.state.selectedCategoryItems} />
        } else {
            let categoryViews = []
            this.state.categories.forEach(category => {
                categoryViews.push(
                    <button 
                        key={category} 
                        className="categoryButton"
                        onClick={() => this.goToNonCategorizedList(category)}
                    >
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
}

export default CategorizedList