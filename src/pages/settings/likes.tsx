import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd'
import { Virtuoso } from 'react-virtuoso'

import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'
import useEditLikes from '@components/settings/likes/hooks/useEditLikes'

function LikesPage() {
  const { data, isEdited, reorderLikes, saveUpdatedOrder } = useEditLikes()

  const handleDragEnd = (result: DropResult) => {
    if (result.destination == null) {
      return
    }

    const from = result.source.index
    const to = result.destination.index

    reorderLikes(from, to)
  }

  return (
    <div style={{ padding: '24px 12px', marginBottom: '100px' }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              <Virtuoso
                data={data}
                useWindowScroll
                increaseViewportBy={0}
                itemContent={(index, like) => {
                  return (
                    <Draggable
                      key={like.id}
                      draggableId={like.id}
                      index={index}
                    >
                      {(draggableProps) => (
                        <li
                          ref={draggableProps.innerRef}
                          {...draggableProps.draggableProps}
                          {...draggableProps.dragHandleProps}
                        >
                          <ListRow
                            as="div"
                            contents={
                              <ListRow.Texts
                                title={like.order}
                                subtitle={like.hotelName}
                              />
                            }
                          />
                        </li>
                      )}
                    </Draggable>
                  )
                }}
              />
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext>
      {isEdited && (
        <FixedBottomButton label="저장하기" onClick={saveUpdatedOrder} />
      )}
    </div>
  )
}

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (enabled === false) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
}

export default LikesPage
