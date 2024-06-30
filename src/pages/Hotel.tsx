import { useParams } from 'react-router-dom'

import useHotel from '@components/hotel/hooks/useHotel'
import Top from '@shared/Top'
import Carousel from '@components/hotel/Carousel'
import Rooms from '@components/hotel/Rooms'
import Contents from '@components/hotel/Contents'
import Map from '@components/hotel/Map'
import RecommendHotels from '@components/hotel/RecommendHotels'
import ActionButtons from '@components/hotel/ActionButtons'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>호텔 데이터를 불러오는 중</div>
  }

  const { name, comment, images, contents, location, recommendHotels } = data

  return (
    <div>
      <Top title={name} subtitle={comment} />
      <Carousel images={images} />
      <ActionButtons hotel={data} />
      <Rooms hotelId={id} />
      <Contents contents={contents} />
      <Map location={location} />
      <RecommendHotels recommendHotels={recommendHotels} />
    </div>
  )
}

export default HotelPage
