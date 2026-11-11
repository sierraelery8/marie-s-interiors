import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProjectProvider } from '../contexts/ProjectContext'
import Projects from './Projects'

function renderProjects() {
  return render(
    <MemoryRouter>
      <ProjectProvider>
        <Projects />
      </ProjectProvider>
    </MemoryRouter>
  )
}

describe('Projects Page', () => {
  it('displays the Projects page heading', () => {
    renderProjects()

    expect(
      screen.getByRole('heading', { name: /projects/i })
    ).toBeInTheDocument()
  })

  it('displays existing projects', () => {
    renderProjects()

    expect(
      screen.getByText(/the living room refresh/i)
    ).toBeInTheDocument()

    expect(
      screen.getByText(/a peaceful bedroom/i)
    ).toBeInTheDocument()
  })

  it('displays the new project button', () => {
    renderProjects()

    expect(
      screen.getByRole('button', { name: /new project/i })
    ).toBeInTheDocument()
  })
})
