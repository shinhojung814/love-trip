import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getReviews, writeReview, removeReview } from '@remote/review'
import useUser from '@hooks/auth/useUser'

function useReview({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const client = useQueryClient()

  const { data, isLoading } = useQuery(['reviews', hotelId], () =>
    getReviews({ hotelId }),
  )

  const { mutateAsync: write } = useMutation(
    async (text: string) => {
      const newReview = {
        userId: user?.uid as string,
        hotelId,
        createdAt: new Date(),
        text,
      }

      await writeReview(newReview)

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  const { mutate: remove } = useMutation(
    ({ hotelId, reviewId }: { hotelId: string; reviewId: string }) => {
      return removeReview({ hotelId, reviewId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['reviews', hotelId])
      },
    },
  )

  return { data, isLoading, write, remove }
}

export default useReview
