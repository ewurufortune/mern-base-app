import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  buttonText: 'First Button',
  user: null,
  token: null,
  posts: [],

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setButton1Text: (state, action) => {
      if (state.buttonText) {
        state.buttonText = action.payload.buttonText;
      } else {
        console.error("Button non-existent :(");
      }
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends non-existent :(");
      }
    },
    setName: (state, action) => {
      if (state.user) {
        state.user.firstName = 'john';
      } else {
        console.error("User non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setFirstname: (state, action) => {
      if (state.user) {
        state.user.firstName = action.payload.firstName;
      } else {
        console.error("User non-existent :(");
      }
    },
    setSavegame: (state, action) => {
      if (state.user) {
        state.user.savegame = action.payload.savegame;
      } else {
        console.error("User non-existent :(");
      }
    },
    setTraits: (state, action) => {
      console.log(action.payload);
      if (state.user) {
        state.user.charisma = action.payload.charisma;
        state.user.wealth = action.payload.wealth;
        state.user.popularity = action.payload.popularity;
        state.user.allignment = action.payload.allignment;
      } else {
        console.error("User non-existent :(");
      }
    },
  },
});


export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost ,setName, setFirstname,setSavegame,setTraits,setButton1Text} =
  authSlice.actions;
export default authSlice.reducer;