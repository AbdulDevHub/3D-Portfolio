import React, { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import CanvasLoader from "../Loader"
import { a } from "@react-spring/three"

import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei"

import useSound from "use-sound"
import bong from "/sounds/bong.ogg"
import drop from "/sounds/drop.ogg"
import impactBell from "/sounds/impactBell.ogg"
import impactGlass from "/sounds/impactGlass.ogg"
import impactMetal from "/sounds/impactMetal.ogg"
import impactMining from "/sounds/impactMining.ogg"
import impactPunch from "/sounds/impactPunch.ogg"
import lowRandom from "/sounds/lowRandom.ogg"
import pepSound from "/sounds/pepSound.ogg"
import zap from "/sounds/zap.ogg"

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl])
  const [color, setColor] = useState("#fff8eb")

  const [playBong] = useSound(bong, { volume: 1 })
  const [playDrop] = useSound(drop, { volume: 1 })
  const [playImpactBell] = useSound(impactBell, { volume: 1 })
  const [playImpactGlass] = useSound(impactGlass, { volume: 1 })
  const [playImpactMetal] = useSound(impactMetal, { volume: 1 })
  const [playImpactMining] = useSound(impactMining, { volume: 1 })
  const [playImpactPunch] = useSound(impactPunch, { volume: 1 })
  const [playLowRandom] = useSound(lowRandom, { volume: 1 })
  const [playPepSound] = useSound(pepSound, { volume: 1 })
  const [playZap] = useSound(zap, { volume: 1 })

  const soundActions = [
    playBong,
    playDrop,
    playImpactBell,
    playImpactGlass,
    playImpactMetal,
    playImpactMining,
    playImpactPunch,
    playLowRandom,
    playPepSound,
    playZap,
  ]

  const ballClicked = () => {
    const playSound =
      soundActions[Math.floor(Math.random() * soundActions.length)]
    playSound()
    setColor("#" + Math.floor(Math.random() * 16777215).toString(16))
  }

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 0.05]} />

      <a.mesh
        castShadow
        receiveShadow
        scale={2.75}
        onClick={ballClicked}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />

        <Decal
          position={[0, 0, 1]} // Logo at front of ball
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />

        <Decal
          position={[0, 0, -1]} // Logo at back of ball
          rotation={[0, Math.PI, 0]} // Adjusted rotation for back of ball
          scale={1}
          map={decal}
          flatShading
        />
      </a.mesh>
    </Float>
  )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default BallCanvas
