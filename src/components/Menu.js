import React from "react";

import "./Menu.css";

const Menu = ({start}) => {
    return (
        <menu className="menu">
            <div>
                <button className="btn-start" onClick={start}>Start</button>
            </div>
        </menu>
    )
}

export default Menu;