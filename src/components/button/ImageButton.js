import React from "react";

function ImageButton(props) {
    return(
        <button type="button" onClick={props.click}
            style={{
                background: "none",
                border: "0px",
            }}
        >
            <img src={props.image}  
                style={{
                width: props.width,
                height: props.height
            }}
        />
        </button>
    );
}


export default ImageButton;