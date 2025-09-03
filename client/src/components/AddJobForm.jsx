import { useState } from "react";
import axios from 'axios';
import './css/AddJobForm.css';

{/* Function for adding a new application */}
function AddJobForm({ onJobAdded }) {
  const initialForm = () => ({
    id: Math.floor(1000 + Math.random() * 9000),
    title: "",
    company: "",
    location: "",
    status: "⏳ Pending",
    dateApplied: new Date().toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                                }),
    notes: "",
    link: "",
  });

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api', form);
      const newJob = response.data;

      // Trigger refresh in parent
      if (onJobAdded) onJobAdded(newJob);
      setForm(initialForm());
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            name="link"
            value={form.link}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="notes">Job Description / Notes</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Job requirements, benefits, interview notes, etc."
          value={form.notes}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Application
      </button>
    </form>
  );
}

export default AddJobForm