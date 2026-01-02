import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { GradientMaterial } from '../shaders/GradientMaterial'
import * as THREE from 'three'

const GradientMesh = () => {
    const materialRef = useRef()
    const { viewport, pointer } = useThree()

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta
            // Smoothly interpolate mouse position for fluid interaction
            materialRef.current.uMouse.lerp(pointer, 0.1)
        }
    })

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <gradientMaterial
                ref={materialRef}
                uColorStart={new THREE.Color('#101010')} // Deep dark
                uColorEnd={new THREE.Color('#2a2a2a')}   // Subtle tint
                uMouse={new THREE.Vector2(0, 0)}
            />
        </mesh>
    )
}

const GradientBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
                <GradientMesh />
            </Canvas>
        </div>
    )
}

export default GradientBackground
