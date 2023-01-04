import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
    count: 0,
    colorIndex: 0,
    error: '',
  }

  onAddComment = event => {
    event.preventDefault()

    const {colorIndex, name, comment} = this.state
    if (name !== '' && comment !== '') {
      const bgColors = initialContainerBackgroundClassNames
      const distance = formatDistanceToNow(new Date())

      const newComment = {
        name,
        comment,
        color: bgColors[colorIndex],
        isLiked: false,
        id: uuidv4(),
        distanceTime: distance,
      }

      const totalColors = bgColors.length

      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
        count: prevState.count + 1,
        colorIndex:
          prevState.colorIndex < totalColors - 1 ? prevState.colorIndex + 1 : 0,
        error: '',
      }))
    } else {
      this.setState({error: 'Enter Required Fields'})
    }
  }

  onNameInput = event => {
    this.setState({name: event.target.value})
  }

  onCommentInput = event => {
    this.setState({comment: event.target.value})
  }

  updateIsLiked = id => {
    const {commentsList} = this.state
    const updatedList = commentsList.map(commentItem => {
      if (commentItem.id === id) {
        return {...commentItem, isLiked: !commentItem.isLiked}
      }
      return commentItem
    })

    this.setState({commentsList: updatedList})
  }

  deleteCommentItem = id => {
    const {commentsList} = this.state
    const updatedList = commentsList.filter(
      commentItem => commentItem.id !== id,
    )

    this.setState(prevState => ({
      commentsList: updatedList,
      count: prevState.count - 1,
    }))
  }

  render() {
    const {commentsList, count, comment, error, name} = this.state

    return (
      <div className="app-container">
        <h1 className="heading">Comments</h1>
        <div className="image-form-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
          <div className="form-details-container">
            <p className="about-comments">
              Say Something about 4.0 Technologies
            </p>
            <form className="form-container" onSubmit={this.onAddComment}>
              <input
                onChange={this.onNameInput}
                className="name-input"
                placeholder="Your Name"
                value={name}
              />
              <textarea
                onChange={this.onCommentInput}
                className="comment-input"
                cols="55"
                rows="10"
                placeholder="Your Comment"
                value={comment}
              >
                {comment}
              </textarea>
              <button className="add-comment-button" type="submit">
                Add Comment
              </button>
            </form>
            <p className="error">{error}</p>
          </div>
        </div>
        <hr className="h-line" />
        <h1 className="comment-heading">
          <span className="comments-count">{count}</span>
          Comments
        </h1>
        <ul className="comments-container">
          {commentsList.map(commentItem => (
            <CommentItem
              key={commentItem.id}
              updateIsLiked={this.updateIsLiked}
              commentItem={commentItem}
              deleteCommentItem={this.deleteCommentItem}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
