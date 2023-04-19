import React, { useState } from "react";
import styles from "./style.module.css";

const TabBar = ({
    tabs,
    currentTab
}) => {
    const [activeTab, setActiveTab] = useState(currentTab);

    return (
        <div className={styles.tabBar}>
            <ul>
                { tabs.map(tab => <li 
                    onClick={() => setActiveTab(tab)} 
                    key={tab}
                    className={activeTab === tab && styles.active}
                >{tab}</li>) }
            </ul>
        </div>
    );
}

export default TabBar;