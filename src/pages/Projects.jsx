import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProjects } from '../contexts/ProjectContext'
import './Projects.css'

const paletteColors = {
  'Warm Ivory': '#eee7d8',
  'Soft Sage': '#b9c6ad',
  'Dusty Rose': '#d8b9b2',
  'Warm Taupe': '#b6a38e',
  'Slate Blue': '#9baab2',
}

function Projects() {
  const { projects, addProject } = useProjects()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    room: 'Living Room',
    description: '',
  })

  const completedProjects = projects.filter(
    (project) => project.status === 'Completed'
  ).length

  const activeProjects = projects.filter(
    (project) => project.status === 'In Progress'
  ).length

  const planningProjects = projects.filter(
    (project) => project.status === 'Planning'
  ).length

  const filteredProjects = projects.filter((project) => {
    const searchValue = searchTerm.toLowerCase()

    const searchMatch =
      (project.name || '').toLowerCase().includes(searchValue) ||
      (project.description || '').toLowerCase().includes(searchValue) ||
      (project.room || '').toLowerCase().includes(searchValue)

    const statusMatch =
      selectedStatus === 'All' || project.status === selectedStatus

    return searchMatch && statusMatch
  })

  function clearFilters() {
    setSearchTerm('')
    setSelectedStatus('All')
  }

  function handleProjectInput(event) {
    const { name, value } = event.target

    setNewProject((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleCreateProject(event) {
    event.preventDefault()

    if (!newProject.name.trim()) return

    addProject({
      name: newProject.name.trim(),
      room: newProject.room,
      description: newProject.description.trim(),
    })

    setNewProject({
      name: '',
      room: 'Living Room',
      description: '',
    })

    setSearchTerm('')
    setSelectedStatus('All')
    setShowProjectForm(false)
  }

  function getDesignColor(design) {
    const color = design?.selectedColor

    if (!color) return null

    if (typeof color === 'object') {
      return {
        name: color.name || color.label || 'Selected color',
        hex: color.hex || color.value || color.color || '#eee7d8',
      }
    }

    return {
      name: color,
      hex: paletteColors[color] || color,
    }
  }

  function getMaterialName(material) {
    if (typeof material === 'string') return material
    return material?.name || material?.label || 'Selected material'
  }

  return (
    <main className="projects-page">
      <div className="projects-container">
        <section className="projects-heading">
          <p className="projects-eyebrow">Your design journey</p>
          <h1>My Projects</h1>
          <p>
            Keep up with your spaces, follow your design progress,
            and explore the details of each project.
          </p>
        </section>

        <section className="projects-summary">
          <article className="summary-card">
            <span>In Progress</span>
            <strong>{activeProjects}</strong>
          </article>

          <article className="summary-card">
            <span>Planning</span>
            <strong>{planningProjects}</strong>
          </article>

          <article className="summary-card">
            <span>Completed</span>
            <strong>{completedProjects}</strong>
          </article>
        </section>

        <section className="projects-list-section">
          <div className="projects-list-top">
            <div>
              <h2 className="projects-list-heading">Your Spaces</h2>
              <p className="projects-results-count">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
            </div>

            <button
              type="button"
              className="new-project-button"
              onClick={() => setShowProjectForm((current) => !current)}
            >
              {showProjectForm ? 'Close Form' : '+ New Project'}
            </button>
          </div>

          {showProjectForm && (
            <form
              className="new-project-form"
              onSubmit={handleCreateProject}
            >
              <div className="new-project-form-heading">
                <p className="projects-eyebrow">A fresh start</p>
                <h3>Create a New Project</h3>
                <p>
                  Tell us a little about the space you'd like to transform.
                </p>
              </div>

              <div className="new-project-fields">
                <div className="new-project-field">
                  <label htmlFor="new-project-name">Project Name</label>
                  <input
                    id="new-project-name"
                    name="name"
                    type="text"
                    placeholder="Example: My Dream Living Room"
                    value={newProject.name}
                    onChange={handleProjectInput}
                    required
                    maxLength={60}
                  />
                </div>

                <div className="new-project-field">
                  <label htmlFor="new-project-room">Room Type</label>
                  <select
                    id="new-project-room"
                    name="room"
                    value={newProject.room}
                    onChange={handleProjectInput}
                  >
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                    <option>Dining Room</option>
                    <option>Home Office</option>
                    <option>Entryway</option>
                    <option>Outdoor Space</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="new-project-field full-width">
                  <label htmlFor="new-project-description">
                    Project Description
                  </label>
                  <textarea
                    id="new-project-description"
                    name="description"
                    placeholder="What would you like this space to look and feel like?"
                    value={newProject.description}
                    onChange={handleProjectInput}
                    rows="3"
                    maxLength={300}
                  />
                </div>
              </div>

              <div className="new-project-form-actions">
                <button
                  type="button"
                  className="cancel-project-button"
                  onClick={() => setShowProjectForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="new-project-submit">
                  Create Project
                </button>
              </div>
            </form>
          )}

          <div className="project-filters">
            <div className="project-search">
              <label htmlFor="project-search">Search projects</label>
              <input
                id="project-search"
                type="search"
                placeholder="Search by name, room, or description..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="project-status-filter">
              <label htmlFor="project-status">Filter by status</label>
              <select
                id="project-status"
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
              >
                <option value="All">All Projects</option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button
              type="button"
              className="clear-project-filters"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project) => {
                const statusClass = (project.status || 'Planning')
                  .toLowerCase()
                  .replace(' ', '-')

                const design = project.designSelections
                const designColor = getDesignColor(design)
                const materials = design?.selectedMaterials || []
                const hasConnectedDesign = Boolean(
                  project.linkedMoodBoardId || design
                )

                return (
                  <article className="project-card" key={project.id}>
                    <div className="project-card-top">
                      <span className="project-room">{project.room}</span>
                      <span className={`project-status ${statusClass}`}>
                        {project.status}
                      </span>
                    </div>

                    <h3>{project.name}</h3>

                    <p className="project-description">
                      {project.description}
                    </p>

                    <div className="project-design-preview">
                      <div className="design-preview-heading">
                        <span>Design Preview</span>
                        <span
                          className={`design-connection ${
                            hasConnectedDesign ? 'is-connected' : ''
                          }`}
                        >
                          <span className="connection-dot" />
                          {hasConnectedDesign
                            ? 'Mood board connected'
                            : 'No mood board yet'}
                        </span>
                      </div>

                      {hasConnectedDesign ? (
                        <div className="design-preview-content">
                          {design?.roomName && (
                            <p className="design-room-name">
                              {design.roomName}
                            </p>
                          )}

                          {designColor && (
                            <div className="design-preview-color">
                              <span
                                className="design-color-swatch"
                                style={{ backgroundColor: designColor.hex }}
                              />
                              <span>{designColor.name}</span>
                            </div>
                          )}

                          {materials.length > 0 && (
                            <div className="design-preview-materials">
                              {materials.map((material, index) => (
                                <span key={`${getMaterialName(material)}-${index}`}>
                                  {getMaterialName(material)}
                                </span>
                              ))}
                            </div>
                          )}

                          {!designColor && materials.length === 0 && (
                            <p className="design-preview-empty">
                              Your mood board is connected. Open the project
                              to explore its design details.
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="design-preview-empty">
                          Create a mood board in Room Designer to see your
                          color and material selections here.
                        </p>
                      )}
                    </div>

                    <div className="progress-heading">
                      <span>Project progress</span>
                      <span>{project.progress || 0}%</span>
                    </div>

                    <div
                      className="progress-track"
                      role="progressbar"
                      aria-label={`${project.name} progress`}
                      aria-valuenow={project.progress || 0}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="progress-fill"
                        style={{ width: `${project.progress || 0}%` }}
                      />
                    </div>

                    <div className="project-card-bottom">
                      <span className="project-timeline">
                        {project.timeline}
                      </span>

                      <Link
                        to={`/projects/${project.id}`}
                        className="view-project-link"
                      >
                        View Details →
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="no-projects-message">
              <h3>No projects found</h3>
              <p>
                Try another search or change your status filter to find
                your projects.
              </p>

              <button
                type="button"
                className="clear-project-filters"
                onClick={clearFilters}
              >
                Show All Projects
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Projects
