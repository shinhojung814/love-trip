import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import useHotels from '@components/hotelList/hooks/useHotels'
import Top from '@shared/Top'
import Spacing from '@shared/Spacing'
import HotelItem from '@/components/hotelList/HotelItem'

function HotelListPage() {
  const { data: hotels, hasNextPage, loadMoreData } = useHotels()

  return (
    <div>
      <Top title="인기 호텔" subtitle="호텔부터 펜션까지 최저가 숙소 예약" />
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMoreData}
        scrollThreshold="100px"
      >
        <ul>
          {hotels?.map((hotel, idx) => {
            return (
              <Fragment key={hotel.id}>
                <HotelItem hotel={hotel} />
                {hotels.length - 1 === idx ? null : (
                  <Spacing
                    direction="vertical"
                    size={8}
                    backgroundColor="gray100"
                    style={{ margin: '20px 0' }}
                  />
                )}
              </Fragment>
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default HotelListPage
