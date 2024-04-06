import { Droppable, Draggable } from "react-beautiful-dnd";
import ToDoItem from "../todo-item/todo-item";
import "./todo-list.scss";
import { useState } from "react";


function ToDoLists({handleEditClick, handleEditInputChange, toDoList, setToDone, column, eraseItem, addToDoItem }) {
  
  const [localTitle, setLocalTitle] = useState("")
  const [localDescription, setLocalDescription] = useState("")
  const [addTask, setAddTask] = useState(true)

  const handleTitleChange = (e) => {
    setLocalTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setLocalDescription(e.target.value)
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
    addToDoItem(title, description, column)
  
    setLocalTitle("")
    setLocalDescription("")

    let task = true
    setAddTask(task)
  };

  return (
      <div className="list w-96 mt-5 mr-4 p-6">
          <div className="flex justify-between">
            <h3 onDoubleClick={ (e) => handleEditInputChange(e, column.id, 'column-title')} className="text-black">{column.title}</h3>
            <img src="/src/assets/edit.svg" width="18px" alt="" />
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
                        letsCheck={item.completed}
                        handleEditClick={handleEditClick}
                        handleEditInputChange={handleEditInputChange}
                        canEdit={item.edit}
                        eraseItem={eraseItem}
                        column={column}>
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
            {addTask ? (
              <div className="addtaskbutton flex cursor-pointer p-2" onClick={setTask}> 
                <div className="flex">
                  <img className="mr-2" src="/src/assets/add.svg" alt="" width="15px" />
                  <button>Add task</button>
                </div>
              </div>

            ) : (
              <div className="addtask">
              <input
                className="mb-2"
                type="text"
                onChange={handleTitleChange}
                value={localTitle}
                placeholder="Title"
              />
              <textarea
                type="textarea"
                onChange={handleDescriptionChange}
                rows={localDescription.length / 27}
                value={localDescription}
                placeholder="Description"
              ></textarea>

              <div onClick={handleAddToDo} className="flex"> 
                 <div className=" flex cursor-pointer">
                   <img className="mr-2" src="/src/assets/save.svg" alt="" width="18px" />
                   <button>Save</button>
                 </div>
              </div>
              
            
              </div>
              )}
            </div>        
      
        </div>
    );
  }
  
  export default ToDoLists;
  