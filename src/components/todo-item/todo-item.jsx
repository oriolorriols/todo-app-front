import "./todo-item.scss";

function ToDoItem({ id, title, description, isDone, letsCheck, canEdit, toEdit }) {
  return (
    <div id={id} className="toDoItem p-5">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <button onClick={() => toEdit(id, 'true')}>Edit</button>
      <input type="radio" onChange={() => isDone(id)} checked={letsCheck} />
      <button onClick={() => toEdit(id, 'false')}>No Edit</button>
      <div>
        {canEdit === 'true' ? (
          <input
            type="text"
            value={title}
           readOnly
          />
        ) : (
          <span>{title}</span>
        )}
      </div>
    </div>
  );
}

export default ToDoItem;
