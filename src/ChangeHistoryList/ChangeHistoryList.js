import React, {useEffect} from 'react'
import './ChangeHistoryList.scss';
import ListTable from './ListTable/ListTable';
import { observer } from 'mobx-react';
import ChangeHistoryListViewModel from './ListTable/ChangeHistoryListViewModel';
import JBInput from '../Components/JBInput/JBInput';
import JBDateInput from '../Components/JBDateInput/JBDateInput';
const vm = new ChangeHistoryListViewModel();
function ChangeHistoryList() {
    useEffect(() => {
        vm.onComponentDidMount();
    }, []);
    return (
        <div className="change-history-list-page">
        <div className="chnage-history-filter-wrapper">
            <JBInput label="نام تغییر دهنده" onChange={vm.onNameFilterChanged.bind(vm)} value={vm.filters.name}></JBInput>
            <JBDateInput label="تاریخ" onSelect={vm.onDateFilterChanged.bind(vm)} format="YYYY-MM-DD" valueType="GREGORIAN" value={vm.filters.date}></JBDateInput>
            <JBInput label="نام آگهی" onChange={vm.onTitleFilterChanged.bind(vm)} value={vm.filters.title}></JBInput>
            <JBInput label="فیلد" onChange={vm.onFieldFilterChanged.bind(vm)} value={vm.filters.field}></JBInput>
        </div>
            <div className="change-history-list-wrapper">
                <ListTable 
                    data={vm.displayList}
                    onScrollToEnd={()=>{vm.setPage(vm.page+1)}}
                    starList={vm.starList}
                    toggleStar={vm.toggleStar.bind(vm)}
                 ></ListTable>
            </div>
        </div>
    )
}

export default observer(ChangeHistoryList);
