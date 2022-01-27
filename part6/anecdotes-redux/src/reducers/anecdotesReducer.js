import anecdotesService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return action.data;
    case 'CREATE':
      return [...state, action.data]
    case 'VOTE':
      const anecdoteToVote = state.find( a => a.id === action.data.id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : votedAnecdote);
    case 'DELETE':
      return state.filter(anecdote => anecdote.id !== action.data.id);
    default:
      return state
  }
}  

export const vote = id =>{
  return async dispatch => {
    const anecdoteToUpdate = await anecdotesService.getOne(id);
    const updatedAnecdote = {
      content: anecdoteToUpdate.content,
      id: anecdoteToUpdate.id,
      votes: anecdoteToUpdate.votes + 1
    }
    await anecdotesService.updateVote(id, updatedAnecdote);
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    }); 
  }
}

export const deleteAnecdote = id =>{
  return async dispatch => {
    await anecdotesService.removeAnecdote(id);
    dispatch({
      type: 'DELETE',
      data: { id }
    })
  }
}

export const initializeAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type:'INITIALIZE',
      data: anecdotes
    })
  }
}
export default reducer