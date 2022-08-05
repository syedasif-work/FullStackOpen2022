const Persons = ({personsToShow, removePerson}) => {
    return (
        <>
        {
            personsToShow.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button></div>)
        }
        </>
    )
}

export default Persons;