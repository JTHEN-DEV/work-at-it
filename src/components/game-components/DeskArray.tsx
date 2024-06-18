import React from "react";
import Desk from "./Desk";

type Props = {};

const PROPERTIES = {
    ROW_SIZE: 10,
    ROW_GAP: 2,
    COL_GAP: 2,
    CUBE_LENGTH: 1,
    CUBE_WIDTH: 1,
};

const DeskArray = (props: Props) => {
    const cubes = Array.apply(null, Array(100));
    return (
        <>
            {cubes.map((_, index) => {
                const x =
                    (index % PROPERTIES.ROW_SIZE) *
                    (PROPERTIES.CUBE_WIDTH + PROPERTIES.COL_GAP);
                const y = 0;
                const z =
                    Math.floor(index / PROPERTIES.ROW_SIZE) *
                    (PROPERTIES.CUBE_LENGTH + PROPERTIES.ROW_GAP);
                return <Desk position={[x, y, z]} />;
                // return <Desk position={[index, , z]} />;
            })}
        </>
    );
};

export default DeskArray;
