import React, { useEffect, useState } from 'react';
import '../styles/home-page.scss';
import useFetch from './fetch-data';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
	padding: 10,
	margin: `0 50px 15px 50px`,
	background: isDragging ? "#4a2975" : "white",
    opacity: isDragging ? "0.3" : "1",
	color: isDragging ? "white" : "black",
	border: `1px solid black`,
	fontSize: `20px`,
	borderRadius: `5px`,

	...draggableStyle
})

export default function HomePage (props:any){
    const {loading, translation} = useFetch();
    const [words, setWords] = useState<any[]>([]);
    let randomIndex:number =  Math.ceil(Math.random()/2 *10) - 1;
    useEffect(()=> {
        setWords(getRussianWords())
    }, [loading, translation]) 
    const getRussianWords = ():any[]=> {
        let array:string[]  = [];
        if(translation.length > 0 && !loading){
            array = translation[randomIndex].ru.split(/[ ]/);
            for(let i:number =0; i<array.length; i++){
                let item:any = {
                    id:i.toString(),
                    text:array[i]
                }
                array[i] = item;
            }
        }else {
            for(let i:number = 0; i < 5; i++){
                let item:any = {
                    id:i.toString(),
                    text:" "
                }
                array.push(item);
            }
        }
        const len = array.length % 6;
        if(len > 0){
            for(let i:number=0; i < 6 - len; i++){
                const item:any = {
                    id:(i + array.length).toString(),
                    text:""
                }
                array.push(item);
            }
        }
        return array;
    }
    const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) return

		const items = Array.from(getRussianWords())
		const [ newOrder ] = items.splice(source.index, 1)
		items.splice(destination.index, 0, newOrder)

		setWords(items)
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
                <DragDropContext onDragEnd={onDragEnd}> 
				    <Droppable droppableId="word"> 
					{(provided) => (
						<div className="-word-container" {...provided.droppableProps} ref={provided.innerRef} style={{width:"100%", display:"flex", gap:"10px", flexWrap:"wrap"}}>
							{words.map(( item, index) => { 
								return (
									<Draggable key={item.id} draggableId={item.id} index={parseInt(item.id)} >
										{(provided, snapshot) => (
                                            <div className='word-container' id={`word-container-${item.id}`}>
                                                {item.text.trim().length > 0?
                                                <div className='word'
                                                ref={provided.innerRef}
                                                title={item.id}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                // style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                >
                                                     {item.text}
											    </div>
                                                :null}
                                            </div>
										)}
									</Draggable>
								)
							})}
						</div>
					)}
				    </Droppable>
			    </DragDropContext>
                    {/* {getRussianWords().map((item, index) => {return (
                        <div className='word-container'  key={index} >
                            <DragDropContext onDragEnd={onDragEnd}>
                            {(item.trim().length > 0)?
                                <span draggable className='word'>{item}</span>
                                :null}
                            </DragDropContext>
                        </div>
                    ) })} */}
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