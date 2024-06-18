import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import CubeArray from "./game-components/CubeArray";
import CameraControls from "./game-components/CameraControls";
import { OrbitControls } from "@react-three/drei";
import Desk from "./game-components/Desk";
import Floor from "./game-components/Floor";

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
                }}
                shadows="percentage">
                <CameraControls />
                <ambientLight intensity={0} />
                <CubeArray />
                {/* <Desk position={[0, 0, 0]} /> */}
                <Floor />
            </Canvas>
        </div>
    );
};

export default Game;
