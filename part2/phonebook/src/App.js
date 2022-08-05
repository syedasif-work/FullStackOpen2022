import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(response => setPersons(response))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault();
    const incPerson = persons.find(person => person.name === newName)
    if (incPerson !== undefined){
      if (window.confirm(`${incPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(incPerson.id, {...incPerson, number: newNumber}).then((response) => {
          setPersons(persons.map(person => person.id !== incPerson.id ? person : response))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(
            `Information of '${incPerson.name}' has already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== incPerson.id))
        })
      }
      return;
    }
    const newPerson = {name: newName, number: newNumber}
    personService.create(newPerson).then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
      setSuccessMessage(
        `Added ${response.name}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        setErrorMessage(
          `Information of '${person.name}' has already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type="error"/>
      <Notification message={successMessage} type="success" />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App