import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProjectProvider } from '../contexts/ProjectContext'
import RoomDesigner from './RoomDesigner'

function renderRoomDesigner() {
  return render(
    <ProjectProvider>
      <RoomDesigner />
    </ProjectProvider>
  )
}

describe('Room Designer Page', () => {
  it('displays the Room Designer page', () => {
    renderRoomDesigner()

    expect(
      screen.getByText(/room designer/i)
    ).toBeInTheDocument()
  })

  it('displays the available color palettes', () => {
    renderRoomDesigner()

    expect(
      screen.getByRole('button', { name: /warm ivory/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('button', { name: /soft sage/i })
    ).toBeInTheDocument()
  })

  it('displays the available materials', () => {
    renderRoomDesigner()

    expect(
      screen.getAllByText(/natural linen/i).length
    ).toBeGreaterThan(0)

    expect(
      screen.getAllByText(/light oak/i).length
    ).toBeGreaterThan(0)
  })
})
