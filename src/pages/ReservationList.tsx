import ListRow from '@shared/ListRow'
import useReservations from '@components/reservation-list/hooks/useReservations'

function ReservationListPage() {
  const { data, isLoading } = useReservations()

  if (data == null || isLoading === true) {
    return null
  }

  return (
    <div style={{ padding: '24px 0' }}>
      {data.map(({ hotel, reservation }) => (
        <ListRow
          key={reservation.id}
          left={
            <img
              src={hotel.mainImageUrl}
              alt={hotel.name}
              width={80}
              height={80}
            />
          }
          contents={
            <ListRow.Texts
              title={hotel.name}
              subtitle={`${reservation.startDate} ~ ${reservation.endDate}`}
            />
          }
        />
      ))}
    </div>
  )
}

export default ReservationListPage
