import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
  return(
    <p>{person.name} {person.number}</p>
  )
}

const PersonList = ({persons}) => {
  return (
    <div>
      {persons.map(person =>  
        <Person key={person.name} person={person}/>)}
    </div>
  )
}

const Input = ({handler, state, setState}) => {
  return (
    <input value={state} onChange={(e) => handler(e, setState)}/>
  )
}

const Filter = ({handler, state, setState}) => {
  return(
    <div>
      Filter with <Input handler={handler} state={state} setState={setState} />
    </div>
  )
}

const PersonForm = ({submitFunc, inputHandler, nameState, setNameState, numberState, setNumberState}) => {
  return(
    <form onSubmit={submitFunc}>
      <div>
        name: <Input handler={inputHandler} state={nameState} setState={setNameState} />
      </div>
      <div>
        number: <Input handler={inputHandler} state={numberState} setState={setNumberState} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const names = persons.map(person => person.name)

  const addPerson = (event) => {
    if (names.includes(newName))
    {
      // Refreshes the page after closing the alert window
      alert(`${newName} is already added to phonebook`)
    }
    else {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  // Would've put this into "Input" component if not for
  // the instructions to include these in the main app
  const handleInputChange = (event, setInputState) => {
    setInputState(event.target.value)
  }

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter handler={handleInputChange} state={nameFilter} setState={setNameFilter}/>
      <h2>Add a new person</h2>
      <PersonForm 
        submitFunc={addPerson}
        inputHandler={handleInputChange}
        nameState={newName}
        setNameState={setNewName}
        numberState={newNumber}
        setNumberState={setNewNumber} />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons}/>
    </div>
  )

}

export default App