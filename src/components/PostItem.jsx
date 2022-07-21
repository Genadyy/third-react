import React from 'react';
import MyButton from './UI/buttons/MyButton';



const PostItem = ({post, number, remove}) => {
    return(
        <div className="post">
            <div className="post_content">
                <strong>{number}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="post_btn">
                <MyButton onClick = {() => remove(post)}>Delete</MyButton>
            </div>
      </div>
    )
}



export default PostItem;