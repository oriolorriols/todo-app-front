import { useState } from "react";
import Header from "./components/header/header";
import ToDoItem from "./components/todo-item/todo-item";
import "./App.scss";


function App() {

  const toDoItemList = [
    {
      id: 0,
      title: "This is your First ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: '',
    },
    {
      id: 1,
      title: "This is your Second ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: '',
    },
    {
      id: 2,
      title: "This is your Third ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: '',
    },
    {
      id: 3,
      title: "This is your Fourth ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: '',
    }
  ]


  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')
  
  const [toDoList, setToDoList] = useState(toDoItemList)

  const addToDoItem = e => {
    e.preventDefault()

    const newItem = {
      id: getID(),
      title, 
      subtitle,
      description,
      completed: "",
      edit: 'false'
    }

    const newListOfItems = toDoList.concat(newItem)
    
    setToDoList(newListOfItems) 

    setTitle('')
    setSubtitle('')
    setDescription('')
  }

  function getID(){
    var largestId = toDoList[0].id
     for (let i=0; i<toDoList.length; i++){
      if (toDoList[i].id>largestId) {
          var largestId=toDoList[i].id;
      }
    }
      return largestId + 1
    }

  function handleEditClick(item) {
    let id = item.id
    let newList = [...toDoList]
    let isForEditing = newList.find(item => item.id === id)

    if(item.edit !== 'true'){
      isForEditing.edit = 'true'
      setToDoList(newList);
    } else {
      isForEditing.edit = 'false'
      setToDoList(newList);
    }
  }

  function handleEditInputChange(e, item) {
    let id = item.id
    let newList = [...toDoList]
    let isForEditing = newList.find(item => item.id === id)
    isForEditing.title = e.target.value
    console.log(e)
    setToDoList(newList);
  }


  function setToDone(id) {
    const newList = [...toDoList]
    const isCompleted = newList.find(item => item.id === id)

    if(isCompleted.completed === 'checked') {
      isCompleted.completed = ''
    } else {
      isCompleted.completed = 'checked'
    }
    setToDoList(newList)
  }

  return (
    <>
      <div className="container mx-auto">
        <Header></Header>

        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />
        <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="subtitle" />
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="description" />
        <button type="submit" onClick={addToDoItem}>Add</button>

        <div className="grid grid-cols-3 gap-8 my-9">
          {toDoList.map((item) => (
            <ToDoItem 
              key={item.id} 
              item={item}
              isDone={setToDone} 
              letsCheck={item.completed} 
              handleEditClick={handleEditClick}
              handleEditInputChange={handleEditInputChange}
              canEdit={item.edit}>
            </ToDoItem>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
