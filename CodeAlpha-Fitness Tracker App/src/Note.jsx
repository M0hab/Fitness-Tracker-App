import React from "react";
import { getCurrentDate } from "./Date";

function Note(props) {
  // Function to handle the delete action
  function handleClick() {
    props.onDelete(props.id);
  }

  // Function to calculate the achievement percentage
  function Achievement(actual, target) {
    if (target === 0) {
      return 0; // To avoid division by zero
    }
    return ((actual / target) * 100).toFixed(1); // Format to one decimal place
  }

  // Ensure values are treated as numbers
  const actualPushup = Number(props.actualpushup);
  const actualSitup = Number(props.actualsitup);
  const targetPushup = Number(props.targetpushup);
  const targetSitup = Number(props.targetsitup);

  // Calculate the combined achievement percentage
  const totalActual = actualPushup + actualSitup;
  const totalTarget = targetPushup + targetSitup;
  const achPercentage = Achievement(totalActual, totalTarget);

const date = getCurrentDate();

  return (
    <div className="note">
      {/* <h1>{props.title}</h1> */}
      <h1>{date}</h1>
      <h3>Push Up Actual/Target:</h3>
      <p>{actualPushup}/{targetPushup}</p>
      <h3>Sit Up Actual/Target:</h3>
      <p>{actualSitup}/{targetSitup}</p>
      <p>{props.content}</p>
      <h3>Achievement Percentage:</h3>
      <p>Your success rate is: {achPercentage}%</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;