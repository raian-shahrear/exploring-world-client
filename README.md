# Exploring World

## Introduction
Welcome to Exploring World, your ultimate travel social media platform! Discover, share, and connect with fellow travel enthusiasts as you explore the beauty of the world together.
###### Live Site: [Exploring World](https://exploring-world-client.vercel.app)

## Project Description
Exploring World allows users to register and log in to create, edit, and delete posts about their travel experiences. Engage with others by commenting on posts and managing your interactions. Unlock premium content through account verification after payment. Admins can oversee posts and comments for moderation, manage user roles, and analyze activity through a comprehensive dashboard. Whether you’re sharing your adventures or seeking inspiration, Exploring World is your go-to destination for all things travel!

## Features
- Anyone can see posts and also can filter or search without login.
- User can register account and login.
- User can create, update and delete post.
- User can through a comment to his/her own post or others and also can update and delete own comment.
- User can upvote/downvote anyone's post except own post.
- User can follow/unfollow any user to view their post.
- To see premium content of a post, user can verify his/her account.
- Anyone can download post details as PDF.
- Any logged in user can update his/her profile including password & email from the dashboard.
- An admin can observe post and user status from the dashboard using graph representation.
- An admin can delete a post or respected post's comment from the dashboard if anything harmful.
- An admin can create and update category.
- An admin can toggled user role.

## Technology Stack
- Frontend: Next.js, TailwindCSS, Shadcn, Typescript etc.
- Backend: Node.js, Express.js, Typescript, MongoDB, Mongoose etc.
- Payment: AAmarPay.
- Image store: Cloudinary.

## Installation Guideline
- First install the next.js and select Typescript and tailwindCSS there. 
- Install Shadcn, axios, html2canvas, jspdf, react-quill, sonner and other required npm packages.
- Run the App by `npm run dev`
- Create require folder to the `src > app` and open file name `page.tsx`, this folder structure will help to create page and route.
- Implement server-action & hook for fetch and middleware for private route.
- Implement context for accessing user from anywhere of the app.
- Create 2/3 layout for user-interface, dashboard, and login-register page.
- Create `not-found.tsx` and `loading.tsx` as required.

### Prerequisites
- Must have a server and database for managing the App data dynamically through API.

### Installation Steps
1. Create NextJs app by `npx create-next-app@latest`.
2. Install the required npm package where TailwindCSS & Shadcn for managing CSS, html2canvas & jspdf for pdf, react-quill for text editor and sonner for toaster.
3. Under the src folder there are some folder for specific purpose like app, assets, components, config, hooks, types, actions, context, lib and utils and separate files are middleware.ts and constant.ts.

### Configuration
1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:
   ```bash
    NEXT_PUBLIC_API_URL=local_or_live_link
   ```
3. Then the `.env` file needs to be connected with the `src > config` file.
   ```js
    const envConfig = {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
    };
  
    export default envConfig;
   ```

## Usage
- without login, anyone can see posts and its respective comments.
- Create a user, by default it will be user. So, only default admin can change the role.
- Login as a user. The User can view profile, following info and post. He/she can create, update or delete post and even can place comment to the post of his own or others.  
- Any user can update profile info from the dashboard.  
- Login as an Admin. The Admin can manage anyone's post & comment, category, user role and observe post & user status from the dashboard.

### Important Login credentials:
##### Admin: 
- email: admin@example.com
- password: password@1234
##### Demo User: 
- email: jhon24@example.com
- password: password@1234