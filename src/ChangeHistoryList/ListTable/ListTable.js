import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react'
import Cell from './Cell/Cell';
import DateCell from './DateCell/DateCell';
import './ListTable.scss';
import Row from './Row/Row';
import StartIcon from './StarIcon/StartIcon';
function ListTable(props) {
    const BodyRef = useRef();
    
    useEffect(() => {
        const bodyElement = BodyRef.current;
        const onScroll = function (e) {
            const scrollTop = bodyElement.scrollTop;
            const scrollHeight = bodyElement.scrollHeight;
            if (scrollTop + bodyElement.clientHeight  + 50 >= scrollHeight) {
                props.onScrollToEnd();
            }
        }
        
        bodyElement.addEventListener('scroll', onScroll);
        return () => bodyElement.removeEventListener('scroll', onScroll);
    }, [props]);
    return (
        <div className="list-table">
            <div className="list-table-header">
                <div className="header-item">نام تغییر دهنده</div>
                <div className="header-item">تاریخ</div>
                <div className="header-item">نام آگهی</div>
                <div className="header-item">فیلد</div>
                <div className="header-item">مقدار قدیمی</div>
                <div className="header-item">مقدار جدید</div>
            </div>
            <div className="list-table-body" ref={BodyRef}>
                {
                    props.data.map((item, index) => {
                        return (
                            <Row key={item.id}>
                                <Cell>
                                    <div className="primary-cell">
                                        <StartIcon enabled={props.starList.includes(item.id)} toggleStar={()=>{props.toggleStar(item.id)}}></StartIcon>
                                        <span>{item.name}</span>    
                                    </div>
                                </Cell>
                                <DateCell date={item.date}></DateCell>
                                <Cell>{item.title}</Cell>
                                <Cell>{item.field}</Cell>
                                <Cell>{item.old_value}</Cell>
                                <Cell>{item.new_value}</Cell>
                            </Row>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default observer(ListTable);
