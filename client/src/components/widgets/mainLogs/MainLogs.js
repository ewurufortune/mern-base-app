import React, { useState, useEffect } from "react";
import { useSelector, useDispatch,  } from "react-redux";
import {
  Collapse,
  Input,
  Button,
  Select,
  Tabs,
  Tag,
  Typography,
  List,
  ConfigProvider,
  message,
} from "antd";
import { setStats } from "state";
import _ from "lodash";
import { Segmented, Col, Row } from "antd";
import { CaretDownFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";

// Define a custom CSS class for the caret icon
const customCaretIconStyle = {
  color: "lightgreen", // Light white color
};
const postTypes = [
  { label: "Most Liked Posts", value: "mostLikedPosts" },
  { label: "Recently Liked Posts", value: "recentlyLikedPosts" },
  { label: "Recent Posts", value: "recentPosts" },
];
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
  const [selectedPostType, setSelectedPostType] = useState(postTypes[0].value);

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
      const response = await fetch(`https://bookboard-app.onrender.com/auth/getPosts`, {
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
    fetch(`https://bookboard-app.onrender.com/auth/${postId}/likePost`, {
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

  function calculateDuration(start, end) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const durationInMilliseconds = endTime - startTime;

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = 60 * millisecondsPerSecond;
    const millisecondsPerHour = 60 * millisecondsPerMinute;
    const millisecondsPerDay = 24 * millisecondsPerHour;
    const millisecondsPerYear = 365 * millisecondsPerDay;

    const years = Math.floor(durationInMilliseconds / millisecondsPerYear);
    const days = Math.floor(
      (durationInMilliseconds % millisecondsPerYear) / millisecondsPerDay
    );
    const hours = Math.floor(
      (durationInMilliseconds % millisecondsPerDay) / millisecondsPerHour
    );
    const minutes = Math.floor(
      (durationInMilliseconds % millisecondsPerHour) / millisecondsPerMinute
    );
    const seconds = Math.floor(
      (durationInMilliseconds % millisecondsPerMinute) / millisecondsPerSecond
    );

    let formattedDuration = "";
    if (years > 0) formattedDuration += `${years} years `;
    if (days > 0) formattedDuration += `${days} days `;
    if (hours > 0) formattedDuration += `${hours} hours `;
    if (minutes > 0) formattedDuration += `${minutes} minutes `;
    if (seconds > 0) formattedDuration += `${seconds} seconds`;

    return formattedDuration.trim(); // Remove trailing space
  }

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
    )
    .map((log) => {
      // Calculate duration for each log and add it to the log object
      const duration = calculateDuration(log.dateStart, log.dateEnd);
      return { ...log, duration };
    });

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

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Sucessfully published your save',
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Failed to publish your save.',
    });
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
      const response = await fetch(`https://bookboard-app.onrender.com/auth/publishPost`, {
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
        success()
      } else {
        error()
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

    const trueLikes = Object.values(likes).filter((value) => value === true);
    return trueLikes.length;
  };

  const [sortedParticipants, setSortedParticipants] = useState([
    ...participants,
  ]);
    // Use useEffect to update sortedParticipants when participants changes
    useEffect(() => {
      setSortedParticipants([...participants]);
    }, [participants]);
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


  const replaceUser = async (user) => {
    const bodyData = {
      id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
    impressions: user.impressions,
    mainLogs: user.mainLogs,
    participants: user.participants,
    items: user.items,
    stats: user.stats,
    relationships: user.relationships,
    recentEvents: user.recentEvents,
    statPerception: user.statPerception,
    arcs: user.arcs,
    date: user.date,
    randomEvents: user.randomEvents,
    categories:user.categories,

    };
  
    try {
      // Display loading message
      messageApi.loading({ content: 'Replacing data...', key: 'replaceUserMessage' });
  
      const response = await fetch("https://bookboard-app.onrender.com/auth/replace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
  
      const data = await response.json();
  
      // Display success message
      messageApi.success({ content: 'Data replaced successfully!', key: 'replaceUserMessage' });
            setTimeout(messageApi.destroy,2000);

  
      console.log(data);
    } catch (error) {
      // Display error message
      messageApi.error({ content: 'Failed to replace data!', key: 'replaceUserMessage' });
            setTimeout(messageApi.destroy,2000);

      console.error("Error replacing user:", error);
    }
  };


  const copyAndDispatch = (arrayName, arrayToCopy) => {

    if (arrayName === 'items') {
      // Iterate over the Items array and update holderId for each item
      const updatedItems = items.map((item) => ({
        ...item,
        holderId: [],
      }));
      dispatch(setStats({ items: updatedItems }));

      // Now updatedItems contains the modified items with empty holderId arrays
    }
    
    const copiedArray = [...arrayToCopy]; // Create a shallow copy of the array
console.log(copiedArray);
    // Dispatch the copied array to the Redux store
    dispatch(setStats({ [arrayName]: copiedArray }));
    replaceUser(user)
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
          <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={9} xl={9}>
              <Segmented
                options={postTypes}
                value={selectedPostType}
                onChange={setSelectedPostType}
              />
              <div>
                <h3>Tap a post to Preview</h3>
                <List
                  dataSource={posts?.[selectedPostType]}
                  loading={isLoading} // Set loading to true or false based on your loading state
                  renderItem={(post) => (
                    <List.Item
                      key={post._id}
                      actions={[
                        <Button
                          type="link"
                          onClick={() => handleLike(post._id, selectedPostType)}
                          className="like-button" // Add a class name for styling
                        >
                          {likedPosts.includes(post._id) ? (
                            <FontAwesomeIcon
                              icon={faGem}
                              style={{ color: "#f51414" }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faGem}
                              style={{ color: "blue" }}
                            />
                          )}
                        </Button>,
                      ]}
                      onClick={() => handlePostSelection(post)}
                      style={{ lineHeight: "1.2", maxWidth: "300px" }}
                      className="list-item"
                    >
                      <div>
                        {selectedPostType === "mostLikedPosts" && (
                          <span>Most Liked Post: </span>
                        )}
                        {selectedPostType === "recentlyLikedPosts" && (
                          <span>🟢</span>
                        )}
                        {selectedPostType === "recentPosts" && <span>🟢 </span>}
                        {post.firstName},{" "}
                        {countLikes(post.likes, selectedPostType)} Likes.
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={9} xl={9} style={{ marginLeft: "10%" }}>
              {/* Display selected post */}
              {selectedPost && (
                <div style={{ width: "100%" }}>
                  <h3>Preview</h3>
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
                    <div style={{ maxHeight: "200px", overflow: "auto" }}>
                      <strong>Categories: </strong>
                      {selectedPost.categories.map((category, index) => (
                        <span key={index}>
                          {category.name}
                          {index !== selectedPost.categories.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ))}
                    </div>

                    <div style={{ maxHeight: "200px", overflow: "auto" }}>
                      <strong>Items: </strong>
                      {selectedPost.items?.map((item, index) => (
                        <span key={index}>
                          {item.name}
                          {index !== selectedPost.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>

                    <div style={{ maxHeight: "200px", overflow: "auto" }}>
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
                            style={{ marginRight: "8px", marginBottom: "8px" }}
                          >
                            Copy Participants
                          </Button>

                          {/* Button to copy and dispatch items array */}
                          <Button
                            onClick={() => copyAndDispatch("items", items)}
                            style={{ marginRight: "8px", marginBottom: "8px" }}
                          >
                            Copy Items
                          </Button>

                          {/* Button to copy and dispatch categories array */}
                          <Button
                            onClick={() =>
                              copyAndDispatch("categories", categories)
                            }
                            style={{ marginRight: "8px", marginBottom: "8px" }}
                          >
                            Copy Categories
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
          <div>
            <Button onClick={handleViewPost} style={{ marginBottom: "8px" }}>
              {viewMode ? "Exit View" : "View Post"}
            </Button>
            <button
              onClick={handleRefresh}
              style={{
                backgroundColor: "blue",
                color: "white",
                borderRadius: "5px",
                padding: "6px 12px",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                marginBottom: "8px", // Add margin to the button
              }}
            >
              <span style={{ marginRight: "4px" }}>
                <i className="fas fa-sync-alt"></i>
              </span>
              Refresh Feed
            </button>
          </div>
          <div
            style={{
              marginTop: "1.4%",
              marginBottom: "1.4%",
              display: "flex",
              justifyContent: "center",
            }}
          >
          {contextHolder}
            <Button onClick={handlePublishUpdate}>Publish My Save</Button>
          </div>
        </>
      ),
    },
  ];
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedColor: "rgba(144, 238, 144, 1)",
            // itemSelectedBg:'rgba(144, 238, 144, 1)' ,
            itemHoverColor: "rgba(144, 238, 144, 1)",
          },
        },
      }}
    >
      <div>
        <h2>Main Logs</h2>
        <div>
          <div
            className=""
            style={{
              maxHeight: "50px",
              overflow: "auto",
              width: "90%",
              border: "1px solid red",
              display: "flex",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            {/* Create a button for each unique stat */}
            {allStats.map((statName) => (
              <button
                className="button-70"
                key={statName}
                onClick={() => sortParticipantsByStat(statName)}
              >
                Sort by {statName}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            {" "}
            {/* Add marginTop to the containing div */}
            {/* Create a Select component for filtering by isActive */}
            <Select
              suffixIcon={<CaretDownFilled style={customCaretIconStyle} />}
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
              suffixIcon={<CaretDownFilled style={customCaretIconStyle} />}
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
          </div>

          
        </div>
        <Row gutter={16}>
  <Col span={9}>
    <div
      className=""
      style={{
        maxHeight: "200px",
        overflow: "auto",
        width: "90%",
        border: "1px solid red",
        display: "flex",
        flexWrap: "wrap",
        padding: "10px",
      }}
    >
      {/* Render filtered participants */}
      {filteredParticipants.map((participant) => (
        <button
          key={participant.id}
          onClick={() => {
            setHoveredParticipant(participant); // Set the hovered participant
            setSelectedParticipants((prevSelected) =>
              prevSelected.includes(participant.id)
                ? prevSelected.filter((id) => id !== participant.id)
                : [...prevSelected, participant.id]
            );
          }}
          style={{
            background: selectedParticipants.includes(participant.id)
              ? "lightblue"
              : "white",
            borderLeft: "2px solid black",
            borderBottom: "2px solid black",
            borderRadius: "0",
            transition: "border-color 0.3s",
          }}
          className="rectangular-button"
        >
          {participant.name}
        </button>
      ))}
    </div>
  </Col>
  <Col span={12}>
  <div
  className="participant-tooltip"
  style={{
    display: "flex",
    alignItems: "center",
    maxHeight: "200px",
    overflow: "auto",
  }}
>
  {hoveredParticipant ? (
    <>
      <img
        src={hoveredParticipant.image}
        alt={`${hoveredParticipant.name}`}
        width={120}
        height={120}
        style={{ verticalAlign: "middle", margin: "5px" }}
      />
      <span
        style={{
          marginTop: "20px",
          fontWeight: "bold",
          fontSize: "18px",
          verticalAlign: "middle",
          fontFamily: "cursive, sans-serif",
        }}
      >
        {`${hoveredParticipant.name}`}
      </span>

      <div style={{ marginLeft: "100px", marginTop: 100 }}>
        {statPerception.map((perception) => (
          <div key={perception.statName} style={{ marginBottom: "8px" }}>
            <Tag color="purple">
              {`${perception.statName} (${
                hoveredParticipant.stats.find((stat) =>
                  stat.hasOwnProperty(perception.statName)
                )
                  ? hoveredParticipant.stats.find((stat) =>
                      stat.hasOwnProperty(perception.statName)
                    )[perception.statName]
                  : ""
              })`}
            </Tag>
            <Typography.Text style={{ opacity: 0.8 }}>
              {calculatePercentileCategory(
                hoveredParticipant,
                participants,
                perception.statName,
                statPerception
              )}
            </Typography.Text>
          </div>
        ))}
        {categoryTypes.map((type) => (
          <div key={type} style={{ marginBottom: "8px" }}>
            <Tag color="blue">{`${type}s`}</Tag>
            <Typography.Text style={{ opacity: 0.8 }}>
              {categories
                .filter(
                  (cat) =>
                    cat.type === type &&
                    cat.participants.includes(hoveredParticipant.id)
                )
                .map((cat) => cat.name)
                .join(", ")}
            </Typography.Text>
          </div>
        ))}

        <div style={{ marginBottom: "8px" }}>
          <Tag color="green">Items</Tag>
          {console.log(items)}
          <Typography.Text style={{ opacity: 0.8 }}>
            {items
              .filter((item) =>
                item.holderId.includes(hoveredParticipant.id)
              )
              .map((item) => item.name)
              .join(", ")}
          </Typography.Text>
        </div>
        <div>
          <Tag color="yellow">About</Tag>
          {hoveredParticipant.bio}
        </div>
      </div>
    </>
  ) : (
    "Click on a participant to view their details"
  )}
</div>

  </Col>
</Row>
        <div
          className=""
          style={{
            maxHeight: "300px",
            overflow: "auto",
            width: "90%",
            border: "1px solid red",
            display: "flex",
            flexWrap: "wrap",
            padding: "10px",
          }}
        >
          {categoryTypes.map((categoryType) => (
            <div key={categoryType} style={{ marginBottom: "16px" }}>
              <h3>Filter {categoryType}</h3>
              <Select
                placeholder={`Select ${categoryType} Category`}
                value={selectedCategoryNames[categoryType] || null}
                suffixIcon={<CaretDownFilled style={customCaretIconStyle} />}
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
          <div
            style={{
              marginTop: "1.4%",
              marginBottom: "1.4%",
              paddingRight: "10%",
            }}
          >
            <Collapse items={viewOtherPosts} />
          </div>

          <div style={{ marginBottom: 16 }}>
            {" "}
            {/* Add marginBottom to the containing div */}
            {/* Open All button */}
            <Button onClick={handleOpenAll}>Open All</Button>
            {/* Close All button */}
            <Button onClick={handleCloseAll}>Close All</Button>
          </div>
        </div>
        <div style={{ overflow: "auto", maxHeight: "600px" }}>
          <Collapse
            bordered={false}
            activeKey={activeKey}
            onChange={setActiveKey}
          >
            {filteredLogs.map((log, logIndex) => (
              <Collapse.Panel
                header={
                  log.title + `    ${new Date(log.dateEnd).toLocaleString()}`
                }
                key={logIndex}
                style={{ fontSize: "14px" }} // Adjust the font size as needed
              >
                {" "}
                <div>
                  <strong>Duration: </strong>
                  {log.duration}
                </div>
                <div>
                  <strong>Date End: </strong>
                  {new Date(log.dateEnd).toLocaleString()}
                </div>
                <div>
                  <strong>Participants: </strong>
                  {log.participants.length === 0 ? (
                    <span>No Important Participant</span>
                  ) : (
                    log.participants.map((participantId) => (
                      <span key={participantId}>
                        {getParticipantName(participantId)},{" "}
                      </span>
                    ))
                  )}
                </div>
                <div>
                  <strong>Categories: </strong>
                  {log.categories.length === 0 ? (
                    <span>None</span>
                  ) : (
                    log.categories.join(", ")
                  )}
                </div>
                {/* <div>
              <strong>Segment Rating: </strong>
              {log.segmentRating}
            </div> */}
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
      </div>
    </ConfigProvider>
  );
}
