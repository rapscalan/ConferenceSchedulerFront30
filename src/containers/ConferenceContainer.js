import React, { useState, useEffect } from 'react';
import { postPresentation, getPresentations } from '../services/conferenceapi';

//const presentations = require('../../data/conferenceData.json');

const ConferenceContainer = () => {
  const [presenter, setPresenter] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [timeSlot, setTimeSlot] = useState(0);
  const [presentations, setPresentations] = useState([]);

  const handleSubmit = () => {
    event.preventDefault();
    postPresentation({
      presenter: presenter,
      title: title,
      description: description,
      isScheduled: true
    });
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
  presentationElements.map((el2, i) => {
    
    const schedulePresentation = presentations.find(p => p.timeSlot === i + 1);
    if(schedulePresentation) {
      el2.title = schedulePresentation.title;
      el2.presenter = schedulePresentation.presenter;
      el2.description = schedulePresentation.description;
      el2.isScheduled = schedulePresentation.isScheduled;
      el2.timeSlot = schedulePresentation.timeSlot;
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
          <p>{el.timeSlot}</p>
        </div>
      </li>
    );
  });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title of Presentation" value={title} onChange={(event) => setTitle(event.target.value)} />
        <input type="text" placeholder="presenter" value={presenter} onChange={(event) => setPresenter(event.target.value)} />
        <input type="text" placeholder="description of presentation" value={description} onChange={(event) => setDescription(event.target.value)} />
        <br />
        <label htmlFor="timeSlot">Choose a Presentation Time:</label>
        <select name="timeSlot" id="time" required onChange={(event) => setTimeSlot(event.target.value)}>
          <option value="1">9:00 - 9:55</option>
          <option value="2">10:00 - 10:55</option>
          <option value="3">11:00 - 11:55</option>
          <option value="4">1:00 - 1:55</option>
          <option value="5">2:00 - 2:55</option>
          <option value="6">3:00 - 3:55</option>
        </select>
        <button>Submit</button>
      </form>
      <ul>
        {presentationElements2}
      </ul>
    </>
  );
};

export default ConferenceContainer;
