import { useEffect, useState } from 'react'
import './Inspiration.css'

function Inspiration() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [loadMoreError, setLoadMoreError] = useState('')
  const [activeQuery, setActiveQuery] = useState('living room')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('marieSFavorites')) || []
    } catch {
      return []
    }
  })

  const [showFavorites, setShowFavorites] = useState(false)

  const categories = [
    'All',
    'Living Room',
    'Bedroom',
    'Kitchen',
    'Dining Room',
    'Minimalist',
  ]

  // Save favorites in local storage
  useEffect(() => {
    localStorage.setItem('marieSFavorites', JSON.stringify(favorites))
  }, [favorites])

  // Load the first page whenever the search or category changes
  useEffect(() => {
    const controller = new AbortController()

    async function fetchPhotos() {
      setLoading(true)
      setError('')
      setLoadMoreError('')
      setPhotos([])
      setCurrentPage(1)
      setTotalPages(1)

      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(activeQuery)}&page=1`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Unable to load inspiration photos.')
        }

        const data = await response.json()

        setPhotos(data.photos || [])
        setCurrentPage(data.page || 1)
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('We couldn’t load the photos. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [activeQuery])

  // Load the next page and add those photos to the existing grid
  async function handleLoadMore() {
    if (loadingMore || currentPage >= totalPages) return

    setLoadingMore(true)
    setLoadMoreError('')

    try {
      const nextPage = currentPage + 1

      const response = await fetch(
        `/api/search?query=${encodeURIComponent(activeQuery)}&page=${nextPage}`
      )

      if (!response.ok) {
        throw new Error('Unable to load more photos.')
      }

      const data = await response.json()

      setPhotos((currentPhotos) => [
        ...currentPhotos,
        ...(data.photos || []),
      ])

      setCurrentPage(data.page || nextPage)
      setTotalPages(data.totalPages || totalPages)
    } catch {
      setLoadMoreError('We couldn’t load more photos. Please try again.')
    } finally {
      setLoadingMore(false)
    }
  }

  // Add or remove a favorite
  function toggleFavorite(photo) {
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (favorite) => favorite.id === photo.id
      )

      if (alreadySaved) {
        return currentFavorites.filter(
          (favorite) => favorite.id !== photo.id
        )
      }

      return [...currentFavorites, photo]
    })
  }

  // Search photos
  function handleSearch(event) {
    event.preventDefault()

    const query = searchTerm.trim()

    setShowFavorites(false)
    setSelectedCategory('All')
    setActiveQuery(query || 'interior design')
  }

  // Change inspiration category
  function handleCategoryChange(category) {
    setShowFavorites(false)
    setSelectedCategory(category)
    setSearchTerm('')

    const categoryQueries = {
      All: 'interior design',
      'Living Room': 'living room interior design',
      Bedroom: 'bedroom interior design',
      Kitchen: 'kitchen interior design',
      'Dining Room': 'dining room interior design',
      Minimalist: 'minimalist interior design',
    }

    setActiveQuery(categoryQueries[category])
  }

  const displayedPhotos = showFavorites ? favorites : photos

  return (
    <main className="inspiration-page">
      <div className="inspiration-container">
        <section className="inspiration-heading">
          <p className="inspiration-eyebrow">Find your inspiration</p>
          <h1>The Inspiration Edit</h1>
          <p>
            Explore thoughtful spaces, beautiful details, and ideas
            to help you create a home that feels like you.
          </p>
        </section>

        <form className="inspiration-search" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search rooms, styles, and ideas..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search inspiration"
          />
          <button type="submit">Search</button>
        </form>

        <div className="favorites-toolbar">
          <button
            type="button"
            className={
              showFavorites
                ? 'favorites-toggle active'
                : 'favorites-toggle'
            }
            onClick={() => setShowFavorites(!showFavorites)}
          >
            <span className="toggle-heart">♥</span> Saved Favorites ({favorites.length})
          </button>
        </div>

        {!showFavorites && (
          <section
            className="category-filters"
            aria-label="Inspiration categories"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category
                    ? 'category-button active'
                    : 'category-button'
                }
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </section>
        )}

        {loading && !showFavorites && (
          <p className="inspiration-message" role="status">
            Finding beautiful spaces for you...
          </p>
        )}

        {error && !showFavorites && (
          <p className="inspiration-message inspiration-error" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && !showFavorites && (
          <>
            <section className="inspiration-grid">
              {displayedPhotos.length > 0 ? (
                displayedPhotos.map((photo) => {
                  const isFavorite = favorites.some(
                    (favorite) => favorite.id === photo.id
                  )

                  return (
                    <article className="inspiration-card" key={photo.id}>
                      <div className="inspiration-photo-wrapper">
                        <a
                          className="inspiration-photo-link"
                          href={photo.photoUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="View original photo on Unsplash"
                        >
                          <img
                            className="inspiration-image"
                            src={photo.imageUrl}
                            alt={photo.description || 'Interior design inspiration'}
                            loading="lazy"
                          />
                        </a>

                        <button
                          type="button"
                          className={
                            isFavorite
                              ? 'favorite-heart saved'
                              : 'favorite-heart'
                          }
                          onClick={() => toggleFavorite(photo)}
                          aria-label={
                            isFavorite
                              ? 'Remove from favorites'
                              : 'Save to favorites'
                          }
                        >
                          {isFavorite ? '♥' : '♡'}
                        </button>
                      </div>

                      <div className="inspiration-card-content">
                        <p>
                          {selectedCategory === 'All'
                            ? 'Interior Inspiration'
                            : selectedCategory}
                        </p>

                        <h2>
                          {photo.description || 'A beautiful space to inspire you'}
                        </h2>

                        <span className="photographer-credit">
                          Photo by{' '}
                          <a
                            href={photo.photographerUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {photo.photographer}
                          </a>
                          {' '}on{' '}
                          <a
                            href={photo.photoUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Unsplash
                          </a>
                        </span>
                      </div>
                    </article>
                  )
                })
              ) : (
                <p className="inspiration-message">
                  No inspiration photos found. Try another search.
                </p>
              )}
            </section>

            {photos.length > 0 && currentPage < totalPages && (
              <div className="load-more-container">
                <button
                  type="button"
                  className="load-more-button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? 'Loading more photos...' : 'Load More Photos'}
                </button>
              </div>
            )}

            {loadMoreError && (
              <p className="inspiration-message inspiration-error" role="alert">
                {loadMoreError}
              </p>
            )}
          </>
        )}

        {showFavorites && (
          <section className="inspiration-grid">
            {favorites.length > 0 ? (
              favorites.map((photo) => (
                <article className="inspiration-card" key={photo.id}>
                  <div className="inspiration-photo-wrapper">
                    <a
                      className="inspiration-photo-link"
                      href={photo.photoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        className="inspiration-image"
                        src={photo.imageUrl}
                        alt={photo.description || 'Saved interior inspiration'}
                        loading="lazy"
                      />
                    </a>

                    <button
                      type="button"
                      className="favorite-heart saved"
                      onClick={() => toggleFavorite(photo)}
                      aria-label="Remove from favorites"
                    >
                      ♥
                    </button>
                  </div>

                  <div className="inspiration-card-content">
                    <p>Saved Inspiration</p>
                    <h2>
                      {photo.description || 'A beautiful space to inspire you'}
                    </h2>

                    <span className="photographer-credit">
                      Photo by{' '}
                      <a
                        href={photo.photographerUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {photo.photographer}
                      </a>
                      {' '}on{' '}
                      <a
                        href={photo.photoUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Unsplash
                      </a>
                    </span>
                  </div>
                </article>
              ))
            ) : (
              <p className="inspiration-message">
                You haven't saved any favorites yet. Tap a heart on a photo
                to add it to your collection!
              </p>
            )}
          </section>
        )}
      </div>
    </main>
  )
}

export default Inspiration
