import { useState } from "react";
import  PropTypes  from 'prop-types';

const containerStyle = {
    display : 'flex' , 
    alignItems : 'center' ,
    gap : '16px' 
}

const starContainerStyle = {
    display : 'flex' , 
    alignItems : 'center' ,
    gap : '6px' 
}

function Star({onRate, isFull ,onHoverIn,onHoverOut,starStyle})
{

    function handleClick()
    {
        onRate() ;
    }

    return(
        <span 
        role="button"
        onClick={handleClick} 
        onMouseLeave={onHoverOut}
        onMouseEnter={onHoverIn} 
        style={starStyle}>
            {isFull?
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={starStyle.color}
                stroke={starStyle.color}
                >
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
            </svg>:
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={starStyle.color}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="{2}"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg> 
        }
        </span>
    );
}

StarRating.propTypes = {
    maxRating : PropTypes.number
}

function StarRating({ setStateFun , maxRating=5 , color="#fcc419" ,size=48 ,className="" , defaultRating=0,messages=[]}) {

    const[rating,setRating]=useState(defaultRating<=maxRating?defaultRating:0);
    const[tempRating,setTempRating]=useState(0);

    const starStyle = {
    width : `${size}px` ,
    height : `${size}px` ,
    cursor : "pointer" , 
    display : "block",
    color:color
    };

const textStyle = {
    lineHeight : "1" , 
    margin : "0",
    color:starStyle.color ,
    fontSize : `${size/1.5}px`
}

    

    function handleRating(rate)
    {
        setRating(()=>rate);
        setStateFun(()=>rate)
    }


    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({length:maxRating},(_,index)=> 
                <Star 
                    onRate={()=>handleRating(index+1)}
                    onHoverIn={()=>setTempRating(index+1)}
                    onHoverOut={()=>setTempRating(0)}
                    isFull={tempRating?index<tempRating:index<rating}
                    key={index} 
                    starStyle = {starStyle}
                    defaultRating={defaultRating}
                    />)
                    
                }
            </div>
            <p style={textStyle}>{maxRating===messages.length?
            messages[tempRating?tempRating-1:rating-1]
            :tempRating||rating||""}</p>

        </div>
    )
}

export default StarRating
