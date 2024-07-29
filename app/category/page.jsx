"use client"

import React from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCategories, selectGeneralSubmit, selectGraduatesSubmit, selectUndergraduatesSubmit } from '@/lib/store/slices/category.slice';
import { useRouter } from 'next/navigation';


const Page = () => {

    const categories = useAppSelector(selectCategories)
    const graduatesSubmit = useAppSelector(selectGraduatesSubmit);
    const generalSubmit = useAppSelector(selectGeneralSubmit);
    const undergraduatesSubmit = useAppSelector(selectUndergraduatesSubmit);
    const router = useRouter()

    const navigateCategory = (x) => router.push(`/category/${x}?award=0`)

    return (
        <div className="vote-categories">
            {
                categories.graduate && 
            <div className="container">

                <h1 className="title">Vote By Categories</h1>
                <p className="subtitle">Select a category</p>
                <div className="categories">
                    <div className="category" onClick = {graduatesSubmit? null : () => navigateCategory("graduate")} >
                        <span className="category-name">GRADUATE | <span className="awards" > {categories['graduate'].length} awards</span></span>
                        <span className="status">{graduatesSubmit? "voted" : "tap to vote"}</span>
                    {/* <span className="awards">16 Awards</span> */}
                    </div>
                    <div className="category" onClick = {undergraduatesSubmit? null : () => navigateCategory("undergraduate")} >
                        <span className="category-name">UNDERGRADUATE | <span className="awards" > {categories['undergraduate'].length} awards</span></span>
                        <span className="status">{undergraduatesSubmit? "voted" : "tap to vote"}</span>
                    {/* <span className="awards">15 Awards</span> */}
                    </div>
                    <div className="category" onClick = {generalSubmit? null : () => navigateCategory("general")} >
                        <span className="category-name">GENERAL & MAIN | <span className="awards" > {categories['general'].length} awards</span></span>
                        <span className="status">{generalSubmit? "voted" : "tap to vote"}</span>
                    {/* <span className="awards">7 Awards</span> */}
                    </div>
                </div>
            </div>
            }
        </div>
      );
}

export default Page