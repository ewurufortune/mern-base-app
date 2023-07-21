import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  buttonText: 'First Button',
  buttonTextValue:'',
  buttonText2:'Second Button',
  buttonText2Value:'',
  userResponse: '',
  actionDescription:'',
  executeAction:'',
  showOptions:false,
  showDescription:false,
  decisionText1:'',
  decisionText2:'',
  selectedDecision:'Hello',
  showDecisionText:false,
  showNextActivityButton:false,
  lastActivity:true,
  showNextWeekButton:true,
  responseRecieved:true,
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
      state.buttonText = action.payload.buttonText;
     
    },
    setButton2Text: (state, action) => {
      state.buttonText2 = action.payload.button2Text;
     
    },
    setButton1TextValue: (state, action) => {
      state.buttonTextValue = action.payload.buttonTextValue;
     
    },
    setButton2TextValue: (state, action) => {
      state.buttonText2Value = action.payload.button2TextValue;
     
    },
    setUserResponse: (state, action) => {
      console.log(action.payload.userResponse);
      state.userResponse = action.payload.userResponse;
     
    },
    setActionDescription: (state, action) => {
      console.log(action.payload.actionDescription);
      state.actionDescription = action.payload.actionDescription;
     
    },
      setExecuteAction: (state, action) => {
      console.log(action.payload.executeAction);
      state.executeAction = action.payload.executeAction;
     
    },
    setShowOptions: (state, action) => {
      console.log(action.payload.showOptions);
      state.showOptions = action.payload.showOptions;
     
    },
    setShowDescription: (state, action) => {
      console.log(action.payload.showDescription);
      state.showDescription = action.payload.showDescription;
     
    },
    setDecisionText1: (state, action) => {
      console.log(action.payload.decisionText1);
      state.decisionText1 = action.payload.decisionText1;
     
    },
    setDecisionText2: (state, action) => {
      console.log(action.payload.decisionText2);
      state.decisionText2 = action.payload.decisionText2;
     
    },
    setSelectedDecision: (state, action) => {
      console.log(action.payload.selectedDecision);
      state.selectedDecision = action.payload.selectedDecision;
     
    },
    setShowDecisionText: (state, action) => {
      console.log(action.payload.showDecisionText);
      state.showDecisionText = action.payload.showDecisionText;
     
    },
    setShowNextActivityButton: (state, action) => {
      
      state.showNextActivityButton = action.payload.showNextActivityButton;
     
    },
    setLastActivity: (state, action) => {
      
      state.lastActivity = action.payload.lastActivity;
     
    },
    setShowNextWeekButton: (state, action) => {
      
      state.showNextWeekButton = action.payload.showNextWeekButton;
     
    },
    setResponseRecieved: (state, action) => {
      
      state.responseRecieved = action.payload.responseRecieved;
     
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


export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost ,setName, setFirstname,setSavegame,setTraits,setButton1Text,setButton2Text,setUserResponse,setButton1TextValue,setButton2TextValue,setActionDescription,setExecuteAction,setShowOptions,setShowDescription,setDecisionText1,setDecisionText2,setShowDecisionText,setSelectedDecision,setShowNextActivityButton,setLastActivity,setShowNextWeekButton,setResponseRecieved} =
  authSlice.actions;
export default authSlice.reducer;