import { collection, getDocs, writeBatch } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'
import Button from '@shared/Button'

function RecommendHotelButton() {
  const handleButtonClick = async () => {
    const snapshot = await getDocs(collection(store, COLLECTIONS.HOTEL))
    const batch = writeBatch(store)

    snapshot.docs.forEach((hotel) => {
      const recommendHotels = []

      for (let doc of snapshot.docs) {
        if (recommendHotels.length === 5) {
          break
        }

        if (doc.id !== hotel.id) {
          recommendHotels.push(doc.id)
        }
      }

      batch.update(hotel.ref, {
        recommendHotels: recommendHotels,
      })
    })

    await batch.commit()

    alert('추천 호텔 리스트 업데이트가 완료되었습니다.')
  }

  return <Button onClick={handleButtonClick}>추천 호텔 데이터 추가하기</Button>
}

export default RecommendHotelButton
