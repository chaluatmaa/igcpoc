import React from 'react'

const Comments = ({comments}) => {
  return (
    <div>
        {comments.map(comment => {
            return <>
                <div style={{display:"flex"}}>
                    <p style={{fontWeight:800}}>{comment.postedBy.name}</p>&nbsp;
                    <p>{comment.text}</p>
                </div>
            </>
        })}
    </div>
  )
}

export default Comments