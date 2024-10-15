/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const EditPostById = ({ params }: { params: any }) => {
    return (
        <div>
            <p className="text-xl font-bold">Edit Post for {params?.postId}</p>
        </div>
    );
};

export default EditPostById;