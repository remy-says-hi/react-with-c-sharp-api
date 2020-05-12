import React, {useState} from 'react';
import ReusableForm from './ReusableForm';

export default function Animal(props) {
  const {animal} = props;
  const [isEditing, setIsEditing] = useState(false);
  let button = isEditing ? null : <button onClick={() => setIsEditing(!isEditing)}>edit?</button>

  const handleEditAnimalFormSubmission = event => {
    event.preventDefault();
    const propertiesToUpdate = {
      name: event.target.name.value,
      age: parseInt(event.target.age.value), 
      species: event.target.species.value,
      gender: event.target.gender.value,
    }
    props.onEditAnimal(animal.animalId, propertiesToUpdate);
    setIsEditing(!isEditing);
  }

  return (
    <React.Fragment>
      <h1>{animal.name}</h1>
      <p>species: {animal.species}</p>
      <p>age: {animal.age}</p>
      <p>gender: {animal.gender}</p>
      {button}
      {isEditing ? <ReusableForm formSubmissionHandler={handleEditAnimalFormSubmission}
        buttonText="save changes" /> : null}
      <br></br>
      <hr></hr>
      <button onClick={() => props.onDeleteAnimal(animal.animalId)}>delete!</button>
    </React.Fragment>
  )
}