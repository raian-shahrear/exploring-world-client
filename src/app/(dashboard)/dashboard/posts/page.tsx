import Link from 'next/link';
import React from 'react';

const DashboardPost = () => {
    return (
        <div>
           <span className='text-xl font-bold'>Dashboard posts </span>
           <Link href="/dashboard/posts/50" className='text-blue-600 underline'>Comment</Link>
        </div>
    );
};

export default DashboardPost;