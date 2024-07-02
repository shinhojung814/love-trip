import { ChangeEvent, useCallback, useState } from 'react'
import { format } from 'date-fns'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import ListRow from '@shared/ListRow'
import TextField from '@shared/TextField'
import useUser from '@hooks/auth/useUser'
import useReview from '@components/hotel/hooks/useReview'

function Review({ hotelId }: { hotelId: string }) {
  const user = useUser()
  const { data: reviews, isLoading, write, remove } = useReview({ hotelId })
  const [text, setText] = useState('')

  const reviewRows = useCallback(() => {
    if (reviews?.length === 0) {
      return (
        <Flex direction="column" align="center" style={{ margin: '40px 0' }}>
          <img
            src="https://cdn1.iconfinder.com/data/icons/freeline/32/edit_editor_pen_pencil_write-256.png"
            alt="review"
            width={40}
            height={40}
          />
          <Spacing direction="vertical" size={24} />
          <Text typography="t6">아직 작성된 리뷰가 없습니다.</Text>
        </Flex>
      )
    }

    return (
      <ul>
        {reviews?.map((review) => (
          <ListRow
            key={review.id}
            left={
              review.user.photoURL != null ? (
                <img
                  src={review.user.photoURL}
                  alt={review.user.displayName}
                  width={40}
                  height={40}
                />
              ) : null
            }
            contents={
              <ListRow.Texts
                title={review.text}
                subtitle={format(review.createdAt, 'yyyy-MM-dd')}
              />
            }
            right={
              review.userId === user?.uid ? (
                <Button
                  onClick={() =>
                    remove({ hotelId: review.hotelId, reviewId: review.id })
                  }
                >
                  삭제
                </Button>
              ) : null
            }
          />
        ))}
      </ul>
    )
  }, [user, reviews, remove])

  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])

  if (isLoading === true) {
    return null
  }

  return (
    <div style={{ margin: '40px 0' }}>
      <Text typography="t4" bold={true} style={{ padding: '0 24px' }}>
        리뷰
      </Text>
      <Spacing size={16} />
      {reviewRows()}
      {user != null ? (
        <div style={{ padding: '0 24px' }}>
          <TextField value={text} onChange={handleTextChange} />
          <Spacing direction="vertical" size={12} />
          <Flex justify="flex-end">
            <Button
              disabled={text === ''}
              onClick={async () => {
                const success = await write(text)

                if (success === true) {
                  setText('')
                }
              }}
            >
              작성
            </Button>
          </Flex>
        </div>
      ) : null}
    </div>
  )
}

export default Review
