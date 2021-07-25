import React from "react";
import Loader from "react-loader-spinner";

const SimpleLoader = () => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
    }

    return (
        <div style={style}>
            <Loader
                type="Oval"
                color="#9e9e9e"
                height={100}
                width={100}
            />
        </div>
    )
}

export default SimpleLoader