import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import CreateItem from '../CreateItem/createItemComponent'
import CreateCategory from '../CreateCategory/createCategoryComponent'
import axios from 'axios'

import './addCategoryComponent.css'

class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listName: props.listName,
            listNameId: props.listNameId,
            categoryOptions: null,
            selectedCategory: null,
            addItem: false,
            createCategory: false
        }
    }

    componentDidMount() {
        this.getAllCategories()
    }

    getAllCategories() {
        axios.get('http://localhost:8000/api/shoppingListCategory')
            .then(res => this.setState({
                categoryOptions: res.data.map(categoryObj => {
                    return {
                        key: categoryObj.id,
                        value: categoryObj.category,
                        text: categoryObj.category
                    }
                })
            }))
            .then(err => console.log(err));
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
                category={this.state.selectedCategory} />
        } else if (this.state.categoryOptions != null) {
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
        } else {
            return null
        }
    }
}

export default AddCategory