import { useState } from "react";
import Header from "./components/header/header";
import ToDoItem from "./components/todo-item/todo-item";
import "./App.scss";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const toDoItemList = [
    {
      id: 0,
      title: "This is your First ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: "",
    },
    {
      id: 1,
      title: "This is your Second ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: "",
    },
    {
      id: 2,
      title: "This is your Third ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: "",
    },
    {
      id: 3,
      title: "This is your Fourth ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: "",
    },
  ];

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

  const [toDoList, setToDoList] = useState(toDoItemList);
  

  const addToDoItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: getID(),
      title,
      description,
      completed: "",
      edit: "false",
    };

    const newListOfItems = toDoList.concat(newItem);

    setToDoList(newListOfItems);

    setTitle("");
    setDescription("");
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

  // Drag&Drop
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

        <div className="w-96 bg-stone-500 mt-5">
          <h1 className="text-black">Shop List</h1>
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable
            droppableId="root" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="grid my-9">
                {toDoList.map((item, index) => (
                  <Draggable draggableId={item.title} key={item.id} index={index}>
                    {(provided) => { return (
                      <div {...provided.dragHandleProps} 
                      {...provided.draggableProps}
                      ref={provided.innerRef}>                        
                      <ToDoItem
                        item={item}
                        isDone={setToDone}
                        letsCheck={item.completed}
                        handleEditClick={handleEditClick}
                        handleEditInputChange={handleEditInputChange}
                        canEdit={item.edit}>
                      </ToDoItem>
                      </div>
                    )}}
                  </Draggable>
                ))}
              {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </div>
        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable
            droppableId="root" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="grid my-9">
                {toDoList.map((item, index) => (
                  <Draggable draggableId={item.title} key={item.id} index={index}>
                    {(provided) => { return (
                      <div {...provided.dragHandleProps} 
                      {...provided.draggableProps}
                      ref={provided.innerRef}>                        
                      <ToDoItem
                        item={item}
                        isDone={setToDone}
                        letsCheck={item.completed}
                        handleEditClick={handleEditClick}
                        handleEditInputChange={handleEditInputChange}
                        canEdit={item.edit}>
                      </ToDoItem>
                      </div>
                    )}}
                  </Draggable>
                ))}
              {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        

      </div>
    </>
  );
}

export default App;
