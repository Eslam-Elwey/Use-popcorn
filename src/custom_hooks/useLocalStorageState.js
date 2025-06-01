import { useEffect, useState } from "react";

export function useLocalStorageState(initalVlaue,keyname )
{

    const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(keyname);
    console.log(typeof storedValue);
        return storedValue?JSON.parse(storedValue):initalVlaue;
    });
    
    useEffect(
    function () {
      localStorage.setItem(keyname, JSON.stringify(value));
    },
    [value,keyname]
  );


  return [value,setValue] ;
}