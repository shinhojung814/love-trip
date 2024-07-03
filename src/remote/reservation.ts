import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore'

import { store } from '@remote/firebase'
import { getHotel } from '@remote/hotels'
import { COLLECTIONS } from '@constants/index'
import { Room } from '@models/room'
import { Reservation } from '@models/reservation'

export async function makeReservation(newReservation: Reservation) {
  const hotelSnapshot = doc(store, COLLECTIONS.HOTEL, newReservation.hotelId)
  const roomSnapshot = await getDoc(
    doc(hotelSnapshot, COLLECTIONS.ROOM, newReservation.roomId),
  )

  const room = roomSnapshot.data() as Room
  const availableCount = room.availableCount

  if (availableCount === 0) {
    throw new Error('No rooms available.')
  }

  return Promise.all([
    updateDoc(roomSnapshot.ref, {
      availableCount: availableCount,
    }),
    setDoc(doc(collection(store, COLLECTIONS.RESERVATION)), newReservation),
  ])
}

export async function getReservations({ userId }: { userId: string }) {
  const reservationQuery = query(
    collection(store, COLLECTIONS.RESERVATION),
    where('userId', '==', userId),
  )

  const reservationSnapshot = await getDocs(reservationQuery)

  const result = []

  for (const reservationDoc of reservationSnapshot.docs) {
    const reservation = {
      id: reservationDoc.id,
      ...(reservationDoc.data() as Reservation),
    }

    const hotel = await getHotel(reservation.hotelId)

    result.push({ hotel, reservation })
  }

  return result
}
