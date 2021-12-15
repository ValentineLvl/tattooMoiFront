export default function (position = {}, action) {
    if (action.type == 'saveUserPosition') {
        console.log('POSITION:', action.position);
        return action.position;
    } else {
        return position;
    }
}