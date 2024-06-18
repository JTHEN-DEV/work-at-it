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
    const scalarMultiplier = 0.5; // Scalar multiplier for translational movement
    const maxSpeed = 0.01; // Maximum speed of the camera
    const [isPanning, setIsPanning] = useState(false);

    const [keys, setKeys] = useState<string[]>([]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "w":
                    setKeys((prev) => [...prev, "w"]);
                    break;
                case "s":
                    setKeys((prev) => [...prev, "s"]);
                    break;
                case "a":
                    setKeys((prev) => [...prev, "a"]);
                    break;
                case "d":
                    setKeys((prev) => [...prev, "d"]);
                    break;
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key) {
                case "w":
                    setKeys((prev) => prev.filter((key) => key !== "w"));
                    break;
                case "s":
                    setKeys((prev) => prev.filter((key) => key !== "s"));
                    break;
                case "a":
                    setKeys((prev) => prev.filter((key) => key !== "a"));
                    break;
                case "d":
                    setKeys((prev) => prev.filter((key) => key !== "d"));
                    break;
            }
        };        

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);  

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
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
        // Based on keydown and keyup events, we can move the camera
        camera.getWorldDirection(forward);
        const side = new Vector3(-forward.z, 0, forward.x);

        if (keys.length > 0) {
            keys.forEach((key) => {
                switch (key) {
                    case "w":
                        var add = forward.clone().multiplyScalar(scalarMultiplier);
                        if (add.length() > maxSpeed) {
                            add.normalize().multiplyScalar(maxSpeed);
                        }
                        targetPosition.current.add(add);
                        break;
                    case "s":
                        var add = forward.clone().multiplyScalar(-scalarMultiplier);
                        if (add.length() > maxSpeed) {
                            add.normalize().multiplyScalar(maxSpeed);
                        }
                        targetPosition.current.add(add);
                        break;
                    case "a":
                        var add = side.clone().multiplyScalar(-scalarMultiplier);
                        if (add.length() > maxSpeed) {
                            add.normalize().multiplyScalar(maxSpeed);
                        }
                        targetPosition.current.add(add);
                        break;
                    case "d":
                        var add = side.clone().multiplyScalar(scalarMultiplier);
                        if (add.length() > maxSpeed) {
                            add.normalize().multiplyScalar(maxSpeed);
                        }
                        targetPosition.current.add(add);
                        break;
                }
            });
        }
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
