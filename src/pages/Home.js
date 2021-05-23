import { useEffect, useState } from "react"
import { useActions } from '../hooks/use-actions'
import GroupCollection from "../components/GroupCollection"
import Modal from 'react-modal'
import { Logo } from '../components/UI/Logo'
import InputModal from '../components/InputModal'
import WarningModal from "../components/WarningModal"

Modal.setAppElement('#root')

const Home = () => {
  const { fetchDataAction, addNewGroupAction, logoutAction } = useActions()
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    fetchDataAction('You have been logged in')
  }, [fetchDataAction])

  const onCancelInputModalHandler = () => {
    setShowAddTaskModal(false)
  }

  const onConfirmInputModalHandler = (groupTitle, groupDescription) => {
    addNewGroupAction(groupTitle, groupDescription)
    setShowAddTaskModal(false)
  }

  const onCancelLogoutModalHandler = () => {
    setShowLogoutModal(false)
  }

  const onConfirmLogoutModalHandler = () => {
    logoutAction()
    setShowLogoutModal(false)
  }

  return <>
    <div className='sidebar'>
      <Logo></Logo>
    </div>
    <div className='content-wrapper'>
      <div className='header d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center'>
          <h1 className='main-title'>Product Roadmap</h1>
          <button onClick={() => setShowAddTaskModal(true)} className='add-task-button'>+ Add new group</button>
          <button onClick={() => setShowLogoutModal(true)} className='logout-button'>Logout</button>
        </div>
      </div>
      <GroupCollection></GroupCollection>
    </div>
    {showAddTaskModal && <InputModal
      isOpen={showAddTaskModal}
      modalTitle='Create Group Task'
      onCancelHandler={onCancelInputModalHandler}
      onConfirmHandler={onConfirmInputModalHandler}
      modalType='addNewGroup'
    >
    </InputModal>}
    {showLogoutModal && <WarningModal
      modalTitle='Logout Confirmation'
      modalDescription={<>Are you sure want to logout?</>}
      isOpen={showLogoutModal}
      onCancelHandler={onCancelLogoutModalHandler}
      onConfirmHandler={onConfirmLogoutModalHandler}
      confirmName='Logout'
    ></WarningModal>}
  </>
}

export default Home