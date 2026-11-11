import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFound from './NotFound'

describe('NotFound Page', () => {
  it('displays the 404 heading', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: '404' })
    ).toBeInTheDocument()
  })

  it('displays the page not found message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/couldn't find the page/i)
    ).toBeInTheDocument()
  })

  it('displays a link to return home', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('link', { name: /return home/i })
    ).toHaveAttribute('href', '/')
  })
})
