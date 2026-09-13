'use client';

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, ContactShadows, Float, useFBX } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/moai/moai.fbx';
const TEXTURES = {
  albedo: '/models/moai/mBody_Alb.png',
  normal: '/models/moai/mBody_Nrm.png',
  roughness: '/models/moai/mBody_Rgh.png',
  metalness: '/models/moai/mBody_Mtl.png',
  ao: '/models/moai/mBody_Ocl.png',
};

function MoaiMesh() {
  const fbx = useFBX(MODEL_URL);
  const group = useRef<THREE.Group>(null);

  const material = useMemo(() => {
    const loader = new THREE.TextureLoader();

    const albedo = loader.load(TEXTURES.albedo);
    albedo.colorSpace = THREE.SRGBColorSpace;

    const normal = loader.load(TEXTURES.normal);
    const roughness = loader.load(TEXTURES.roughness);
    const metalness = loader.load(TEXTURES.metalness);

    const ao = loader.load(TEXTURES.ao);
    ao.channel = 0; // model uses a single UV set

    const mat = new THREE.MeshStandardMaterial({
      map: albedo,
      normalMap: normal,
      roughnessMap: roughness,
      metalnessMap: metalness,
      aoMap: ao,
      aoMapIntensity: 0.9,
      roughness: 1.0,
      metalness: 0.6,
    });

    fbx.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = mat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return mat;
  }, [fbx]);

  // Normalize FBX scale: make its largest dimension ~2.6 units
  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(fbx);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return 2.6 / maxDim;
  }, [fbx]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Gentle inspection-style spin plus slight "breathing" tilt
      group.current.rotation.y += delta * 0.35;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      <Center>
        <primitive object={fbx} scale={scale} />
      </Center>
    </group>
  );
}

const MoaiModel: React.FC = () => {
  return (
    <div className="relative w-full h-[430px] md:h-[560px] lg:h-[640px]">
      {/* cyber-glow backdrop pod */}
      <div className="absolute inset-8 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,var(--glow),transparent_65%)] blur-3xl opacity-70" />

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.1, 5.4], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.65} />
        {/* key light — warm white */}
        <directionalLight position={[3, 5, 4]} intensity={1.5} />
        {/* cyan rim light (theme secondary) */}
        <directionalLight position={[-5, 2, -3]} intensity={1.1} color="#22d3ee" />
        {/* yellow under-glow (theme primary) */}
        <pointLight position={[0, -1.5, 2.5]} intensity={1.4} distance={7} color="#eab308" />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.35}>
            <MoaiMesh />
          </Float>
          <ContactShadows position={[0, -1.65, 0]} opacity={0.4} scale={6} blur={3} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MoaiModel;
