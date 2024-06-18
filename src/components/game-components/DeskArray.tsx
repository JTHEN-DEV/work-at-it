import React from "react";
import Desk from "./Desk";

type Props = {};

const PROPERTIES = {
    ROW_SIZE: 30,
    ROW_GAP: 2,
    COL_GAP: 2,
    DESK_LENGTH: 1,
    DESK_WIDTH: 1,
};

const DeskArray = (props: Props) => {
    const desks = Array.apply(null, Array(1000));
    return (
        <>
            {desks.map((_, index) => {
                const x =
                    (index % PROPERTIES.ROW_SIZE) *
                    (PROPERTIES.DESK_WIDTH + PROPERTIES.COL_GAP);
                const y = 0;
                const z =
                    Math.floor(index / PROPERTIES.ROW_SIZE) *
                    (PROPERTIES.DESK_LENGTH + PROPERTIES.ROW_GAP);
                return <Desk position={[x, y, z]} />;
                // return <Desk position={[index, , z]} />;
            })}
        </>
    );
};

export default DeskArray;
