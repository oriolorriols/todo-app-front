
const baseUrl = "http://localhost:3000"

const getTasks = () => {
    return fetch(`${baseUrl}/tasks`).then(res => res.json())
}

const getColumns = () => {
    return fetch(`${baseUrl}/columns`).then(res => res.json())
}

const getOrder = () => {
    return fetch(`${baseUrl}/ordercolumns`).then(res => res.json())
}

const updateColumnOrder = (newOrder) => {
    return fetch(`${baseUrl}/ordercolumns`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ columnOrder: newOrder })
    }).then(res => res.json())
}

const updateTaskOrder = (columnId, newTaskIds) => {
    return fetch(`${baseUrl}/columns/${columnId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskIds: newTaskIds })
    }).then(res => res.json())
}

const updateColumn = (columnId, newTaskIds) => {
    return fetch(`${baseUrl}/columns/${columnId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskIds: newTaskIds })
    }).then(res => res.json())
}

const addTaks = (task) => {
    return fetch(`${baseUrl}/tasks`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(task)
    }).then(res => res.json())
}




/* 
const getTasks = async () => {
    const res = await fetch(`${baseUrl}/tasks`)
    const tasks = await res.json()
    return tasks
}
const getColumns = async () => {
    const res = await fetch(`${baseUrl}/columns`)
    const columns = await res.json()
    return columns
}

const getOrder = async () => {
    const res = await fetch(`${baseUrl}/ordercolumns`)
    const order = await res.json()
    return order
}
*/

export { getTasks, getColumns, getOrder, updateColumnOrder, updateTaskOrder, addTaks, updateColumn }