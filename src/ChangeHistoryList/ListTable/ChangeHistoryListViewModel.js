import { makeObservable, observable } from "mobx";
import data from '../../data.json';
class ChangeHistoryListViewModel{
    page = 0;
    sortColumn = 'date';
    sortedList = [];
    displayList = [];
    bstTree = null;
    constructor(){
        makeObservable(this,{
            sortColumn: observable,
            page: observable,
            displayList: observable
        });
        this.initBSTTree();
        this.sortedList= this.createArrayFromBST(this.bstTree);
        this.setDisplayList();
    }
    setDisplayList(){
        this.displayList = [...this.displayList, ...this.sortedList.slice(this.page*20,(this.page*20)+20)];
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
}
export default ChangeHistoryListViewModel;