import { parseISO, format, isSameDay, differenceInDays } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DayPicker, DateRange } from 'react-day-picker'
import styled from '@emotion/styled'

import { colors } from '@styles/colorPalette'

interface RangePickerProps {
  startDate?: string
  endDate?: string
  onChange: (dateRange: { from?: string; to?: string; nights: number }) => void
}

function RangePicker({ startDate, endDate, onChange }: RangePickerProps) {
  const today = new Date()

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) {
      return
    }

    const { from, to } = dateRange

    if (from && to && isSameDay(from, to)) {
      return
    }

    onChange({
      from: from != null ? format(from, 'yyyy-MM-dd') : undefined,
      to: to ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    })
  }

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  }

  return (
    <Container>
      <DayPicker
        mode="range"
        numberOfMonths={5}
        locale={ko}
        defaultMonth={today}
        onSelect={handleDayClick}
        selected={selected}
      />
    </Container>
  )
}

const Container = styled.div`
  padding-bottom: 80px;

  .rdp-month {
    position: relative;
    width: 100%;
    padding: 60px 0px 30px;
    text-align: center;
  }

  .rdp-caption {
    position: absolute;
    top: 25px;
    left: 20px;
    color: ${colors.black};
    font-weight: bold;
  }

  .rdp-nav {
    display: none;
  }

  .rdp-table {
    width: 100%;
  }

  .rdp-head .rdp-head_row {
    height: 45px;
    color: ${colors.gray400};
    font-size: 12px;
    font-weight: bold;
  }

  .rdp-tbody .rdp-row {
    height: 45px;
  }

  .rdp-cell rdp-button {
    position: relative;
    width: 100%;
    line-height: 45px;
  }

  .rdp-day_selected {
    background-color: ${colors.blue500};
  }

  .rdp-cell .rdp-day_range_start,
  .rdp-cell .rdp-day_range_end {
    color: ${colors.white};
  }

  .rdp-cell .rdp-day_range_start::after,
  .rdp-cell .rdp-day_range_end::after {
    position: absolute;
    top: 50%;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, -50%);
    display: block;
    width: calc(100% - 1px);
    height: 45px;
    background-color: ${colors.blue};
    z-index: -1;
  }
`

export default RangePicker
