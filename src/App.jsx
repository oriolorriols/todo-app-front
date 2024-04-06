import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Header from "./components/header/header";
import ToDoLists from "./components/todo-list/todo-list"
import lists from "./lists/toDoItemLists.json"

import "./App.scss";

function App() {
 

  const [toDoList, setToDoList] = useState(lists);
  

  const addToDoItem = (title, description, column) => {
    const newDate = new Date();
    const dayOfMonth = newDate.getDate();
    const month = newDate.getMonth();
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[month];
    const deadline = `${dayOfMonth + Math.floor(Math.random() * 25) + 1} ${monthName}`;

    const newItem = {
      id: "task-" + getID(),
      title,
      description,
      deadline,
      completed: "",
    };

    if(title==="") {} 
    else {  
      const updatedColumns = { ...toDoList.columns };
      const newTaskIds = [...updatedColumns[column.id].taskIds, newItem.id];
      updatedColumns[column.id].taskIds = newTaskIds;
  
      // Update the toDoList state with the new item and updated column
      setToDoList({
        ...toDoList,
        toDoItemList: {
          ...toDoList.toDoItemList,
          [newItem.id]: newItem,
        },
        columns: updatedColumns,
      });
  
  };
}

  function getID() {
    const updatedToDoItemList = Object.values(toDoList.toDoItemList);
    let largestId = 0;
  
    for (let i = 0; i < updatedToDoItemList.length; i++) {
      const currentId = Number(updatedToDoItemList[i].id.slice(5));
      if (currentId > largestId) {
        largestId = currentId;
      }
    }

    return largestId + 1;
  }
  function handleEditClick(item) {
      const updatedToDoItemList = { ...toDoList.toDoItemList }
      const updatedItem = { ...updatedToDoItemList[item.id] }
  
      updatedItem.edit = !updatedItem.edit
  
      updatedToDoItemList[item.id] = updatedItem
  
      setToDoList({
          ...toDoList,
          toDoItemList: updatedToDoItemList
      });
    }

/* exitEditMode()
  function exitEditMode(){
    const updatedToDoItemList = { ...toDoList.toDoItemList }
    for (const itemId in updatedToDoItemList){
      updatedToDoItemList[itemId].edit = false
    }
    setToDoList({
      ...toDoList,
      toDoItemList: updatedToDoItemList
  });
  }
*/

  function handleEditInputChange(e, item, toChange) {
    const updatedToDoItemList = { ...toDoList.toDoItemList }
    const updatedItem = { ...updatedToDoItemList[item.id] }

    function changeToDoITemList(){
      updatedToDoItemList[item.id] = updatedItem
      setToDoList({
          ...toDoList,
          toDoItemList: updatedToDoItemList
      });
    }

    switch (toChange) {
      case "title":
        updatedItem.title = e.target.value
        changeToDoITemList()
        break
      case "description":
        updatedItem.description = e.target.value
        changeToDoITemList()
        break
      case "column-title":
        console.log("trying to change title?")
        break
    }


  }

  function setToDone(item) {
    const updatedToDoItemList = {...toDoList.toDoItemList }
    const updatedItem = { ...updatedToDoItemList[item.id] }

    if (updatedItem.completed === "checked") {
      updatedItem.completed = ""
    } else {
      updatedItem.completed = "checked"
    }

    updatedToDoItemList[item.id] = updatedItem

    setToDoList(
      { ...toDoList,
        toDoItemList: updatedToDoItemList
      }
    )
  }

  const handleDragDrop = (results) => {
    const {source, destination, draggableId} = results
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
    const updatedToDoItemList = Object.fromEntries(
        Object.entries(toDoList.toDoItemList)
            .filter((key) => key !== item.id)
    );

    const updatedColumns = { ...toDoList.columns };
    for (const columnId in updatedColumns) {
        updatedColumns[columnId].taskIds = updatedColumns[columnId].taskIds.filter(taskId => taskId !== item.id);
    }

    setToDoList({
        ...toDoList,
        toDoItemList: updatedToDoItemList,
        columns: updatedColumns
    });
}

  return (
    <>
    <div className="all-container">

  
    <Header></Header>
      <div className="px-20 pt-10 mx-auto container-lists">

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
            addToDoItem={addToDoItem}
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
