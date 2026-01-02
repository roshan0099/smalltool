import React, { Suspense } from 'react'
import GradientBackground from './components/GradientBackground'
import Overlay from './components/Overlay'
import './App.css'

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <GradientBackground />
      </Suspense>
      <Overlay />
    </>
  )
}

export default App
