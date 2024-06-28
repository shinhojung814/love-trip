import { doc, getDocs, collection } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/index'
import { Room } from '@models/room'

export async function getRooms(hotelId: string) {
  const snapshot = await getDocs(
    collection(doc(store, COLLECTIONS.HOTEL, hotelId), COLLECTIONS.ROOM),
  )

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Room),
  }))
}
