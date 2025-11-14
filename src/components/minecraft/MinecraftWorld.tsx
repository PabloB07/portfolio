'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useLanguage } from '../../contexts/LanguageContext'

// Colores de bloques de Minecraft
const BLOCK_COLORS: { [key: number]: string } = {
  0: '#87CEEB', // Cielo/Aire
  1: '#8B7355', // Tierra
  2: '#90EE90', // Hierba
  3: '#654321', // Madera
  4: '#808080', // Piedra
  5: '#FFD700', // Oro
  6: '#C0C0C0', // Hierro
  7: '#FF6347', // Lava
  8: '#4169E1', // Agua
}

// Generación procedural de terreno
function generateTerrain(width: number, depth: number, height: number = 32): number[][][] {
  const terrain: number[][][] = []
  
  for (let x = 0; x < width; x++) {
    terrain[x] = []
    for (let z = 0; z < depth; z++) {
      terrain[x][z] = []
      
      // Altura usando ruido simple (simulación de Perlin)
      const noiseX = x * 0.1
      const noiseZ = z * 0.1
      const groundHeight = Math.floor(
        height * 0.5 + 
        Math.sin(noiseX) * 5 + 
        Math.cos(noiseZ) * 5 +
        Math.sin(noiseX * 2) * 2 +
        Math.cos(noiseZ * 2) * 2
      )
      
      for (let y = 0; y < height; y++) {
        if (y === 0) {
          terrain[x][z][y] = 4 // Bedrock
        } else if (y < groundHeight - 3) {
          terrain[x][z][y] = 4 // Piedra
        } else if (y < groundHeight - 1) {
          terrain[x][z][y] = 1 // Tierra
        } else if (y === groundHeight - 1) {
          terrain[x][z][y] = 2 // Hierba
        } else {
          terrain[x][z][y] = 0 // Aire
        }
      }
    }
  }
  
  return terrain
}

// Componente optimizado usando instanced rendering por tipo de bloque
function BlockInstances({ blocks, type }: { blocks: Array<[number, number, number]>, type: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const color = BLOCK_COLORS[type] || '#8B7355'
  const tempObject = new THREE.Object3D()
  
  useEffect(() => {
    if (!meshRef.current) return
    
    blocks.forEach((position, i) => {
      const [x, y, z] = position
      tempObject.position.set(x, y, z)
      tempObject.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObject.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [blocks])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Animación sutil de rotación para todos los bloques
      const time = state.clock.elapsedTime * 0.1
      blocks.forEach((position, i) => {
        tempObject.position.set(...position)
        tempObject.rotation.y = Math.sin(time + position[0] + position[2]) * 0.02
        tempObject.updateMatrix()
        meshRef.current!.setMatrixAt(i, tempObject.matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }
  })
  
  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, blocks.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.8}
        metalness={0.1}
      />
    </instancedMesh>
  )
}

// Componente principal del mundo
function MinecraftWorld() {
  const worldSize = 32
  const worldHeight = 24
  
  const terrain = useMemo(() => {
    return generateTerrain(worldSize, worldSize, worldHeight)
  }, [])
  
  const blocksByType = useMemo(() => {
    const blocksByType: { [key: number]: Array<[number, number, number]> } = {}
    
    terrain.forEach((chunkX, x) => {
      chunkX.forEach((chunkZ, z) => {
        chunkZ.forEach((blockType, y) => {
          if (blockType !== 0) {
            if (!blocksByType[blockType]) {
              blocksByType[blockType] = []
            }
            blocksByType[blockType].push([x - worldSize / 2, y, z - worldSize / 2])
          }
        })
      })
    })
    
    return blocksByType
  }, [terrain])
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.2} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight position={[-10, 5, -10]} intensity={0.3} color="#87CEEB" />
      
      {/* Renderizar bloques agrupados por tipo para mejor rendimiento */}
      {Object.entries(blocksByType).map(([type, blocks]) => (
        <BlockInstances 
          key={type} 
          blocks={blocks} 
          type={parseInt(type)} 
        />
      ))}
      
      {/* Plano base con textura de hierba */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[worldSize * 2, worldSize * 2]} />
        <meshStandardMaterial color="#2d5016" roughness={0.9} />
      </mesh>
    </>
  )
}

// Componente principal del canvas
export default function MinecraftWorldCanvas() {
  const controlsRef = useRef<any>(null)
  const { t } = useLanguage()
  
  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        className="bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600"
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[25, 18, 25]} fov={70} />
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={8}
          maxDistance={120}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 8, 0]}
          dampingFactor={0.05}
          enableDamping={true}
        />
        <MinecraftWorld />
        <fog attach="fog" args={['#87CEEB', 25, 90]} />
      </Canvas>
      
      {/* Controles UI */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">{t('minecraft.controls.title')}</h3>
        <ul className="text-sm space-y-1">
          <li>{t('minecraft.controls.rotate')}</li>
          <li>{t('minecraft.controls.zoom')}</li>
          <li>{t('minecraft.controls.pan')}</li>
        </ul>
      </div>
    </div>
  )
}

