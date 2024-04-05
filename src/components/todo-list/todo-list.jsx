import { Droppable, Draggable } from "react-beautiful-dnd";
import ToDoItem from "../todo-item/todo-item";

function ToDoList({handleEditClick, handleEditInputChange, handleDragDrop, toDoList, setToDone, listTitle, eraseItem }) {
    return (
<div className="w-96 bg-stone-500 mt-5">
          <h1 className="text-black">{listTitle}</h1>
        
          <Droppable
            droppableId={listTitle} type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="grid my-9">
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
      
        </div>
    );
  }
  
  export default ToDoList;
  