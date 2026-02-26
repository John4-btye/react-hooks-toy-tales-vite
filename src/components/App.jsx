import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((toyData) => setToys(toyData));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToyData) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToyData,
        likes: 0,
      }),
    })
      .then((response) => response.json())
      .then((newToy) => setToys((currentToys) => [...currentToys, newToy]));
  }

  function handleDonateToy(toyId) {
    fetch(`http://localhost:3001/toys/${toyId}`, {
      method: "DELETE",
    }).then(() => {
      setToys((currentToys) => currentToys.filter((toy) => toy.id !== toyId));
    });
  }

  function handleLikeToy(toyToUpdate) {
    const updatedLikes = toyToUpdate.likes + 1;

    fetch(`http://localhost:3001/toys/${toyToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      // Replace only the matching toy so list order stays unchanged.
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy))
        );
      });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        onDonateToy={handleDonateToy}
        onLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;
