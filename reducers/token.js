export default function(token = '', action){
    if(action.type == 'addToken'){
        return action.token
    } else if (action.type == 'disconnectToken') {
        return action.token
    } else {
        return token
    }
}