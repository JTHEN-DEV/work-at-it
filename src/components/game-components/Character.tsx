import { useGLTF } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimationMixer, Mesh, Vector3 } from "three";

type Props = {
    initialPosition: [number, number, number];
};

const Character = (props: Props) => {
    const [position, setPosition] = useState(props.initialPosition);

    const { camera } = useThree();

    // const { scene } = useLoader(GLTFLoader, "./character.glb");
    const { scene } = useGLTF("./character.glb");
    const mixerRef = useRef<AnimationMixer>();

    const sceneCopy = useMemo(() => scene.clone(), [scene]);

    const meshRef = useRef<Mesh>(null!);
    useEffect(() => {
        console.log(meshRef.current.position, camera.position);
    }, [camera.position]);

    return (
        <mesh ref={meshRef} position={[10, 10, 10]}>
            <primitive object={sceneCopy} />
        </mesh>
    );
};

export default Character;