import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimationMixer, Mesh } from "three";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type Props = {
    initialPosition: [number, number, number];
};

// const Character = (props: Props) => {
//     const [position, setPosition] = useState(props.initialPosition);

//     const { nodes } = useGLTF("./character.glb");
//     const mixerRef = useRef<AnimationMixer>();

//     const ccc = useMemo(() => scene.clone(), [scene]);

//     return <primitive position={position} object={ccc} />;
// };

// export default Character;

type GLTFResult = GLTF & {
    nodes: {
        Sphere020: THREE.SkinnedMesh;
        Sphere020_1: THREE.SkinnedMesh;
        Bone: THREE.Bone;
        Bone001: THREE.Bone;
        Shoulderl: THREE.Bone;
        Shoulderr: THREE.Bone;
    };
    materials: {
        ["Character Skin"]: THREE.MeshPhysicalMaterial;
        ["Character Details"]: THREE.MeshStandardMaterial;
    };
    animations: GLTFAction[];
};

type ActionName = "Nodding  " | "Waving";
interface GLTFAction extends THREE.AnimationClip {
    name: ActionName;
}
type ContextType = Record<
    string,
    React.ForwardRefExoticComponent<
        JSX.IntrinsicElements["skinnedMesh"] | JSX.IntrinsicElements["bone"]
    >
>;

const Character = (props: Props) => {
    const group = useRef<THREE.Group>(null!);
    const { nodes, materials, animations } = useGLTF(
        "/character.glb"
    ) as GLTFResult;
    const { actions } = useAnimations(animations, group);
    return (
        <group
            position={props.initialPosition}
            ref={group}
            {...props}
            dispose={null}>
            <group name="Scene">
                <group name="Armature" position={[0, 0.241, 0]} scale={0.149}>
                    <primitive object={nodes.Bone} />
                    <primitive object={nodes.Bone001} />
                    <primitive object={nodes.Shoulderl} />
                    <primitive object={nodes.Shoulderr} />
                    <group name="Sphere008">
                        <skinnedMesh
                            name="Sphere020"
                            geometry={nodes.Sphere020.geometry}
                            material={materials["Character Skin"]}
                            skeleton={nodes.Sphere020.skeleton}
                            morphTargetDictionary={
                                nodes.Sphere020.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.Sphere020.morphTargetInfluences
                            }
                        />
                        <skinnedMesh
                            name="Sphere020_1"
                            geometry={nodes.Sphere020_1.geometry}
                            material={materials["Character Details"]}
                            skeleton={nodes.Sphere020_1.skeleton}
                            morphTargetDictionary={
                                nodes.Sphere020_1.morphTargetDictionary
                            }
                            morphTargetInfluences={
                                nodes.Sphere020_1.morphTargetInfluences
                            }
                        />
                    </group>
                </group>
            </group>
        </group>
    );
};

useGLTF.preload("./character.glb");

export default Character;
