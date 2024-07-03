import {
  doc,
  query,
  collection,
  where,
  limit,
  orderBy,
  getDocs,
  setDoc,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/index'
import { Hotel } from '@/models/hotel'
import { Like } from '@models/like'

export async function getLikes({ userId }: { userId: string }) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      orderBy('order', 'asc'),
    ),
  )

  return snapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Like,
  )
}

export async function toggleLike({
  userId,
  hotel,
}: {
  userId: string
  hotel: Pick<Hotel, 'id' | 'name' | 'mainImageUrl'>
}) {
  const findSnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.LIKE),
      where('userId', '==', userId),
      where('hotelId', '==', hotel.id),
    ),
  )

  if (findSnapshot.docs.length > 0) {
    const removeTarget = findSnapshot.docs[0]
    const removeTargetOrder = removeTarget.data().order

    const updateTargetSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        where('order', '>', removeTargetOrder),
      ),
    )

    if (updateTargetSnapshot.empty) {
      return deleteDoc(removeTarget.ref)
    } else {
      const batch = writeBatch(store)

      updateTargetSnapshot.forEach((doc) => {
        batch.update(doc.ref, { order: doc.data().order - 1 })
      })

      await batch.commit()

      return deleteDoc(removeTarget.ref)
    }
  } else {
    const lastLikeSnapshot = await getDocs(
      query(
        collection(store, COLLECTIONS.LIKE),
        where('userId', '==', userId),
        orderBy('order', 'desc'),
        limit(1),
      ),
    )

    const lastLikeOrder = lastLikeSnapshot.empty
      ? 0
      : lastLikeSnapshot.docs[0].data().order

    const newLike = {
      userId,
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelMainImageUrl: hotel.mainImageUrl,
      order: lastLikeOrder + 1,
    }

    return setDoc(doc(collection(store, COLLECTIONS.LIKE)), newLike)
  }
}

export function updateOrder(likes: Like[]) {
  const batch = writeBatch(store)

  likes.forEach((like, index) => {
    batch.update(doc(collection(store, COLLECTIONS.LIKE), like.id), {
      order: like.order,
    })
  })

  return batch.commit()
}
