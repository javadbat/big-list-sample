import React from 'react';
import Cell from '../Cell/Cell';
function DateCell(props) {
    const jalaliDate = React.useMemo(() =>(new Date(props.date)).toLocaleDateString('fa-ir',{year: 'numeric', month: 'long', day: 'numeric'}), [props.date]) ;
    return (
        <Cell>{jalaliDate}</Cell>
    )
}

export default DateCell
