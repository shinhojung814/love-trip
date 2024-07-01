import { useCallback, useState, useEffect } from 'react'
import { useQueryClient } from 'react-query'

import { Like } from '@models/like'
import { updateOrder } from '@remote/like'
import { useAlertContext } from '@contexts/AlertContext'
import useLike from '@hooks/like/useLike'

function useEditLikes() {
  const client = useQueryClient()

  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([])

  const [isEdited, setIsEdited] = useState(false)

  const { data } = useLike()

  const { open } = useAlertContext()

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data)
    }
  }, [data])

  const reorderLikes = useCallback((from: number, to: number) => {
    setIsEdited(true)

    setUpdatedLikes((prevUpdatedLikes) => {
      const newItems = [...prevUpdatedLikes]

      const [fromItem] = newItems.splice(from, 1)

      if (fromItem != null) {
        newItems.splice(to, 0, fromItem)
      }

      newItems.forEach((like, index) => {
        like.order = index + 1
      })

      return newItems
    })
  }, [])

  const saveUpdatedOrder = async () => {
    try {
      await updateOrder(updatedLikes)

      client.setQueriesData(['likes'], updatedLikes)

      setIsEdited(false)
    } catch (e) {
      open({
        title: '새로운 정렬 저장에 실패했습니다.',
        onButtonClick: () => {
          setIsEdited(false)
        },
      })
    }
  }

  return {
    data: isEdited ? updatedLikes : data,
    isEdited,
    reorderLikes,
    saveUpdatedOrder,
  }
}

export default useEditLikes
