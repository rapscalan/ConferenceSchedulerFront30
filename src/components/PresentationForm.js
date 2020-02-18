import React, { useState } from 'react';
import { postPresentation } from '../services/conferenceapi';

const PresentationForm = () => {
  const [presentation, setPresentation] = useState({});
  const [presenter, setPresenter] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [timeSlot, setTimeSlot] = useState(0);
  const [presentations, setPresentations] = useState([]);

  const handleSubmit = event => {
    event.preventDefault();
    console.log(event);
    
    postPresentation({
      presenter: presenter,
      title: title,
      description: description,
      isScheduled: true
    });
  };

  return (
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
  );
};

export default PresentationForm;
