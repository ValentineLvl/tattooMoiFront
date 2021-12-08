export default function (infos = [], action) {
    if (action.type == 'saveTatoueurInfos') {
        let infosCopy = [...infos];
        infosCopy.push(action.infos)
        console.log('REDUCER INFOS:', infosCopy);
        return infosCopy;
    } else {
        return infos;
    }
}