import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

type Props = {
    position: [number, number, number];
};

const Desk = (props: Props) => {
    const { scene } = useGLTF("./desk.glb");
    const {
        x: deskWidth,
        y: _,
        z: deskDepth,
    } = new Box3().expandByObject(scene).getSize(new Vector3());
    console.log(deskWidth);
    // scene.castShadow = true;
    useEffect(() => {
        scene.traverse(function (node) {
            node.castShadow = true;
        });
        scene.castShadow = true;
    }, []);

    return (
        <>
            <primitive position={props.position} object={scene} />
            {/* <pointLight position={[1, 1, 1]} /> */}
            <pointLight
                castShadow
                position={[props.position[0] + 2, 3, props.position[2]]}
                intensity={10}
            />
            {/* <directionalLight
                position={[props.position[0] + 1, 2, props.position[2]]}
                intensity={0.9}
                target={scene}
            /> */}
        </>
    );
};

export default Desk;
