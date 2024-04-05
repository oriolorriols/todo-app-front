import { Droppable, Draggable } from "react-beautiful-dnd";
import ToDoItem from "../todo-item/todo-item";
import "./todo-list.scss";


function ToDoLists({handleEditClick, handleEditInputChange, toDoList, setToDone, column, eraseItem }) {
    return (
      <div className="list w-96 mt-5 mr-4 p-4">
          <h3 className="text-black">{column.title}</h3>
        
          <Droppable
            droppableId={column.id} type="group">
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
  
  export default ToDoLists;
  