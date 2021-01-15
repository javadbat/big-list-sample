import React from 'react'
import './Cell.scss';
function Cell(props) {
    return (
        <div className="list-table-cell">{props.children}</div>
    )
}

export default Cell
