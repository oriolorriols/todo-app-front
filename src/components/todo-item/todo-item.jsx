import "./todo-item.scss";

function ToDoItem({ item, column, setToDone, letsCheck, canEdit, handleEditClick, handleEditInputChange, eraseItem }) {
  return (
        <div id={item.id} className="toDoItem p-5 mb-5">
         <div>
          {canEdit ? (
          <>
          <input type="text"
            value={item.title}
            onChange={ (e) => handleEditInputChange(e, item, 'title')}/>
          <textarea type="text"
            value={item.description}
            rows={item.description.length / 27}
            onChange={ (e) => handleEditInputChange(e, item, 'description')}/>
          </>
        ) : (
          <>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </>
        )}
      </div>


      <button onClick={() => handleEditClick(item)}>{canEdit ? 'Save' : 'Edit'}</button>
      <input type="radio" onChange={() => setToDone(item)} checked={letsCheck} />
      <button onClick={() => eraseItem(item, column)}>Erase</button>

          <div className="flex">
            <img src="/src/assets/watch.svg" width="15px" alt="" />
            <p className="ml-1">{item.deadline}</p>
          </div>

    </div>
  );
}

export default ToDoItem;
