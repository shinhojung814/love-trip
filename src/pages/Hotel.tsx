import { useParams } from 'react-router-dom'

import useHotel from '@components/hotel/hooks/useHotel'
import Top from '@shared/Top'
import Carousel from '@components/hotel/Carousel'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>호텔 데이터를 불러오는 중</div>
  }

  const { name, comment, images } = data

  return (
    <div>
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
    </div>
  )
}

export default HotelPage
