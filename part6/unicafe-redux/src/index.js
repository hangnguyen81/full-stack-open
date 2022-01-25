import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import './index.css';
import Button from './components/Button';
import Statistics from './components/Statistics';

const store = createStore(reducer);

const App = () => {
  const handleGoodClick = () => {
    store.dispatch({
      type: 'GOOD'
    });
  }

  const handleNeutralClick = () => {
    store.dispatch({
      type:'NEUTRAL'
    });
  }

  const handleBadClick = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const handleResetClick = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div className="feedback-container">
      <div className = 'feedback-input'>
        <h2>Leave your feedback for Unicafe </h2>
        <Button onClick={handleGoodClick} text='Good'/>
        <Button onClick={handleNeutralClick} text='Neutral'/>
        <Button onClick={handleBadClick} text='Bad'/>
        <Button onClick={handleResetClick} text='Reset'/>
      </div>
      <div className = 'feedback-output'>
        <h2>Feedback statistics </h2>
        <Statistics 
          good={store.getState().good} 
          neutral={store.getState().neutral} 
          bad={store.getState().bad}
        />
      </div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp();
store.subscribe(renderApp);