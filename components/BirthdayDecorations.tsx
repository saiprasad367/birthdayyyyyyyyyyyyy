import { useEffect, useRef } from 'react'

export default function BirthdayDecorations() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const decorations: { x: number; y: number; color: string; size: number; speed: number }[] = []

    const colors = ['#FF69B4', '#FFD700', '#00CED1', '#FF6347', '#32CD32']

    for (let i = 0; i < 50; i++) {
      decorations.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        speed: Math.random() * 2 + 1,
      })
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let decoration of decorations) {
        ctx.fillStyle = decoration.color
        ctx.beginPath()
        ctx.arc(decoration.x, decoration.y, decoration.size, 0, Math.PI * 2)
        ctx.fill()

        decoration.y += decoration.speed
        if (decoration.y > canvas.height) {
          decoration.y = 0
          decoration.x = Math.random() * canvas.width
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-10 pointer-events-none" />
}

