import deepFreeze from "deep-freeze";
import anecdotesReducer from './anecdotesReducer';

describe('Anecdotes Reducer:', () =>{
    test('Add new anecdote with action CREATE', () =>{
        const state = [];
        const action = {
            type: 'CREATE',
            data:{
                id: 1,
                content: 'Anecdote add with action CREATE',
                votes: 0
            } 
        }
        deepFreeze(state);
        const newState = anecdotesReducer(state, action);
        expect(newState).toHaveLength(1);
        expect(newState).toContainEqual(action.data);
    });
    test('Vote changes with action VOTE', () =>{
        const state = [
            {
                id: 1,
                content: 'Anecdote add with action CREATE',
                votes: 0
            },
            {
                id: 2,
                content: 'Second anecdote to test VOTE',
                votes: 0
            }
        ]
        const action = {
            type: 'VOTE',
            data: { id: 2}
        }
        deepFreeze(state);
        const newState = anecdotesReducer(state, action);
        expect(newState).toHaveLength(2);
        expect(newState).toContainEqual(state[0]);
        expect(newState[1].votes).toBe(1);
    });
});