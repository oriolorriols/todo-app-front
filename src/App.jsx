import { useState, useEffect } from "react"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { Modal } from "flowbite-react"

import Header from "./components/header/header"
import EraseItem from "./components/erase-item/erase-item"
import EraseColumn from "./components/erase-column/erase-column"
import ToDoLists from "./components/todo-list/todo-list"

import { 
  getTasks, 
  getColumns, 
  getOrder, 
  updateColumnOrder, 
  updateTaskOrder, 
  addTask, 
  updateColumn, 
  deleteTask, 
  updateTask, 
  addNewColumn, 
  eraseColumn 
} from "./apiService/userApi"

import "./App.scss";


function App() {
 
  const [allTasks, setAllTasks] = useState([])
  const [columns, setColumns] = useState([])
  const [orderColumns, setOrderColumns] = useState([])

  const [activeItem, setActiveItem] = useState({})
  const [trashModalItem, setTrashModalItem] = useState(false)

  const [activeColumn, setActiveColumn] = useState({})
  const [trashModalColumn, setTrashModalColumn] = useState(false)

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await getTasks();
      const cols = await getColumns();
      const order = await getOrder();
      setAllTasks(tasks);
      setColumns(cols);
      setOrderColumns(order[0].columnOrder);
      setLoading(false)
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

  const addToDoItem = async (title, description, dueDate, column) => {
    const newItem = {
      id: "task-" + getID(),
      title,
      description,
      dueDate,
      status: "toDo",
    };
  
    const updatedColumns = [...columns];
    const newTaskIds = [...updatedColumns.find(col => col.id === column.id).taskIds, newItem.id];
  
    updatedColumns.find(col => col.id === column.id).taskIds = newTaskIds;

    setAllTasks(prevTasks => [...prevTasks, newItem]);
    setColumns(updatedColumns);
    
    
    updateColumn(column.id, updatedColumns);
    addTask(newItem);
  }

  function getID() {

    let largestId = 0;
  
    for (let i = 0; i < allTasks.length; i++) {
      const currentId = Number(allTasks[i].id.slice(5));
      if (currentId > largestId) {
        largestId = currentId;
      }
    }

    return largestId + 1;
  }

  function handleEditClick(item) {
      const updatedToDoItemList = [ ...allTasks ]
      const updatedItem = updatedToDoItemList.find(task => task.id === item.id)
  
      updatedItem.edit = !updatedItem.edit
  
      const newList = [ ...updatedToDoItemList ]
  
      setAllTasks(newList)
      updateTask(item.id, updatedItem)
    }

  function handleEditInputChange(e, item, toChange) {
    const updatedToDoItemList = [ ...allTasks ]
    const updatedItem = updatedToDoItemList.find(task => task.id === item.id)

    const updatedColumnList = [ ...columns ]
    const updatedCollumnTitle =  updatedColumnList.find(column => column.id === item.id)

    function changeToDoITemList(){
      updatedToDoItemList[item.id] = updatedItem

      setAllTasks(updatedToDoItemList)
      updateTask(item.id, updatedItem)
    }

    function changeToDoColumnList(){
      updatedColumnList[item.id] = updatedCollumnTitle

      updateColumn(item.id, updatedColumnList)
      setColumns(updatedColumnList)
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
    const updatedToDoItemList = [ ...allTasks ]
    const updatedItem = updatedToDoItemList.find(task => task.id === item.id)

    if (updatedItem.status === "done") {
      updatedItem.status = "toDo"
    } else {
      updatedItem.status = "done"
    }

    updatedToDoItemList[item.id] = updatedItem

    setAllTasks(updatedToDoItemList)
    updateTask(item.id, updatedItem)
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
    updateTaskOrder(startColumnId, startTaskIds);
    updateTaskOrder(finishColumnId, finishTaskIds);
  };

  function eraseItem(item) {
    setActiveItem(item)
    setTrashModalItem(true)

    if(trashModalItem === true){
      const updatedToDoItemList = allTasks.filter(taskId => taskId !== item.id)
      const updatedColumns = [ ...columns ]

      for (const columnId in updatedColumns) {
          updatedColumns[columnId].taskIds = updatedColumns[columnId].taskIds.filter(taskId => taskId !== item.id)
          updateColumn(updatedColumns[columnId].id, updatedColumns);
      }

      setAllTasks(updatedToDoItemList)
      setColumns(updatedColumns)

      setTrashModalItem(false)

      deleteTask(item.id)
    }
}

  const addColumn = () => {
    
    function getHighestColumnId() {
      let highestId = 0;
      for (const columnId of orderColumns) {
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

    const updatedColumnOrder = [...orderColumns, newColumnId];

    addNewColumn(newColumn)
    updateColumnOrder(updatedColumnOrder)

    const addedColumns = [...columns, newColumn]
    setColumns(addedColumns)

    const orderedColumns = [ ...orderColumns, newColumn.id]
    setOrderColumns(orderedColumns)
  };


  function deleteColumn(column) {
    setActiveColumn(column);
    
     if (trashModalColumn === true) {
      const updatedToDoItemList = [ ...allTasks ];
      column.taskIds.forEach(taskId => {
        delete updatedToDoItemList.find(task => task === taskId)
        deleteTask(taskId)
      });

      const updatedColumnOrder = orderColumns.filter(colId => colId !== column.id)

      updateColumnOrder(updatedColumnOrder)
      setOrderColumns(updatedColumnOrder)

      const newColumns = columns.filter(col => col.id !== column.id)
      setColumns(newColumns)
      eraseColumn(column.id)

      setTrashModalColumn(false)
    }
    else {
      setTrashModalColumn(true);
    }
  }

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

            {isLoading ? (
              <div className="flex" role="status">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="ml-5 my-1">Waiting for your tasks...</span>
              </div>
            ) : (
              <div onClick={addColumn} className="addtaskbutton flex cursor-pointer p-2">
                <div className="flex">
                  <img className="mr-2" src="add.svg" alt="" width="15px" />
                  <button>Add list</button>
                </div>
              </div>
            ) }
          </div>
        </div>
      </div>     
    </div>  
  </div>
  </>
);
}
export default App;