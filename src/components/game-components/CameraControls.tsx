import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
    FlyControls,
    OrbitControls,
    TrackballControls,
} from "@react-three/drei";
import { Vector3 } from "three";

const CameraControls = () => {
    const { camera } = useThree();
    const initial_height = 3;
    const targetPosition = useRef(
        camera
            .getWorldPosition(new Vector3())
            .add(new Vector3(0, initial_height, 0))
    );
    const orbitRef = useRef<any>();
    const speed = 0.05; // Smoothness factor
    const [isPanning, setIsPanning] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            camera.getWorldDirection(forward);
            switch (event.key) {
                case "w":
                    targetPosition.current.add(forward.multiplyScalar(0.5));
                    break;
                case "s":
                    targetPosition.current.add(forward.multiplyScalar(-0.5));
                    break;
                case "a":
                    targetPosition.current.add(
                        new Vector3(forward.z, 0, -forward.x).multiplyScalar(
                            0.5
                        )
                    );
                    break;
                case "d":
                    targetPosition.current.add(
                        new Vector3(-forward.z, 0, forward.x).multiplyScalar(
                            0.5
                        )
                    );
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        window.addEventListener("mousedown", () => setIsPanning(true));
        window.addEventListener("mouseup", () => setIsPanning(false));

        return () => {
            window.removeEventListener("mousedown", () => setIsPanning(true));
            window.removeEventListener("mouseup", () => setIsPanning(false));
        };
    }, []);

    const forward = useMemo(() => new Vector3(), []);
    const position = useMemo(() => new Vector3(), []);

    useFrame(() => {
        if (!isPanning) {
            camera.position.lerp(
                new Vector3(
                    targetPosition.current.x,
                    initial_height,
                    targetPosition.current.z
                ),
                speed
            );
        } else {
            targetPosition.current.copy(camera.position);
            // targetPosition.current = camera.position;
        }
        camera.getWorldDirection(forward);
        // console.log(camera.getWorldDirection(forward));
        orbitRef.current.target
            .copy(camera.position)
            .add(
                new Vector3(forward.x, forward.y, forward.z).multiplyScalar(
                    0.001
                )
            );
    });

    // return null;
    return <OrbitControls ref={orbitRef} />;
    // return <FlyControls movementSpeed={10} />;
    // return <TrackballControls />;
};

export default CameraControls;
