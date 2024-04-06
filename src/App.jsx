import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Header from "./components/header/header";
import ToDoLists from "./components/todo-list/todo-list"
import lists from "./lists/toDoItemLists.json"

import "./App.scss";

function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const [toDoList, setToDoList] = useState(lists);
  

  const addToDoItem = (e) => {
    e.preventDefault();

    const newItem = {
      id: "task-" + getID(),
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
    let largestId = Number(toDoList[0].id.slice(5));
    for (let i = 0; i < toDoList.length; i++) {
      if (Number(toDoList[i].id.slice(5)) > largestId) {
        largestId = Number(toDoList[i].id.slice(5));
      }
    }
    return largestId + 1;
  }

  function handleEditClick(item) {
    let id = item.id;
    let newList = Object.values(toDoList.toDoItemList);
    console.log(newList)
    console.log(item)
    let isForEditing = newList.find((item) => item.id === id);

    if (item.edit !== "true") {
      isForEditing.edit = "true";
    } else {
      isForEditing.edit = "false";
    }
    
    // Construir un nuevo objeto que mantenga todas las propiedades de toDoList
    let updatedToDoList = {
      ...toDoList,
      toDoItemList: newList.reduce((acc, task) => {
        acc[task.id] = task;
        return acc;
      }, {})
    };

    // Actualizar el estado con el nuevo objeto
    setToDoList(updatedToDoList);

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
    const {source, destination, draggableId, type} = results
    if (!destination) return 
    if (source.droppableId === destination.droppableId  && source.index === destination.index)  return

    const start = toDoList.columns[source.droppableId]
    const finish = toDoList.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...toDoList,
        columns: {
          ...toDoList.columns,
          [newColumn.id]: newColumn,
        },
      };

      setToDoList(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...toDoList,
      columns: {
        ...toDoList.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setToDoList(newState);
  }

  function eraseItem(item) {
    let id = item.id;
    let newList = {...toDoList};
    const erasedItemList = Object.values(newList).filter(item => item.id !== id)
    setToDoList(erasedItemList);
  }

  return (
    <>
    <div className="all-container">

  
    <Header></Header>
      <div className="px-20 pt-10 mx-auto container-lists">
        

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

      <div className=" flex">

      <DragDropContext onDragEnd={handleDragDrop}>
        {toDoList.columnOrder.map((item) => {
          const column = toDoList.columns[item]
          const tasks = toDoList.columns[item].taskIds.map(
            taskId => toDoList.toDoItemList[taskId]
          )
          return (
          <div key={column.id}> 
            <ToDoLists 
            handleEditInputChange={handleEditInputChange}
            handleEditClick={handleEditClick}
            toDoList={tasks}
            setToDone={setToDone}
            column={column}
            eraseItem={eraseItem}
            ></ToDoLists>
            </div>
          )
      })}
          </DragDropContext>
        </div>     
      </div>  
    </div>
    </>
  );
}

export default App;
