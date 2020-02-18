import React, { useState, useEffect } from 'react';
import { getPresentations } from '../services/conferenceapi';

//const presentations = require('../../data/conferenceData.json');
const TimeSlotEnum = { 1:'9:00 - 9:55', 2:'10:00 - 10:55', 3:'11:00 - 11:55', 4:'1:00 - 1:55',
  5: '2:00 - 2:55', 6: '3:00 - 3:55' };
Object.freeze(TimeSlotEnum);

const ConferenceContainer = () => {
  

  const handleSubmit = () => {
    event.preventDefault();
    
    getPresentations()
      .then(results => {
        console.log(results);
        setPresentations(results);
      });
  };

  useEffect(() => {
    console.log('render');
  }, [presentations]);

  let presentationElements = [];
  for(let i = 0; i < 6; i++) {
    presentationElements.push(
      {
        title: 'Open time slot',
        presenter: 'no presenter',
        description: '',
        isScheduled: false,
        timeSlot: i
      }
    );
  }
  //presentations.forEach(el => console.log(el));
  presentationElements.map((el2, i) => {
    
    //const schedulePresentation = presentations.find(p => p.timeSlot === i + 1);
    const schedulePresentation = presentations[i];
    if(schedulePresentation) {
      el2.title = schedulePresentation.title;
      el2.presenter = schedulePresentation.presenter;
      el2.description = schedulePresentation.description;
      el2.isScheduled = schedulePresentation.isScheduled;
      el2.timeSlot = i + 1;
      //el2.timeSlot = schedulePresentation.timeSlot;
    }
    return el2;
  });

  const presentationElements2 = presentationElements.map((el, i) => {
    return (
      <li key={i}>
        {/* <Link to={`/albums/${el.id}/${el.name}`}>
          <ListItem name={el.name} />
        </Link> */}
        <div>
          <h2>{el.title}</h2>
          <p>{el.presenter}</p>
          <p>{el.description}</p>
          <p>{el.isScheduled}</p>
          <p>{TimeSlotEnum[el.timeSlot]}</p>
          
        </div>
      </li>
    );
  });
  return (
    <>
      
      <ul>
        {presentationElements2}
      </ul>
    </>
  );
};

export default ConferenceContainer;
