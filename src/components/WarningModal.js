import Modal from 'react-modal'
import './WarningModal.scss'
import { Exclamation } from './UI/Exclamation'

const modalStyles = {
  overlay: {
    zIndex: 9999
  }
}

const WarningModal = ({ isOpen, modalTitle, modalDescription, confirmName, onCancelHandler, onConfirmHandler }) => {
  return <Modal
    style={modalStyles}
    isOpen={isOpen}>
    <div className='warning-modal-wrapper'>
      <Exclamation></Exclamation>
      <h2>{modalTitle}</h2>
      <p>{modalDescription}</p>

      <div className='d-flex w-100 justify-content-end'>
        <button className='cancel-button' onClick={() => {
          onCancelHandler()
        }
        }>
          <p>Cancel</p>
        </button>
        <button className='danger-button ' onClick={() => {
          onConfirmHandler()
        }}>
          <p>{confirmName}</p>
        </button>
      </div>
    </div>
  </Modal>
}

export default WarningModal