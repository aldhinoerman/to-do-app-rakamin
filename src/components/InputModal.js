import { useState, useEffect } from 'react'
import { Exclamation } from './UI/Exclamation'
import Modal from 'react-modal'
import './InputModal.scss'

const modalStyles = {
  overlay: {
    zIndex: 9999
  }
}

const InputModal = ({ isOpen, modalTitle, name, progress, onCancelHandler, onConfirmHandler, modalType = 'addNewTodo' }) => {
  const [newTodoName, setNewTodoName] = useState(``)
  const [newTodoProgress, setNewTodoProgress] = useState(0)
  const [newGroupTitle, setNewGroupTitle] = useState(``)
  const [newGroupDesc, setNewGroupDesc] = useState(``)
  const [showInputOneMessage, setShowInputOneMessage] = useState(false)
  const [showInputTwoMessage, setShowInputTwoMessage] = useState(false)

  useEffect(() => {
    if (name) setNewTodoName(name)
    if (progress) setNewTodoProgress(progress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fieldMessage = (
    <div className='field-message'>
      <Exclamation width={12} height={12}></Exclamation>
      <p>Please fill this field !</p>
    </div>
  )

  const progressMessage = (progress) => {
    if (progress) {
      return <div className='progress-message'>
        <Exclamation width={12} height={12}></Exclamation>
        <p>Progress must be between 0 and 100 !</p>
      </div>
    } else {
      return <div className='progress-message'>
        <Exclamation width={12} height={12}></Exclamation>
        <p>Please fill this field !</p>
      </div>
    }
  }

  let inputFormRendered = (
    <>
      <div className='d-flex align-items-center mb-2'>
        <label htmlFor='task-name'>Task Name</label>
        {showInputOneMessage && fieldMessage}
      </div>
      <input
        type='text'
        name='task-name'
        className='task-name-text'
        onChange={(e) => setNewTodoName(e.target.value)}
        value={newTodoName}
        placeholder='example: Build rocket to Mars.' />
      <div className='d-flex align-items-center mb-2'>
        <label htmlFor='task-progress'>Progress</label>
        {showInputTwoMessage && progressMessage(newTodoProgress)}
      </div>
      <input
        type='number'
        name='progress'
        className='progress-text'
        onChange={(e) => setNewTodoProgress(e.target.value)}
        value={newTodoProgress}
        placeholder='0%' />
    </>
  )

  if (modalType === 'addNewGroup') {
    inputFormRendered = (<>
      <div className='d-flex align-items-center mb-2'>
        <label htmlFor='group-title'>Group Title</label>
        {showInputOneMessage && fieldMessage}
      </div>
      <input
        type='text'
        name='group-title'
        className='task-name-text'
        onChange={(e) => setNewGroupTitle(e.target.value)}
        value={newGroupTitle}
        placeholder='example: Group Task 1' />
      <div className='d-flex align-items-center mb-2'>
        <label htmlFor='description'>Description</label>
        {showInputTwoMessage && fieldMessage}
      </div>
      <input
        type='text'
        name='description'
        className='description-text'
        onChange={(e) => setNewGroupDesc(e.target.value)}
        value={newGroupDesc}
        placeholder='example: January-March' />
    </>)
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault()

    if (modalType === 'addNewGroup') {
      //Handler for empty group title field
      if (!newGroupTitle) {
        setShowInputOneMessage(true)
        setTimeout(() => {
          setShowInputOneMessage(false)
        }, 1000)
        return
      }

      //Handler for empty group description field
      if (!newGroupDesc) {
        setShowInputTwoMessage(true)
        setTimeout(() => {
          setShowInputTwoMessage(false)
        }, 1000)
        return
      }
    }

    if (modalType === 'addNewTodo') {
      //Handler for empty field message
      if (!newTodoName) {
        setShowInputOneMessage(true)
        setTimeout(() => {
          setShowInputOneMessage(false)
        }, 1000)
        return
      }

      //Handler for empty progress message or progress outside range
      if (!newTodoProgress || newTodoProgress < 0 || newTodoProgress > 100) {
        setShowInputTwoMessage(true)
        setTimeout(() => {
          setShowInputTwoMessage(false)
        }, 1000)
        return
      }
    }
  }

  const onSubmitHandler = () => {
    if (modalType === 'addNewGroup' && newGroupTitle && newGroupDesc) {
      return onConfirmHandler(newGroupTitle, newGroupDesc)
    }

    if (modalType === 'addNewTodo' &&
      newTodoName && newTodoProgress && newTodoProgress <= 100 && newTodoProgress >= 0) {
      return onConfirmHandler(newTodoName, newTodoProgress)
    }
  }

  return <Modal
    style={modalStyles}
    isOpen={isOpen}>
    <div className='input-modal-wrapper'>
      <h2>{modalTitle}</h2>
      <form onSubmit={(e) => formSubmitHandler(e)}>
        {inputFormRendered}
        <div className='d-flex w-100 justify-content-end'>
          <button
            type='button'
            className='cancel-button'
            onClick={(e) => {
              e.preventDefault()
              onCancelHandler()
            }}
          >
            <p>Cancel</p>
          </button>
          <button
            className='confirm-button'
            type='submit'
            onClick={onSubmitHandler}>
            <p>Save Task</p>
          </button>
        </div>
      </form>
    </div>
  </Modal>
}

export default InputModal