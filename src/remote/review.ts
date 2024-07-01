import {
  doc,
  query,
  collection,
  orderBy,
  getDoc,
  getDocs,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/index'
import { User } from '@models/user'
import { Review } from '@models/review'

export async function getReviews({ hotelId }: { hotelId: string }) {
  const hotelRef = doc(store, COLLECTIONS.HOTEL, hotelId)

  const reviewQuery = query(
    collection(hotelRef, COLLECTIONS.REVIEW),
    orderBy('createAt', 'desc'),
  )
  const reviewSnapshot = await getDocs(reviewQuery)

  const reviews = reviewSnapshot.docs.map((doc) => {
    const review = doc.data()

    return {
      id: doc.id,
      ...review,
      createdAt: review.createdAt.toDate() as Date,
    } as Review
  })

  let userMap: {
    [key: string]: User
  } = {}

  const results: Array<Review & { user: User }> = []

  for (let review of reviews) {
    const cachedUser = userMap[review.userId]

    if (cachedUser == null) {
      const userSnapshot = await getDoc(
        doc(collection(store, COLLECTIONS.USER), review.userId),
      )

      const user = userSnapshot.data() as User

      userMap[review.userId] = user

      results.push({
        ...review,
        user,
      })
    } else {
      results.push({
        ...review,
        user: cachedUser,
      })
    }
  }

  return results
}
