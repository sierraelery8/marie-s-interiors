import { Link, useParams } from 'react-router-dom'
import { useProjects } from '../contexts/ProjectContext'
import './ProjectDetails.css'

function ProjectDetails() {
  const { projectId } = useParams()
  const { projects, updateProject } = useProjects()

  const project = projects.find(
    (item) => item.id === projectId
  )

  const moodBoards = (() => {
    try {
      return JSON.parse(localStorage.getItem('marieMoodBoards')) || []
    } catch {
      return []
    }
  })()

  const moodBoard = moodBoards.find(
    (board) => board.id === project?.linkedMoodBoardId
  )

  const design = moodBoard || project?.designSelections

  const colorValues = {
    'Warm Ivory': '#eee7d8',
    'Soft Sage': '#b9c6ad',
    'Dusty Rose': '#d8b9b2',
    'Warm Taupe': '#b6a38e',
    'Slate Blue': '#9baab2',
  }

  if (!project) {
    return (
      <main className="project-details-page">
        <div className="project-details-container project-not-found">
          <h1>Project Not Found</h1>
          <p>We couldn't find the project you're looking for.</p>
          <Link to="/projects" className="view-project-link">
            Return to My Projects
          </Link>
        </div>
      </main>
    )
  }

  const progress = Number(project.progress) || 0
  const statusClass = project.status.toLowerCase().replace(' ', '-')

  function handleProgressChange(event) {
    updateProject(project.id, {
      progress: Number(event.target.value),
    })
  }

  function handleStatusChange(event) {
    updateProject(project.id, {
      status: event.target.value,
    })
  }

  function handleNotesChange(event) {
    updateProject(project.id, {
      projectNotes: event.target.value,
    })
  }

  const timelineStages = [
    {
      title: 'Initial Planning',
      description: 'Project goals and ideas',
      threshold: 0,
    },
    {
      title: 'Design Development',
      description: 'Layouts, colors, and materials',
      threshold: 25,
    },
    {
      title: 'Final Selections',
      description: 'Furniture and finishing touches',
      threshold: 75,
    },
    {
      title: 'Project Completion',
      description: project.timeline,
      threshold: 100,
    },
  ]

  return (
    <main className="project-details-page">
      <div className="project-details-container">
        <Link to="/projects" className="back-to-projects">
          ← Back to My Projects
        </Link>

        <section className="project-details-header">
          <div>
            <p className="project-details-eyebrow">{project.room}</p>
            <h1>{project.name}</h1>
            <p className="project-details-subtitle">
              {project.description}
            </p>
          </div>

          <span className={`details-status ${statusClass}`}>
            {project.status}
          </span>
        </section>

        <section className="details-progress-panel">
          <div className="details-progress-top">
            <h2>Project Progress</h2>
            <strong>{progress}%</strong>
          </div>

          <div
            className="details-progress-track"
            role="progressbar"
            aria-label="Project progress"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="details-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="progress-editor">
            <label htmlFor="project-progress">
              Update your progress
            </label>

            <input
              id="project-progress"
              type="range"
              min="0"
              max="100"
              step="5"
              value={progress}
              onChange={handleProgressChange}
            />

            <div className="progress-slider-labels">
              <span>Just Started</span>
              <span>Almost There</span>
              <span>Complete</span>
            </div>
          </div>
        </section>

        <div className="details-grid">
          <div>
            <section className="details-panel">
              <h2>Project Timeline</h2>

              <div className="project-timeline-list">
                {timelineStages.map((stage) => {
                  const isComplete = progress >= stage.threshold

                  return (
                    <div className="timeline-item" key={stage.title}>
                      <span
                        className={
                          isComplete
                            ? 'timeline-dot timeline-complete'
                            : 'timeline-dot'
                        }
                      />

                      <div>
                        <strong>{stage.title}</strong>
                        <span>{stage.description}</span>
                        <span className="timeline-status">
                          {isComplete ? 'Completed' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="details-panel">
              <h2>Design Selections</h2>

              {design ? (
                <div className="connected-design">
                  <p className="connected-design-label">
                    Connected Mood Board
                  </p>

                  <h3>{design.roomName}</h3>

                  <div className="connected-color">
                    <span
                      className="connected-color-swatch"
                      style={{
                        backgroundColor:
                          colorValues[design.selectedColor] ||
                          design.selectedColor ||
                          '#eee7d8',
                      }}
                    />

                    <div>
                      <strong>Color Palette</strong>
                      <span>{design.selectedColor || 'Not selected'}</span>
                    </div>
                  </div>

                  <div className="connected-materials">
                    <strong>Selected Materials</strong>

                    {design.selectedMaterials?.length > 0 ? (
                      <div className="selected-material-tags">
                        {design.selectedMaterials.map((material, index) => (
                          <span
                            className="material-tag"
                            key={`${material}-${index}`}
                          >
                            {material}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p>No materials selected yet.</p>
                    )}
                  </div>

                  {design.roomNotes && (
                    <div className="connected-design-notes">
                      <strong>Design Notes</strong>
                      <p>{design.roomNotes}</p>
                    </div>
                  )}

                  <Link
                    to="/room-designer"
                    className="edit-mood-board-link"
                  >
                    Edit in Room Designer →
                  </Link>
                </div>
              ) : (
                <div className="no-connected-design">
                  <p>
                    No mood board has been connected to this project yet.
                  </p>

                  <Link
                    to="/room-designer"
                    className="edit-mood-board-link"
                  >
                    Create a Mood Board →
                  </Link>
                </div>
              )}
            </section>

            <section className="details-panel">
              <h2>My Project Notes</h2>

              <p className="notes-description">
                Keep your ideas, reminders, and design updates in one place.
              </p>

              <textarea
                className="project-notes-input"
                placeholder="Write your design ideas, reminders, or updates here..."
                value={project.projectNotes || ''}
                onChange={handleNotesChange}
                aria-label="Project notes"
              />

              <p className="notes-saved-message">
                <span>✓</span> Your notes save automatically.
              </p>
            </section>
          </div>

          <aside>
            <section className="details-panel">
              <h2>Project Overview</h2>

              <p><strong>Room:</strong> {project.room}</p>
              <p><strong>Timeline:</strong> {project.timeline}</p>

              <div className="status-editor">
                <label htmlFor="project-status-update">
                  Update Project Status
                </label>

                <select
                  id="project-status-update"
                  value={project.status}
                  onChange={handleStatusChange}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </section>

            <section className="details-panel">
              <h2>Note from Your Designer</h2>

              <div className="designer-note">
                {project.designerNote}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default ProjectDetails
