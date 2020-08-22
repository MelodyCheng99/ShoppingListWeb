import React from 'react'

import './categorizedListComponent.css'

class CategorizedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: props.items,
            categories: Object.keys(props.items['categorized_items'])
        }
    }

    render() {
        let categoryViews = []
        this.state.categories.forEach(category => {
            categoryViews.push(
                <button key={category} className="button categoryButton">
                    {category}
                </button>
            )
        })

        return (
            <div className="mainScreen">
                { categoryViews }
            </div>
        )
    }
}

export default CategorizedList