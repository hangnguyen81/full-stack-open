import React from 'react';
//import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { filterText } from '../reducers/filterReducer';

const Filter = (props) => {
  //const dispatch = useDispatch();
  const handleChange = (event) => {
    props.filterText(event.target.value);
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        Search anecdote: <input className='anecdote-input' onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterText
}

//export default Filter;
const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter