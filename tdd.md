# MyTimeline - Technical Design Document

---

## 📌 Overview

**MyTimeline** is a social connection platform that allows users to post text, images, and videos, and interact via a personalized timeline. It includes features such as tagging users, post visibility controls, reactions, comments, and rich media integration. The backend aggregates relational (PostgreSQL) and NoSQL (MongoDB) data into unified objects for the frontend.

---

## 🚀 Features

### 1. User Management

- User accounts with authentication (`/auth/signup`, `/auth/login`, `/auth/logout`)
- Friends and close friends system (`/friends/send-request`, `/friends/accept-request`, `/friends/add-close-friend`)
- Family system (`/friends/add-family-member`)
- Block users (`/friends/block-user`)
- Privacy settings (private, friends, close friends, family, public)

### 2. Posting

- Text-based posts (`/post`, `/posts`)
- Upload and associate images/videos with posts or standalone (`/media/upload`)
- Tag other users in posts or media (`user_tags` in posts, `taggedUserIds` in media)
- Visibility control on each post/media (`visibility` field in posts and media)

### 3. Timelines

- User timeline (chronological, filtered by year/month) [Frontend: Timeline component]
- Friends timeline (user + friends posts) [Backend: `/api/v1/friends/timeline_admin` endpoint stub]
- Suggested timeline (planned)
- Global timeline (planned)
- All timelines merge posts, images, and videos into a unified feed (planned, backend structure ready)

### 4. Reactions & Comments

- Support for liking/reacting to posts and media (planned, reactions field in post entity)
- Nested comments for threaded discussions (`parentCommentId` in comments)
- Comment/reaction counts for engagement-based sorting (planned)

### 5. Events

- Not yet implemented

---

## 🧱 Tech Stack

### Backend

- **Node.js** (Express)
- **PostgreSQL** (users, relationships, posts, comments)
- **MongoDB** (media, reactions, metadata)
- **AWS S3** (media file storage)
- **TypeORM** (ORM for PostgreSQL)
- **Mongoose** (ODM for MongoDB)

### Frontend

- **Expo** (React Native)
- Redux Toolkit for state management
- Unified timeline rendering (Timeline component)
- Secure authentication (planned)

---

## 🗃️ Database Schema (Current)

### PostgreSQL

**User**

- id (UUID)
- user_id (string, unique)
- username (planned)
- email
- password (hashed)
- friends (many-to-many)
- closeFriends (many-to-many)
- family (many-to-many)
- blockedUsers (many-to-many)

**Post**

- id (UUID)
- user (FK to User)
- content
- visibility (enum[])
- user_tags (string[])
- reactions (jsonb)
- comments (one-to-many)
- created_at
- modified_at

**Comment**

- id (UUID)
- post (FK)
- user (FK)
- content
- parentCommentId (for nested comments)
- created_at
- modified_at

**FriendRequest**

- id (UUID)
- sender (FK to User)
- receiver (FK to User)
- createdAt

**BlockedUser**

- id (UUID)
- user (FK to User)
- blockedUser (FK to User)

---

### MongoDB - Media Schema

**Media**

- id (UUID)
- filename
- path
- size
- mimetype
- url
- visibility
- userId
- taggedUserIds
- createdAt

**Reactions and Comments on media** are stored the same way, linked by `targetId`.

---

## 🔄 Use Cases

### Posting Media

1. User uploads an image/video via `/media/upload`
2. S3 stores file; metadata saved in MongoDB
3. Media linked to post or user; visibility/tagging recorded

### Posting Text

1. User creates a post via `/post`
2. Post is saved in PostgreSQL with content, visibility, tags

### Fetching a Timeline

1. User hits `/api/v1/friends/timeline_admin` (stubbed, to be expanded)
2. Backend fetches:
   - Posts from PostgreSQL with proper visibility
   - Media from MongoDB with matching filters
   - Joins reactions, comments, tags
   - Returns unified feed

### Tagging Users

- Tags are stored in `user_tags` array for posts and `taggedUserIds` for media

### Managing Friends

- Send, accept, and list friend requests
- Add close friends and family members
- Block users

---

## 🔧 API Endpoints (Implemented)

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/post`
- `GET /api/v1/post/:id`
- `GET /api/v1/posts`
- `PUT /api/v1/post/:id`
- `DELETE /api/v1/post/:id`
- `POST /api/v1/media/upload`
- `POST /api/v1/friends/send-request`
- `POST /api/v1/friends/accept-request`
- `GET /api/v1/friends/pending-requests/:userId`
- `GET /api/v1/friends/:userId`
- `POST /api/v1/friends/block-user`
- `POST /api/v1/friends/add-close-friend`
- `POST /api/v1/friends/add-family-member`
- `GET /api/v1/friends/timeline_admin` (stubbed)

---

## 📈 Scaling Considerations

- Indexes on `created_at`, `user_id`, `visibility` fields
- Paginate timelines with cursors or `created_at`
- Use Redis for caching trending/suggested timelines (planned)
- CDN for media delivery

---

## 🧩 Extensibility

- Add story-style posts (planned)
- Integrate voice or audio uploads (planned)
- Notification system for tags, comments, new followers (planned)
- Events (planned)

### Events

- just like posts
- include todos
- guestlist
- chat/comment
- - just like reactions & comments
- can post ahead
- privacy just like posts

### Explore

- view posts throughout "history"
- posts organized by most added to timeline first for each year/month/day
- chronlogical order available
- search by title, description/body and category

### add posts to your timeline

- add posts from friends/family/explore to your timeline if its public or you have visibility to posts
- helps ranking of posts by how many people have it on their timeline
- use that ranking over likes...?
- allow lkes and timelines as some may not want it on timeline

### add friends

- block friends
- add friends
- add to category to use for visbility (visibility group)
- post level visibility

### my timeline feed

- friends and your timeline
- friends timeline only
- category/group timeline only
- order by likes, timelines, chronological order
- default to current date on app start
- current date button
- date search ability (calendar type search)

---

## ✅ Current Status

- Phase III (Timeline endpoints & unified media/posts integration)
- Backend: Express services/controllers, TypeORM, Mongoose, S3 integration for media
- Frontend: Expo/React Native app with Timeline UI, Redux Toolkit, API integration for posts/friends
- Timeline is ready to merge relational + NoSQL data (backend structure in place, frontend consuming stubbed endpoints)

---

## 📝 Notes

- Timeline ordering: treat media same as posts (planned for unified feed)
- Visibility and tags unified across all content
- Data structure designed for unified frontend consumption
