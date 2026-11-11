export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  if (!accessKey) {
    return res.status(500).json({
      error: 'Unsplash API key is not configured.',
    })
  }

  const query = req.query.query || 'interior design'
  const requestedPage = Number.parseInt(req.query.page, 10) || 1
  const page = Math.max(1, requestedPage)

  try {
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12&page=${page}`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
          'Accept-Version': 'v1',
        },
      }
    )

    if (!unsplashResponse.ok) {
      return res.status(unsplashResponse.status).json({
        error: 'Unable to retrieve inspiration photos.',
      })
    }

    const data = await unsplashResponse.json()

    const photos = data.results.map((photo) => ({
      id: photo.id,
      description: photo.alt_description || 'Interior design inspiration',
      imageUrl: photo.urls.regular,
      photographer: photo.user.name,
      photographerUsername: photo.user.username,
      photographerUrl: photo.user.links.html,
      photoUrl: photo.links.html,
    }))

    return res.status(200).json({
      photos,
      page,
      totalPages: data.total_pages,
    })
  } catch (error) {
    console.error('Unsplash API error:', error)

    return res.status(500).json({
      error: 'Something went wrong while loading photos.',
    })
  }
}
