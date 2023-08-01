import mongoose from "mongoose";
import Feud from "./Feuds.js";
import Company from "./Company.js";

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    alignment: {
      type: String,
      default: "heel",
    },
    popularity: {
      type: Number,
      default: 7,
    },
    wealth: {
      type: Number,
      default: 1000,
    },
    friends: {
      type: Array,
      default: [],
    },
    savegame: {
      type: Object,
      default: {
       
        availablility: {
          type: Object,
          default: {available:true,timeRemaining:0},
        },
        championships: [
          {id:1,
            name: "WWE Championship",
            style: "WWE Champion",
            currentHolder: {
              id: 23,
              isChampion: false,
              championshipHeld: {},
              pronoun: 'he',
              isFeuding: false,
              name: 'Roman Reigns',
              alignment: 'face',
              popularity: 7,
              inRingSkill: 5,
              pastFeuds: [],
              charisma: 'menacing',
              relationship: 0,
              tags: [],
              company: 'WWE',
              bookerRelationship: 7,
            },
            daysHeld: 0,
            dateWon: "",
            dateLost: "",
            pastHolders: [],
            company: "WWE",
          },
          {
            id:2,
            name: "WWE World Heavyweight Championship",
            style: "WWE World Heavyweight Champion",
            currentHolder: {},
            daysHeld: 0,
            dateWon: "",
            dateLost: "",
            pastHolders: [],
            company: "WWE",
          },
          {id:3,
            name: "WWE Tag Team Championship",
            style: "WWE Tag Team Champion",
            currentHolder: {},
            daysHeld: 0,
            dateWon: "",
            dateLost: "",
            pastHolders: [],
            company: "WWE",
          },
          {id:4,
            name: "AEW World Championship",
            style: "AEW World Champion",
            currentHolder: {},
            daysHeld: 0,
            dateWon: "",
            dateLost: "",
            pastHolders: [],
            company: "AEW",
          },
          {
            id:5,
            name: "AEW Championship",
            style: "AEW Champion",
            currentHolder: {},
            daysHeld: 0,
            dateWon: "",
            dateLost: "",
            pastHolders: [],
            company: "AEW",
          },
          
        ],
        feuds: [
    
        ],
        otherFeuds: [
      
        ],
      },
    },
    charisma: {
      type: String,
      default: "menacing",
    },

    isChampion: {
      type: Boolean,
      default: false,
    },
    responseRecieved: {
      type: Boolean,
      default: true,
    },
    pastFeuds: {
      type: Array,
      default: [],
    },
    inRingSkill: {
      type: Number,
      default: 8,
    },
    currentPotentialFeud: {
      type: Object,
      default: {
        name: "Higgins",
        opponent: [
          {
            id: 13,
            isChampion:false,
            championshipHeld:{},
            pronoun:'he',
            isFeuding:true,
            name: "William Harris",
            alignment: "heel",
            popularity: 0,
            inRingSkill: 0,
            charisma: "menacing",
            relationship: 0,
            tags: [],
            company: "WWE",
            bookerRelationship: 7,
          },
        ],
        ally: [],
        requirements: {
          alignment: "face",
          charisma: "menacing",
        },
        length: 2,
        tags: [],
        multiplier: 1.2,
        isCurrentFeud: false,
      },
    },
    activeFeud: {
      type: Object,
      default: {
        name: "Higgins",
        opponent: [
          {
            id: 15,
            name: "Ethan King",
            alignment: "heel",
            popularity: 0,
            inRingSkill: 0,
            charisma: "menacing",
            relationship: 0,
            tags: [],
            company: "WWE",
            bookerRelationship: 7,
          },
        ],
        ally: [],
        requirements: {
          alignment: "face",
          charisma: "menacing",
        },
        length: 2,
        tags: [],
        multiplier: 1.2,
        isCurrentFeud: false,
      },
    },
    currentChampionshipHeld: {
      type: Object,
      default: {},
    },
    titleReigns: {
      type: Array,
      default: [],
    },
    tags: {
      type: Array,
      default: [],
    },
    currentCompany: {
      type: Object,

      default: {
        id:1,
        name: "WWE",
        preferredCharisma: "comedic",
        inRingBenchmark: 3,
        popularityBenchmark: 5,
        bookerOpinion: 7,
      },
    },
   size:{
    type: String,
    default:'large',
   },
   pronoun:{
    type:String,
    default:'he'
   },

    location: String,

    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
