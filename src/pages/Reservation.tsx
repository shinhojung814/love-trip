import { useEffect } from 'react'
import { parse } from 'qs'

import Spacing from '@shared/Spacing'
import Summary from '@components/reservation/Summary'
import Form from '@components/reservation/Form'
import useReservation from '@components/reservation/hooks/useReservation'
import addDelimiter from '@utils/addDelimiter'

function ReservationPage() {
  const { hotelId, roomId, startDate, endDate, nights } = parse(
    window.location.search,
    {
      ignoreQueryPrefix: true,
    },
  ) as {
    hotelId: string
    roomId: string
    startDate: string
    endDate: string
    nights: string
  }

  useEffect(() => {
    if (
      [hotelId, roomId, startDate, endDate, nights].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [hotelId, roomId, startDate, endDate, nights])

  const { data, isLoading } = useReservation({
    hotelId: hotelId,
    roomId: roomId,
  })

  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const handleSubmit = () => {}

  const buttonLabel = `${nights}박 ${addDelimiter(room.price * Number(nights))}원 예약하기`

  return (
    <div>
      <Summary
        hotelName={hotel.name}
        room={room}
        startDate={startDate}
        endDate={endDate}
        nights={nights}
      />
      <Spacing size={8} backgroundColor="gray100" />
      <Form
        forms={hotel.forms}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      />
    </div>
  )
}

export default ReservationPage
