let lightboxContainer: HTMLDivElement | null = null
let lightboxImage: HTMLImageElement | null = null
let isDragging = false
let startX = 0
let startY = 0
let translateX = 0
let translateY = 0
let scale = 1
let activeImageElement: HTMLImageElement | null = null

function createLightboxContainer() {
  if (lightboxContainer) return lightboxContainer

  const container = document.createElement('div')
  container.id = 'lightbox'
  container.innerHTML = `
    <button id="lightbox-close" title="关闭 (ESC)">&times;</button>
    <button id="lightbox-zoom-in" title="放大 (+)">+</button>
    <button id="lightbox-zoom-out" title="缩小 (-)">−</button>
    <button id="lightbox-reset" title="重置 (R)">⟲</button>
  `

  const image = document.createElement('img')
  image.id = 'lightbox-image'
  container.appendChild(image)

  document.body.appendChild(container)

  lightboxContainer = container
  lightboxImage = image

  return container
}

function openLightbox(img: HTMLImageElement) {
  activeImageElement = img
  const container = createLightboxContainer()

  if (lightboxImage) {
    lightboxImage.src = img.src
    lightboxImage.alt = img.alt
  }

  // 重置状态
  scale = 1
  translateX = 0
  translateY = 0
  isDragging = false

  updateTransform()

  container.style.display = 'flex'

  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  if (lightboxContainer) {
    lightboxContainer.style.display = 'none'
  }
  document.body.style.overflow = ''
  activeImageElement = null
}

function updateTransform() {
  if (lightboxImage) {
    lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
  }
}

function zoom(delta: number) {
  const newScale = Math.max(0.1, Math.min(10, scale + delta))
  scale = newScale
  updateTransform()
}

function resetZoom() {
  scale = 1
  translateX = 0
  translateY = 0
  updateTransform()
}

function setupEventListeners() {
  const container = createLightboxContainer()
  const closeBtn = document.getElementById('lightbox-close') as HTMLButtonElement
  const zoomInBtn = document.getElementById('lightbox-zoom-in') as HTMLButtonElement
  const zoomOutBtn = document.getElementById('lightbox-zoom-out') as HTMLButtonElement
  const resetBtn = document.getElementById('lightbox-reset') as HTMLButtonElement

  // 关闭按钮
  closeBtn?.addEventListener('click', closeLightbox)

  // 缩放按钮
  zoomInBtn?.addEventListener('click', () => zoom(0.5))
  zoomOutBtn?.addEventListener('click', () => zoom(-0.5))
  resetBtn?.addEventListener('click', resetZoom)

  // 点击背景关闭
  container.addEventListener('click', (e) => {
    if (e.target === container) {
      closeLightbox()
    }
  })

  // 滚轮缩放
  container.addEventListener('wheel', (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    zoom(delta)
  }, { passive: false })

  // 拖拽功能
  container.addEventListener('mousedown', (e) => {
    if (e.target === lightboxImage) {
      isDragging = true
      startX = e.clientX - translateX
      startY = e.clientY - translateY
      container.style.cursor = 'grabbing'
    }
  })

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      translateX = e.clientX - startX
      translateY = e.clientY - startY
      updateTransform()
    }
  })

  document.addEventListener('mouseup', () => {
    isDragging = false
    container.style.cursor = 'default'
  })

  // 触摸事件支持
  let touchStartDistance = 0
  let initialScale = 1

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      // 双指缩放
      touchStartDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      initialScale = scale
    } else if (e.touches.length === 1 && e.target === lightboxImage) {
      // 单指拖拽
      isDragging = true
      startX = e.touches[0].clientX - translateX
      startY = e.touches[0].clientY - translateY
    }
  })

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      // 双指缩放
      const touchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      )
      const scaleChange = touchDistance / touchStartDistance
      scale = Math.max(0.1, Math.min(10, initialScale * scaleChange))
      updateTransform()
    } else if (e.touches.length === 1 && isDragging) {
      // 单指拖拽
      translateX = e.touches[0].clientX - startX
      translateY = e.touches[0].clientY - startY
      updateTransform()
    }
  })

  container.addEventListener('touchend', () => {
    isDragging = false
  })

  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    if (lightboxContainer && lightboxContainer.style.display === 'flex') {
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case '+':
        case '=':
          zoom(0.5)
          break
        case '-':
          zoom(-0.5)
          break
        case 'r':
        case 'R':
          resetZoom()
          break
      }
    }
  })
}

function setupLightbox() {
  setupEventListeners()

  // 为所有图片添加点击事件
  const images = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>
  images.forEach(img => {
    // 跳过特殊图片（如emoji、小图标等）
    if (img.width < 50 || img.height < 50) return

    img.style.cursor = 'pointer'
    img.title = '点击放大查看'
    img.addEventListener('click', () => openLightbox(img))
  })
}

// 设置清理函数
window.addCleanup?.(() => {
  const images = document.querySelectorAll('img') as NodeListOf<HTMLImageElement>
  images.forEach(img => {
    img.removeEventListener('click', () => openLightbox(img))
  })
})

document.addEventListener('nav', setupLightbox)
document.addEventListener('render', setupLightbox)