const SearchBar = (props) =>{
    return(
        <div className='search-bar'>
            <input 
                className='search-query' 
                type='text'
                name = 'searchQuery'
                onChange={props.onChange} 
                placeholder='Search country'
            />
            <p className='small-title'>{props.informText}</p>         
        </div>
    )
}

export default SearchBar