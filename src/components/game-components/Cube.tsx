import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { Mesh } from "three";

type Props = {
    position: [number, number, number];
};

const Cube = (props: Props) => {
    const mesh = useRef<Mesh>(null!);
    // useFrame(() => {
    //     if (mesh.current) {
    //         mesh.current.rotation.x += 0.01;
    //         mesh.current.rotation.y += 0.01;
    //     }
    // });

    return (
        <mesh ref={mesh} position={props.position} rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={"orange"} />
        </mesh>
    );
};

export default Cube;
