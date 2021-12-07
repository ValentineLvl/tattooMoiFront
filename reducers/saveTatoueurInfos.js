export default function (infos = [], action) {
    if (action.type == 'saveTatoueurInfos') {
        console.log('REDUCER INFOS:', action.infos);
        return action.infos;
    } else {
        return infos;
    }
}