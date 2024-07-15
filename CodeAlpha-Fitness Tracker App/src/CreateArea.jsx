import React, { useState } from "react";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    targetpushup: "",
    targetsitup: "",
    actualpushup: "",
    actualsitup: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleCalories(pushups) {
    axios.post('http://localhost:3000/calculate-calories', { pushups })
      .then(response => {
        const { caloriesBurned } = response.data;
        const resultElement = document.getElementById('result');
        resultElement.innerText = `The number of calories you've burned today by push up is: ${caloriesBurned}`;
      })
      .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('result');
        resultElement.innerText = 'Error: ' + (error.response?.data?.error || error.message);
      });
  }

  function handleCaloriesSitUp(situps) {
    axios.post('http://localhost:3000/calculate-calories-situp', { situps })
      .then(response => {
        const { caloriesBurned } = response.data;
        const resultElement = document.getElementById('result2');
        resultElement.innerText = `The number of calories you've burned today by sit up is: ${caloriesBurned}`;

      })
      .catch(error => {
        console.error('Error:', error);
        const resultElement = document.getElementById('result2');
        resultElement.innerText = 'Error: ' + (error.response?.data?.error || error.message);
      });
  }
  
  
  function submitNote(event) {
    event.preventDefault(); // Prevent the default form submission
    props.onAdd(note);
    handleCalories(Number(note.actualpushup)); // Pass actualpushup to handleCalories
    handleCaloriesSitUp(Number(note.actualsitup));
    setNote({
      title: "", // Ensure the title is reset
      targetpushup: "",
      targetsitup: "",
      actualpushup: "",
      actualsitup: "",
      content: ""
    });

    
  }

  return (
    <div>
      <form onSubmit={submitNote}>
        <h2>Hi! What's your goal for today?</h2>
        <h3>Your target for today:</h3>
        <input
          name="targetpushup"
          onChange={handleChange}
          value={note.targetpushup}
          placeholder="Push Ups Reps"
          type="number"
        />
        <input
          name="targetsitup"
          onChange={handleChange}
          value={note.targetsitup}
          placeholder="Sit Ups Reps"
          type="number"
        />
        <h3>Actual Reps</h3>
        <input
          name="actualpushup"
          onChange={handleChange}
          value={note.actualpushup}
          placeholder="Actual Push Up Reps"
          type="number"
        />
        <input
          name="actualsitup"
          onChange={handleChange}
          value={note.actualsitup}
          placeholder="Actual Sit Ups Reps"
          type="number"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="How is Today?"
          rows="3"
        />
        <button type="submit">Add</button>
      </form>
      <div id="result"></div>
      <div id="result2"></div>
    </div>
  );
}

export default CreateArea;