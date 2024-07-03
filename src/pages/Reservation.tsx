import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { parse } from 'qs'

import Spacing from '@shared/Spacing'
import Summary from '@components/reservation/Summary'
import Form from '@components/reservation/Form'
import useReservation from '@components/reservation/hooks/useReservation'
import addDelimiter from '@utils/addDelimiter'
import useUser from '@hooks/auth/useUser'
import { start } from 'repl'

function ReservationPage() {
  const navigate = useNavigate()

  const user = useUser()

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
      [user, hotelId, roomId, startDate, endDate, nights].some((param) => {
        return param == null
      })
    ) {
      window.history.back()
    }
  }, [user, hotelId, roomId, startDate, endDate, nights])

  const { data, isLoading, makeReservation } = useReservation({
    hotelId: hotelId,
    roomId: roomId,
  })

  if (data == null || isLoading === true) {
    return null
  }

  const { hotel, room } = data

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const newReservation = {
      userId: user?.uid as string,
      hotelId: hotelId,
      roomId: roomId,
      startDate: startDate,
      endDate: endDate,
      price: room.price * Number(nights),
      formValues,
    }

    await makeReservation(newReservation)

    navigate(`/reservation/done?hotelName=${hotel.name}`)
  }

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
