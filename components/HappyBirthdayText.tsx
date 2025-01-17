'use client'

import { Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function AnimatedText({ children }: { children: string }) {
  const textRef = useRef<any>()

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2
      textRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1
      textRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <Text
      ref={textRef}
      fontSize={0.7}
      color="#FFD700"
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  )
}

interface HappyBirthdayTextProps {
  name: string
}

export default function HappyBirthdayText({ name }: HappyBirthdayTextProps) {
  return (
    <div className="absolute bottom-20 left-0 right-0 z-20">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedText>{`Happy Birthday , ${name}!`}</AnimatedText>
      </Canvas>
    </div>
  )
}

