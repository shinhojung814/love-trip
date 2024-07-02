import { useQuery } from 'react-query'

import { getHotelWithRoom } from '@remote/hotels'
import { useAlertContext } from '@contexts/AlertContext'

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

  return { data, isLoading }
}

export default useReservation
