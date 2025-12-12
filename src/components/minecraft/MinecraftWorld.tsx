'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useLanguage } from '../../contexts/LanguageContext'

// Tipos de bloques
enum BlockType {
  AIR = 0,
  GRASS = 1,
  DIRT = 2,
  STONE = 3,
  BEDROCK = 4,
  WOOD = 5,
  LEAVES = 6,
  SAND = 7,
  WATER = 8,
}

// Colores de bloques
const BLOCK_COLORS: { [key in BlockType]: string } = {
  [BlockType.AIR]: '#87CEEB',
  [BlockType.GRASS]: '#7CB342',
  [BlockType.DIRT]: '#8B7355',
  [BlockType.STONE]: '#808080',
  [BlockType.BEDROCK]: '#1A1A1A',
  [BlockType.WOOD]: '#8B4513',
  [BlockType.LEAVES]: '#2E7D32',
  [BlockType.SAND]: '#F4D03F',
  [BlockType.WATER]: '#3498DB',
}

// Tamaño de chunk (16x16x16 como Minecraft)
const CHUNK_SIZE = 16
const CHUNK_HEIGHT = 64

// Generador de ruido Perlin simplificado
class PerlinNoise {
  private permutation: number[]
  private p: number[]

  constructor(seed: number = 0) {
    this.permutation = []
    this.p = []

    // Inicializar permutación
    for (let i = 0; i < 256; i++) {
      this.permutation[i] = i
    }

    // Mezclar con seed
    let rng = seed
    for (let i = 255; i > 0; i--) {
      rng = (rng * 1103515245 + 12345) & 0x7fffffff
      const j = rng % (i + 1)
        ;[this.permutation[i], this.permutation[j]] = [this.permutation[j], this.permutation[i]]
    }

    // Duplicar array
    for (let i = 0; i < 512; i++) {
      this.p[i] = this.permutation[i % 256]
    }
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10)
  }

  private lerp(a: number, b: number, t: number): number {
    return a + t * (b - a)
  }

  private grad(hash: number, x: number, y: number, z: number): number {
    const h = hash & 15
    const u = h < 8 ? x : y
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
  }

  noise(x: number, y: number, z: number): number {
    const X = Math.floor(x) & 255
    const Y = Math.floor(y) & 255
    const Z = Math.floor(z) & 255

    x -= Math.floor(x)
    y -= Math.floor(y)
    z -= Math.floor(z)

    const u = this.fade(x)
    const v = this.fade(y)
    const w = this.fade(z)

    const A = this.p[X] + Y
    const AA = this.p[A] + Z
    const AB = this.p[A + 1] + Z
    const B = this.p[X + 1] + Y
    const BA = this.p[B] + Z
    const BB = this.p[B + 1] + Z

    return this.lerp(
      this.lerp(
        this.lerp(
          this.grad(this.p[AA], x, y, z),
          this.grad(this.p[BA], x - 1, y, z),
          u
        ),
        this.lerp(
          this.grad(this.p[AB], x, y - 1, z),
          this.grad(this.p[BB], x - 1, y - 1, z),
          u
        ),
        v
      ),
      this.lerp(
        this.lerp(
          this.grad(this.p[AA + 1], x, y, z - 1),
          this.grad(this.p[BA + 1], x - 1, y, z - 1),
          u
        ),
        this.lerp(
          this.grad(this.p[AB + 1], x, y - 1, z - 1),
          this.grad(this.p[BB + 1], x - 1, y - 1, z - 1),
          u
        ),
        v
      ),
      w
    )
  }
}

// Generación de terreno usando Perlin noise
function generateChunk(chunkX: number, chunkZ: number, seed: number = 0): BlockType[][][] {
  const noise = new PerlinNoise(seed)
  const chunk: BlockType[][][] = []

  for (let x = 0; x < CHUNK_SIZE; x++) {
    chunk[x] = []
    for (let z = 0; z < CHUNK_SIZE; z++) {
      chunk[x][z] = []

      const worldX = chunkX * CHUNK_SIZE + x
      const worldZ = chunkZ * CHUNK_SIZE + z

      // Generar altura usando múltiples octavas de ruido
      let height = 32
      height += noise.noise(worldX * 0.01, 0, worldZ * 0.01) * 20
      height += noise.noise(worldX * 0.02, 0, worldZ * 0.02) * 10
      height += noise.noise(worldX * 0.05, 0, worldZ * 0.05) * 5
      height = Math.floor(height)

      // Generar cuevas
      const caveNoise = noise.noise(worldX * 0.1, 0, worldZ * 0.1)

      for (let y = 0; y < CHUNK_HEIGHT; y++) {
        if (y === 0) {
          chunk[x][z][y] = BlockType.BEDROCK
        } else if (y < height - 4) {
          // Cuevas
          if (caveNoise > 0.3 && y < height - 8) {
            chunk[x][z][y] = BlockType.AIR
          } else {
            chunk[x][z][y] = BlockType.STONE
          }
        } else if (y < height - 1) {
          chunk[x][z][y] = BlockType.DIRT
        } else if (y === height - 1) {
          // Decidir si es hierba, arena o agua
          const biomeNoise = noise.noise(worldX * 0.005, 0, worldZ * 0.005)
          if (biomeNoise < -0.3) {
            chunk[x][z][y] = BlockType.SAND
          } else if (biomeNoise > 0.3 && height < 30) {
            chunk[x][z][y] = BlockType.WATER
          } else {
            chunk[x][z][y] = BlockType.GRASS
          }
        } else if (y < height + 2 && chunk[x][z][height - 1] === BlockType.GRASS) {
          // Árboles ocasionales
          const treeNoise = noise.noise(worldX * 0.1, 100, worldZ * 0.1)
          if (treeNoise > 0.7 && y === height) {
            chunk[x][z][y] = BlockType.WOOD
          } else if (treeNoise > 0.7 && y > height && y < height + 3) {
            chunk[x][z][y] = BlockType.LEAVES
          } else {
            chunk[x][z][y] = BlockType.AIR
          }
        } else {
          chunk[x][z][y] = BlockType.AIR
        }
      }
    }
  }

  return chunk
}

// Componente de Chunk optimizado
function Chunk({
  chunkX,
  chunkZ,
  seed
}: {
  chunkX: number
  chunkZ: number
  seed: number
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const [blocks, setBlocks] = useState<Array<{ pos: [number, number, number], type: BlockType }>>([])

  useEffect(() => {
    const chunk = generateChunk(chunkX, chunkZ, seed)
    const blockList: Array<{ pos: [number, number, number], type: BlockType }> = []

    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        for (let y = 0; y < CHUNK_HEIGHT; y++) {
          const blockType = chunk[x][z][y]
          if (blockType !== BlockType.AIR) {
            const worldX = chunkX * CHUNK_SIZE + x
            const worldY = y
            const worldZ = chunkZ * CHUNK_SIZE + z
            blockList.push({ pos: [worldX, worldY, worldZ], type: blockType })
          }
        }
      }
    }

    setBlocks(blockList)
  }, [chunkX, chunkZ, seed])

  useEffect(() => {
    if (!meshRef.current || blocks.length === 0) return

    const tempObject = new THREE.Object3D()
    blocks.forEach((block, i) => {
      tempObject.position.set(...block.pos)
      tempObject.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObject.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  }, [blocks])

  if (blocks.length === 0) return null

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, blocks.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#8B7355"
        roughness={0.8}
        metalness={0.1}
      />
    </instancedMesh>
  )
}

// Componente de bloques agrupados por tipo (más eficiente)
function BlockGroup({
  blocks,
  type
}: {
  blocks: Array<[number, number, number]>
  type: BlockType
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const color = BLOCK_COLORS[type]
  const tempObject = new THREE.Object3D()

  useEffect(() => {
    if (!meshRef.current) return

    blocks.forEach((position, i) => {
      tempObject.position.set(...position)
      tempObject.updateMatrix()
      meshRef.current!.setMatrixAt(i, tempObject.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  }, [blocks])

  if (blocks.length === 0) return null

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
  const [time, setTime] = useState(0)
  const chunksToRender = useMemo(() => {
    const chunks: Array<{ x: number, z: number }> = []
    const renderDistance = 2 // Renderizar chunks en un radio de 2

    for (let x = -renderDistance; x <= renderDistance; x++) {
      for (let z = -renderDistance; z <= renderDistance; z++) {
        chunks.push({ x, z })
      }
    }

    return chunks
  }, [])

  useFrame((state) => {
    setTime(state.clock.elapsedTime)
  })

  // Calcular iluminación basada en tiempo (ciclo día/noche)
  const sunIntensity = useMemo(() => {
    const dayCycle = (Math.sin(time * 0.1) + 1) / 2
    return Math.max(0.3, dayCycle)
  }, [time])

  return (
    <>
      <ambientLight intensity={0.4 * sunIntensity} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5 * sunIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight
        position={[-10, 5, -10]}
        intensity={0.2 * sunIntensity}
        color="#87CEEB"
      />

      {/* Renderizar chunks */}
      {chunksToRender.map((chunk) => (
        <Chunk
          key={`${chunk.x}-${chunk.z}`}
          chunkX={chunk.x}
          chunkZ={chunk.z}
          seed={0}
        />
      ))}

      {/* Plano base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[CHUNK_SIZE * 6, CHUNK_SIZE * 6]} />
        <meshStandardMaterial color="#2d5016" roughness={0.9} />
      </mesh>
    </>
  )
}

// Componente principal del canvas
export default function MinecraftWorldCanvas() {
  const controlsRef = useRef<any>(null)
  const { tString } = useLanguage()

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
        <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={70} />
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={150}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.2}
          target={[0, 10, 0]}
          dampingFactor={0.05}
          enableDamping={true}
        />
        <MinecraftWorld />
        <fog attach="fog" args={['#87CEEB', 30, 100]} />
      </Canvas>

      {/* Controles UI */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg">
        <h3 className="font-bold mb-2">{tString('minecraft.controls.title')}</h3>
        <ul className="text-sm space-y-1">
          <li>{tString('minecraft.controls.rotate')}</li>
          <li>{tString('minecraft.controls.zoom')}</li>
          <li>{tString('minecraft.controls.pan')}</li>
        </ul>
      </div>
    </div>
  )
}
