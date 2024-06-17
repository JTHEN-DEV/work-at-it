import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import CubeArray from "./game-components/CubeArray";
import CameraControls from "./game-components/CameraControls";
import { OrbitControls } from "@react-three/drei";

type Props = {};

const Game = (props: Props) => {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}>
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <pointLight position={[1, 1, 1]} />
                <CubeArray />
            </Canvas>
        </div>
    );
};

export default Game;
