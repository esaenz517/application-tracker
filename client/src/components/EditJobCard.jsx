import { useState } from "react";
import axios from 'axios';
import './css/EditJobCard.css';

{/* Function for editing an applicaiton */}
export default function EditJobForm({ job, onSave, onCancel, onJobEdited}) {
  const [form, setForm] = useState(job);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSave = async (e) => {
    e.preventDefault(); //Prevent page reload
    onSave(form);
    try {
      const response = await axios.put(`http://localhost:3001/api/${form.id}`, form);
      console.log("Job updated!");

      if(onSave) onSave(response.data)
      // Trigger refresh in parent
      if (onJobEdited) onJobEdited();
    } catch (err) {
      console.error("Error adding job:", err);
    }
  };


  return (
    <form onSubmit={handleSave}>
      <div className="edit-container">
        <div className="edit-content">
          <div className="edit-title">Edit Application</div>
          <div className="edit-line">
            <strong>Title:</strong>
            <input className="edit-input"
              type="text"
              name="title"
              value={form.title}
              placeholder="Job Title"
              onChange={handleChange}
            />
          </div>
          <div className="edit-line">
            <strong>Company:</strong>
            <input className="edit-input"
              type="text"
              name="company"
              value={form.company}
              placeholder="Company"
              onChange={handleChange}
            />
          </div>
          <div className="edit-line">
            <strong>Location:</strong>
            <input className="edit-input"
              type="text"
              name="location"
              value={form.location}
              placeholder="Location"
              onChange={handleChange}
            />
          </div>
          <div className="edit-line">
            <strong>Notes:</strong>
            <input className="edit-input"
              type="text"
              name="notes"
              value={form.notes}
              placeholder="Notes"
              onChange={handleChange}
            />
          </div>
          <div className="edit-line">
            <strong>Status:</strong>
            <select
            className="edit-drop"
            name="status"
            value={form.status}
            onChange={handleChange}
            >
              <option value="⏳ Pending">⏳ Pending</option>
              <option value="🔎 Reviewing">🔎 Reviewing</option>
              <option value="✅ Accepted">✅ Accepted</option>
              <option value="❌ Rejected">❌ Rejected</option>
              <option value="👻 Ghosted">👻 Ghosted</option>
            </select>
          </div>
          <input className="no-display"
            type="text"
            name="id"
            value={form.id}
            placeholder="id"
            onChange={handleChange}
          />

          <input className="no-display"
            type="text"
            name="link"
            value={form.link}
            placeholder="link"
            onChange={handleChange}
          />

          <input className="no-display"
            type="text"
            name="dateApplied"
            value={form.dateApplied}
            placeholder="dateApplied"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-save btn-primary">Save</button>
        <button type="button" onClick={onCancel} className="btn-cancel btn-primary">Cancel</button>
      </div>
    </form>
  );
}



