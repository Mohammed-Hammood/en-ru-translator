import React, { useEffect } from 'react';
import '../styles/home-page.scss';
import useFetch from './fetch-data';
import { DragDropContext } from 'react-beautiful-dnd';

export default function HomePage_ (props:any){
    const {loading, translation} = useFetch();
    let randomIndex:number = 0; // Math.ceil(Math.random()/2 *10) - 1;
    useEffect(()=> {

    }, [loading, translation])
    const getRussianWords = ():string[]=> {
        let array:string[]  = [];
        if(translation.length > 0 && !loading){
            array = translation[randomIndex].ru.split(/[ ]/);
            // for(let i:number =0; i<array.length; i++){
            //     if(array[i].includes(","||"?")){
            //         let temp:string[] = array[i].split(/[,,.,?]/);
            //       //  array[i] = temp[0];
            //     }
            // }
        }else {
            for(let i:number = 0; i < 5; i++){
                array.push(" ");
            }
        }
        if(array.length%6 > 0){
            for(let i:number=0; i<array.length%6; i++){
                array.push("");
            }
        }
        return array;
    }
    const onDragEnd = ()=> {

    }
    return (<> 
        <div className='home-page-container'>
            {(loading)?<div className='loader'><span></span></div>:null}
            <div className='content-container'>
                <div className='first-container'>
                    <p id="translate-this-sentence">Translate this sentence</p>
                </div>
                <div className='second-container'>
                    <div className='first-row'>
                      <div className='circle'></div>
                      <div className='half-circle'></div>
                    </div>
                    <div className='second-row'>
                      <div className='english-text'>
                          {(translation.length > 0 && !loading)?translation[randomIndex].en:null}
                      </div>
                    </div>
                </div>
                <div className='third-container'>
                  <div className='vector'></div>
                  <div className='vector'></div>
                  <div className='vector'></div>
                </div>
                <div className='fifth-container'>

                    {getRussianWords().map((item, index) => {return (
                        <div className='word-container'  key={index} >
                            <DragDropContext onDragEnd={onDragEnd}>
                            {(item.trim().length > 0)?
                                <span draggable className='word'>{item}</span>
                                :null}
                            </DragDropContext>
                        </div>
                    ) })}
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