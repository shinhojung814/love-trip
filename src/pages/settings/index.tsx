import { Link } from 'react-router-dom'

import ListRow from '@shared/ListRow'

function SettingsPage() {
  return (
    <div style={{ padding: '24px 0' }}>
      <ul>
        <li>
          <Link to="/settings/likes">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts
                  title="좋아요"
                  subtitle="담아둔 호텔 순서 변경"
                  />
                }
                withArrow={true}
            />
          </Link>
        </li>
        <li>
          <Link to="/reservation/list">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts
                  title="예약 목록"
                  subtitle="예약한 일정 확인"
                  />
                }
                withArrow={true}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SettingsPage
