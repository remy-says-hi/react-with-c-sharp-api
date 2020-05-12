import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewAnimalForm(props){

  function addNewAnimal(event) {
    event.preventDefault();
    const animal = {
      name: event.target.name.value,
      age: parseInt(event.target.age.value), 
      species: event.target.species.value,
      gender: event.target.gender.value
    }
    props.onAddAnimal(animal);
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={addNewAnimal}
        buttonText="Save!" />
    </React.Fragment>
  );
}

NewAnimalForm.propTypes = {
  onAddAnimal: PropTypes.func
};

export default NewAnimalForm;