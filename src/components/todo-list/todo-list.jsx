import { Droppable, Draggable } from "react-beautiful-dnd";
import ToDoItem from "../todo-item/todo-item";
import "./todo-list.scss";
import { useState } from "react";


function ToDoLists(
    {handleEditClick, 
    handleEditInputChange, 
    toDoList, 
    setToDone, 
    column,
    eraseItem, 
    addToDoItem, 
    deleteColumn, 
    index}) 
  {
  
  const [localTitle, setLocalTitle] = useState("")
  const [localDescription, setLocalDescription] = useState("")
  const [localDueDate, setLocalDueDate] = useState("")
  const [addTask, setAddTask] = useState(false)
  const [columnTitle, setColumnTitle] = useState(true)


  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setLocalDescription(e.target.value)
  }

  const handleDateChange = (e) => {
    setLocalDueDate(e.target.value)
  }

  const handleColumnTitle = () => {
    if(columnTitle == true){
      setColumnTitle(false)
    } else {
      setColumnTitle(true)
    }
    
  }

  function setTask() {
    let task = ""
    if(addTask === true) {
      task = false
      setAddTask(task)
    } else {
      task = true
      setAddTask(task)
    }
  }

  const handleAddToDo = (e) => {
    e.preventDefault()
    const title = localTitle
    const description = localDescription
    const dueDate = localDueDate

    if (!title) {
      alert("Please enter a title for the task.")
      return
    }
    if (!dueDate) {
      alert("Please select a due date for the task.")
      return
    }
    addToDoItem(title, description, dueDate, column);
    setLocalTitle("");
    setLocalDescription("");
    setLocalDueDate("");
    setAddTask(false);
  };

  const cancelAddToDo = (e) => {
    setAddTask(false)
  }

  return (
    
   <Draggable draggableId={column.id} index={index}> 
    {(provided) => (

    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="list w-96 mt-5 mr-4 p-6">
         <div className="flex justify-between">
           {columnTitle ? (
             <>
               <h3>{column.title}</h3>
               <div className="icons flex">
                 <img onClick={handleColumnTitle} src="edit.svg" width="18px" alt="" className="cursor-pointer"/>
                 <img onClick={() => deleteColumn(column)} className="cursor-pointer ml-2" src="delete.svg" width="18px" alt="" />
               </div>
             </>
           ) : ( 
             <>
               <input className="inputTitle" type="text" onChange={ (e) => handleEditInputChange(e, column, 'column-title')} value={column.title}/>
               <div className="flex cursor-pointer" onClick={handleColumnTitle}>
                <img className="mr-2" src="save.svg" alt="" width="18px" />
                <button>Save</button>
               </div>
               
             </> 
           )}
         </div>
         <Droppable
           droppableId={column.id} type="group">
             {(provided) => (
               <div {...provided.droppableProps} ref={provided.innerRef} className="grid mt-5">
                 {toDoList.map((item, index) => (
                   <Draggable draggableId={item.id} key={item.id} index={index}>
                     {(provided) => { return (
                       <div {...provided.dragHandleProps} 
                       {...provided.draggableProps}
                       ref={provided.innerRef}>                        
                       <ToDoItem
                         item={item}
                         setToDone={setToDone}
                         letsCheck={item.status}
                         handleEditClick={handleEditClick}
                         handleEditInputChange={handleEditInputChange}
                         canEdit={item.edit}
                         eraseItem={eraseItem}>
                       </ToDoItem>
                       </div>
                     )}}
                   </Draggable>
                 ))}
                 {provided.placeholder}
               </div>
             )}
         </Droppable>
         <div>
           {!addTask ? (
             <div className="addtaskbutton flex cursor-pointer p-2" onClick={setTask}> 
               <div className="flex">
                 <img className="mr-2" src="add.svg" alt="" width="15px" />
                 <button>Add task</button>
               </div>
             </div>
           ) : (
             <div className="addtask p-5">
               <input
                 className="mb-2"
                 type="text"
                 onChange={handleTitleChange}
                 value={localTitle}
                 placeholder="Enter a title for this card"
                 required
               />
               <textarea
                 type="textarea"
                 onChange={handleDescriptionChange}
                 rows={localDescription.length / 27}
                 value={localDescription}
                 placeholder="Write a description"
               ></textarea>
               <input type="date" name="" id="" onChange={handleDateChange} required/>
               <div className="flex justify-between mt-5 mb-1 mx-2"> 
                 <button onClick={cancelAddToDo}>Cancel</button>
                   <div onClick={handleAddToDo} className=" flex cursor-pointer">
                     <img className="mr-2" src="save.svg" alt="" width="18px" />
                     <button type="submit">Save</button>
                   </div>
               </div>
             </div>
           )}
         </div>   
    </div>
    )}
    </Draggable>
    );
  }
  
  export default ToDoLists;
  