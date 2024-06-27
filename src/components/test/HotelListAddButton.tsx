import { doc, collection, writeBatch } from 'firebase/firestore'

import { EVENTS, HOTEL, HOTEL_NAMES, IMAGES, ROOMS } from '@/mock/data'
import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/index'
import Button from '@shared/Button'

function getRandomValue(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function HotelListAddButton() {
  const batch = writeBatch(store)

  const handleButtonClick = () => {
    const hotels = HOTEL_NAMES.map((hotellName, index) => {
      return {
        name: hotellName,
        mainImageUrl: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        images: IMAGES,
        price: getRandomValue(130000, 200000),
        starRating: getRandomValue(1, 5),
        ...HOTEL,
        ...[EVENTS[index] != null && { events: EVENTS[index] }],
      }
    })

    hotels.forEach((hotel) => {
      const hotelDocRef = doc(collection(store, COLLECTIONS.HOTEL))

      batch.set(hotelDocRef, hotel)

      ROOMS.forEach((room) => {
        const roomDocRef = doc(collection(hotelDocRef, COLLECTIONS.ROOM))

        batch.set(roomDocRef, room)
      })
    })

    batch.commit()
  }
  return <Button onClick={handleButtonClick}>호텔 리스트 추가</Button>
}

export default HotelListAddButton
