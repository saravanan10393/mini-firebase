interface Task{
    id?:string
    name:string,
    completed:boolean
}

interface IDataStore{
    init()
    addTask(task:Task)
    updateTask(task:Task)
    getTasks()
    deleteTask(taskId:string)
}

export {IDataStore, Task}