export default function(formList = [], action) {
    if(action.type == 'saveForm'){
        return action.dataSaveForm}
    else if (action.type == 'addForm') {
        console.log("click")
        var formListCopy = [...formList]
        var filter= formList.filter((element)=> element.dataForm == action.dataForm)
        if(filter.length==0){
        formListCopy.push(action.dataForm)
        }
        return formListCopy;
      } else if( action.type == "deleteForm") {
        var formListCopy = [...formList];
          
        var index= formListCopy.findIndex(element => element._id == action._id)
         formListCopy.splice(index, 1);
         return formListCopy;
  
      } else if( action.type == "deconnectForms") {
        return formList
      }else {
        return formList;
      }  
     }