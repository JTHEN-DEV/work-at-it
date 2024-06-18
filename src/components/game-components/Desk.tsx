import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

type Props = {
    position: [number, number, number];
};

const Desk = (props: Props) => {
    const { scene, nodes, materials } = useGLTF("./desk.glb");
    const {
        x: deskWidth,
        y: _,
        z: deskDepth,
    } = new Box3().expandByObject(scene).getSize(new Vector3());
    const copiedScene = useMemo(() => scene.clone(), [scene]);
    // scene.castShadow = true;
    useEffect(() => {
        scene.traverse(function (node) {
            node.castShadow = true;
        });
        scene.castShadow = true;
    }, []);

    return <primitive position={props.position} object={copiedScene} />;
    // return (
    //     <group>
    //         <mesh geometry={nodes[0].}/>
    //     </group>
    // )
};

export default Desk;
