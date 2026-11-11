import { useState } from 'react'
import { useProjects } from '../contexts/ProjectContext'
import './RoomDesigner.css'

const colors = [
  { name: 'Warm Ivory', value: '#eee7d8', texture: 'linen' },
  { name: 'Soft Sage', value: '#b9c6ad', texture: 'botanical' },
  { name: 'Dusty Rose', value: '#d8b9b2', texture: 'floral' },
  { name: 'Warm Taupe', value: '#b6a38e', texture: 'woven' },
  { name: 'Slate Blue', value: '#9baab2', texture: 'marble' },
]

const materials = [
  { name: 'Natural Linen', type: 'Soft furnishing' },
  { name: 'Light Oak', type: 'Wood finish' },
  { name: 'Brushed Brass', type: 'Hardware' },
  { name: 'Textured Cotton', type: 'Fabric selection' },
]


const roomInspiration = {
  'Living Room': {
    style: 'Organic Modern',
    description: 'A welcoming mix of natural textures, soft neutrals, and relaxed elegance.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Warm neutral living room',
    fabric: 'Natural linen',
    fabricDescription: 'Soft, breathable upholstery with a relaxed woven texture.',
    oak: 'Natural white oak',
    oakDescription: 'A light, warm wood finish that keeps the space feeling airy.',
    furniture: 'Sculptural boucle sofa',
    furnitureDescription: 'A comfortable statement piece with soft curves and inviting texture.',
    furnitureImage: 'https://www.cielo.mu/188371-large_default/orclan-3-seater-couch-ivory.jpg',
    visuals: {
      fabric: 'repeating-linear-gradient(90deg, rgba(255,255,255,.35) 0 2px, transparent 2px 5px), linear-gradient(135deg, #e9dfd0, #cbbba5)',
      oak: 'repeating-linear-gradient(0deg, transparent 0 8px, rgba(100,65,35,.18) 9px 10px), linear-gradient(90deg, #d6bd98, #b99a70)',
      furniture: 'radial-gradient(ellipse at 50% 75%, #b9a38e 0 35%, transparent 36%), linear-gradient(135deg, #eee7dc, #cfc2b2)'
    },
    palette: [
      { name: 'Warm Ivory', value: '#eee7d8' },
      { name: 'Soft Sage', value: '#b9c6ad' },
      { name: 'Warm Taupe', value: '#b6a38e' },
      { name: 'Natural Sand', value: '#d9c9b4' },
    ],
  },

  Bedroom: {
    style: 'Quiet Luxury',
    description: 'Create a peaceful retreat with layered fabrics, gentle colors, and cozy finishes.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Calm and inviting bedroom',
    fabric: 'Washed cotton and linen',
    fabricDescription: 'Lightweight, breathable layers for a soft and comfortable feel.',
    oak: 'Pale natural oak',
    oakDescription: 'A subtle wood grain that adds warmth without overwhelming the room.',
    furniture: 'Upholstered platform bed',
    furnitureDescription: 'A softly upholstered bed frame with a simple, timeless silhouette.',
    furnitureImage: 'https://lifestandardfurniture.com/cdn/shop/files/IMG-20250926-WA0032.jpg?v=1758885682',
    visuals: {
      fabric: 'repeating-linear-gradient(45deg, rgba(255,255,255,.4) 0 2px, transparent 2px 6px), linear-gradient(135deg, #eee5df, #d6b9b1)',
      oak: 'repeating-linear-gradient(0deg, transparent 0 10px, rgba(120,85,55,.13) 11px 12px), linear-gradient(90deg, #dfcba9, #c6ad8c)',
      furniture: 'radial-gradient(ellipse at 50% 75%, #c6a9a0 0 36%, transparent 37%), linear-gradient(135deg, #f1e9df, #d9c8bc)'
    },
    palette: [
      { name: 'Cream', value: '#f1eadf' },
      { name: 'Dusty Rose', value: '#d8b9b2' },
      { name: 'Warm Taupe', value: '#b6a38e' },
      { name: 'Soft Sage', value: '#b9c6ad' },
    ],
  },

  Kitchen: {
    style: 'Warm Minimalist',
    description: 'Balance clean lines with natural wood, tactile finishes, and warm neutral tones.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Bright kitchen with natural finishes',
    fabric: 'Textured woven upholstery',
    fabricDescription: 'A durable, understated fabric for breakfast seating and soft accents.',
    oak: 'Natural oak cabinetry',
    oakDescription: 'A warm wood finish that brings an organic feel to a clean kitchen design.',
    furniture: 'Curved oak counter stools',
    furnitureDescription: 'Simple, sculptural seating that adds warmth around the kitchen island.',
    furnitureImage: 'https://www.atlanticshopping.co.uk/cdn/shop/files/curve-bar-stool-polished-oak-in-kitchen.jpg?v=1767800526&width=1200',
    visuals: {
      fabric: 'repeating-linear-gradient(90deg, rgba(255,255,255,.3) 0 2px, transparent 2px 5px), linear-gradient(135deg, #d9d2c5, #bcb4a6)',
      oak: 'repeating-linear-gradient(0deg, transparent 0 7px, rgba(105,70,35,.2) 8px 9px), linear-gradient(90deg, #d4b487, #a9875c)',
      furniture: 'linear-gradient(145deg, transparent 35%, #b9976d 36% 65%, transparent 66%), linear-gradient(135deg, #eee8dd, #c9bba6)'
    },
    palette: [
      { name: 'Warm Ivory', value: '#eee7d8' },
      { name: 'Natural Oak', value: '#c6a77c' },
      { name: 'Soft Stone', value: '#c9c3b7' },
      { name: 'Sage', value: '#b9c6ad' },
    ],
  },

  'Dining Room': {
    style: 'Soft Contemporary',
    description: 'A polished but comfortable gathering space with organic shapes and warm finishes.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Elegant dining room',
    fabric: 'Linen-blend upholstery',
    fabricDescription: 'A refined woven fabric for comfortable dining chairs.',
    oak: 'Smoked natural oak',
    oakDescription: 'A deeper wood tone that gives the dining space a grounded, elegant look.',
    furniture: 'Sculptural oval dining table',
    furnitureDescription: 'A softly curved table that creates a beautiful focal point.',
    furnitureImage: 'https://www.alfint.ru/upload/iblock/e2b/d70kjr8sgl8a4f4kjx3qphrkb5zkxvab/OL01_3.png',
    visuals: {
      fabric: 'repeating-linear-gradient(45deg, rgba(255,255,255,.3) 0 2px, transparent 2px 5px), linear-gradient(135deg, #d8cbbd, #b8a795)',
      oak: 'repeating-linear-gradient(0deg, transparent 0 8px, rgba(60,40,25,.2) 9px 10px), linear-gradient(90deg, #9e8062, #735a43)',
      furniture: 'radial-gradient(ellipse at 50% 70%, #987b61 0 38%, transparent 39%), linear-gradient(135deg, #e9e0d5, #c8b8a7)'
    },
    palette: [
      { name: 'Ivory', value: '#eee7d8' },
      { name: 'Warm Taupe', value: '#b6a38e' },
      { name: 'Dusty Rose', value: '#d8b9b2' },
      { name: 'Deep Oak', value: '#8b7158' },
    ],
  },

  Bathroom: {
    style: 'Spa-Inspired Organic',
    description: 'Bring a calm, spa-like feeling home with stone-inspired tones and natural textures.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Serene bathroom',
    fabric: 'Waffle cotton',
    fabricDescription: 'Soft, absorbent cotton with a subtle texture for towels and accessories.',
    oak: 'Light oak vanity finish',
    oakDescription: 'A natural wood accent that softens the look of stone and tile.',
    furniture: 'Floating oak vanity',
    furnitureDescription: 'A clean-lined vanity that keeps the room feeling open and uncluttered.',
    furnitureImage: 'https://cdn.shopify.com/s/files/1/0660/2565/2450/files/minimalist-floating-oak-bathroom-vanity-with-led-mirror.jpg?v=1778828600',
    visuals: {
      fabric: 'repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 3px, transparent 3px 7px), linear-gradient(135deg, #e7e1d7, #c7c2b6)',
      oak: 'repeating-linear-gradient(0deg, transparent 0 9px, rgba(110,75,45,.15) 10px 11px), linear-gradient(90deg, #d9c3a1, #b79b76)',
      furniture: 'linear-gradient(145deg, transparent 30%, #b9a58b 31% 70%, transparent 71%), linear-gradient(135deg, #eeebe3, #c9c4b8)'
    },
    palette: [
      { name: 'Warm Ivory', value: '#eee7d8' },
      { name: 'Soft Stone', value: '#c9c3b7' },
      { name: 'Sage', value: '#b9c6ad' },
      { name: 'Sand', value: '#d9c9b4' },
    ],
  },

  'Home Office': {
    style: 'Calm & Collected',
    description: 'A thoughtful workspace with comfortable details, natural finishes, and a calming palette.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Bright home office',
    fabric: 'Linen upholstery',
    fabricDescription: 'A soft, tailored texture for a comfortable desk chair or reading corner.',
    oak: 'White oak',
    oakDescription: 'A light, versatile finish that pairs beautifully with neutral decor.',
    furniture: 'Streamlined oak writing desk',
    furnitureDescription: 'A functional desk with clean lines and a warm, natural finish.',
    furnitureImage: 'https://images.squarespace-cdn.com/content/v1/582d980bbebafb4e0ab6e7c0/09483723-793f-4d5d-9c25-ee4b947dab83/download%2B%2882%29.png?format=1500w',
    visuals: {
      fabric: 'repeating-linear-gradient(45deg, rgba(255,255,255,.35) 0 2px, transparent 2px 6px), linear-gradient(135deg, #e5e0d6, #b8c1c0)',
      oak: 'repeating-linear-gradient(0deg, transparent 0 8px, rgba(100,70,40,.16) 9px 10px), linear-gradient(90deg, #d7c09c, #b39770)',
      furniture: 'linear-gradient(160deg, transparent 35%, #b69b77 36% 62%, transparent 63%), linear-gradient(135deg, #e9e5dc, #c6c9c3)'
    },
    palette: [
      { name: 'Warm Ivory', value: '#eee7d8' },
      { name: 'Slate Blue', value: '#9baab2' },
      { name: 'Soft Sage', value: '#b9c6ad' },
      { name: 'Warm Taupe', value: '#b6a38e' },
    ],
  },
};


function RoomDesigner() {
  const { projects, updateProject } = useProjects()

  const [savedBoards, setSavedBoards] = useState(() => {
    try {
      const existingBoards = JSON.parse(
        localStorage.getItem('marieMoodBoards')
      )

      if (Array.isArray(existingBoards)) return existingBoards

      const oldBoard = JSON.parse(
        localStorage.getItem('marieMoodBoard')
      )

      const migratedBoards = oldBoard
        ? [{ ...oldBoard, id: oldBoard.id || Date.now() }]
        : []

      localStorage.setItem(
        'marieMoodBoards',
        JSON.stringify(migratedBoards)
      )

      return migratedBoards
    } catch {
      return []
    }
  })

  const initialBoard = savedBoards.length
    ? savedBoards[savedBoards.length - 1]
    : null

  const [selectedColor, setSelectedColor] = useState(
    initialBoard?.selectedColor || 'Warm Ivory'
  )
  const [roomType, setRoomType] = useState(
    initialBoard?.roomType || 'Living Room'
  )
  const [roomName, setRoomName] = useState(
    initialBoard?.roomName || ''
  )
  const [roomNotes, setRoomNotes] = useState(
    initialBoard?.roomNotes || ''
  )
  const [selectedMaterials, setSelectedMaterials] = useState(
    initialBoard?.selectedMaterials || []
  )
  const [activeBoardId, setActiveBoardId] = useState(
    initialBoard?.id || null
  )
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialBoard?.projectId || ''
  )
  const [saved, setSaved] = useState(Boolean(initialBoard))

  const activeColor =
    colors.find(color => color.name === selectedColor)?.value ||
    '#eee7d8'

  const activeColorTexture =
    colors.find(color => color.name === selectedColor)?.texture ||
    'linen'

  const activeInspiration =
    roomInspiration[roomType] || roomInspiration['Living Room']

  function toggleMaterial(materialName) {
    setSelectedMaterials(current =>
      current.includes(materialName)
        ? current.filter(material => material !== materialName)
        : [...current, materialName]
    )
    setSaved(false)
  }

  function handleSave(event) {
    event.preventDefault()

    const finalName = roomName.trim() || `${roomType} Design`
    const boardId = activeBoardId || Date.now()

    const previousBoard = savedBoards.find(
      board => board.id === boardId
    )

    const moodBoard = {
      id: boardId,
      roomName: finalName,
      roomType,
      selectedColor,
      roomNotes,
      selectedMaterials,
      projectId: selectedProjectId || null,
    }

    setRoomName(finalName)

    setSavedBoards(current => {
      const exists = current.some(board => board.id === boardId)

      const updated = exists
        ? current.map(board =>
            board.id === boardId ? moodBoard : board
          )
        : [...current, moodBoard]

      localStorage.setItem('marieMoodBoards', JSON.stringify(updated))
      return updated
    })

    localStorage.setItem('marieMoodBoard', JSON.stringify(moodBoard))

    if (
      previousBoard?.projectId &&
      previousBoard.projectId !== selectedProjectId
    ) {
      const hasAnotherBoard = savedBoards.some(
        board =>
          board.id !== boardId &&
          board.projectId === previousBoard.projectId
      )

      if (!hasAnotherBoard) {
        updateProject(previousBoard.projectId, {
          linkedMoodBoardId: null,
        })
      }
    }

    if (selectedProjectId) {
      updateProject(selectedProjectId, {
        linkedMoodBoardId: boardId,
        designSelections: {
          roomName: finalName,
          roomType,
          selectedColor,
          selectedMaterials,
          roomNotes,
        },
      })
    }

    setActiveBoardId(boardId)
    setSaved(true)
  }

  function loadBoard(board) {
    setRoomName(board.roomName || '')
    setRoomType(board.roomType || 'Living Room')
    setSelectedColor(board.selectedColor || 'Warm Ivory')
    setRoomNotes(board.roomNotes || '')
    setSelectedMaterials(board.selectedMaterials || [])
    setActiveBoardId(board.id)
    setSelectedProjectId(board.projectId || '')
    setSaved(true)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteBoard(boardId) {
    const boardToDelete = savedBoards.find(
      board => board.id === boardId
    )

    setSavedBoards(current => {
      const updated = current.filter(board => board.id !== boardId)
      localStorage.setItem('marieMoodBoards', JSON.stringify(updated))
      return updated
    })

    if (boardToDelete?.projectId) {
      const hasAnotherBoard = savedBoards.some(
        board =>
          board.id !== boardId &&
          board.projectId === boardToDelete.projectId
      )

      if (!hasAnotherBoard) {
        updateProject(boardToDelete.projectId, {
          linkedMoodBoardId: null,
          designSelections: null,
        })
      }
    }

    if (activeBoardId === boardId) {
      setActiveBoardId(null)
      setSelectedProjectId('')
      setSaved(false)
    }
  }

  function startNewDesign() {
    setRoomName('')
    setRoomType('Living Room')
    setSelectedColor('Warm Ivory')
    setRoomNotes('')
    setSelectedMaterials([])
    setActiveBoardId(null)
    setSelectedProjectId('')
    setSaved(false)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

 
return (
  <main className="room-designer-page">
    <div className="room-designer-container">

      <section className="room-designer-heading">
        <p>Your creative space</p>
        <h1>Room Designer</h1>
        <span>
          Bring your ideas together and start creating a space that feels
          entirely your own.
        </span>
      </section>

      <div className="designer-layout">

        {/* LEFT: MAIN DESIGN WORKSPACE */}
        <div className="designer-main">

          <div className="designer-workspace-grid">

            {/* LITTLE INSPIRATION - TOP LEFT */}
            <section className="designer-panel room-inspiration-panel">
              <div className="inspiration-heading">
                <div>
                  <p className="inspiration-eyebrow">
                    A little inspiration
                  </p>
                  <h2>Room Inspiration</h2>
                </div>
                <span className="inspiration-room-label">
                  {roomType}
                </span>
              </div>

              <p className="panel-description">
                A curated starting point for your {roomType.toLowerCase()},
                with finishes and details chosen to bring the look together.
              </p>

              <div className="inspiration-feature">
                <img
                  className="inspiration-image"
                  src={activeInspiration.image}
                  alt={activeInspiration.imageAlt}
                  loading="lazy"
                />

                <div className="inspiration-feature-caption">
                  <span>THE LOOK</span>
                  <h3>{activeInspiration.style}</h3>
                  <p>{activeInspiration.description}</p>
                </div>
              </div>

              <div className="inspiration-details">

                {/* FABRIC SAMPLE */}
                <article className="inspiration-detail-card">
                  <div
                    className="inspiration-sample fabric-sample"
                    style={{
                      background: activeInspiration.visuals.fabric
                    }}
                  >
                    <span />
                  </div>

                  <div className="inspiration-detail-copy">
                    <span className="inspiration-category">
                      FABRIC SAMPLE
                    </span>
                    <h3>{activeInspiration.fabric}</h3>
                    <p>{activeInspiration.fabricDescription}</p>
                  </div>
                </article>

                {/* WOOD FINISH */}
                <article className="inspiration-detail-card">
                  <div
                    className="inspiration-sample oak-sample"
                    style={{
                      background: activeInspiration.visuals.oak
                    }}
                  >
                    <span />
                  </div>

                  <div className="inspiration-detail-copy">
                    <span className="inspiration-category">
                      WOOD FINISH
                    </span>
                    <h3>{activeInspiration.oak}</h3>
                    <p>{activeInspiration.oakDescription}</p>
                  </div>
                </article>

                {/* FURNITURE IDEA */}
                <article className="inspiration-detail-card furniture-inspiration">
                  <div className="furniture-sample">
                    <img
                    src={activeInspiration.furnitureImage}
                    alt={activeInspiration.furniture}
                    loading="lazy"
                    />
                </div>

                <div className="inspiration-detail-copy">
                    <span className="inspiration-category">FURNITURE IDEA</span>
                    <h3>{activeInspiration.furniture}</h3>
                    <p>{activeInspiration.furnitureDescription}</p>
                </div>
            </article>


                {/* COLOR PALETTE */}
                <article className="inspiration-detail-card palette-inspiration">
                  <div className="inspiration-detail-copy">
                    <span className="inspiration-category">
                      COLOR INSPIRATION
                    </span>
                    <h3>A coordinated palette</h3>
                    <p>
                      Soft, complementary tones to guide your design.
                    </p>

                    <div className="inspiration-palette">
                      {activeInspiration.palette.map(color => (
                        <div
                          className="inspiration-palette-color"
                          key={color.name}
                        >
                          <span
                            style={{ backgroundColor: color.value }}
                          />
                          <small>{color.name}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

              </div>
            </section>

            <div className="designer-workspace-stack">


              {/* MOOD BOARD - TOP RIGHT */}
              <section className="designer-panel mood-board-panel">
                <h2>Mood Board</h2>
                <p className="panel-description">
                  A visual collection of your room's colors and materials.
                </p>

                <div className="mood-board">
                  <div
                    className={`mood-board-image mood-board-main color-texture-${activeColorTexture}`}
                    style={{ '--swatch-color': activeColor }}
                  />
                  <div
                    className="mood-board-image mood-board-second"
                    style={{ backgroundColor: '#dce3d7' }}
                  />
                  <div
                    className="mood-board-image mood-board-third"
                    style={{ backgroundColor: '#e8dfd3' }}
                  />
                </div>

                <p className="selected-color-label">
                  Current color palette: <strong>{selectedColor}</strong>
                </p>

                {roomName && (
                  <p className="selected-color-label">
                    Project: <strong>{roomName}</strong>
                  </p>
                )}

                <div className="selected-materials">
                  <p className="selected-color-label">Selected materials:</p>

                  {selectedMaterials.length > 0 ? (
                    <div className="selected-material-tags">
                      {selectedMaterials.map(material => (
                        <span key={material} className="material-tag">
                          {material}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="material-empty">
                      Choose materials to add them to your mood board.
                    </p>
                  )}
                </div>
              </section>

              {/* COLOR STORY - BOTTOM LEFT */}
              <section className="designer-panel color-story-panel">
                <h2>Color Story</h2>
                <p className="panel-description">
                  Choose a color palette for your space.
                </p>

                <div className="color-options">
                  {colors.map(color => (
                    <button
                      key={color.name}
                      type="button"
                      className={
                        selectedColor === color.name
                          ? 'color-option active'
                          : 'color-option'
                      }
                      onClick={() => {
                        setSelectedColor(color.name)
                        setSaved(false)
                      }}
                      aria-pressed={selectedColor === color.name}
                    >
                      <span
                        className={`color-swatch color-texture-${color.texture}`}
                        style={{ '--swatch-color': color.value }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </section>

              {/* SAVED MATERIALS - BOTTOM RIGHT */}
              <section className="designer-panel saved-materials-panel">
                <h2>Saved Materials</h2>
                <p className="panel-description">
                  Select the finishes and textures you'd love to include
                  in your space.
                </p>

                <div className="material-list">
                  {materials.map(material => {
                    const isSelected = selectedMaterials.includes(
                      material.name
                    )

                    return (
                      <button
                        type="button"
                        className={
                          isSelected
                            ? 'material-item selected'
                            : 'material-item'
                        }
                        key={material.name}
                        onClick={() => toggleMaterial(material.name)}
                        aria-pressed={isSelected}
                      >
                        <strong>{material.name}</strong>
                        <span>{material.type}</span>
                        <span className="material-select-label">
                          {isSelected ? '✓ Selected' : '+ Add to mood board'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>

            </div>
          </div>
        </div>

          
{/* RIGHT: DESIGN MANAGEMENT SIDEBAR */}
<aside className="designer-sidebar">

  {/* ROOM DETAILS */}
  <section className="designer-panel room-details-panel">
    <div className="room-details-heading">
      <h2>Room Details</h2>
      <button
        type="button"
        className="new-design-button"
        onClick={startNewDesign}
      >
        + New Design
      </button>
    </div>

    <p className="panel-description">
      Tell us a little about the space you're imagining.
    </p>

    <form className="room-form" onSubmit={handleSave}>
      <label>
        Project or room name
        <input
          type="text"
          placeholder="e.g. My Dream Living Room"
          value={roomName}
          onChange={event => {
            setRoomName(event.target.value)
            setSaved(false)
          }}
        />
      </label>

      <label>
        Room type
        <select
          value={roomType}
          onChange={event => {
            setRoomType(event.target.value)
            setSaved(false)
          }}
        >
          <option>Living Room</option>
          <option>Bedroom</option>
          <option>Kitchen</option>
          <option>Dining Room</option>
          <option>Bathroom</option>
          <option>Home Office</option>
        </select>
      </label>

      <label>
        Connect to an existing project
        <select
          value={selectedProjectId}
          onChange={event => {
            setSelectedProjectId(event.target.value)
            setSaved(false)
          }}
        >
          <option value="">No project selected</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Design notes
        <textarea
          placeholder="Describe your ideas, style, or anything you'd love to include..."
          value={roomNotes}
          onChange={event => {
            setRoomNotes(event.target.value)
            setSaved(false)
          }}
        />
      </label>

      <button className="save-mood-board" type="submit">
        Save Mood Board
      </button>

      {saved && (
        <p className="save-message" role="status">
          Your mood board has been saved!
        </p>
      )}
    </form>
  </section>

  {/* DESIGN SELECTIONS */}
  <section className="designer-panel design-selections-panel">
    <p className="inspiration-eyebrow">Your selections</p>
    <h2>Design Selections</h2>
    <p className="panel-description">
      Keep track of the details coming together in your space.
    </p>

    <div className="sidebar-selection">
      <span>ROOM</span>
      <strong>{roomType}</strong>
    </div>

    <div className="sidebar-selection">
      <span>COLOR PALETTE</span>
      <div className="sidebar-color-choice">
        <span
          className={`sidebar-color-swatch color-texture-${activeColorTexture}`}
          style={{ '--swatch-color': activeColor }}
        />
        <strong>{selectedColor}</strong>
      </div>
    </div>

    <div className="sidebar-selection">
      <span>MATERIALS</span>
      {selectedMaterials.length > 0 ? (
        <div className="selected-material-tags">
          {selectedMaterials.map(material => (
            <span key={material} className="material-tag">
              {material}
            </span>
          ))}
        </div>
      ) : (
        <p className="material-empty">
          No materials selected yet.
        </p>
      )}
    </div>
  </section>

  {/* MY SAVED DESIGNS */}
  <section className="designer-panel saved-designs-panel">
    <h2>My Saved Designs</h2>
    <p className="panel-description">
      Revisit your favorite room ideas whenever you like.
    </p>

    {savedBoards.length > 0 ? (
      <div className="saved-designs-list">
        {savedBoards.map(board => (
          <div className="saved-design-item" key={board.id}>
            <div className="saved-design-info">
              <strong>{board.roomName || board.roomType}</strong>
              <span>{board.roomType}</span>
              <span>{board.selectedColor}</span>
            </div>

            <div className="saved-design-actions">
              <button
                type="button"
                className="load-design-button"
                onClick={() => loadBoard(board)}
              >
                Open
              </button>

              <button
                type="button"
                className="delete-design-button"
                onClick={() => deleteBoard(board.id)}
                aria-label={`Delete ${board.roomName || board.roomType}`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="material-empty">
        Your saved designs will appear here.
      </p>
    )}
  </section>

</aside>

        </div>
      </div>
    </main>
  )
}

export default RoomDesigner
