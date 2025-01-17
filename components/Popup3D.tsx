import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function Popup3D() {
  const meshRef = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, '/img3.jpg')

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta
      meshRef.current.rotation.y += delta
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  )
}

