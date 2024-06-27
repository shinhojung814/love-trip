import {
  QuerySnapshot,
  collection,
  limit,
  query,
  getDocs,
  startAfter,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/index'
import { Hotel } from '@models/hotels'

async function getHotels(pageParams?: QuerySnapshot<Hotel>) {
  const hotelsQuery =
    pageParams == null
      ? query(collection(store, COLLECTIONS.HOTEL), limit(10))
      : query(
          collection(store, COLLECTIONS.HOTEL),
          startAfter(pageParams),
          limit(10),
        )

  const hotelsSnapshot = await getDocs(hotelsQuery)

  const items = hotelsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Hotel,
  )

  const lastVisible = hotelsSnapshot.docs[hotelsSnapshot.docs.length - 1]

  return { items, lastVisible }
}

export default getHotels
