const SearchBar = (props) =>{
    return (
        <input 
            type='text'
            onChange = {props.onChange} 
            placeholder = 'Search contact'
        />
    )
}
export default SearchBar
