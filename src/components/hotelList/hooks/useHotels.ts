import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'

import { getHotels } from '@remote/hotels'

function useHotels() {
  const {
    data,
    hasNextPage = false,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(['hotels'], ({ pageParam }) => getHotels(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMoreData = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  const hotels = data?.pages.map(({ items }) => items).flat()

  return { data: hotels, hasNextPage, isFetching, loadMoreData }
}

export default useHotels
