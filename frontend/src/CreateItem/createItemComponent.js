import React from 'react'
import { Input, Form, TextArea } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import axios from 'axios'

import './createItemComponent.css'
import CategorizedList from '../CategorizedList/categorizedListComponent'

class CreateItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listName: props.listName,
            listNameId: props.listNameId,
            item: null,
            description: null,
            date: null,
            items: null
        }
    }

    handleChange = (event, { name, value }) => {
        this.setState({
            [name]: value
        })
    }

    addItem() {
        const body = {
            item: this.state.item,
            description: this.state.description,
            due_date: this.state.date,
            list_name: this.state.listName
        }

        axios.post('http://localhost:8000/api/shoppingListItem/', body)
            .then(_ => {
                axios.get(`http://localhost:8000/api/shoppingListList/${this.state.listNameId}/items`)
                    .then(res => this.setState({ items: res.data }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.items != null) {
            return <CategorizedList
                items={this.state.items}
                listName={this.state.listName}
                listNameId={this.state.listNameId} />
        } else {
            return (
                <div>
                    <Form className="createItemContainer">
                        <span className="textClass">Item</span>
                        <Input 
                            type="text" 
                            placeholder="Item"
                            name="item"
                            onChange={this.handleChange} />
    
                        <span className="textClass">Description</span>
                        <TextArea 
                            rows={6} 
                            placeholder="Description" 
                            name="description"
                            onChange={this.handleChange} />
    
                        <span className="textClass">Need to buy by</span>
                        <DateInput 
                            placeholder="Date"
                            name="date"
                            value={this.state.date}
                            onChange={this.handleChange} />
    
                        <button className="addItemButton"
                            onClick={() => this.addItem()}>
                            + Add
                        </button>
                    </Form>
                </div>
            )
        }
    }
}

export default CreateItem