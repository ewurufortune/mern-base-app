import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons';

const Feed = () => {
  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user._id);
  const token=useSelector((state) => state.token);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state



  // Define the fetchPosts function
  const fetchPosts = () => {
    setIsLoading(true); // Set loading state to true
    fetch('https://bookboard-app.onrender.com/auth/getPosts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data.mostLikedPosts);
        setIsLoading(false); // Set loading state to false when done
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setIsLoading(false); // Set loading state to false on error
      });
  };

  useEffect(() => {
    // Call the fetchPosts function when the component mounts
    fetchPosts();
  }, [token]); // The dependency array ensures the effect re-runs when the token changes

  const handleRefresh = () => {
    // Call the fetchPosts function to refresh the feed
    fetchPosts();
  };

  const handleLike = (postId) => {
    // Send a request to your backend to like the post with the given postId
    fetch(`https://bookboard-app.onrender.com/auth/${postId}/likePost`, {
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
     <button onClick={handleRefresh}>Refresh Feed</button>
    {posts.map((post) => (
      <div key={post._id} className="post">
        <h3>{post.firstName} </h3>
        <div>
        <button onClick={() => handleLike(post._id)}>
  {likedPosts.includes(post._id) ? (
    <FontAwesomeIcon icon={faGem} style={{ color: '#f51414' }} />
  ) : (
    <FontAwesomeIcon icon={faGem} style={{ color: 'blue' }} />
  )}
</button>

          <span>{countLikes(post.likes)} Likes</span>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default Feed;



