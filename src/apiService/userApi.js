const baseUrl = import.meta.env.VITE_BACKEND;

export const getTasks = () => {
    return fetch(`${baseUrl}/tasks`).then(res => res.json())
}

export const getColumns = () => {
    return fetch(`${baseUrl}/columns`).then(res => res.json())
}

export const getOrder = () => {
    return fetch(`${baseUrl}/ordercolumns`).then(res => res.json())
}

export const updateColumnOrder = (newOrder) => {
    return fetch(`${baseUrl}/ordercolumns`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ columnOrder: newOrder })
    }).then(res => res.json())
}

export const updateTaskOrder = (columnId, newTaskIds) => {
    return fetch(`${baseUrl}/columns/${columnId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskIds: newTaskIds })
    }).then(res => res.json())
}

export const updateColumn = (columnId, updatedColumns) => {
    const columnToUpdate = updatedColumns.find(col => col.id === columnId)
    return fetch(`${baseUrl}/columns/${columnId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(columnToUpdate)
    }).then(res => res.json())
}

export const addNewColumn = (column) =>{
    return fetch(`${baseUrl}/columns`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(column)
    }).then(res => res.json())
}

export const eraseColumn = (columnId) => {
    return fetch(`${baseUrl}/columns/${columnId}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }, 
    }).then(res => res.json())
}

export const addTask = (task) => {
    return fetch(`${baseUrl}/tasks`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(task)
    }).then(res => res.json())
}

export const deleteTask = (taskId) => {
    return fetch(`${baseUrl}/tasks/${taskId}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json'
        }, 
    }).then(res => res.json())
}

export const updateTask = (taskId, content) => {
    return fetch(`${baseUrl}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
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
