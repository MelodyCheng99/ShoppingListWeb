import React from 'react'
import ShoppingListItem from '../ShoppingListItem/shoppingListItemComponent'
import NonCategorizedList from '../NonCategorizedList/nonCategorizedListComponent'
import CreateItem from '../CreateItem/createItemComponent'

import './categorizedListComponent.css'

class CategorizedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.items,
            listName: props.listName,
            listNameId: props.listNameId,
            categories: Object.keys(props.items['categorized_items']),
            category: null,
            selectedCategoryItems: null,
            createItem: false
        }
    }

    goToNonCategorizedList(category) {
        this.setState({
            category: category,
            selectedCategoryItems: this.state.items['categorized_items'][category]
        })
    }

    createItem() {
        this.setState({
            createItem: true
        })
    }

    render() {
        if (this.state.createItem) {
            return <CreateItem 
                listName={this.state.listName} 
                listNameId={this.state.listNameId} />
        } else if (this.state.selectedCategoryItems != null && this.state.category != null) {
            return <NonCategorizedList 
                listName={this.state.listName}
                listNameId={this.state.listNameId}
                category={this.state.category}
                items={this.state.selectedCategoryItems} />
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
                    <ShoppingListItem 
                        key={item.item}
                        item={item} />
                )
            })

            return (
                <div className="screenContainer">
                    <span className="title"><b>Categories</b></span>
                    {categoryViews}

                    <span className="title"><b>Items</b></span>
                    {itemViews}

                    <button className="createItemButton"
                        onClick={() => this.createItem()}
                    >
                        Create Item
                    </button>
                </div>
            )
        }
    }
}

export default CategorizedList