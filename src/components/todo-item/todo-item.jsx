import "./todo-item.scss";

function ToDoItem({ item, setToDone, letsCheck, canEdit, handleEditClick, handleEditInputChange, eraseItem }) {
  return (
    <div id={item.id} className={letsCheck ? "toDoItem p-5 mb-5 checked" : "toDoItem p-5 mb-5"}>
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
        </>
        ) : (
        <>
          <div className={canEdit ? 'save' : 'edit'}>
            <div className="flex justify-between">
              <h2>{item.title}</h2>
              <input type="radio" onChange={() => setToDone(item)} checked={letsCheck} />
              
            </div>
            

            
            <p>{item.description}</p>
          </div>
        </>
        )}
      </div>


      
      
      
      
     
      <div className="flex justify-between mt-6">
        <div>
          <button onClick={() => handleEditClick(item)} className={canEdit ? 'save' : 'edit'}>
            <img src="/src/assets/edit.svg" width="18px" alt="" /></button>

          <button onClick={() => eraseItem(item)} className="ml-2">
            <img src="/src/assets/delete.svg" width="18px" alt="" />
          </button>
        </div>
     
        <div className="flex">
          <p className="mr-1">{item.deadline}</p>
          <img src="/src/assets/watch.svg" width="15px" alt="" />
        </div>
    </div>
      
          

    </div>
  );
}

export default ToDoItem;
