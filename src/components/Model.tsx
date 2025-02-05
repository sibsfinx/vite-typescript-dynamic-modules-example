import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

interface ModelProps {
  path: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function Model({ path, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: ModelProps) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF(path)

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={group} dispose={null} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

// Pre-load the model
useGLTF.preload('/models/robot.glb')
