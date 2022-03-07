const notificationReducer = (state={}, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.data;
  case 'CLEAR_MESSAGE':
    return state = {
      message: '',
      type: ''
    };
  default:
    return state;
  }
};

let timeoutID;
export const setMessage = (message, messageType, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        message,
        messageType
      }
    });
    if(timeoutID)
      clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE'
      });
    },timeout*1000);
  };
};
export default notificationReducer;