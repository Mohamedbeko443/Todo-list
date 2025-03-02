import React , {useEffect, useState} from 'react'

export default function ToDoList() {
    const[tasks, setTasks] = useState(()=>{
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const[newTask, setNewTask] = useState('');
    const[error , setError] = useState({
        validateInput : "",
        validateMovingUp : "",
        validateMovingDown : ""
    });
    
    

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    function handleInputChange(e)
    {
        setNewTask(e.target.value)
    }

    function addTask()
    {
        if(newTask.trim())
            {
                setTasks(prev => [...prev, newTask]);
                setNewTask('')
                setError(prev => ({...prev, validateInput : ""}))
            } 
        else
        {
            setError(prev => ({...prev, validateInput : "Please enter a task"}))
        }
    }

    function deleteTask(index)
    {
        setTasks(prev => prev.filter((_, i) => i !== index))
    } 
    
    function moveTaskUp(index)
    {
        if(index > 0)
        {
            const newTasks = [...tasks];
            const temp = newTasks[index];
            newTasks[index] = newTasks[index - 1];
            newTasks[index - 1] = temp;
            setTasks(newTasks);
            setError(prev => ({...prev, validateMovingUp : ""}))
        }
        else
        {
            setError(prev => ({...prev, validateMovingUp : "Cannot move task"}))
        }
    }

    function moveTaskDown(index)
    {
        if(index < tasks.length - 1)
        {
            const newTasks = [...tasks];
            const temp = newTasks[index];
            newTasks[index] = newTasks[index + 1];
            newTasks[index + 1] = temp;
            setTasks(newTasks);
            setError(prev => ({...prev, validateMovingDown : ""}))
        }
        else
        {
            setError(prev => ({...prev, validateMovingDown : "Cannot move task"}))
        }
    }

    
    return (
    <div className='to-do-list'>
        <h1>To-Do-List</h1>
        <div>
            <input type="text"
            placeholder='Enter a task...'
            value={newTask}
            onChange={handleInputChange}
            />
            <button onClick={addTask} className='add-btn'>Add</button>
        </div>
        {error.validateInput && <p style={{color: 'red'}}>{error.validateInput}</p>}
        {error.validateMovingUp && <p style={{color: 'red'}}>{error.validateMovingUp}</p>}
        {error.validateMovingDown && <p style={{color: 'red'}}>{error.validateMovingDown}</p>}
        <ol>
            {
                tasks.map((task, index) => (
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button onClick={() => deleteTask(index)} className='delete-btn'>Delete</button>
                        <button onClick={() => moveTaskUp(index)} className='move-up-btn'>👆</button>
                        <button onClick={() => moveTaskDown(index)} className='move-down-btn'>👇</button>
                    </li>
                ))
            }
        </ol>
    </div>
  )
}
