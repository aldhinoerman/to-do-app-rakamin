import './TodoList.scss'
import { FaCheckCircle } from 'react-icons/fa'
import WidgetDropdown from './WidgetDropdown'
import { Draggable } from 'react-beautiful-dnd'

const TodoList = ({ index, todoID, groupID, name, progress }) => {
  const progressBarClass = progress === 100 ? 'complete' : 'incomplete'

  return <Draggable
    draggableId={todoID.toString()}
    index={index}
  >
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className='card todo-list'>
        <p>{name}</p>
        <div className='todo-widget'>
          <div className='progress-group'>
            <div className='progress'>
              <div
                className={`progress-bar ${progressBarClass}`}
                style={{ width: `calc(${progress} / 100 * 80px)` }}
              >
              </div>
            </div>
            {progress < 100 && <p>{progress}%</p>}
            {progress === 100 && <FaCheckCircle className='check-circle'></FaCheckCircle>}
          </div>
          <WidgetDropdown
            todoID={todoID}
            groupID={groupID}
            name={name}
            progress={progress}
          >
          </WidgetDropdown>
        </div>
      </div>
    )}
  </Draggable>
}

export default TodoList