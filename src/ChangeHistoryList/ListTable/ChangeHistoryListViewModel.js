import { action, makeObservable, observable, toJS } from "mobx";
import data from '../../data.json';
class ChangeHistoryListViewModel{
    page = 0;
    sortColumn = 'date';
    sortedList = [];
    displayList = [];
    bstTree = null;
    filters = {
        name:'',
        date:null,
        title:'',
        field:''
    }
    starList = []
    constructor(){
        makeObservable(this,{
            sortColumn: observable,
            page: observable,
            displayList: observable,
            starList: observable,
            toggleStar:action,
            setDisplayList:action
        });
        this.initFilterParam();
        this.initStarList();
    }
    initStarList(){
        const starListString = localStorage.getItem('star_list');
        if(starListString){
            const starList = JSON.parse(starListString);
            starList.forEach((id)=>{this.starList.push(id)})
        }
    }
    initFilterParam(){
        const urlParams = new URLSearchParams(window.location.search);
        const nameFilter = urlParams.get('name_filter');
        if(nameFilter){
            this.filters.name = nameFilter
        }
        const dateFilter = urlParams.get('date_filter');
        if(dateFilter){
            this.filters.date = dateFilter
        }
        const titleFilter = urlParams.get('title_filter');
        if(titleFilter){
            this.filters.title = titleFilter
        }
        const fieldFilter = urlParams.get('field_filter');
        if(fieldFilter){
            this.filters.field = fieldFilter
        }
    }
    onComponentDidMount(){
        this.initBSTTree();
        this.sortedList= this.createArrayFromBST(this.bstTree);
        this.setDisplayList();
    }
    setDisplayList(){
        const filteredList = this.sortedList.filter(x => {
            const nameCheck =  x.name.toLowerCase().trim().includes(this.filters.name.toLowerCase());
            const titleCheck = x.title.trim().includes(this.filters.title);
            const fieldCheck = x.field.trim().includes(this.filters.field);
            let dateCheck = true
            if( this.filters.date && !(x.date === this.filters.date)){
                dateCheck = false;
            }
            return nameCheck && titleCheck && fieldCheck && dateCheck;
        });
        this.displayList = [...(this.page === 0? [] :this.displayList), ...filteredList.slice(this.page*20,(this.page*20)+20)];
    }
    setPage(value){
        this.page = value;
        this.setDisplayList();
    }
    createArrayFromBST(tree){
        if(tree == null){
            return [];
        }
        return [...this.createArrayFromBST(tree.date.less),tree.node,...this.createArrayFromBST(tree.date.more)];

    }
    initBSTTree(){
        data.forEach(item => {
            if(this.bstTree == null){
                this.bstTree = {
                    node: item,
                    
                    date:{
                        less:null,
                        more:null,
                        parent:null
                    },

                }
            }else{
                this.placeBSTTreeNode(item,'date',this.bstTree)
            }
        });
    }
    placeBSTTreeNode(node,compareField,tree){
        let condition = tree.node[compareField] > node[compareField];
        if(compareField === "date"){
            condition = new Date(tree.node[compareField]) > new Date(node[compareField]);
        }
        if(condition){
            if(tree[compareField].less == null){
                tree[compareField].less = {
                    node,
                    [compareField]:{
                        less:null,
                        more:null,
                        parent:tree
                    }
                }
            }else{
                this.placeBSTTreeNode(node, compareField, tree[compareField].less);
                
            }
        }else{
            if(tree[compareField].more == null){
                tree[compareField].more = {
                    node,
                    [compareField]:{
                        less:null,
                        more:null,
                        parent:tree
                    }
                }
            }else{
                this.placeBSTTreeNode(node, compareField, tree[compareField].more);
            }
        }
    }
    onNameFilterChanged(e){
        this.filters.name = e.target.value;
        this.page = 0;
        this.setQueryParam('name_filter', e.target.value)
        this.setDisplayList();
    }
    onDateFilterChanged(e){
        this.filters.date = e.target.value;
        this.page = 0;
        this.setQueryParam('date_filter', e.target.value)
        this.setDisplayList();
    }
    onTitleFilterChanged(e){
        this.filters.title = e.target.value;
        this.page = 0;
        this.setQueryParam('title_filter', e.target.value)
        this.setDisplayList();
    }
    onFieldFilterChanged(e){
        this.filters.field = e.target.value;
        this.page = 0;
        this.setQueryParam('field_filter', e.target.value)
        this.setDisplayList();
    }
    setQueryParam(field, value){
        var searchParams = new URLSearchParams(window.location.search);
        if(!value){
            searchParams.delete(field);
            return;
        }
        if(searchParams.get(field)){
            searchParams.set(field, value);
        }else{
            searchParams.append(field, value);
        }
        window.history.replaceState(null, null,`?${searchParams.toString()}`);
       // window.location.search = searchParams.toString();
    }
    toggleStar(id){
        const index = this.starList.findIndex(x=>x===id);
        if(index === -1){
            this.starList.push(id);
        }else{
            this.starList.splice(index,1);
        }
        localStorage.setItem('star_list', JSON.stringify(toJS(this.starList)));
    }
}
export default ChangeHistoryListViewModel;