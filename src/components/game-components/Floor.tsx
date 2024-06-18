import { Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import { DoubleSide, Mesh } from "three";

type Props = {};

const Floor = (props: Props) => {
    const floorRef = useRef<Mesh>(null);
    const { camera } = useThree();

    useFrame(() => {
        if (floorRef.current) {
            floorRef.current.position.x = camera.position.x;
            floorRef.current.position.z = camera.position.z;
        }
    });

    return (
        <Plane
            ref={floorRef}
            args={[1000, 1000]}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow>
            <meshPhongMaterial color={"#FFFFFF"} side={DoubleSide} />
        </Plane>
    );
};

export default Floor;
