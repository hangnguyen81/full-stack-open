const notificationReducer = (state='', action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return state = action.data;
        case 'CLEAR_MESSAGE':
            return state = ''
        default:
            return state;
    }
};
let timeoutID
export const setMessage = (message, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            data: message
        })
        if(timeoutID)
            clearTimeout(timeoutID);

        timeoutID = setTimeout(()=>{
            dispatch({
                type: 'CLEAR_MESSAGE'
            })
        },timeout*1000);
    }
};

export default notificationReducer;