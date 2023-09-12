import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";


const Feed = () => {
  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user._id);
  const token=useSelector((state) => state.token);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from your backend API here
    // You can use the Fetch API, Axios, or any other library of your choice
    fetch('http://localhost:3001/auth/getPosts', {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token in the Authorization header
    },
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved posts in the state
        setPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const handleLike = (postId) => {
    // Send a request to your backend to like the post with the given postId
    fetch(`http://localhost:3001/auth/${postId}/likePost`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
      // You may need to include user information or a token for authentication
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., toggle the "liked" state for the post
        setPosts((prevPosts) => {
          return prevPosts.map((post) => {
            if (post._id === postId) {
              // Check if the user has already liked the post
              const isLiked = post.likes[userId];
  
              // Toggle the like status for the user
              post.likes[userId] = !isLiked;
  
              return post;
            }
            return post;
          });
        });
        console.log(posts);
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });
  };
  
  
  const countLikes = (likes) => {
    return Object.values(likes).filter((value) => value === true).length;
  };
  
  return (
    <div>
    {posts.map((post) => (
      <div key={post._id} className="post">
        <h3>{post.firstName} {post.lastName}</h3>
        <p>{post.description}</p>
        {post.picturePath && (
          <img src={post.picturePath} alt="Post" />
        )}
        <div>
          <button onClick={() => handleLike(post._id)}>
            {likedPosts.includes(post._id) ? 'Unlike' : 'Like'}
          </button>
          <span>{countLikes(post.likes)} Likes</span>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default Feed;
