import { css } from '@emotion/react'
import styled from '@emotion/styled'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Tag from '@shared/Tag'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import useRooms from '@components/hotel/hooks/useRooms'
import addDelimiter from '@utils/addDelimiter'

function Rooms({ hotelId }: { hotelId: string }) {
  const { data } = useRooms({ hotelId })

  return (
    <Container>
      <Header justify="space-between" align="center">
        <Text bold={true} typography="t4">
          객실 정보
        </Text>
        <Text typography="t6" color="gray400">
          1박, 세금 포함
        </Text>
      </Header>
      <ul>
        {data?.map((room) => {
          const hurry = room.availableCount === 1 || room.availableCount === 2
          const soldOut = room.availableCount === 0

          console.log('available', room.availableCount)

          return (
            <ListRow
              key={room.id}
              contents={
                <ListRow.Texts
                  title={
                    <Flex>
                      <Text>{room.roomName}</Text>
                      {hurry === true ? (
                        <>
                          <Spacing direction="horizontal" size={8} />
                          <Tag backgroundColor="red">마감 임박</Tag>
                        </>
                      ) : null}
                    </Flex>
                  }
                  subtitle={`${addDelimiter(room.price)}원 / `.concat(
                    room.refundable ? '환불 가능' : '환불 불가',
                  )}
                />
              }
              left={
                <img
                  src={room.imageUrl}
                  alt={room.roomName}
                  css={imageStyles}
                />
              }
              right={
                <Button size="medium" disabled={soldOut}>
                  {soldOut === true ? '매진' : '선택'}
                </Button>
              }
            />
          )
        })}
      </ul>
    </Container>
  )
}

const Container = styled.div`
  margin: '40px 0';
`

const Header = styled(Flex)`
  padding: 0 24px;
  margin-bottom: 20px;
`

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`

export default Rooms
