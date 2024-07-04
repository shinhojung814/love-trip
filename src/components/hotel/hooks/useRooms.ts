import { useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { doc, collection, onSnapshot } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { getRooms } from '@remote/room'
import { COLLECTIONS } from '@constants/index'
import { Room } from '@models/room'

function useRooms({ hotelId }: { hotelId: string }) {
  const client = useQueryClient()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
      (snapshot) => {
        const newRooms = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Room),
        }))

        client.setQueryData(['rooms', hotelId], newRooms)
      },
    )

    return () => {
      unsubscribe()
    }
  }, [client, hotelId])

  return useQuery(['rooms', hotelId], () => getRooms(hotelId), {
    suspense: true,
  })
}

export default useRooms
