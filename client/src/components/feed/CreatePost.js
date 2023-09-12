import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const CreatePost = () => {
  const user = useSelector((state) => state.user);
  const userId = useSelector((state) => state.user._id);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const mainLogs= useSelector((state) => state.user.mainLogs);

  const [postContent, setPostContent] = useState({
    id: userId,
    firstName: firstName,
    lastName: lastName,
    description: "",
    picturePath: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostContent({
      ...postContent,
      [name]: value,
    });
  };

  const handleCreatePost = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postContent),
      });

      if (response.ok) {
        // Optionally, clear the form or show a success message
        setPostContent({
          id: userId,
          firstName: firstName,
          lastName: lastName,
          description: "",
          picturePath: "",
        });

        // You can add logic to update your posts list or show a success message here
      } else {
        // Handle non-successful response (e.g., server error)
        console.error(
          "Error creating post(server error?):",
          response.statusText
        );
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error creating post(network error?):", error);
      // Handle network or other errors
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={postContent.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="picturePath">Picture URL (optional):</label>
          <input
            type="text"
            id="picturePath"
            name="picturePath"
            value={postContent.picturePath}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleCreatePost}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
