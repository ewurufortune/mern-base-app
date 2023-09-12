import { createSlice, current } from "@reduxjs/toolkit";



const initialState = {
  mode: "light",
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

 
  setFirstName: (state, action) => {
    state.user.firstName = action.payload;
  },
  setUser: (state, action) => {
    state.user = action.payload;
  }
  ,
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
   
   
    setFirstname: (state, action) => {
      if (state.user) {
        state.user.firstName = action.payload.firstName;
      } else {
        console.error("User non-existent :(");
      }
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    }
    ,

    setStats: (state, action) => {
      console.log(action.payload);
      if (state.user) {
        state.user = {
          ...state.user,
          ...(action.payload.items && { items: action.payload.items }),
          ...(action.payload.mainLogs && { mainLogs: action.payload.mainLogs }),
          ...(action.payload.participants && { participants: action.payload.participants }),
          ...(action.payload.factions && { factions: action.payload.factions }),
          ...(action.payload.categories && { categories: action.payload.categories }),
          ...(action.payload.stats && { stats: action.payload.stats }),
          ...(action.payload.date && { date: action.payload.date }),
          ...(action.payload.relationships && { relationships: action.payload.relationships }),
          ...(action.payload.randomEvents && { randomEvents: action.payload.randomEvents }),
          ...(action.payload.recentEvents && { recentEvents: action.payload.recentEvents }),
          ...(action.payload.arcs && { arcs: action.payload.arcs }),
          ...(action.payload.statPerception && { statPerception: action.payload.statPerception }),
          // ...(action.payload.wrestlers && { savegame: { ...state.user.savegame, wrestlers: action.payload.wrestlers } })
        };
      } else {
        console.error("User non-existent :(");
      }
    },
    
  },
});


export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost , setFirstname,setFirstName,setStats,setDecisionButtonClicked,setUser,setActiveTab} =
  authSlice.actions;
export default authSlice.reducer;