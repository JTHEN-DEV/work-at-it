import React from "react";
import Cube from "./Cube";

type Props = {};

const PROPERTIES = {
    ROW_SIZE: 10,
    ROW_GAP: 2,
    COL_GAP: 2,
    CUBE_LENGTH: 1,
    CUBE_WIDTH: 1,
};

const CubeArray = (props: Props) => {
    const cubes = Array.apply(null, Array(1));
    return (
        <>
            {cubes.map((cube, index) => {
                const x =
                    (index % PROPERTIES.ROW_SIZE) *
                    (PROPERTIES.CUBE_WIDTH + PROPERTIES.COL_GAP);
                const y = 0;
                const z =
                    Math.floor(index / PROPERTIES.ROW_SIZE) *
                    (PROPERTIES.CUBE_LENGTH + PROPERTIES.ROW_GAP);
                return <Cube position={[x, y, z]} />;
            })}
        </>
    );
};

export default CubeArray;
