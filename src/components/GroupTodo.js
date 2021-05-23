import { useSelector } from "react-redux"
import TodoList from "./TodoList"
import { PlusIcon } from './UI/PlusIcon'
import { useState } from 'react'
import { useActions } from '../hooks/use-actions'
import InputModal from './InputModal'
import { randomId } from '../utilities'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import * as _ from '../utilities'
import './GroupTodo.scss'

const GroupTodo = ({ groupID, title, description, colorType }) => {
  const todoListData = useSelector(state => state.todoListData[groupID])
  const [modalNewIsOpen, setModalNewIsOpen] = useState(false)
  const { addTaskAction } = useActions()

  const renderedTodoLists = todoListData.length === 0 ?
    <Draggable
      isDragDisabled
      draggableId={_.randomId()}
      index={0}
    >
      {(provided, snapshot) => (
        <div
          className='card no-todo'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>No Task Available</p>
        </div>
      )}
    </Draggable>
    :
    todoListData.map((todo, index) => <TodoList
      key={randomId()}
      groupID={groupID}
      todoID={todo.id}
      name={todo.name}
      progress={todo.progress_percentage}
      index={index}
    ></TodoList>)


  const onCancelModalNewHandler = () => {
    setModalNewIsOpen(false)
  }

  const onConfirmModalNewHandler = (newTodoName, newTodoProgress) => {
    addTaskAction(groupID, newTodoName, newTodoProgress)
    setModalNewIsOpen(false)
  }

  const getListStyle = (isDraggingOver) => {
    return {
      background: isDraggingOver ? 'lightblue' : null
    }
  }

  return <>
    <Droppable droppableId={groupID.toString()}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} className={`group-todo card color-${colorType % 4}`}>
          <div className='group-title'>
            <h2>{title}</h2>
          </div>
          <p className='group-description'>{description}</p>
          {renderedTodoLists}
          <div onClick={() => setModalNewIsOpen(true)} className='new-task'>
            <PlusIcon></PlusIcon>
            <p>New Task</p>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>

    {modalNewIsOpen && <InputModal
      modalTitle='New Task'
      isOpen={modalNewIsOpen}
      onCancelHandler={onCancelModalNewHandler}
      onConfirmHandler={onConfirmModalNewHandler}
    ></InputModal>}
  </>
}

export default GroupTodo