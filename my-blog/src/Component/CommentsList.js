const CommentsList = ({ comments }) => (
    <>
        <h3>Comments:</h3>
        {
            comments.map(comments => (
                <div className="comment" key={comments.postedBy + ';' + comments.text}>
                    <h3>{comments.postedBy}</h3>
                    <p>{comments.text}</p>
                </div>
            ))
        }
    </>
)
export default CommentsList;