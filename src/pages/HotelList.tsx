import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Top from '@shared/Top'
import Spacing from '@shared/Spacing'
import useHotels from '@components/hotelList/hooks/useHotels'
import HotelItem from '@components/hotelList/HotelItem'
import useLike from '@hooks/like/useLike'

function HotelListPage() {
  const { data: hotels, hasNextPage, loadMoreData } = useHotels()
  const { data: likes, mutate: like } = useLike()

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
                <HotelItem
                  hotel={hotel}
                  isLiked={Boolean(
                    likes?.find((like) => like.hotelId === hotel.id),
                  )}
                  onLike={like}
                />
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
