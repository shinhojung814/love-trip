import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import qs from 'qs'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

function ReservationDonePage() {
  const navigate = useNavigate()

  const { hotelName } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelName: string
  }

  return (
    <Container>
      <Flex direction="column" align="center">
        <img
          src="https://cdn4.iconfinder.com/data/icons/general-office/91/General_Office_31-512.png"
          alt="reservation"
          width={360}
          height={360}
        />
        <Spacing direction="vertical" size={60} />
        <Text typography="t4" bold={true}>
          {hotelName}
        </Text>
        <Spacing direction="vertical" size={12} />
        <Text>예약이 완료되었습니다.</Text>
      </Flex>
      <Spacing direction="vertical" size={36} />
      <div>
        <Button.Group>
          <Button onClick={() => navigate('/')}>홈으로</Button>
          <Button onClick={() => navigate('/reservation/list')}>
            예약 리스트
          </Button>
        </Button.Group>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default ReservationDonePage
