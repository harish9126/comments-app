import './index.css'

const CommentItem = props => {
  const {commentItem, updateIsLiked, deleteCommentItem} = props
  const {name, comment, id, color, isLiked, distanceTime} = commentItem
  const likeUrl = !isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

  const likeColor = isLiked ? 'like-color' : ''

  const onClickLikeButton = () => {
    updateIsLiked(id)
  }

  const onClickDeleteButton = () => {
    deleteCommentItem(id)
  }

  return (
    <li className="comment-item-container">
      <div className="text-container">
        <h1 className={`initial ${color}`}>{name[0].toUpperCase()}</h1>
        <div>
          <div className="name-container">
            <h1 className="username">{name}</h1>
            <p>{distanceTime}</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-buttons-container">
        <button type="button" onClick={onClickLikeButton} className="button">
          <img src={likeUrl} alt="liked" className="like-img" />
          <p className={`like-text ${likeColor}`}>Like</p>
        </button>
        <button
          data-testid="delete"
          onClick={onClickDeleteButton}
          className="button"
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
