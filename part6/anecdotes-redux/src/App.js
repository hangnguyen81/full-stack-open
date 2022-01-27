import React, {useEffect} from "react";
import Anecdotes from "./components/Anecdotes";
import NewAnecdote from "./components/NewAnecdote";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdotesReducer';

const App = () =>{
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(initializeAnecdotes());
  },[dispatch]);

  return (
    <div className='container'>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification />
      <Anecdotes/> 
      <NewAnecdote/>
    </div>
  )
};

export default App;
