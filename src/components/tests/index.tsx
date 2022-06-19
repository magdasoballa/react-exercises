import React from "react";

export const Tests = () => {
  function loadUserData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log("userdata"));
      }, 1000);
    });
  }

  function loadBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log("books"));
      }, 1000);
    });
  }

  function loadPets() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log("pets"));
      }, 1000);
    });
  }

  async function render() {
    const user = await loadUserData();
    const pets = loadPets();

    const books = await loadBooks();
    return { user, books, pets };
  }

  return (
    <div>
      <button onClick={render}>click</button>
    </div>
  );
};
