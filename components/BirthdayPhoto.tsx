import { animated, useSpring } from '@react-spring/web'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface BirthdayPhotoProps {
  onLoad: () => void
}

export default function BirthdayPhoto({ onLoad }: BirthdayPhotoProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  const dropAnimation = useSpring({
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0%)' },
    config: { tension: 300, friction: 20 },
    onRest: () => setIsLoaded(true),
  })

  useEffect(() => {
    if (isLoaded) {
      onLoad()
    }
  }, [isLoaded, onLoad])

  return (
    <animated.div style={dropAnimation} className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-64 h-64 cursor-pointer" onClick={() => setIsFlipped(state => !state)}>
        <animated.div
          style={{
            opacity: opacity.to(o => 1 - o),
            transform,
            rotateY: '0deg',
          }}
          className="absolute w-full h-full"
        >
          <Image src="/img1.jpg" alt="Birthday Front" layout="fill" objectFit="cover" />
        </animated.div>
        <animated.div
          style={{
            opacity,
            transform,
            rotateY: '180deg',
          }}
          className="absolute w-full h-full"
        >
          <Image src="/img2.jpg" alt="Birthday Back" layout="fill" objectFit="cover" />
        </animated.div>
      </div>
    </animated.div>
  )
}

