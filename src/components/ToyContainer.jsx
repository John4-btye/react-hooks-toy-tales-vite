import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDonateToy }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard key={toy.id} toy={toy} onDonateToy={onDonateToy} />
      ))}
    </div>
  );
}

export default ToyContainer;
