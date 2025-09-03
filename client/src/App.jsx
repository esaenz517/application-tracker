import { useState, useEffect  } from 'react'
import ApplicationCard from './components/ApplicationCard.jsx';
import AddJobForm from './components/AddJobForm.jsx';
import FilterJobForm from './components/FilterJobForm.jsx';
import './App.css'
import axios from "axios"

function App() {
  const [data, setData] = useState([])
  const [editingJobId, setEditingJobId] = useState(null);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:3001/api")
    setData(response.data.applications)
    console.log(response.data.applications);
  }

  const updateJob = async (id, updates) => {
    const response = await fetch(`http://localhost:3001/api/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
    });
    const updateJob = await response.json();
    return updateJob;
  }

  // Start editing a job
  const startEdit = (jobId) => {
    setEditingJobId(jobId);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingJobId(null);
  };

  const saveEdit = async (updatedJob) => {
    try {
      await updateJob(editingJobId, updatedJob);
      await fetchAPI();
      setEditingJobId(null);
    } catch (err) {
      console.error("Failed to save job:", err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="container">
      {/*Header Title*/}
      <div className="header">
          <h1>🎯 Job Application Tracker</h1>
          <p>Track your applications, stay organized, land your dream job!</p>
        </div>

      {/*Adding New Application*/}
      <div className="content">
          <h2 className="add-title">Add New Application</h2>
          <AddJobForm onJobAdded={fetchAPI} />
      </div>

      {/*Filter Applications By Company*/}
      <div className="content">
        <h2 className="add-title">Filter By Company</h2>
        <FilterJobForm fetchAPI={fetchAPI} setData={setData}/>
      </div>

      {/*Displaying Applications*/}
      <div className="content">
        <h2 className="application-title">Total Applications ({data.length})</h2>
        <div className='applications-grid' >
          {data.map((job) => (
                <ApplicationCard key={job.id} application={job} editingJobId={editingJobId} startEdit={startEdit} saveEdit={saveEdit} cancelEdit={cancelEdit} fetchAPI={fetchAPI}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
