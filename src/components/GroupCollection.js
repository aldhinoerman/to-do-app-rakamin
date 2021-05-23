import { useSelector } from "react-redux"
import GroupTodo from "./GroupTodo"
import './GroupCollection.scss'
import { randomId } from "../utilities"
import { DragDropContext } from 'react-beautiful-dnd'
import { useActions } from "../hooks/use-actions"

const GroupCollection = () => {
  const groupCollectionData = useSelector(state => state.groupData)
  const { moveAction } = useActions()

  const renderedGroupCollection = groupCollectionData.map((group, idx) => (
    <GroupTodo
      key={randomId()}
      groupID={group.id}
      colorType={idx}
      title={group.title}
      description={group.description}
    ></GroupTodo>))

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result

    //Droppred Outside GroupTodo
    if (!destination) return

    if (source.droppableId === destination.droppableId) return

    moveAction(source.droppableId, destination.droppableId, draggableId)

    console.log(result, source, destination)
  }

  return <div className='group-data-wrapper'>
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      {renderedGroupCollection}
    </DragDropContext>
  </div>
}

export default GroupCollection