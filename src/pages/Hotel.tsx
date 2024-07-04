import { useParams } from 'react-router-dom'
import { css } from '@emotion/react'

import useHotel from '@components/hotel/hooks/useHotel'
import SEO from '@shared/SEO'
import Top from '@shared/Top'
import ScrollProgressBar from '@shared/ScrollProgressBar'
import Carousel from '@components/hotel/Carousel'
import Rooms from '@components/hotel/Rooms'
import Contents from '@components/hotel/Contents'
import Map from '@components/hotel/Map'
import RecommendHotels from '@components/hotel/RecommendHotels'
import ActionButtons from '@components/hotel/ActionButtons'
import Review from '@components/hotel/Review'

function HotelPage() {
  const { id } = useParams() as { id: string }

  const { data, isLoading } = useHotel({ id })

  if (data == null || isLoading) {
    return <div>호텔 데이터를 불러오는 중</div>
  }

  const { name, comment, images, contents, location, recommendHotels } = data

  return (
    <div>
      <SEO title={name} description={comment} image={images[0]} />
      <ScrollProgressBar style={scrollProgressBarStyles} />
      <div style={{ padding: '12px 48px' }}>
        <Top title={name} subtitle={comment} />
        <Carousel images={images} />
        <ActionButtons hotel={data} />
        <Rooms hotelId={id} />
        <Contents contents={contents} />
        <Map location={location} />
        <RecommendHotels recommendHotels={recommendHotels} />
        <Review hotelId={id} />
      </div>
    </div>
  )
}

const scrollProgressBarStyles = css`
  position: sticky;
  top: 64px;
  height: 8px;
  z-index: 2;
`

export default HotelPage
