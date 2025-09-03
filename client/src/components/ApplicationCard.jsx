import "./css/ApplicationCard.css"
import EditJobForm from './EditJobCard.jsx';

function ApplicationCard({ application, editingJobId, startEdit, saveEdit, cancelEdit, fetchAPI }) {
    return (
        <div className={`application-card ${editingJobId === application.id ? "flipped" : ""}`} data-id={application.id}>
            <div className="card-inner">
              <div className="card-front">
                <div className="card-main">
                  <div className="card-header">
                    <div>
                      <div className="card-title">{application.title}</div>
                      <div className="card-company">{application.company}</div>
                    </div>
                    <button onClick={() => startEdit(application.id)} className="btn-edit btn-primary">Edit</button>
                  </div>
                  <div className="card-details">
                    <div className="card-detail">
                      <strong>Location:</strong> <span>{application.location}</span>
                    </div>
                    <div className="card-detail">
                      <strong>Applied:</strong> <span>{application.dateApplied}</span>
                    </div>
                    <div className="card-detail">
                      <strong>Link:</strong>{' '}
                      <a href={application.link} target="_blank" rel="noopener noreferrer">
                        Click here
                      </a>
                    </div>
                    <div className="card-detail">
                      <strong>Notes:</strong> <span>{application.notes}</span>
                    </div>
                  </div>
                </div>
                {/* Bottom Status Section */}
                <div className={`status-card ${
                    application.status === "✅ Accepted" ? "status-accepted" :
                    application.status === "❌ Rejected" ? "status-rejected" :
                    application.status === "👻 Ghosted" ? "status-ghosted" :
                    application.status === "🔎 Reviewing" ? "status-reviewing" :
                    application.status === "⏳ Pending" ? "status-pending" :
                    "status-default"
                  }`}>
                  
                  <div className="status-text">{application.status}</div>
                  
                  <div className="status-subtext">
                    Application Status
                  </div>
                </div>
              </div>
              {/*Back Card*/}
              <div className="card-back">
                 <EditJobForm job={application} onSave={saveEdit} onCancel={cancelEdit} onJobEdited={fetchAPI}/>
              </div>
            </div>
        </div>
    )
}

export default ApplicationCard