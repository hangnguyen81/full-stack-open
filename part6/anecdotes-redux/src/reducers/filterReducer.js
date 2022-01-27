const filterReducer = (state='', action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.data    
        default:
            return state;
    }
}

export const filterText = (text) =>{
    return{
        type: 'SEARCH',
        data: text
    }
}
export default filterReducer;