import "./todo-item.scss";

function ToDoItem({ item, isDone, letsCheck, canEdit, handleEditClick, handleEditInputChange }) {
  return (
    <div id={item.id} className="toDoItem p-5">
      <div>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
      </div>

      <button onClick={() => handleEditClick(item)}>Edit</button>
      <input type="radio" onChange={() => isDone(item.id)} checked={letsCheck} />
      <button onClick={() => handleEditClick(item)}>No Edit</button>
      <div>
        {canEdit === 'true' ? (
          <input
            type="text"
            value={item.title}
            onChange={ (e) => handleEditInputChange(e, item)}
          />
        ) : (
          <span>{item.title}</span>
        )}
      </div>
    </div>
  );
}

export default ToDoItem;
