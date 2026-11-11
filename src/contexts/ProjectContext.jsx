import { createContext, useContext, useState } from 'react'

const ProjectContext = createContext()

const initialProjects = [
  {
    id: '1',
    name: 'The Living Room Refresh',
    room: 'Living Room',
    status: 'In Progress',
    progress: 65,
    description: 'A warm, inviting space with natural textures and thoughtful details.',
    timeline: 'October - December 2026',
    designerNote: 'The design direction is coming together beautifully. We are finalizing the furniture selections.',
  },
  {
    id: '2',
    name: 'A Peaceful Bedroom',
    room: 'Bedroom',
    status: 'Planning',
    progress: 25,
    description: 'A calming bedroom retreat with soft colors and cozy finishes.',
    timeline: 'November 2026 - January 2027',
    designerNote: 'We are currently exploring color palettes and material options for your bedroom.',
  },
  {
    id: '3',
    name: 'The Modern Kitchen',
    room: 'Kitchen',
    status: 'Completed',
    progress: 100,
    description: 'A functional kitchen with a clean look and timeless finishes.',
    timeline: 'June - September 2026',
    designerNote: 'Your kitchen project is complete! We hope you love your new space.',
  },
]

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('marieProjects')
      return savedProjects ? JSON.parse(savedProjects) : initialProjects
    } catch {
      return initialProjects
    }
  })

  function addProject(project) {
    const newProject = {
      ...project,
      id: Date.now().toString(),
      status: 'Planning',
      progress: 0,
      description: project.description || 'A new interior design project.',
      timeline: 'To be determined',
      designerNote: 'Your project is getting started!',
      projectNotes: '',
    }

    setProjects((currentProjects) => {
      const updatedProjects = [...currentProjects, newProject]
      localStorage.setItem('marieProjects', JSON.stringify(updatedProjects))
      return updatedProjects
    })
  }

  function updateProject(projectId, updates) {
    setProjects((currentProjects) => {
      const updatedProjects = currentProjects.map((project) =>
        project.id === projectId
          ? { ...project, ...updates }
          : project
      )

      localStorage.setItem('marieProjects', JSON.stringify(updatedProjects))
      return updatedProjects
    })
  }

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, updateProject }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectContext)
}
