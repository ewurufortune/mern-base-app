

// Function to calculate the average of .relationship in the wrestlers array
function calculateAverageRelationship(wrestlers) {
    if (wrestlers.length === 0) return 0;
  
    const totalRelationship = wrestlers.reduce((sum, wrestler) => sum + wrestler.relationship, 0);
    return totalRelationship / wrestlers.length;
  }
  


  export function getDifferencesAndParameters(player, currentStoryline, wrestlers) {
    const differencesAndParameters = [];
  
    // Calculate the average relationship of wrestlers
    const averageRelationship = calculateAverageRelationship(wrestlers);
  
    // Helper function to check if a value is lower than a threshold
    const isLower = (value, threshold) => value < threshold;
  
    // Add differences and parameters to the list based on the provided conditions
    differencesAndParameters.push({
      popularity: isLower(player.popularity, 4) ? 'Low' : 'High'
    });
  
    differencesAndParameters.push({
      inRingSkill: isLower(player.inRingSkill, 6) ? 'Low' : 'High'
    });
  
    differencesAndParameters.push({
      feudLength: isLower(currentStoryline.length, 2) ? 'Low' : 'High'
    });
  
    differencesAndParameters.push({
      lockerroomReputation: isLower(averageRelationship, 4) ? 'Low' : 'High'
    });
  
    return differencesAndParameters;
  }
  
  



  export function calculateStatChange(differencesAndParameters, stat, increaseValue, decreaseValue, isHighGood) {
    const statInfo = differencesAndParameters.find(item => item[stat]);
    if (!statInfo) return 0; // Return 0 if the stat is not found in differencesAndParameters
    const difference = statInfo[stat];
  
    let statChange = 0;
    let message = '';
  
    if (difference === 'High' || difference === 'Low') {
      if ((difference === 'High' && isHighGood) || (difference === 'Low' && !isHighGood)) {
        statChange = increaseValue;
      } else {
        statChange = decreaseValue;
      }
  
      message = `Your ${stat} has ${statChange >= 0 ? 'increased' : 'decreased'} by ${Math.abs(statChange)}.`;
    }
  
    return{ message:message,statChange:statChange};
  }
  
  
  
  




  