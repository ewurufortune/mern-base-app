import mongoose from "mongoose";

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
      default: 1,
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
        companies:[
        {
          name: 'WWE',
          preferredCharisma: 'comedic',
          inRingBenchmark: 3,
          popularityBenchmark: 5,
          bookerOpinion:7
        },
        {
          name: 'AEW',
          preferredCharisma: 'Menacing',
          inRingBenchmark: 5,
          popularityBenchmark: 3,
          bookerOpinion:7
        },
        // Add more companies here with their properties
        // ...
      ],
        wrestlers: [
          { id:1, name: "John Doe", alignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7},
          { id:2, name: "Jane Smith", alignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7},
          { id:3, name: "Mike Johnson", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:4, name: "Emily Davis", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:5, name: "Alex Anderson", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:6, name: "Sarah Thompson", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:7, name: "Ryan Clark", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:8, name: "Olivia Baker", alignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7},
          { id:9, name: "Daniel Wright", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:10, name: "Sophia Rodriguez", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:11, name: "Matthew Evans", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:12, name: "Ava Turner", alignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7},
          { id:13, name: "William Harris", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:14, name: "Chloe Adams", alignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:15, name: "Ethan King", alignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7}
        ],
        championships:[
          {name:'WWE Championship',style:'WWE Champion',currentHolder:'wrestlers[0]',daysHeld:0,dateWon:'',dateLost:'',pastHolders:[],company:'WWE'},
          {name:'World Heavyweight Championship',style:'World Heavyweight Champion',currentHolder:{},daysHeld:0,dateWon:'',dateLost:'',pastHolders:[],company:'WWE'},
          {name:'Tag Team Championship',style:'Tag Team Champion',currentHolder:{},daysHeld:0,dateWon:'',dateLost:'',pastHolders:[],company:'WWE'},
      
        ],
        feuds:[],
        currentFeuds: [{
                       faceId:[2], 
                       heelId:[3],
                       intensity:0,
                       timeRemaining:5,
                        requirementsMet:0.4,
                        requiremants:{
alignment:'face',
popularity:5,
charisma:'menacing',
relationship:{
  relationshipID:1,
  relationshipRequirement:5
}
                     }}],


        potentialFeuds: [{
          opponentId:[1], 
          partnerId:[],
          multiple:false,
          intensity:0,
          timeRemaining:5,
           requirementsMet:0.4,
           requiremants:{
alignment:'face',
popularity:5,
charisma:'menacing',
relationship:{
relationshipID:1,
relationshipRequirement:5
}
        }}]
      },


    }
    ,

          
    charisma: {
      type: String,
      default: "comedic",
    },
          
    isChampion: {
      type: Boolean,
      default: false,
    },
    pastFeuds: {
      type: Array,
      default: [],
    },
    inRingSkill: {
      type: Number,
      default: 4,
    },
    currentPotentialFeud: {
      type: Object,
      default: {},
    },
    activeFeud: {
      type: Object,
      default: {},
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
      default: {},
    },
    
    location: String,
   
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;