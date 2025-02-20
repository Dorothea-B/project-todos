import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { tasks } from 'reducers/tasks'
import { useSelector } from 'react-redux'

import { 
    FormWrapper, 
    InputField, 
    Label, 
    TextInput, 
    CheckboxStyled,
    Submit,
    ListWrapper,
    TaskBar,
    ButtonRow,
    Cross

} from 'components/StyleComponents'



export const FormAndList = () => {

    const dispatch = useDispatch()

    const allTasks = useSelector((store) => store.tasks.items)


    const [newTask, setTask] = useState()

    const [taskList, setTaskList] = useState(allTasks)

    useEffect(() => { setTaskList(allTasks) }, [allTasks])



    const taskArray = useSelector((store) => store.tasks.items)
   
    const finishedTasks = useSelector((store) => store.tasks.items.filter(t => t.status))

    const unfinishedTasks = useSelector((store) => store.tasks.items.filter(t => !t.status))


    const newTaskObject = {
        id: taskArray.length + 1,
        title: newTask,
        status: false
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(tasks.actions.addTask(newTaskObject))
        setTask('')
     }

     const onRemoveClick = (id) => {
        dispatch(tasks.actions.removeTask(id))
     }

    
    const filterTasks = (value) => {
                if (value === 'finished') {
                    setTaskList(finishedTasks)
                } else if (value === 'unfinished') {
                    setTaskList(unfinishedTasks)
                } else {
                    setTaskList(allTasks)
                }
            }
  
    return ( 
        <>
        <FormWrapper>
            <InputField onSubmit={onFormSubmit}> 

                <Label htmlFor="newTask">Ceep calm and write it down!</Label>

                <TextInput  
                value={newTask || ''} 
                onChange={(e) => setTask(e.target.value)}
                id={taskArray.length +1}
                />

                <Submit className="submit-btn" type="submit">Post task</Submit>

            </InputField>
        </FormWrapper>


            <ListWrapper>

            {taskList.map((task) => (
                <TaskBar key={task.id} >
                    <CheckboxStyled htmlFor={task.id}>{task.title} 
                    <input 
                    type="checkbox" 
                    checked={task.status} 
                    id={task.id} 
                    onChange={() => dispatch(tasks.actions.toggleState(task.id))} />
                    <span></span>
                    </CheckboxStyled>
                    <Cross onClick={() => onRemoveClick(task.id)}><span alt="delete">&#x2715;</span></Cross>
                </TaskBar>
            ))}

            </ListWrapper>


            <ButtonRow>               
            <button onClick={() => filterTasks('finished')}>Finished</button>
            <button onClick={() => filterTasks('unfinished')}>Unfinished</button>
            <button onClick={() => filterTasks('all')}>All</button>
            <button onClick={() => dispatch(tasks.actions.removeAll())}>REMOVE ALL</button>
            </ButtonRow> 

        </>
    );
}
 


