export default function (styleList = [], action) {
    if (action.type == 'saveTatoueurInfos') {
        console.log('REDUCER INFOS:', action.styleList);
        return action.styleList;
    } else {
        return styleList;
    }
}