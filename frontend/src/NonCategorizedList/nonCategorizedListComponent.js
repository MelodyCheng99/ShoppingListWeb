import React from 'react'
import ShoppingListItem from '../ShoppingListItem/shoppingListItemComponent'

import './nonCategorizedListComponent.css'
import CreateItem from '../CreateItem/createItemComponent'

class NonCategorizedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listName: props.listName,
            listNameId: props.listNameId,
            category: props.category,
            items: props.items,
            createItem: false
        }
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
                listNameId={this.state.listNameId} 
                category={this.state.category} />
        } else {
            let itemViews = []
            this.state.items.forEach(item => {
                itemViews.push(
                    <ShoppingListItem item={item} />
                )
            })

            return (
                <div className="screenContainer">
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

export default NonCategorizedList