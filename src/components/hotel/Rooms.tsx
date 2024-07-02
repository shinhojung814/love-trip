import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import qs from 'qs'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import ListRow from '@shared/ListRow'
import Tag from '@shared/Tag'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import useUser from '@hooks/auth/useUser'
import addDelimiter from '@utils/addDelimiter'
import useRooms from '@components/hotel/hooks/useRooms'
import { useAlertContext } from '@contexts/AlertContext'

function Rooms({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const navigate = useNavigate()
  const { data } = useRooms({ hotelId })
  const { open } = useAlertContext()

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

          const params = qs.stringify(
            {
              hotelId: hotelId,
              roomId: room.id,
            },
            {
              addQueryPrefix: true,
            },
          )

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
                <Button
                  size="medium"
                  disabled={soldOut}
                  onClick={() => {
                    if (user == null) {
                      open({
                        title: '로그인이 필요한 기능입니다.',
                        onButtonClick: () => {
                          navigate('/signin')
                        },
                      })

                      return
                    }

                    navigate(`/schedule${params}`)
                  }}
                >
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
