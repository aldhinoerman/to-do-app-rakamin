import { useState } from 'react'
import { ArrowLeft } from './UI/ArrowLeft'
import { ArrowRight } from './UI/ArrowRight'
import { Ellipsis } from './UI/Ellipsis'
import { EditIcon } from './UI/EditIcon'
import { DeleteIcon } from './UI/DeleteIcon'
import { useActions } from '../hooks/use-actions'
import { useSelector } from 'react-redux'
import InputModal from './InputModal'
import WarningModal from './WarningModal'
import './WidgetDropdown.scss'

const WidgetDropdown = ({ todoID, groupID, name, progress }) => {
  const isInsideFirstGroup = useSelector(state => {
    const index = state.groupData.findIndex(group => group.id === groupID)
    return index === 0
  })

  const isInsideLastGroup = useSelector(state => {
    const index = state.groupData.findIndex(group => group.id === groupID)
    return index === state.groupData.length - 1
  })

  const { updateTaskAction, deleteTaskAction, moveRightAction, moveLeftAction } = useActions()
  const [isHover, setIsHover] = useState(false)
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)

  const onCancelModalEditHandler = () => {
    setModalEditIsOpen(false)
  }

  const onConfirmModalEditHandler = (newTodoName, newTodoProgress) => {
    updateTaskAction(groupID, todoID, newTodoName, newTodoProgress)
    setModalEditIsOpen(false)
  }

  const onCancelModalDeleteHandler = () => {
    setModalDeleteIsOpen(false)
  }

  const onConfirmModalDeleteHandler = () => {
    deleteTaskAction(groupID, todoID)
    setModalDeleteIsOpen(false)
  }

  return (
    <>
      <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className='widget-dropdown'>
        <Ellipsis />
        {isHover &&
          <div
            className='dropdown-menu'>
            {!isInsideFirstGroup && <li className='dropdown-item'
              onClick={() => {
                setIsHover((isOpen) => !isOpen)
                moveLeftAction(groupID, todoID, name, progress)
              }
              }>
              <ArrowLeft></ArrowLeft>
              <p>Move Left</p>
            </li>}
            {!isInsideLastGroup && <li className='dropdown-item'
              onClick={() => {
                setIsHover((isOpen) => !isOpen)
                moveRightAction(groupID, todoID, name, progress)
              }
              }>
              <ArrowRight></ArrowRight>
              <p>Move Right</p>
            </li>}
            <li className='dropdown-item' onClick={() => setModalEditIsOpen((isOpen) => !isOpen)}>
              <EditIcon></EditIcon>
              <p>Edit</p>
            </li>
            <li className='dropdown-item'
              onClick={() => {
                setModalDeleteIsOpen(true)
                setIsHover((isOpen) => !isOpen)
              }}>
              <DeleteIcon></DeleteIcon>
              <p>Delete</p>
            </li>
          </div>}
      </div >

      {modalEditIsOpen && <InputModal
        modalTitle='Edit Task'
        isOpen={modalEditIsOpen}
        onCancelHandler={onCancelModalEditHandler}
        onConfirmHandler={onConfirmModalEditHandler}
        name={name}
        progress={progress}
      ></InputModal>}

      {modalDeleteIsOpen && <WarningModal
        modalTitle='Delete Task'
        modalDescription={<>Are you sure want to delete this task? <br /> your action can't be reverted</>}
        isOpen={modalDeleteIsOpen}
        onCancelHandler={onCancelModalDeleteHandler}
        onConfirmHandler={onConfirmModalDeleteHandler}
        confirmName='Delete'
      ></WarningModal>}
    </>
  )
}

export default WidgetDropdown