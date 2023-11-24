import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'

const Person = ({person}) => {
  return(
    <>{person.name} {person.number} </>
  )
}

const PersonList = ({persons, deleteFunc}) => {
  return (
    <div>
      {persons.map(person => {
        return(
        <div key={person.name}>
          <Person person={person}/>
          <button onClick={() => deleteFunc(person.id)}>delete</button>
        </div>
        )
      }
      )}
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

const Notification = ({message, className}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
        .then(initialPhonebook => {
        setPersons(initialPhonebook)
      })
  }, [])

  const names = persons.map(person => person.name)


  const addPerson = (event) => {
    event.preventDefault()
    if (names.includes(newName))
    {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const newPerson = { ...personToUpdate, number: newNumber }
        phonebookService
          .update(newPerson.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => newPerson.id !== person.id ? person : returnedPerson))
            })
            .catch(error => {
              setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      phonebookService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          })
      setSuccessMessage(`Added ${personObject.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  // Would've put this into "Input" component if not for
  // the instructions to include these in the main app
  const handleInputChange = (event, setInputState) => {
    setInputState(event.target.value)
  }

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const nameFromId = (id) => persons.find((person) => person.id === id).name
  const deletePerson = (id) => {
    const name = nameFromId(id)
    if (window.confirm(`Delete ${name} from phonebook?`)) {
      phonebookService.deleteId(id)
      const newPersons = persons.filter((person) => person.id != id)
      setPersons(newPersons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className='success'/>
      <Notification message={errorMessage} className='error'/>
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
      <PersonList persons={filteredPersons} deleteFunc={deletePerson}/>
    </div>
  )

}

export default App