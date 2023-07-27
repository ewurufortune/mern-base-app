import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { setCurrentCompany } from "state";

const canJoinCompany = (playerCompany, player, companies) => {
  const targetCompanies = companies.filter((company) => company.name !== playerCompany);


  const canJoinCompanies = [];
  targetCompanies.forEach((targetCompany) => {
    const {
        id,
      preferredCharisma,
      inRingBenchmark,
      popularityBenchmark,
      bookerOpinion,
    } = targetCompany;

    if (
        player.currentCompany.id !==  id &&
      player.charisma === preferredCharisma &&
      player.inRingSkill >= inRingBenchmark &&
      player.popularity >= popularityBenchmark &&
      bookerOpinion > 4
    ) {
      canJoinCompanies.push(targetCompany);
    }
  });
console.log(canJoinCompanies);
  return canJoinCompanies;
};

const JoinCompanyButton = ({ companies }) => {
  const playerCompany = useSelector((state) => state.user.currentCompany);
  const player = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleJoinCompany = (company) => {
   
    dispatch(setCurrentCompany(company));
    // Handle the logic for joining the company
    console.log(`Joining ${company.name}`);
  };

  const eligibleCompanies = canJoinCompany(playerCompany, player, companies);

  const buttons = eligibleCompanies.map((company) => (
    <button key={company.id} onClick={() => handleJoinCompany(company)}>
      Join {company.name}
    </button>
  ));

  return <div>{buttons}</div>;
};

export default JoinCompanyButton;
