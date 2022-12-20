import confetti from 'canvas-confetti'

export default function useConfetti(duration = 3000) {
  const fireConfetti = () => {
    const end = Date.now() + duration
    const colors = ['#7F1D1D', '#7F7F1D']

    ;(function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }

  return [fireConfetti]
}
