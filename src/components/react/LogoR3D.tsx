import {Suspense, useRef, useMemo, useEffect} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {MeshTransmissionMaterial, useGLTF, Environment, useProgress, Html} from '@react-three/drei'
import * as THREE from 'three'


function RLogo() {
    const groupRef = useRef<THREE.Group>(null)
    const mouse = useRef({x: 0, y: 0})
    const {scene} = useGLTF('/logo-r.glb')

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
        }
        const onMouseLeave = () => {
            mouse.current.x = 0
            mouse.current.y = 0
        }
        window.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseleave', onMouseLeave)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    const geometry = useMemo(() => {
        scene.updateMatrixWorld(true)
        let geom: THREE.BufferGeometry | undefined
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh && !geom) {
                geom = (child as THREE.Mesh).geometry.clone()
                geom.applyMatrix4((child as THREE.Mesh).matrixWorld)
            }
        })
        if (!geom) return null
        const g = geom as THREE.BufferGeometry
        g.computeBoundingBox()
        const center = g.boundingBox!.getCenter(new THREE.Vector3())
        const size = g.boundingBox!.getSize(new THREE.Vector3())
        const s = 2.4 / Math.max(size.x, size.y, size.z)
        g.translate(-center.x, -center.y, -center.z)
        g.scale(s, s, s)
        return g
    }, [scene])

    useFrame(() => {
        if (!groupRef.current) return
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            mouse.current.x * 0.25,
            0.05
        )
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            -mouse.current.y * 0.15,
            0.05
        )
    })

    if (!geometry) return null

    return (
        <group ref={groupRef}>
            <mesh geometry={geometry} rotation={[Math.PI * -0.54, Math.PI, -Math.PI]}>
                <MeshTransmissionMaterial
                    transmission={1}
                    thickness={10}
                    roughness={0}
                    ior={2.5}
                    chromaticAberration={1}
                    backside={true}
                    backsideThickness={0}
                    envMapIntensity={20}
                    color="#9c1de7"
                    opacity={1}
                    anisotropicBlur={0}
                    distortion={0}
                    transparent
                    samples={4}
                    resolution={512}
                />
            </mesh>
        </group>
    )
}

function Loader({svgSrc}: { svgSrc: string }) {
    return (
        <Html center>
            <img src={svgSrc} alt="loader" style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
        </Html>
    )
}

export default function LogoR3D({svgSrc}: { svgSrc: string }) {
    return (
        <Canvas
            style={{background: 'transparent'}}
            camera={{position: [0, 0, 5], fov: 45}}
            gl={{alpha: true, antialias: true}}
            dpr={[1, 1.5]}
        >
            <Suspense fallback={<Loader svgSrc={svgSrc}/>}>
                <RLogo/>
                <ambientLight intensity={3} color="#FFF707"/>
                <directionalLight intensity={3.0} position={[0, 8, -10]} color="#f7f7f7"/>
                <directionalLight intensity={3.0} position={[0, -8, 10]} color="#f7f7f7"/>
                <directionalLight intensity={6.0} position={[-4, 4, 5]} color="#9c1de7"/>
                <directionalLight intensity={5.0} position={[4, 4, 5]} color="#ff073a"/>
                <Environment preset={"dawn"} backgroundBlurriness={100} environmentIntensity={0.5}/>
            </Suspense>
        </Canvas>
    )
}
