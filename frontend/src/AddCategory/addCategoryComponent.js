import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import CreateItem from '../CreateItem/createItemComponent'
import CreateCategory from '../CreateCategory/createCategoryComponent'

import './addCategoryComponent.css'

class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listName: props.listName,
            listNameId: props.listNameId,
            categoryOptions: props.categories.map(category => {
                return {
                    key: category,
                    value: category,
                    text: category
                }
            }),
            selectedCategory: null,
            addItem: false,
            createCategory: false
        }
    }

    handleDropdownChange = (e, { value }) => {
        this.setState({
            selectedCategory: value
        })
    }

    selectCategory() {
        this.setState({
            addItem: true
        })
    }

    createNewCategory() {
        this.setState({
            createCategory: true
        })
    }

    render() {
        if (this.state.createCategory) {
            return <CreateCategory
                listName={this.state.listName}
                listNameId={this.state.listNameId} />
        } else if (this.state.addItem) {
            return <CreateItem
                listName={this.state.listName}
                listNameId={this.state.listNameId}
                category={this.state.category} />
        } else {
            return (
                <div className="addExistingCategoryContainer">
                    <Dropdown
                        className="existingCategoriesDropdown"
                        placeholder='Select Category'
                        search
                        selection
                        options={this.state.categoryOptions}
                        onChange={this.handleDropdownChange} />
                    <button className="selectCategoryButton"
                        onClick={() => this.selectCategory()}>
                        Select Existing Category
                    </button>
                    <button className="createNewCategoryButton"
                        onClick={() => this.createNewCategory()}>
                        Create New Category
                    </button>
                </div>
            )
        }
    }
}

export default AddCategory