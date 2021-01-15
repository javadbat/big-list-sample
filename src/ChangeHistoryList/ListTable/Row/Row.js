import React from 'react'
import './Row.scss';
function Row(props) {
    return (
        <div className="list-table-row">
            {props.children}
        </div>
    )
}

export default Row
