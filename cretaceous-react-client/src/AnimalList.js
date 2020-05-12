import React, { useState, useEffect } from 'react';
import Animal from './Animal';
import NewAnimalForm from './NewAnimalForm';

function AnimalList() {
  const [animalList, setAnimalList] = useState([]);
  const [error, setError] = useState(null);

  // If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument
  useEffect(() => {
    get();
  }, [])

  async function addAnimal(animal) {
    await fetch(`http://localhost:5000/api/Animals`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animal)
    })
    // .then(response => response.json())
    // .then((jsonifiedResponse) => {
    //   setAnimalList(jsonifiedResponse);
    // })
    // .catch((error) => {
    //   setError(error);
    // });
  }

  async function get() {
    await fetch(`http://localhost:5000/api/Animals`)
    .then(response => response.json())
    .then((jsonifiedResponse) => {
      setAnimalList(jsonifiedResponse);
    })
    .catch((error) => {
      setError(error);
    });
  }

  async function deleteAnimal(id) {
    await fetch(`http://localhost:5000/api/Animals/${id}`,{
      method: 'DELETE'
    })
    .then(response => response.json())
    .then((jsonifiedResponse) => {
      setAnimalList(jsonifiedResponse);
    })
    .catch((error) => {
      setError(error);
    });
  }

  async function editAnimal(id, propsToUpdate) {
    await fetch(`http://localhost:5000/api/Animals/${id}`,{
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(propsToUpdate)
    })
    // .then(response => response.json())
    // .then((jsonifiedResponse) => {
    //   setAnimalList(jsonifiedResponse);
    // })
    // .catch((error) => {
    //   setError(error);
    // });
  }

  return (
    <React.Fragment>
      <h1>Cretaceous Animals!</h1>
      <NewAnimalForm onAddAnimal={addAnimal}/>
      {animalList !== null ? animalList.map(animal => <Animal key={animal.animalId} animal={animal} onDeleteAnimal={deleteAnimal} onEditAnimal={editAnimal}/>) : <h1>{error}</h1>}
    </React.Fragment> 
  );
}

export default AnimalList;
