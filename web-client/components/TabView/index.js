import React from 'react';
import { Link } from 'react-router-dom';
import './TabView.scss';

export default function TabView({ tabsInfo, active, selectTab, children }) {

    return (
        <div className='tab-view'>
            <div className='tab-labels'>
                {tabsInfo.map(({ label, link }, i) => (
                    <Link key={label} to={link} className={`tab-label ${i === active ? 'active' : ''}`} onClick={() => selectTab(i)}><label>{label}</label></Link>
                ))}
            </div>

            <div className='tabs'>
                {tabsInfo.map((tab, i) => (
                    <div className={'tab'} key={tab.label} style={{ display: i === active ? 'block' : 'none' }}>
                        {children}
                    </div>
                ))}
            </div>
        </div>
    )
}
