import React from "react";
import styles from "./style.module.css";
import TabBar from "../Tab";
import Viewer from "../Viewer";
import { images } from "../../images"

const tabs = [
    "360 Tour",
    "Exterior",
    "Interior"
]

const ThreeSixtyWrapper = () => {
    return (
        <div>
            <TabBar tabs={tabs} currentTab={tabs[0]} />
            <Viewer images={images} />
        </div>
    );
}

export default ThreeSixtyWrapper;