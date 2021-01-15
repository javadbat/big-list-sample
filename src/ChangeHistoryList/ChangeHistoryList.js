import React from 'react'
import './ChangeHistoryList.scss';
import ListTable from './ListTable/ListTable';
import { observer } from 'mobx-react';
import ChangeHistoryListViewModel from './ListTable/ChangeHistoryListViewModel';
const vm = new ChangeHistoryListViewModel();
function ChangeHistoryList() {
    return (
        <div className="change-history-list-page">
            <div className="change-history-list-wrapper">
                <ListTable 
                    data={vm.displayList}
                    onScrollToEnd={()=>{vm.setPage(vm.page+1)}}
                 ></ListTable>
            </div>
        </div>
    )
}

export default observer(ChangeHistoryList);
