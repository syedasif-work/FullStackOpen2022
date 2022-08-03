const Filter = ({filter, handleFilter}) => {
return (
    <div>
        filter shown with: <input required value={filter} onChange={handleFilter}/>
    </div>
    )
}

export default Filter;