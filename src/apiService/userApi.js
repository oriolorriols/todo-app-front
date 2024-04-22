
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

export { getTasks, getColumns, getOrder }