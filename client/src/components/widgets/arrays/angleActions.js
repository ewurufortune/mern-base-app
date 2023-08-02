import React from 'react'
import { useSelector } from 'react-redux';

export default function AngleActions() {
    const activeFeud = useSelector((state) => state.user.activeFeud);
    const eventType = useSelector((state) => state.eventType);
    const player = useSelector((state) => state.user);
    
    
    
    const angleActions = [
        {
          text: 'Use worker\'s private dirt',
          action: 'useWorkersPrivateDirt',
          tags:['Egomaniac','Business Minded','Lone Wolf','Get Over'],
          show: true,
          decision:'You air your target dirty laundry.',
          question: 'You have a chance to expose your opponent by using their private dirt. Will you take advantage of this opportunity?'
        },
        {
          text: 'Use worker\'s private dirt',
          action: 'useWorkersPrivateDirt',
          tags:['Egomaniac','Business Minded','Lone Wolf','Get Over'],
          show: activeFeud.storyline.title==='Sacrifice for a Cause',
          decision:'You air your target dirty laundry.',
          question: 'You have a chance to expose your opponent by using their private dirt. Will you take advantage of this opportunity?'
        },
        {
          text: 'Try to Dominate target',
          action: 'overshadowWorker',
          tags:['Egomaniac','Business Minded',],
          show: eventType === 'weeklyTv', // Set show to true if eventType is 'weeklyTv'
          question: 'You can try to overshadow your opponent and gain more attention. How do you plan to do it?',
        },
        {
          text: 'Befriend worker',
          action: 'befriendWorker',
          tags:['Egomaniac','Business Minded',],
          show:player.tags?.includes('storyline') && player.tags?.includes('storyline2'),
          question: 'Your fan-favorite status and high-flying abilities could help you befriend the worker. How will you approach them?'
        },
        {
          text: 'Throw promo attack on worker',
          action: 'throwPromoAttack',
          tags:['Egomaniac','Business Minded',],
          show:player.tags?.includes('storyline') && player.tags?.includes('storyline2'),
          question: 'Your storyline as an underdog opens an opportunity to throw a promo attack. How will you cut your promo?'
        },
        {
          text: 'Form tag team with worker',
          action: 'formTagTeam',
          tags:['Egomaniac','Business Minded',],
          show: activeFeud.tags?.some(tag => tag === 'The Dominators'),
          question: 'Your rivalry with The Dominators presents a chance to form a tag team with the worker. Will you take this path?'
        },
        {
          text: 'Challenge worker to a match',
          action: 'challengeWorker',
          tags:['Egomaniac','Business Minded',],
          show: activeFeud.tags?.some(tag => tag?.championship === 'Heavy Weight' || tag.billing === 'main event'),
          question: 'Your opportunity for a Heavy Weight Championship match or main event billing allows you to challenge the worker. Will you do it?'
        }
        // Add more actions as needed
      ];
  return (
  {angleActions}
  )
}
