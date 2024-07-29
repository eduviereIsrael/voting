"use client"

import React, {useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCategories, setCategories } from '@/lib/store/slices/category.slice';


const Data = ({data}) => {
    const dispatch = useAppDispatch();
    
    const categories = useAppSelector(selectCategories)
    useEffect(() => {
        if(data){
            if(!categories.graduates){
                dispatch(setCategories(data));
            }
            // console.log(data)
        }
    }, [data, categories.graduates, dispatch])



  return (
    <div></div>
  )
}

export default Data