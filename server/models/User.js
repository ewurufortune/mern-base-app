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
    allignment: {
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
        wrestlers: [
          { id:1, name: "John Doe", allignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7},
          { id:2, name: "Jane Smith", allignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7},
          { id:3, name: "Mike Johnson", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:4, name: "Emily Davis", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:5, name: "Alex Anderson", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:6, name: "Sarah Thompson", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:7, name: "Ryan Clark", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:8, name: "Olivia Baker", allignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7},
          { id:9, name: "Daniel Wright", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:10, name: "Sophia Rodriguez", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:11, name: "Matthew Evans", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:12, name: "Ava Turner", allignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7},
          { id:13, name: "William Harris", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:14, name: "Chloe Adams", allignment: "heel", popularity: 0,inRingSkill:0, charisma: "menacing", relationship: 0,tags:[],company:'WWE',bookerRelationship:7 },
          { id:15, name: "Ethan King", allignment: "heel", popularity: 0, inRingSkill:0,charisma: "menacing", relationship: 0 ,tags:[],company:'WWE',bookerRelationship:7}
        ],
        currentFeuds: [{
                       faceId:[2], 
                       heelId:[3],
                       intensity:0,
                       timeRemaining:5,
                        requirementsMet:0.4,
                        requiremants:{
allignment:'face',
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
allignment:'face',
popularity:5,
charisma:'menacing',
relationship:{
relationshipID:1,
relationshipRequirement:5
}
        }}]
      }, charisma: {
      type: String,
      default: "comedic",
    },
    }
    ,
    location: String,
   
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;