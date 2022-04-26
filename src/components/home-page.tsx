import React from 'react';
import '../styles/home-page.scss';
import userIcon from '../assets/user.svg';

export default function HomePage(){
    return (<>
        <div className='home-page-container'>
            <div className='content-container'>
                <div className='text-container'>
                    <p>Translate this sentence</p>
                </div>
                <div className='image-container'>
                    <img src={userIcon} alt='icon' className='user-icon'/>
                </div>
                <div className='button-container'>
                    <button className='btn' type='button'>
                        <span>Check</span>
                    </button>
                </div>
            </div>
        </div>
    </>)
}