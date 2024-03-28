import { useState } from "react";
import Header from "./components/header/header";
import ToDoList from "./components/todo-list/todo-list"
import lists from "./lists/toDoItemLists.json"

import "./App.scss";

function App() {

  const listOfLists = [
    {
      id: 0,
      title: "Shop List",
      completed: "",
    },
    {
      id: 1,
      title: "Car Adjustments",
    },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [toDoList, setToDoList] = useState(lists.toDoItemList);
  

  const addToDoItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: getID(),
      title,
      description,
      completed: "",
      edit: "false",
    };

    if(description==="" || title==="") {} 
    else {  
      const newListOfItems = toDoList.concat(newItem);
      setToDoList(newListOfItems);

      setTitle("");
      setDescription("");
    }
  };

  function getID() {
    var largestId = toDoList[0].id;
    for (let i = 0; i < toDoList.length; i++) {
      if (toDoList[i].id > largestId) {
        var largestId = toDoList[i].id;
      }
    }
    return largestId + 1;
  }

  function handleEditClick(item) {
    let id = item.id;
    let newList = [...toDoList];
    let isForEditing = newList.find((item) => item.id === id);

    if (item.edit !== "true") {
      isForEditing.edit = "true";
      setToDoList(newList);
    } else {
      isForEditing.edit = "false";
      setToDoList(newList);
    }
  }

  function handleEditInputChange(e, item, toChange) {
    let id = item.id;
    let newList = [...toDoList];
    let isForEditing = newList.find((item) => item.id === id);
    switch (toChange) {
      case "title":
        isForEditing.title = e.target.value;
        console.log(e);
        break;
      case "description":
        isForEditing.description = e.target.value;
        console.log(e);
        break;
    }

    setToDoList(newList);
  }

  function setToDone(id) {
    const newList = [...toDoList];
    const isCompleted = newList.find((item) => item.id === id);

    if (isCompleted.completed === "checked") {
      isCompleted.completed = "";
    } else {
      isCompleted.completed = "checked";
    }
    setToDoList(newList);
  }

  const handleDragDrop = (results) => {
    const {source, destination, type} = results
    if (!destination) return 
    if (source.droppableId === destination.droppableId  && source.index === destination.index)  return
    if (type === 'group'){
      const reoderItems = [...toDoList]
      const sourceIndex = source.index
      const destinationIndex = destination.index
      const [removedItem] = reoderItems.splice(sourceIndex, 1)
      reoderItems.splice(destinationIndex, 0, removedItem)

      return setToDoList (reoderItems)
    }
  }

  function eraseItem(item) {
    let id = item.id;
    let newList = [...toDoList];
    const erasedItemList = newList.filter(item => item.id !== id)
    setToDoList(erasedItemList);
  }

  return (
    <>
      <div className="container mx-auto">
        <Header></Header>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
        />
        <button type="submit" onClick={addToDoItem}>
          Add
        </button>

      <div className="flex">


        {listOfLists.map((item) => (
          <div key={item.id}> 
            <ToDoList 
            handleDragDrop={handleDragDrop}
            handleEditInputChange={handleEditInputChange}
            handleEditClick={handleEditClick}
            toDoList={toDoList}
            setToDone={setToDone}
            listTitle={item.title}
            eraseItem={eraseItem}
            ></ToDoList>
            </div>
        ))}
        </div>     
      </div>
    </>
  );
}

export default App;
