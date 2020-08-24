import React from 'react'
import ShoppingListItem from '../ShoppingListItem/shoppingListItemComponent'
import NonCategorizedList from '../NonCategorizedList/nonCategorizedListComponent'
import CreateItem from '../CreateItem/createItemComponent'
import AddCategory from '../AddCategory/addCategoryComponent'

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
            createItem: false,
            editItemId: null,
            editItem: null,
            editDescription: null,
            editDate: null,
            addCategory: false
        }

        this.onEdit = this.onEdit.bind(this)
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

    addCategory() {
        this.setState({
            addCategory: true
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
        if (this.state.addCategory) {
            return <AddCategory 
                categories={this.state.categories}
                listName={this.state.listName}
                listNameId={this.state.listNameId} />
        } else if (this.state.createItem) {
            return <CreateItem 
                listName={this.state.listName} 
                listNameId={this.state.listNameId} />
        } else if (this.state.editItem != null && this.state.editItemId != null) {
            return <CreateItem
                listName={this.state.listName}
                listNameId={this.state.listNameId}
                itemId={this.state.editItemId}
                item={this.state.editItem}
                description={this.state.editDescription}
                date={this.state.editDate}
                updatingItem={true} />
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
                        item={item}
                        onEdit={this.onEdit} />
                )
            })

            return (
                <div className="categorizedListContainer">
                    <span className="title"><b>Categories</b></span>
                    {categoryViews}

                    <button className="createButton"
                        onClick={() => this.addCategory()}
                    >
                        + Add Category
                    </button>

                    <span className="title"><b>Items</b></span>
                    {itemViews}

                    <button className="createButton"
                        onClick={() => this.createItem()}
                    >
                        + Create Item
                    </button>
                </div>
            )
        }
    }
}

export default CategorizedList