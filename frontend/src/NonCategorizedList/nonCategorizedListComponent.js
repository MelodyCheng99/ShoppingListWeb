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
            createItem: false,
            editItemId: null,
            editItem: null,
            editDescription: null,
            editDate: null
        }

        this.onEdit = this.onEdit.bind(this)
    }

    createItem() {
        this.setState({
            createItem: true
        })
    }

    onEdit(id, item, description, date) {
        this.setState({
            editItemId: id,
            editItem: item,
            editDescription: description,
            editDate: date
        })
    }

    render() {
        if (this.state.createItem) {
            return <CreateItem
                listName={this.state.listName} 
                listNameId={this.state.listNameId} 
                category={this.state.category} />
        } else if (this.state.editItem != null && this.state.editItemId != null) {
            return <CreateItem
                listName={this.state.listName}
                listNameId={this.state.listNameId}
                category={this.state.category}
                itemId={this.state.editItemId}
                item={this.state.editItem}
                description={this.state.editDescription}
                date={this.state.editDate}
                updatingItem={true} />
        } else {
            let itemViews = []
            this.state.items.forEach(item => {
                itemViews.push(
                    <ShoppingListItem 
                        key={item.item}
                        item={item}
                        onEdit={this.onEdit} />
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