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
    return 2.4 / maxDim;
  }, [fbx]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Gentle inspection-style spin plus slight "breathing" tilt
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, -0.35, 0]}>
      <Center>
        <primitive object={fbx} scale={scale} />
      </Center>
    </group>
  );
}

const MoaiModel: React.FC = () => {
  return (
    <div className="relative w-full h-[430px] md:h-[560px] lg:h-[640px]">

      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        {/* key light — warm white */}
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        {/* neutral rim light */}
        <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#a8a29e" />
        {/* amber under-glow (theme primary) */}
        <pointLight position={[0, -1.5, 2.5]} intensity={1.0} distance={7} color="#f59e0b" />

        <Suspense fallback={null}>
          <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.2}>
            <MoaiMesh />
          </Float>
          <ContactShadows position={[0, -1.6, 0]} opacity={0.35} scale={5} blur={2.5} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MoaiModel;
