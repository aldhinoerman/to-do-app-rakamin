import { useEffect, useState } from 'react'
import { Exclamation } from './UI/Exclamation'
import './Notification.scss'

const Notification = ({ notifType, notifMessage }) => {
  const [visible, setVisible] = useState(true)

  let notifClass = 'notif-success'
  if (notifType === 'danger') {
    notifClass = 'notif-danger'
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, 1500)
  }, [])

  return visible ? <div className={`notif-wrapper ${notifClass}`}>
    <Exclamation></Exclamation>
    <p>{notifMessage}</p>
  </div> : null
}

export default Notification