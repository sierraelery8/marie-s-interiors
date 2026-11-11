import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const services = [
    {
      number: '01',
      title: 'Full-Service Design',
      description: 'A complete design experience, tailored to your home.',
    },
    {
      number: '02',
      title: 'Room Refresh',
      description: 'A thoughtful new point of view for a space you love.',
    },
    {
      number: '03',
      title: 'Design Consultation',
      description: 'Expert guidance to bring your ideas into focus.',
    },
  ]

  const spaces = [
    {
      title: 'The collected living room',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85',
      alt: 'Warm, elegant living room with neutral furnishings',
    },
    {
      title: 'A softer kind of retreat',
      image:
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85',
      alt: 'Peaceful bedroom with soft neutral decor',
    },
    {
      title: 'The everyday kitchen',
      image:
        'https://images.unsplash.com/photo-1769326541248-5e09a8ace25b?auto=format&fit=crop&w=1000&q=85',
      alt: 'Beautiful modern home and kitchen interior',
    },
    {
      title: 'A moment of calm',
      image:
        'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=85',
      alt: 'Spa-inspired bathroom with natural finishes',
    },
  ]

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content">
          <p className="hero-label">
            Thoughtful spaces. Personal stories.
          </p>

          <h1>
            A home that feels beautifully, entirely you.
          </h1>

          <p className="hero-description">
            Interior design shaped around the way you live —
            from the first idea to the final finishing touch.
          </p>

          <div className="hero-buttons">
            <Link to="/inspiration" className="primary-button">
              Explore our work
            </Link>

            <Link to="/room-designer" className="secondary-button">
              Our design approach
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1744126405308-b7fb2d430e96?auto=format&fit=crop&w=1800&q=90"
            alt="Elegant living room with warm neutral furniture and natural textures"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Design Services */}
      <section className="services-section">
        <span className="section-label">Design Services</span>

        <h2 className="section-heading">
          Considered design, from concept to home.
        </h2>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <p className="service-number">{service.number}</p>

              <h3>{service.title}</h3>

              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Selected Spaces */}
      <section className="selected-section">
        <span className="section-label">Selected Spaces</span>

        <h2 className="section-heading">
          Spaces designed around you.
        </h2>

        <div className="spaces-grid">
          {spaces.map((space) => (
            <article className="space-card" key={space.title}>
              <div className="space-image">
                <img
                  src={space.image}
                  alt={space.alt}
                  loading="lazy"
                />
              </div>

              <h3>{space.title}</h3>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home
