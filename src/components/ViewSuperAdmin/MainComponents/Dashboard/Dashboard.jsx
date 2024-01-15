import { useState } from 'react';
import Grades from './Grades/Grades';
import Admins from './Admins/Admins';
import style from './dashboard.module.css'

function Dashboard() {
    const [componentsIndex, setComponentsIndex] = useState(0)
    const [isActive, setIsActive] = useState(true)


    const components = [
        <Admins/>,
        <Grades/>
    ]
    const componentNames = ["Admins", "Grados"]

    const handleComponentClick = (index) => {
        setComponentsIndex(index)
        setIsActive(true)
    }

    return (<>
        <div className={style.container}>
            <nav className={style.navbar}>
                <h2>Dashboard</h2>
                <div className={style.navbar_titles}>
                    {
                        componentNames.map((component, index) => {
                            return (<>
                                <button
                                    key={index}
                                    onClick={() => handleComponentClick(index)}
                                    className={isActive && componentsIndex === index ? style.active_button : ''}
                                >
                                    {componentNames[index]}
                                </button>
                            </>)
                        })
                    }
                </div>
            </nav>
            <div className={style.container_table}>
                {components[componentsIndex]}
            </div>
        </div>
    </>);
}

export default Dashboard;