export default function (infos = [], action) {
    if (action.type == 'saveTatoueurInfos') {
        let infosCopy = [...infos];

        
        // let findArtist = infosCopy.findIndex(element => element.firstName === action.infos.firstName)
        // if (findArtist === -1) {
        // }
        
        infosCopy.push(action.infos)
        console.log('INFOSCOPY', infosCopy);
        return infosCopy;
    } else {
        return infos;
    }
}