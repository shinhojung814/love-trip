import { Link } from 'react-router-dom'

import ListRow from '@shared/ListRow'

function SettingsPage() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/settings/likes">
            <ListRow
              as="div"
              contents={
                <ListRow.Texts
                  title="좋아요"
                  subtitle="담아둔 호텔 순서 변경"
                  // withArrow={true}
                />
              }
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SettingsPage
