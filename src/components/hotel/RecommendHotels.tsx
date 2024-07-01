import { useState } from 'react'
import { css } from '@emotion/react'

import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import useRecommendHotels from '@components/hotel/hooks/useRecommendHotels'
import addDelimiter from '@utils/addDelimiter'

function RecommendHotels({ recommendHotels }: { recommendHotels: string[] }) {
  const [showMoreHotels, setShowMoreHotels] = useState(false)
  const { data, isLoading } = useRecommendHotels({ hotelIds: recommendHotels })

  if (data == null || isLoading) {
    return null
  }

  const hotelList = data.length < 3 || showMoreHotels ? data : data.slice(0, 3)

  return (
    <div style={{ margin: '24px 0' }}>
      <Text typography="t4" bold={true} style={{ padding: '0 24px ' }}>
        추천 호텔
      </Text>
      <Spacing direction="vertical" size={16} />
      <ul>
        {hotelList.map((hotel) => (
          <ListRow
            key={hotel.id}
            left={
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={imageStyles}
              />
            }
            contents={
              <ListRow.Texts
                title={hotel.name}
                subtitle={`${addDelimiter(hotel.price)}원`}
              />
            }
          />
        ))}
      </ul>
      {data.length > 3 && showMoreHotels === false ? (
        <div
          style={{
            padding: '0 24px',
            marginTop: '16px',
          }}
        >
          <Button full={true} onClick={() => setShowMoreHotels(true)}>
            더 보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default RecommendHotels
