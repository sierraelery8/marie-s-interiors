import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProjectProvider } from '../contexts/ProjectContext'
import ProjectDetails from './ProjectDetails'

function renderProjectDetails() {
  return render(
    <MemoryRouter initialEntries={['/projects/1']}>
      <ProjectProvider>
        <Routes>
          <Route
            path="/projects/:projectId"
            element={<ProjectDetails />}
          />
        </Routes>
      </ProjectProvider>
    </MemoryRouter>
  )
}

describe('Project Details Page', () => {
  it('displays the project details', () => {
    renderProjectDetails()

    expect(
      screen.getByRole('heading', { name: /the living room refresh/i })
    ).toBeInTheDocument()
  })

  it('displays the project progress', () => {
    renderProjectDetails()

    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  it('displays the project notes section', () => {
    renderProjectDetails()

    expect(
      screen.getByRole('heading', { name: /my project notes/i })
    ).toBeInTheDocument()
  })
})
