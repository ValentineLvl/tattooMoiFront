export default function (infos = [], action) {
    if (action.type == 'saveTatoueurInfos') {

        // let infosCopy = [...infos];
        
       // console.log('INFOS REDUCER', action.infos)
        
        // let findArtist = infosCopy.findIndex(element => element.firstName === action.infos.firstName)
        // if (findArtist === -1) {
        // }
        
        // infosCopy.push(action.infos)
        // console.log('INFOSCOPY', infosCopy);
        return action.infos;
    } else if (action.type == 'saveTatoueurName') {
        return action.infos;
    }else {
        return infos;
    }
}
