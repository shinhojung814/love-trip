import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { differenceInMilliseconds, parseISO } from 'date-fns'

import { Hotel } from '@models/hotels'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import Tag from '@shared/Tag'
import addDelimiter from '@utils/addDelimiter'
import formatTime from '@utils/formatTime'

function HotelItem({ hotel }: { hotel: Hotel }) {
  const [remainedTime, setRemainedTime] = useState(0)

  useEffect(() => {
    if (hotel.events == null || hotel.events.promoEndTime == null) {
      return
    }

    const promoEndTime = hotel.events.promoEndTime

    const timer = setInterval(() => {
      const secondCount = differenceInMilliseconds(
        parseISO(promoEndTime),
        new Date(),
      )

      if (secondCount < 0) {
        clearInterval(timer)
        return
      }

      setRemainedTime(secondCount)
    }, 1_000)

    return () => {
      clearInterval(timer)
    }
  }, [hotel.events])

  const tagComponent = () => {
    if (hotel.events == null) {
      return null
    }

    const { name, tagThemeStyle } = hotel.events

    const promotionTxt =
      remainedTime > 0 ? ` - ${formatTime(remainedTime)} 남음` : ''

    return (
      <div>
        <Tag
          color={tagThemeStyle.fontColor}
          backgroundColor={tagThemeStyle.backgroundColor}
        >
          {name.concat(promotionTxt)}
        </Tag>
        <Spacing direction="vertical" size={8} />
      </div>
    )
  }

  return (
    <div>
      <Link to={`/hotel/${hotel.id}`}>
        <ListRow
          contents={
            <Flex direction="column">
              {tagComponent()}
              <ListRow.Texts title={hotel.name} subtitle={hotel.comment} />
              <Spacing direction="vertical" size={4} />
              <Text typography="t7" color="gray600">
                {hotel.starRating}성급
              </Text>
            </Flex>
          }
          right={
            <Flex direction="column" align="flex-end">
              <img
                src={hotel.mainImageUrl}
                alt={hotel.name}
                css={imageStyles}
              />
              <Spacing direction="vertical" size={8} />
              <Text bold={true}>{addDelimiter(hotel.price)}원</Text>
            </Flex>
          }
          style={containerStyles}
        />
      </Link>
    </div>
  )
}

const containerStyles = css`
  align-items: flex-start;
`

const imageStyles = css`
  width: 90px;
  height: 110px;
  margin-left: 16px;
  border-radius: 8px;
  object-fit: cover;
`

export default HotelItem
