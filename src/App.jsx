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
      edit: 'false'
    },
    {
      id: 1,
      title: "This is your Second ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: '',
      edit: 'false'
    },
    {
      id: 2,
      title: "This is your Third ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: '',
      edit: 'false'
    },
    {
      id: 3,
      title: "This is your Fourth ToDo Item",
      description: "This is a fucking description with some phrases",
      completed: '',
      edit: 'false'
    }
  ]



  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [description, setDescription] = useState('')

  const [toDoList, setToDoList] = useState(toDoItemList)
 // const [isEditing, setEditing] = useState(false)
 // const [currentToDoItem, setCurrentToDoItem] = useState()

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

  function isEdditing(id, value){
    let newList = [...toDoList]
    let isForEditing = newList.find(item => item.id === id)

    isForEditing.edit = value
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
              id={item.id} 
              title={item.title} 
              description={item.description} 
              isDone={setToDone} 
              letsCheck={item.completed} 
              toEdit={isEdditing}
              canEdit={item.edit}>
            </ToDoItem>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
