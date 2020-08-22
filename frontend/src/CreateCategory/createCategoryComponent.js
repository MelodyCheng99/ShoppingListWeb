import React from 'react'
import CreateItem from '../CreateItem/createItemComponent'
import { Input } from 'semantic-ui-react'

import './createCategoryComponent.css'

class CreateCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listName: props.listName,
            listNameId: props.listNameId,
            category: null,
            addItem: false
        }
    }

    handleChange = (e, { value }) => {
        this.setState({
            category: value
        })
    }

    render() {
        if (this.state.addItem) {
            return <CreateItem
                listName={this.state.listName}
                listNameId={this.state.listNameId}
                category={this.state.category} />
        } else {
            return (
                <div className="createCategoryContainer">
                    <span className="textClass">Category</span>
                    <Input
                        type="text"
                        placeholder="Category"
                        name="Category"
                        onChange={this.handleChange} />
                
                    <button className="addCategoryButton"
                        // onClick={}
                    >
                        Add Category
                    </button>
                </div>
            )
        }
    }
}

export default CreateCategory