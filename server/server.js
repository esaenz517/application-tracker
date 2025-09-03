const express = require("express")
const app = express();
const cors = require("cors");
const fs = require('fs')
const corsOptions = {
    origin: ["http://localhost:5173"],
}

app.use(cors(corsOptions));
app.use(express.json());

const data = require('./applications.json');

//Method for writing into JSON
function saveToFile() {
    fs.writeFileSync('./applications.json', JSON.stringify(data, null, 2), 'utf8');
}

app.get("/api", (req, res) => {
    res.json(data)
})

{/* Get job by id */}
app.get('/api/:id', (req, res) => {
  const jobId = parseInt(req.params.id, 10);
  const job = data.applications.find(job => job.id === jobId);
    if (job) {
        return res.json(job);
    } else {
        return res.status(404).json({ error: 'Job not found' });
    }
});

{/*Update Job by id */}
app.put("/api/:id", (req, res) => {
  try {
    const jobId = parseInt(req.params.id, 10);
    if (!req.body) throw new Error("Request body missing");
    const jobIndex = data.applications.findIndex(job => job.id === jobId);
    if (jobIndex === -1) return res.status(404).json({ error: "Job not found" });

    Object.keys(req.body).forEach(key => {
      data.applications[jobIndex][key] = req.body[key];
    });
    saveToFile();
    res.json(data.applications[jobIndex]);
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: err.message });
  }
})

{/*Filter Jobs by company */}
app.get("/api/filter/:company", (req, res) => {
    const jobCompany = req.params.company;
    const jobs = data.applications.filter(job => 
      job.company.toLowerCase().includes(jobCompany.toLowerCase())
    )
    return res.json(jobs)
})

{/*Add New Application */}
app.post('/api', (req, res) => {
  const newJob = {
    ...req.body
  };
  data.applications.push(newJob);
  saveToFile();
  return res.status(201).json(newJob);
});

app.listen(3001, () => {
    console.log("Server started on port localhost:3001")
})