import deepFreeze from 'deep-freeze';
import feedbackReducer from './reducer';

describe('unicafe feedback reducer', () => {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0
  };

  test('should return a proper initial state when called with undefined state', () => {
    // eslint-disable-next-line no-unused-vars
    const state = {};
    const action = {
      type: 'DO_NOTHING'
    };

    const newState = feedbackReducer(undefined, action);
    expect(newState).toEqual(initialState);
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = feedbackReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      neutral: 0,
      bad: 0
    });
  });

  test ('Neutral is incremented', () => {
    const state = initialState;
    const action = {
      type: 'NEUTRAL'
    };
    deepFreeze(state);
    const newState = feedbackReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      neutral: 1,
      bad: 0
    })
  });

  test('Bad is incremented', () => {
    const state = initialState;
    const action = {
      type: 'BAD'
    }
    deepFreeze(state);
    const newState = feedbackReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      neutral: 0,
      bad: 1
    })
  })

  test('Reset to initial state - no feedback given', () => {
    const state = initialState;
    const action = {
      type: 'ZERO'
    };
    deepFreeze(state);
    const newState = feedbackReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});