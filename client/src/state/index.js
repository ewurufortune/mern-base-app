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
  selectedWrestler:{},

  timeToOpenSpot:5,
  week:1,
  eventType:'',
  story:'Welcome to the Wrestling World!',
  isFeudActive:false,

  selectedOption: '',
  optionDescription: '',
  showActions: true,
  showEndDayButton: false,
  currentWeeklyAntic: {},
  currentMatchPlan: {},
  showChampionship: false,


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
    setWeek: (state, action) => {
     state.week = action.payload.week;}
    ,
    setEventType: (state, action) => {
     state.eventType = action.payload.eventType;}
    ,
    setTimeToOpenSpot: (state, action) => {
      state.timeToOpenSpot = action.payload.timeToOpenSpot;
    },
   setStory: (state, action) => {
     state.story = action.payload.story;
   },
   setCompanies: (state, action) => {
    console.log(action.payload);
     state.user.savegame.companies = action.payload;
   }
   ,
   setIsFeudActive: (state, action) => {
     state.isFeudActive = action.payload.isFeudActive;
   },
   setSelectedOption: (state, action) => {
     state.selectedOption = action.payload;
   },
   setOptionDescription: (state, action) => {
     state.optionDescription = action.payload;
   },
   setShowActions: (state, action) => {
     state.showActions = action.payload;
   },
   setShowEndDayButton: (state, action) => {
     state.showEndDayButton = action.payload;
   },
   setCurrentWeeklyAntic: (state, action) => {
     state.currentWeeklyAntic = action.payload;
   },
   setCurrentMatchPlan: (state, action) => {
     state.currentMatchPlan = action.payload;
   }
   ,
   setShowChampionship: (state, action) => {
     state.showChampionship = action.payload;
   }
   ,
   setPlayerWrestler: (state, action) => {
    const { firstname, charisma, alignment, popularity, inRingSkill, currentPotentialFeud, activeFeud, pastFeuds, isChampion, currentChampionshipHeld, titleReigns, currentCompany, tags } = action.payload;
    state.user.firstname = firstname;
    state.user.charisma = charisma;
    state.user.alignment = alignment;
    state.user.popularity = popularity;
    state.user.inRingSkill = inRingSkill;
    state.user.currentPotentialFeud = currentPotentialFeud;
    state.user.activeFeud = activeFeud;
    state.user.pastFeuds = pastFeuds;
    state.user.isChampion = isChampion;
    state.user.currentChampionshipHeld = currentChampionshipHeld;
    state.user.titleReigns = titleReigns;
    state.user.currentCompany = currentCompany;
    state.user.tags = tags;
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


export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost ,setName, setFirstname,setSavegame,setTraits,setButton1Text,setButton2Text,setUserResponse,setButton1TextValue,setButton2TextValue,setActionDescription,setExecuteAction,setShowOptions,setShowDescription,setDecisionText1,setDecisionText2,setShowDecisionText,setSelectedDecision,setShowNextActivityButton,setLastActivity,setShowNextWeekButton,setResponseRecieved,setEventType,setIsFeudActive,setStory,setWeek,setTimeToOpenSpot,setCurrentMatchPlan,setCurrentWeeklyAntic,setOptionDescription,setSelectedOption,setShowActions,setShowChampionship,setShowEndDayButton,setPlayerWrestler,setCompanies} =
  authSlice.actions;
export default authSlice.reducer;