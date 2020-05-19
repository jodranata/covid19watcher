import React, { memo } from 'react';
import './style/Overview.css';

const Overview = () => {
  return (
    <div className="overview-container">
      <span>COVID-19 </span>
      is the infectious disease caused by the most recently discovered
      coronavirus. This new virus and disease were unknown before the outbreak
      began in Wuhan, China, in December 2019. COVID-19 is now a pandemic
      affecting many countries globally.
      <br />
      <br />
      The most common symptoms of COVID-19 are fever, dry cough, and tiredness.
      Other symptoms that are less common and may affect some patients include
      aches and pains, nasal congestion, headache, conjunctivitis, sore throat,
      diarrhea, loss of taste or smell or a rash on skin or discoloration of
      fingers or toes. These symptoms are usually mild and begin gradually. Some
      people become infected but only have very mild symptoms. Visit&nbsp;
      <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">
        WHO
      </a>
      &nbsp;for more information
    </div>
  );
};

export default memo(Overview);
