'use client'

import { animated, useSpring } from '@react-spring/web'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import BirthdayDecorations from '../components/BirthdayDecorations'
import BirthdayPhoto from '../components/BirthdayPhoto'
import BirthdayStars from '../components/BirthdayStars'
import Footer from '../components/Footer'
import HappyBirthdayText from '../components/HappyBirthdayText'
import Popup3D from '../components/Popup3D'

export default function BirthdayWisher() {
  const [showHiii, setShowHiii] = useState(true)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showBirthdayText, setShowBirthdayText] = useState(false)
  const horrorAudioRef = useRef<HTMLAudioElement>(null)
  const birthdayAudioRef = useRef<HTMLAudioElement>(null)

  const hiiiFade = useSpring({
    opacity: showHiii ? 1 : 0,
    config: { duration: 1000 },
  })

  useEffect(() => {
    if (horrorAudioRef.current) horrorAudioRef.current.play()
    
    const timer = setTimeout(() => {
      setShowHiii(false)
      setShowPhoto(true)
      if (horrorAudioRef.current) horrorAudioRef.current.pause()
      if (birthdayAudioRef.current) birthdayAudioRef.current.play()
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handlePhotoLoad = () => {
    setShowBirthdayText(true)
  }

  const handlePopupOpen = () => {
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <BirthdayStars />
      <audio ref={horrorAudioRef} src="/horror.mp3" />
      <audio ref={birthdayAudioRef} src="/hbd.mp3" loop />
      
      <animated.div style={hiiiFade} className="absolute inset-0 flex items-center justify-center text-6xl font-bold">
        unnava
      </animated.div>

      {showPhoto && (
        <>
          <BirthdayDecorations />
          <BirthdayPhoto onLoad={handlePhotoLoad} />
          {showBirthdayText && <HappyBirthdayText name="Ashwithaaa ❌ Ashuu ✅" />}
        </>
      )}

      <Footer onPopupOpen={handlePopupOpen} />

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-64 h-64">
            <Canvas>
              <Popup3D />
            </Canvas>
          </div>
        </div>
      )}
    </div>
  )
}

