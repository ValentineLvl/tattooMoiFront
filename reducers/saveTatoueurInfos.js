export default function (infos = [], action) {
    if (action.type == 'saveTatoueurInfos') {
        
        console.log('INFOS REDUCER', action.infos)

        return action.infos;
    } else {
        return infos;
    }
}