

import { useState } from 'react';
import Button from './Button';

function ListBox({children}) {

    const [isDisplayed,setIsDisplayed] = useState(true);

    function handleToggleButton()
    {
        setIsDisplayed(()=>!isDisplayed) ;
    }
    return (
        <div className="box">
            <Button classVal="btn-toggle" onClickHandler={handleToggleButton}>{isDisplayed?'-':'+'}</Button>
            {isDisplayed&&children}
        </div>
    )
}

export default ListBox
