import { useEffect } from "react";
import "./todo-item.scss";

function ToDoItem({ item, setToDone, letsCheck, canEdit, handleEditClick, handleEditInputChange, eraseItem }) {
  
  /*
  function formatDate(date) {
    const dateToFormat = new Date(date.replace(/-/g, '/'));
    const day = dateToFormat.getDate();
    const monthIndex = dateToFormat.getMonth();
    const year = dateToFormat.getFullYear()
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[monthIndex];
    const formattedDate = day + ' ' + month + " " + year;
    return formattedDate;
  }

  useEffect(() => {
    formatDate(item.dueDate)
  }, [])
  
  */

  return (
    <div id={item.id} className={letsCheck === "done" ? "toDoItem p-5 mb-5 checked" : "toDoItem p-5 mb-5"}>
      <div>
        {canEdit ? (
        <>
          <input type="text"
            value={item.title}
            placeholder="Title"
            onChange={ (e) => handleEditInputChange(e, item, 'title')}/>
          <textarea type="text"
            value={item.description}
            rows={item.description.length / 27}
            placeholder="Description"
            onChange={ (e) => handleEditInputChange(e, item, 'description')}/>
          <input type="date" value={item.dueDate} onChange={ (e) => handleEditInputChange(e, item, 'date')}/>

          <div className="flex justify-end mt-5 mb-1 mr-2">
              <div onClick={() => handleEditClick(item)} className="flex cursor-pointer">
                <img className="mr-2" src="/src/assets/save.svg" alt="" width="18px" />
                <button>Save</button>
              </div>
             
          </div>
        </>
        ) : (
        <>
          <div>
            <div className="flex justify-between">
              <h2>{item.title}</h2>
              <input type="radio" onChange={() => setToDone(item)} checked={letsCheck === "done" ? "checked" : ""} />
            </div>
            <p>{item.description}</p>
          </div>
          <div className="flex justify-between mt-6">
            <div className="itemfunctions">
              <button onClick={() => handleEditClick(item)}>
                <img src="/src/assets/edit.svg" width="18px" alt="" />
              </button>
              <button onClick={() => eraseItem(item)} className="ml-2">
                <img src="/src/assets/delete.svg" width="18px" alt="" />
              </button>
            </div>
        
            <div className="flex">
              <p className="mr-2">{item.dueDate}</p>
              <img src="/src/assets/watch.svg" width="15px" alt="" />
            </div>
          </div>
        </>
        )}
      </div>
    </div>
  );
}

export default ToDoItem;
