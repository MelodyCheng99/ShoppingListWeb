import React from 'react'
import { Input, Form, TextArea } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
import axios from 'axios'

import './createItemComponent.css'
import CategorizedList from '../CategorizedList/categorizedListComponent'
import NonCategorizedList from '../NonCategorizedList/nonCategorizedListComponent'

class CreateItem extends React.Component {
    constructor(props) {
        super(props)

        const dateObj = new Date(props.date)
        const dateDay = dateObj.getDate() + 1
        const dateMonth = dateObj.getMonth() + 1
        const dateYear = dateObj.getFullYear()

        this.state = {
            listName: props.listName,
            listNameId: props.listNameId,
            category: props.category,
            itemId: props.itemId,
            item: props.item,
            description: props.description,
            date: props.date ? dateDay + '-' + dateMonth + '-' + dateYear : null,
            items: null,
            updatingItem: props.updatingItem ? props.updatingItem : false
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
            list_name: this.state.listName,
            category: this.state.category
        }

        if (!this.state.updatingItem) {
            axios.post('http://localhost:8000/api/shoppingListItem/', body)
                .then(_ => {
                    axios.get(`http://localhost:8000/api/shoppingListList/${this.state.listNameId}/items`)
                        .then(res => this.setState({ items: res.data }))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        } else {
            axios.put(`http://localhost:8000/api/shoppingListItem/${this.state.itemId}/`, body)
            .then(_ => {
                axios.get(`http://localhost:8000/api/shoppingListList/${this.state.listNameId}/items`)
                    .then(res => this.setState({ items: res.data }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        }
    }

    deleteItem() {
        axios.delete(`http://localhost:8000/api/shoppingListItem/${this.state.itemId}`)
            .then(_ => {
                axios.get(`http://localhost:8000/api/shoppingListList/${this.state.listNameId}/items`)
                    .then(res => this.setState({ items: res.data }))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    render() {
        if (this.state.items != null) {
            if (this.state.category != null && 
                this.state.items['categorized_items'] != null &&
                this.state.items['categorized_items'][this.state.category] != null) {
                return <NonCategorizedList
                    category={this.state.category}
                    items={this.state.items['categorized_items'][this.state.category]}
                    listName={this.state.listName}
                    listNameId={this.state.listNameId} />
            } else {
                return <CategorizedList
                    items={this.state.items}
                    listName={this.state.listName}
                    listNameId={this.state.listNameId} />
            }
        } else {
            return (
                <div>
                    <Form className="createItemContainer">
                        <span className="textClass">Item</span>
                        <Input 
                            type="text" 
                            placeholder="Item"
                            name="item"
                            value={this.state.item}
                            onChange={this.handleChange} />
    
                        <span className="textClass">Description</span>
                        <TextArea 
                            rows={6} 
                            placeholder="Description" 
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange} />
    
                        <span className="textClass">Need to buy by</span>
                        <DateInput 
                            placeholder="Date"
                            name="date"
                            value={this.state.date}
                            onChange={this.handleChange} />
    
                        <div className="horizontalButtonsContainer">
                            <button className="addItemButton"
                                onClick={() => this.addItem()}>
                                { this.state.updatingItem ? 'Update' : '+ Add' }
                            </button>
                            { this.state.updatingItem ?
                                <button className="deleteItemButton"
                                    onClick={() => this.deleteItem()}>
                                    - Delete
                                </button> :
                                null
                            }
                        </div>
                    </Form>
                </div>
            )
        }
    }
}

export default CreateItem