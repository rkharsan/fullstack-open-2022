import { useState, useEffect } from "react";

import personService from "./services/persons";

const handleChange = (setter) => (event) => {
  setter(event.target.value);
};

const Notification = ({ message, style }) => {
  if (!message) return null;

  return <div className={style || "info"}>{message}</div>;
};

const Person = ({ person, onDelete }) => (
  <p>
    {person.name} - {person.number} -{" "}
    <button onClick={onDelete}>&times;</button>
  </p>
);

const PersonList = ({ persons, filter, onDelete }) => {
  const shownPersons = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {shownPersons.map((person) => (
        <Person
          key={person.id}
          person={person}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </div>
  );
};

const Filter = ({ value, onChange }) => (
  <div>
    show people with <input value={value} onChange={onChange} />
  </div>
);

const AddPersonForm = ({ onAddPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddPerson(newName, newNumber);

    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        name <input value={newName} onChange={handleChange(setNewName)} />
      </p>
      <p>
        number <input value={newNumber} onChange={handleChange(setNewNumber)} />
      </p>
      <p>
        <button type="submit">add</button>
      </p>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState("");

  const flashMessage = (message, style) => {
    setMessage(message);
    setStyle(style);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    personService.getAllPersons().then((allPersons) => {
      setPersons(allPersons);
      flashMessage(`Loaded ${allPersons.length} users from API`);
    });
  }, []);

  const addPerson = (name, number) => {
    const oldPerson = persons.find((p) => p.name === name);

    if (oldPerson) {
      const question = `Do you want to update number for ${oldPerson.name}?`;
      if (!window.confirm(question)) return;

      personService
        .updatePerson(oldPerson.id, { ...oldPerson, number })
        .then((newPerson) => {
          setPersons(
            persons.map((p) => (p.id === newPerson.id ? newPerson : p))
          );
          flashMessage(`Updated ${newPerson.name}'s phone number`);
        })
        .catch(() => {
          flashMessage(`ERROR: ${oldPerson.name} was deleted`, "error");
        });
    } else {
      personService.addPerson({ name, number }).then((newPerson) => {
        setPersons([...persons, newPerson]);
        flashMessage(`Added ${newPerson.name}'s details`);
      });
    }
  };

  const deletePerson = (id) => {
    const personName = persons.find((p) => p.id === id)?.name;
    if (window.confirm(`Delete ${personName}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        flashMessage(`Deleted ${personName}'s details`);
      });
    }
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification message={message} style={style} />

      <Filter value={filter} onChange={handleChange(setFilter)} />

      <h2>Add a new person</h2>
      <AddPersonForm onAddPerson={addPerson} />

      <h2>Names</h2>
      <PersonList persons={persons} filter={filter} onDelete={deletePerson} />
    </div>
  );
};

export default App;
