import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

export const CameraControls = () => {
    const { camera } = useThree();
    const targetPosition = useRef(new THREE.Vector3());
    const orbitRef = useRef<any>();
    const speed = 0.05; // Smoothness factor

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    targetPosition.current.z -= 1;
                    break;
                case "ArrowDown":
                    targetPosition.current.z += 1;
                    break;
                case "ArrowLeft":
                    targetPosition.current.x -= 1;
                    break;
                case "ArrowRight":
                    targetPosition.current.x += 1;
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useFrame(() => {
        if (orbitRef.current) {
            orbitRef.current.position = targetPosition.current;
        }
        // camera.position.lerp(targetPosition.current, speed);
        orbitRef.current.update();
        // camera.updateProjectionMatrix();
    });

    return <OrbitControls position={targetPosition.current} />;
};
