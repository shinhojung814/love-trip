import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { Room } from '@models/room'

interface SummaryProps {
  hotelName: string
  room: Room
  startDate: string
  endDate: string
  nights: string
}

function Summary({
  hotelName,
  room,
  startDate,
  endDate,
  nights,
}: SummaryProps) {
  return (
    <div style={{ padding: 24 }}>
      <Text typography="t4" bold={true}>
        {hotelName}
      </Text>
      <Spacing direction="vertical" size={8} />
      <img src={room.imageUrl} alt={room.roomName} css={imageStyles} />
      <Spacing direction="vertical" size={16} />
      <div>
        <Text bold={true}>{room.roomName}</Text>
        <Spacing direction="vertical" size={4} />
        <ul>
          <Flex as="li" justify="space-between">
            <Text typography="t6" color="gray600">
              일정
            </Text>
            <Text typography="t6">{`${startDate} - ${endDate} (${nights}박)`}</Text>
          </Flex>
          {Object.keys(room.basicInfo).map((key) => {
            if (key in INFO_LABEL_MAP) {
              return (
                <Flex
                  key={key}
                  as="li"
                  justify="space-between"
                  css={listStyles}
                >
                  <Text typography="t6" color="gray600">
                    {INFO_LABEL_MAP[key as keyof typeof INFO_LABEL_MAP]}
                  </Text>
                  <Text typography="t6">{room.basicInfo[key]}</Text>
                </Flex>
              )
            }

            return null
          })}
        </ul>
      </div>
    </div>
  )
}

const INFO_LABEL_MAP = {
  bed: '침대',
  maxOccupancy: '최대 인원',
  squareMeters: '면적',
  smoke: '흡연 여부',
}

const imageStyles = css`
  width: 100%;
  height: 200px;
  object-fit: none;
  border-radius: 4px;
`

const listStyles = css`
  li:not(last-child) {
    margin-bottom: 8px;
  }
`

export default Summary
