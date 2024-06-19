import React, { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";

type Props = {
    position: [number, number, number];
};

const Desk = (props: Props) => {
    const { scene, nodes, materials } = useGLTF("./desk.glb");
    const copiedScene = useMemo(() => scene.clone(), [scene]);

    return <primitive position={props.position} object={copiedScene} />;
};

export default Desk;
