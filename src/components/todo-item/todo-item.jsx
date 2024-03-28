import "./todo-item.scss";

function ToDoItem({ item, isDone, letsCheck, canEdit, handleEditClick, handleEditInputChange }) {
  return (
        <div id={item.id} className="toDoItem p-5 mb-5">
         <div>
      {canEdit === 'true' ? (
          <>
          <input type="text"
            value={item.title}
            onChange={ (e) => handleEditInputChange(e, item, 'title')}/>
          <textarea type="text"
            value={item.description}
            rows={item.description.length / 55}
            onChange={ (e) => handleEditInputChange(e, item, 'description')}/>
          </>
        ) : (
          <>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </>
        )}
      </div>


      <button onClick={() => handleEditClick(item)}>{canEdit !== 'true' ? 'Edit' : 'Save'}</button>
      <input type="radio" onChange={() => isDone(item.id)} checked={letsCheck} />

    </div>
  );
}

export default ToDoItem;
