import { useState } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Modal } from "flowbite-react"

import Header from "./components/header/header"
import EraseItem from "./components/erase-item/erase-item"
import EraseColumn from "./components/erase-column/erase-column"
import ToDoLists from "./components/todo-list/todo-list"

import { getTasks, getColumns, getOrder, updateColumnOrder, updateTaskOrder, addTaks, updateColumn} from "./apiService/userApi"

import "./App.scss";
import { useEffect } from "react"


function App() {
 
  const [allTasks, setAllTasks] = useState([])
  const [columns, setColumns] = useState([])
  const [orderColumns, setOrderColumns] = useState([])

  const [activeItem, setActiveItem] = useState({})
  const [trashModalItem, setTrashModalItem] = useState(false)

  const [activeColumn, setActiveColumn] = useState({})
  const [trashModalColumn, setTrashModalColumn] = useState(false)


useEffect(() => {
  const fetchData = async () => {
    const tasks = await getTasks();
    const cols = await getColumns();
    const order = await getOrder();
    setAllTasks(tasks);
    setColumns(cols);
    setOrderColumns(order[0].columnOrder);
  };
  fetchData();
}, []);

  function changeModalStatus(value, modal){
    if(modal === "item"){
    setTrashModalItem(value)}
    if(modal === "column"){
    setTrashModalColumn(value)
    }
  }

  const addToDoItem = (title, description, dueDate, column) => {
    const newItem = {
      id: "task-45",
      title,
      description,
      dueDate,
      status: "toDo",
    };

     const updatedColumns = { ...columns }
     const newTaskIds = [...updatedColumns.find(col => col.id === column.id).taskIds, newItem.id]
     updatedColumns.find(col => col.id === column.id).taskIds = newTaskIds;
     
     addTaks(newItem)
     updateColumn(column.id, updatedColumns)

     const newTasks = { ...allTasks, newItem}
     setAllTasks(newTasks)
     setColumns(updatedColumns);
}
/*
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
*/
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

  function handleEditInputChange(e, item, toChange) {
    const updatedToDoItemList = { ...toDoList.toDoItemList }
    const updatedItem = { ...updatedToDoItemList[item.id] }

    const updatedColumnList = { ...toDoList.columns }
    const updatedCollumnTitle = { ...updatedColumnList[item.id]}

    function changeToDoITemList(){
      updatedToDoItemList[item.id] = updatedItem
      setToDoList({
          ...toDoList,
          toDoItemList: updatedToDoItemList
      });
    }

    function changeToDoColumnList(){
      updatedColumnList[item.id] = updatedCollumnTitle
      setToDoList({
          ...toDoList,
          columns: updatedColumnList
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
        updatedCollumnTitle.title = e.target.value
        changeToDoColumnList()
        break
      case "date":
        updatedItem.dueDate = e.target.value
        changeToDoITemList()
        break
    }


  }

  function setToDone(item) {
    const updatedToDoItemList = {...toDoList.toDoItemList }
    const updatedItem = { ...updatedToDoItemList[item.id] }

    if (updatedItem.status === "done") {
      updatedItem.status = "toDo"
    } else {
      updatedItem.status = "done"
    }

    updatedToDoItemList[item.id] = updatedItem

    setToDoList(
      { ...toDoList,
        toDoItemList: updatedToDoItemList
      }
    )
  }

  const handleDragDrop = (results) => {
    const { source, destination, draggableId, type } = results;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (type === "column") {
      const newColumnOrder = Array.from(orderColumns);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      setOrderColumns(newColumnOrder);
   
      updateColumnOrder(newColumnOrder);
      return;
    }

    const startColumnId = source.droppableId;
    const finishColumnId = destination.droppableId;

    if (startColumnId === finishColumnId) {
      const column = columns.find((col) => col.id === startColumnId);
      if (!column) return;

      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === startColumnId ? { ...col, taskIds: newTaskIds } : col
        )
      );
      // Actualiza el orden de las tareas en la misma columna en la base de datos
      updateTaskOrder(startColumnId, newTaskIds);
      return;
    }

    const startColumn = columns.find((col) => col.id === startColumnId);
    const finishColumn = columns.find((col) => col.id === finishColumnId);
    if (!startColumn || !finishColumn) return;

    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id === startColumnId) return { ...col, taskIds: startTaskIds };
        if (col.id === finishColumnId) return { ...col, taskIds: finishTaskIds };
        return col;
      })
    );
    // Actualiza el orden de las tareas entre columnas en la base de datos
    updateTaskOrder(startColumnId, startTaskIds);
    updateTaskOrder(finishColumnId, finishTaskIds);
  };

  function eraseItem(item) {
    setActiveItem(item)
    setTrashModalItem(true)

    if(trashModalItem === true){
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
    setTrashModalItem(false)
    }
}

  const addColumn = () => {
    
    function getHighestColumnId() {
      let highestId = 0;
      for (const columnId of toDoList.columnOrder) {
        const id = columnId.slice(-1);
        if (id > highestId) {
          highestId = Number(id)
        }
      }
      return "column-" + Number(highestId + 1);
    }

    let newColumnId = getHighestColumnId().toString();
    const newColumn = {
      id: newColumnId,
      title: "New Column",
      taskIds: []
    };

    const updatedColumns = {
      ...toDoList.columns,
      [newColumnId]: newColumn
    };

    const updatedColumnOrder = [...toDoList.columnOrder, newColumnId];

    setToDoList({
      ...toDoList,
      columns: updatedColumns,
      columnOrder: updatedColumnOrder
    });
  };


  function deleteColumn(column) {
    setActiveColumn(column)
    setTrashModalColumn(true)

    if(trashModalColumn === true){
      
    const deletedColumn = toDoList.columns[column.id];

    const updatedToDoItemList = { ...toDoList.toDoItemList };
    deletedColumn.taskIds.forEach((taskId) => {
      delete updatedToDoItemList[taskId];
    });

    const updatedColumnOrder = toDoList.columnOrder.filter(
      (columnId) => columnId !== column.id
    );
  
    const { [column.id]: deleted, ...updatedColumns } = toDoList.columns;
  
    setToDoList({
      ...toDoList,
      toDoItemList: updatedToDoItemList,
      columns: updatedColumns,
      columnOrder: updatedColumnOrder,
    });
    setTrashModalColumn(false)
  }
}

/*
return (
  <>
  {orderColumns.map((item) => {
    return(
      <h1>{item}</h1>
    )
  })}
  {columns.map((item) => {
    return(
      <h1>{item.title}</h1>
    )
  })}
  {allTasks.map((item) => {
    return(
      <h1>{item.title}</h1>
    )
  })}

  </>
)
*/

return (
  <>
  <div className="all-container">

  <Modal show={trashModalItem} size="md" onClose={() => setTrashModalItem(false)} popup>
    <EraseItem item={activeItem} changeModalStatus={changeModalStatus} eraseItem={eraseItem}></EraseItem>
  </Modal>

  <Modal show={trashModalColumn} size="md" onClose={() => setTrashModalColumn(false)} popup>
    <EraseColumn activeColumn={activeColumn} changeModalStatus={changeModalStatus} deleteColumn={deleteColumn}></EraseColumn>
  </Modal>

  <Header></Header>
    <div className="px-20 pt-10 mx-auto container-lists">
    <div className="flex">
    <DragDropContext onDragEnd={handleDragDrop}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps}  className="flex">

          {orderColumns.map((columnId, index) => {
            const column = columns.find(col => col.id === columnId)
            const tasks = column.taskIds.map(
              taskId => allTasks.find(task => task.id === taskId)
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
              deleteColumn={deleteColumn}
              index={index}
              ></ToDoLists>
              </div>
            )
          })}
          {provided.placeholder}
        </div>
      )}
    
    
      </Droppable>
    </DragDropContext>
        <div>
          <div className="list addlist w-96 mt-5 mr-4 px-4 py-5">
            <div onClick={addColumn} className="addtaskbutton flex cursor-pointer p-2"> 
               <div className="flex">
                 <img className="mr-2" src="/src/assets/add.svg" alt="" width="15px" />
                 <button>Add list</button>
               </div>
             </div>
          </div>
        </div>
      </div>     
    </div>  
  </div>
  </>
);


}
export default App;
