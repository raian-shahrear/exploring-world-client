import React from 'react';

const CommentByPst = ({params}: {params: any}) => {
    return (
        <div>
            <p className='text-xl font-bold'>comment 1 by post {params?.commentByPostId}</p>
            <p className='text-xl font-bold'>comment 2 by post {params?.commentByPostId}</p>
            <p className='text-xl font-bold'>comment 3 by post {params?.commentByPostId}</p>
            <p className='text-xl font-bold'>comment 4 by post {params?.commentByPostId}</p>
        </div>
    );
};

export default CommentByPst;