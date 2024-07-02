import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import RangePicker from '@shared/RangePicker'
import FixedBottomButton from '@shared/FixedBottomButton'

function SchedulePage() {
  const navigate = useNavigate()

  const { hotelId, roomId } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    hotelId: string
    roomId: string
  }

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({ startDate: undefined, endDate: undefined, nights: 0 })

  useEffect(() => {
    if (hotelId === '' || roomId === '') {
      window.history.back()
    }
  }, [hotelId, roomId])

  const moveToReservationPage = () => {
    const params = qs.stringify(
      {
        hotelId,
        roomId,
        ...selectedDate,
      },
      {
        addQueryPrefix: true,
      },
    )

    navigate(`/reservation${params}`)
  }

  const isValid = selectedDate.startDate != null && selectedDate.endDate != null

  const buttonLabel = isValid
    ? `${selectedDate.startDate} - ${selectedDate.endDate} (${selectedDate.nights}박)`
    : '예약 날짜를 선택해주세요.'

  return (
    <div>
      <RangePicker
        startDate={selectedDate.startDate}
        endDate={selectedDate.endDate}
        onChange={(dateRange) => {
          setSelectedDate({
            startDate: dateRange.from,
            endDate: dateRange.to,
            nights: dateRange.nights,
          })
        }}
      />
      <FixedBottomButton
        label={buttonLabel}
        disabled={isValid === false}
        onClick={moveToReservationPage}
      />
    </div>
  )
}

export default SchedulePage
