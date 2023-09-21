import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Collapse, Input, Button, Select, Tabs } from "antd";
import { setStats } from "state";
import _ from "lodash";
import { Segmented } from "antd";

const postTypes = ["mostLikedPosts", "recentlyLikedPosts", "recentPosts"];

// const [selectedPostCategories,setSelectedPostCategories]=useState([])
// const [selectedPostMainLogs,setSelectedPostCategory]=useState([])
// const [selectedPostParticipants,setSelectedPostParticipants]=useState([])

export default function MainLogs() {
  const [viewMode, setViewMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // Track selected post

  const user = useSelector((state) => state.user);
  const firstName = viewMode ? selectedPost.firstName : user.firstName;
  const lastName = viewMode ? selectedPost.lastName : user.lastName;
  const mainLogs = viewMode ? selectedPost.mainLogs : user.mainLogs;
  const participants = viewMode ? selectedPost.participants : user.participants;
  const categories = viewMode ? selectedPost.categories : user.categories;
  const items = viewMode ? selectedPost.items : user.items;
  const statPerception = viewMode
    ? selectedPost.statPerception
    : user.statPerception;

  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user._id);

  const dispatch = useDispatch();

  const [editedDescriptions, setEditedDescriptions] = useState({});
  const [editingLogIndex, setEditingLogIndex] = useState(null);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState(null);
  const [selectedCategoryTypes, setSelectedCategoryTypes] = useState({});
  const [selectedCategoryNames, setSelectedCategoryNames] = useState({});

  // Define a state variable to hold posts
  const [posts, setPosts] = useState([]);

  const [mostLikedPosts, setMostLikedPosts] = useState([]);
  const [recentlyLikedPosts, setRecentlyLikedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedPostType, setSelectedPostType] = useState("mostLikedPosts");

  const handlePostTypeChange = (value) => {
    console.log(value);
    setSelectedPostType(value);
  };

  const handleViewPost = () => {
    if (selectedPost) {
      // Toggle viewMode true/false
      setViewMode(!viewMode);
    }
  };
  useEffect(() => {
    // Fetch posts from your backend
    fetchPosts();
  }, []); // Fetch posts when the component mounts

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/auth/getPosts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPosts(data);
        setMostLikedPosts(data.mostLikedPosts);
        setRecentPosts(data.recentPosts);
        setRecentlyLikedPosts(data.setRecentlyLikedPosts);
      } else {
        console.error("Error fetching posts:", response.statusText);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setIsLoading(false);
    }
  };

  const handleLike = (postId, category) => {
    // Check if the user has already liked the post
    const isLiked = likedPosts.includes(postId);

    // Send a request to your backend to like or unlike the post with the given postId
    fetch(`http://localhost:3001/auth/${postId}/likePost`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the likedPosts array based on whether the user liked or unliked the post
        if (isLiked) {
          setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.filter((id) => id !== postId)
          );
        } else {
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
        }

        // Update the corresponding category (mostLikedPosts, mostRecentPosts, recentlyLikedPosts)
        setPosts((prevPosts) => {
          return {
            ...prevPosts,
            [category]: prevPosts[category].map((post) => {
              if (post._id === postId) {
                // Toggle the like status for the user
                post.likes[userId] = !isLiked;
              }
              return post;
            }),
          };
        });
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };

  // Function to handle post selection
  const handlePostSelection = (post) => {
    setSelectedPost(post); // Set the selected post
    // You can also update other state variables with data from the selected post here
  };

  const getParticipantName = (participantId) => {
    const participant = participants.find((p) => p.id === participantId);
    return participant ? participant.name : "Unknown Participant";
  };

  const handleEditDescription = (logIndex) => {
    // Set the editing index and store the initial description
    setEditingLogIndex(logIndex);
    setEditedDescriptions((prevState) => ({
      ...prevState,
      [logIndex]: mainLogs[logIndex].description,
    }));
  };

  const handleSaveDescription = (logIndex) => {
    // Handle saving the edited description to your state/store
    // You can dispatch an action or use any appropriate method
    // based on your application's logic
    // For example:
    const updatedMainLogs = mainLogs.map((log, i) =>
      i === logIndex
        ? { ...log, description: editedDescriptions[logIndex] }
        : log
    );
    // Dispatch the updatedMainLogs or update the state as needed
    // For instance, if you're using Redux:
    dispatch(setStats({ mainLogs: updatedMainLogs }));
    setEditedDescriptions((prevState) => ({
      ...prevState,
      [logIndex]: undefined,
    }));
    setEditingLogIndex(null);
  };

  const categoryTypes = Array.from(
    new Set(categories.map((category) => category.type))
  );

  const filteredLogs = mainLogs
    .filter(
      (log) =>
        selectedParticipants.length === 0 ||
        selectedParticipants.every((participantId) =>
          log.participants.includes(participantId)
        )
    )
    .filter((log) =>
      Object.entries(selectedCategoryNames).every(
        ([categoryType, categoryName]) =>
          !categoryName || log.categories.includes(categoryName)
      )
    );

  console.log(filteredLogs); // Output the filtered logs to the console for monitoring

  const [activeKey, setActiveKey] = useState([]);
  const [allPanelsOpen, setAllPanelsOpen] = useState(false);

  const handleOpenAll = () => {
    setActiveKey(filteredLogs.map((_, index) => `${index}`));
    setAllPanelsOpen(true);
  };

  const handleCloseAll = () => {
    setActiveKey([]);
    setAllPanelsOpen(false);
  };

  const handlePublishUpdate = async () => {
    // Prepare the data to be sent to the server
    const postData = {
      id: userId,
      firstName,
      mainLogs,
      participants,
      categories,
      items,
      statPerception,
    };

    try {
      const response = await fetch(`http://localhost:3001/auth/publishPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the user's token if needed
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // const data = await response.json();
        // // Handle the response, e.g., display a success message
        console.log("Post published/updated successfully");
      } else {
        // Handle error responses, e.g., display an error message
        console.error("Error publishing/updating post:", response.statusText);
      }
    } catch (error) {
      console.error("Error publishing/updating post:", error);
    }
  };

  const handleRefresh = () => {
    // Call the fetchPosts function to refresh the feed
    fetchPosts();
    console.log(posts);
  };

  const countLikes = (likes, selectedPostType) => {
    if (!likes) {
      return 0; // Handle the case where likes is undefined or null
    }

    if (
      selectedPostType === "mostLikedPosts" &&
      likes.likeCount !== undefined
    ) {
      return likes.likeCount;
    } else {
      const trueLikes = Object.values(likes).filter((value) => value === true);
      return trueLikes.length;
    }
  };

  const [sortedParticipants, setSortedParticipants] = useState([
    ...participants,
  ]);
  const [hoveredParticipant, setHoveredParticipant] = useState(null);
  // Extract all unique stats from participants
  const allStats = participants.reduce((stats, participant) => {
    participant.stats.forEach((stat) => {
      const statName = Object.keys(stat)[0];
      if (!stats.includes(statName)) {
        stats.push(statName);
      }
    });
    return stats;
  }, []);

  // Sort participants by a specific stat
  const sortParticipantsByStat = (statName) => {
    console.log(statName);
    const sorted = [...sortedParticipants].sort((a, b) => {
      const statA = a.stats.find((stat) => stat[statName]);
      const statB = b.stats.find((stat) => stat[statName]);
      const valueA = statA ? statA[statName] : 0;
      const valueB = statB ? statB[statName] : 0;
      return valueB - valueA;
    });

    setSortedParticipants(sorted);
  };

  const copyAndDispatch = (arrayName, arrayToCopy) => {
    const copiedArray = [...arrayToCopy]; // Create a shallow copy of the array

    // Dispatch the copied array to the Redux store
    dispatch(setStats({ [arrayName]: copiedArray }));
  };

  const [filterIsActive, setFilterIsActive] = useState(true);
  const [filterCategory, setFilterCategory] = useState(null);

  // Create a filteredParticipants array based on filter options
  const filteredParticipants = sortedParticipants.filter((participant) => {
    if (filterIsActive === null || filterIsActive === participant.isActive) {
      if (filterCategory === null) {
        return true; // No category filter, include all participants
      } else {
        // Check if participant ID is present in the selected category
        return categories.some(
          (category) =>
            category.participants.includes(participant.id) &&
            category.name === filterCategory
        );
      }
    }
    return false; // Filtered out based on isActive or category
  });

  const calculatePercentileCategory = (
    participant,
    participants,
    statName,
    statPerception
  ) => {
    const statValue = participant.stats.find(
      (stat) => Object.keys(stat)[0] === statName
    );

    if (!statValue) {
      return "Unclear";
    }

    const sortedStats = participants
      .map((p) => {
        const pStat = p.stats.find((s) => Object.keys(s)[0] === statName);
        return pStat ? Object.values(pStat)[0] : null;
      })
      .filter((value) => value !== null)
      .sort((a, b) => b - a);

    const participantValue = Object.values(statValue)[0];
    const percentile =
      (sortedStats.indexOf(participantValue) / (sortedStats.length - 1)) * 100;

    if (percentile <= 1) {
      return (
        statPerception.find((s) => s.statName === statName)?.top1 || "Unclear"
      );
    } else if (percentile <= 5) {
      return (
        statPerception.find((s) => s.statName === statName)?.top5Percentile ||
        "Unclear"
      );
    } else if (percentile <= 10) {
      return (
        statPerception.find((s) => s.statName === statName)?.top10Percentile ||
        "Unclear"
      );
    } else if (percentile <= 20) {
      return (
        statPerception.find((s) => s.statName === statName)?.top20Percentile ||
        "Unclear"
      );
    } else if (percentile <= 40) {
      return (
        statPerception.find((s) => s.statName === statName)?.top40Percentile ||
        "Unclear"
      );
    } else {
      return (
        statPerception.find((s) => s.statName === statName)?.top80Percentile ||
        "Unclear"
      );
    }
  };

  const viewOtherPosts = [
    {
      key: "1",
      label: "See what others have published",
      children: (
        <>
          {" "}
          {/* Display a list of posts */}
          {selectedPostType}
          <Segmented
            options={postTypes}
            value={selectedPostType}
            onChange={setSelectedPostType}
          />
          ;
          <div>
            <h3>Select a Post</h3>
            <ul>
              {posts?.[selectedPostType]?.map((post) => (
                <li key={post._id} onClick={() => handlePostSelection(post)}>
                  {selectedPostType === "mostLikedPosts" && (
                    <span>Most Liked Post: </span>
                  )}
                  {selectedPostType === "recentlyLikedPosts" && (
                    <span>Recently Liked Post: </span>
                  )}
                  {selectedPostType === "recentPosts" && (
                    <span>Recent Post: </span>
                  )}
                  {post.firstName},
                  {post.likeCount !== undefined
                    ? post.likeCount
                    : countLikes(post.likes, selectedPostType)}{" "}
                  Likes.
                  <button
                    onClick={() => handleLike(post._id, selectedPostType)}
                  >
                    {likedPosts.includes(post._id) ? "Unlike" : "Like"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Display selected post */}
          {selectedPost && (
            <div>
              <h3>Selected Post</h3>
              <div>
                {/* Display the mainLogs, categories, and Participants from selectedPost */}
                <div>
                  <strong>Title: {selectedPost.firstName} </strong>
                  <span>{countLikes(selectedPost.likes)} Likes</span>
                </div>
                <div>
                  <strong>
                    Main Logs: <span>{selectedPost.mainLogs.length}</span>{" "}
                  </strong>
                </div>
                <div>
                  <strong>Categories: </strong>
                  {selectedPost.categories.map((category, index) => (
                    <span key={index}>
                      {category.name}
                      {index !== selectedPost.categories.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div>
                  <strong>Items: </strong>
                  {selectedPost.items?.map((item, index) => (
                    <span key={index}>
                      {item.name}
                      {index !== selectedPost.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div>
                  <strong>Participants: </strong>
                  {selectedPost.participants.map((participant, index) => (
                    <span key={index}>
                      {participant.name}
                      {index !== selectedPost.participants.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
                </div>
                <div>
                  {/* Your other JSX code */}
                  {viewMode && (
                    <div>
                      {/* Button to copy and dispatch participants array */}
                      <Button
                        onClick={() =>
                          copyAndDispatch("participants", participants)
                        }
                      >
                        Copy Participants
                      </Button>

                      {/* Button to copy and dispatch items array */}
                      <Button onClick={() => copyAndDispatch("items", items)}>
                        Copy Items
                      </Button>

                      {/* Button to copy and dispatch categories array */}
                      <Button
                        onClick={() =>
                          copyAndDispatch("categories", categories)
                        }
                      >
                        Copy Categories
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <Button onClick={handleViewPost}>
            {viewMode ? "Exit View" : "View Post"}
          </Button>
          <button onClick={handleRefresh}>Refresh Feed</button>
        </>
      ),
    },
  ];
  return (
    <div>
      <h2>Main Logs</h2>
      <div>
        <Button onClick={handlePublishUpdate}>Publish/Update Post</Button>
        <div>
          {/* Create a button for each unique stat */}
          {allStats.map((statName) => (
            <button
              key={statName}
              onClick={() => sortParticipantsByStat(statName)}
            >
              Sort by {statName}
            </button>
          ))}
        </div>

        {/* Create a Select component for filtering by isActive */}
        <Select
          placeholder="Filter by Activity"
          onChange={(value) => setFilterIsActive(value)}
          style={{ width: 200, marginBottom: 16 }}
        >
          <Select.Option value={null}>All</Select.Option>
          <Select.Option value={true}>Active</Select.Option>
          <Select.Option value={false}>Inactive</Select.Option>
        </Select>

        {/* Create a Select component for filtering by category */}
        <Select
          placeholder="Filter by Category"
          onChange={(value) => setFilterCategory(value)}
          style={{ width: 200, marginBottom: 16 }}
        >
          <Select.Option value={null}>All</Select.Option>
          {categories.map((category) => (
            <Select.Option key={category.name} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>

        {/* Render filtered participants */}
        {filteredParticipants.map((participant) => (
          <Button
            key={participant.id}
            onMouseEnter={() => setHoveredParticipant(participant)}
            onClick={() =>
              setSelectedParticipants((prevSelected) =>
                prevSelected.includes(participant.id)
                  ? prevSelected.filter((id) => id !== participant.id)
                  : [...prevSelected, participant.id]
              )
            }
            type={
              selectedParticipants.includes(participant.id)
                ? "primary"
                : "default"
            }
          >
            {participant.name}
          </Button>
        ))}
      </div>

      {hoveredParticipant && (
        <div
          className="participant-tooltip"
          style={{ maxHeight: "150px", overflow: "auto" }}
        >
          <img
            src={hoveredParticipant.image}
            alt={` ${hoveredParticipant.name}`}
            width={150}
            height={150}
          />
          <span>{`Participant: ${hoveredParticipant.name}`}</span>
          {categoryTypes.map((type) => (
            <p key={type}>{`${type}s: ${categories
              .filter(
                (cat) =>
                  cat.type === type &&
                  cat.participants.includes(hoveredParticipant.id)
              )
              .map((cat) => cat.name)
              .join(", ")}`}</p>
          ))}
          <p>{`Items: ${items
            .filter((item) => item.holderId.includes(hoveredParticipant.id))
            .map((item) => item.name)
            .join(", ")}`}</p>

          {statPerception.map((perception) => (
            <p key={perception.statName}>{`${
              perception.statName
            }: ${calculatePercentileCategory(
              hoveredParticipant,
              participants,
              perception.statName,
              statPerception
            )}`}</p>
          ))}
        </div>
      )}
      <div>
        {categoryTypes.map((categoryType) => (
          <div key={categoryType} style={{ marginBottom: "16px" }}>
            <h3>{categoryType} Category</h3>
            <Select
              placeholder={`Select ${categoryType} Category`}
              value={selectedCategoryNames[categoryType] || null}
              onChange={(value) =>
                setSelectedCategoryNames((prevState) => ({
                  ...prevState,
                  [categoryType]: value,
                }))
              }
              style={{ width: "200px" }}
            >
              <Select.Option value={null}>All</Select.Option>
              {categories
                .filter((category) => category.type === categoryType)
                .map((category) => (
                  <Select.Option key={category.name} value={category.name}>
                    {category.name}
                  </Select.Option>
                ))}
            </Select>
          </div>
        ))}
      </div>
      <div>
        {/* Open All button */}
        <Button onClick={handleOpenAll}>Open All</Button>
        {/* Close All button */}
        <Button onClick={handleCloseAll}>Close All</Button>
      </div>
      <Collapse items={viewOtherPosts} defaultActiveKey={['1']} />;
      <Collapse bordered={false} activeKey={activeKey} onChange={setActiveKey}>
        {filteredLogs.map((log, logIndex) => (
          <Collapse.Panel header={log.title} key={logIndex}>
            <div>
              <strong>Date Start: </strong>
              {new Date(log.dateStart).toLocaleString()}
            </div>
            <div>
              <strong>Date End: </strong>
              {new Date(log.dateEnd).toLocaleString()}
            </div>
            <div>
              <strong>Participants: </strong>
              {log.participants.map((participantId) => (
                <span key={participantId}>
                  {getParticipantName(participantId)},{" "}
                </span>
              ))}
            </div>
            <div>
              <strong>Categories: </strong>
              {log.categories.join(", ")}
            </div>
            <div>
              <strong>Segment Rating: </strong>
              {log.segmentRating}
            </div>

            {/* Moved the inner loop for log descriptions outside of Collapse.Panel */}
            <div key={logIndex}>
              <h3>{log.title}</h3>
              {editingLogIndex === logIndex ? (
                <textarea
                  value={editedDescriptions[logIndex] || ""}
                  onChange={(e) =>
                    setEditedDescriptions((prevState) => ({
                      ...prevState,
                      [logIndex]: e.target.value,
                    }))
                  }
                  onBlur={() => handleSaveDescription(logIndex)}
                  rows={5}
                />
              ) : (
                <div>
                  {log.description && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: log.description.replace(/\n/g, "<br />"),
                      }}
                    />
                  )}
                </div>
              )}
              {editingLogIndex !== logIndex && (
                <button
                  onClick={() => handleEditDescription(logIndex)}
                  disabled={viewMode}
                >
                  Edit Description
                </button>
              )}
            </div>
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>
  );
}
