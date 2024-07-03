import { useQuery, useMutation } from 'react-query'

import { getHotelWithRoom } from '@remote/hotels'
import { makeReservation } from '@remote/reservation'
import { useAlertContext } from '@contexts/AlertContext'
import { Reservation } from '@models/reservation'

function useReservation({
  hotelId,
  roomId,
}: {
  hotelId: string
  roomId: string
}) {
  const { open } = useAlertContext()

  const { data, isLoading } = useQuery(
    ['hotelWithRoom', hotelId, roomId],
    () => getHotelWithRoom({ hotelId, roomId }),
    {
      onSuccess: ({ room }) => {
        if (room.availableCount === 0) {
          open({
            title: '선택한 객실이 모두 예약되었습니다.',
            onButtonClick: () => {
              window.history.back()
            },
          })
        }
      },
    },
  )

  const { mutateAsync } = useMutation(
    (newReservation: Reservation) => makeReservation(newReservation),
    {
      onError: () => {
        open({
          title: '선택한 예약에 실패하였습니다.',
          onButtonClick: () => {},
        })
      },
    },
  )

  return { data, isLoading, makeReservation: mutateAsync }
}

export default useReservation
