"use client"

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCategories, setCategories,selectLoading, addVote, selectVotes, sendVotes, selectVotingFeedback, selectVotingError, clearMessages } from '@/lib/store/slices/category.slice';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation' 
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import jwt from "jsonwebtoken"



const Page = () => {
    const {undergraduate} = useAppSelector(selectCategories);
    const votes = useAppSelector(selectVotes)
    const votingFeedback = useAppSelector(selectVotingFeedback);
    const votingError = useAppSelector(selectVotingError);
    const loading = useAppSelector(selectLoading)

    const query = useSearchParams()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const navigate = (x) => router.push(x)

    const awardIndex =  Number(query.get('award'))
    const {category_id, category_name, nominees} = undergraduate?.length > 0 && undergraduate[awardIndex]

    // console.log(nominees)

    const handleAddVote = (nomineeID) => {
      dispatch(addVote({id: category_id, nomineeID}))
      
    }

    const submitVote = () => {
      // console.log(process.env.SECRET)
      const options = {
        expiresIn: '6s', 
      };
      const secret = process.env.NEXT_PUBLIC_JWT_SECRET
      const token = jwt.sign({vote: "votes"} ,secret, options)
      dispatch(sendVotes({ votes, categoryEndpoint: "undergraduate", token }));

      console.log(process.env.NEXT_PUBLIC_JWT_SECRET, token)
    }

    useEffect(() => {
      if (votingFeedback) {
          toast.success(votingFeedback);
          const timer = setTimeout(() => {
              dispatch(clearMessages());
              router.push("/voted")

          }, 2000); // 10 seconds timeout

          // Cleanup the timeout on component unmount or if the effect is triggered again
          return () => clearTimeout(timer);
      }
  }, [votingFeedback, dispatch, router]);

  // useEffect for handling voting error
  useEffect(() => {
      if (votingError) {
          toast.error(votingError);
          const timer = setTimeout(() => {
              dispatch(clearMessages());
          }, 2000); // 10 seconds timeout

          // Cleanup the timeout on component unmount or if the effect is triggered again
          return () => clearTimeout(timer);
      }
  }, [votingError, dispatch]);



    return (
        <div className="voting-page">
          {undergraduate?.length > 0 && <><header className="header">
            <div className="status-bar" style={undergraduate.length && {display: "grid", gridTemplateColumns: `repeat(${undergraduate.length}, 1fr)`}} >
                {
                    undergraduate && undergraduate.map((award, index) => (
                        <div key={index} style={ {opacity: awardIndex == index? "1" : "0.3"}} ></div>
                    ))
                }
            </div>
            <div className="logo-title">
              <h2>CATEGORY : {category_name}</h2>
              <img src="/vote-logo.png" alt="ULFS Logo" className="logo" />
            </div>
          </header>
          <main className="vote-content">
            <div className="content-header">
                <div className="award-title">
                    <div className="index"></div>
                    <h3>Cast your vote for the {category_name} in engineering</h3>
                    <p>You can only select one option in each category</p>
                </div>
                <div className="buttons">
                {awardIndex === 0 && <span > </span>}

                  {awardIndex !== 0 && <button onClick={() => navigate(`/category/undergraduate?award=${awardIndex-1}`)} >  <img className='prev' src="/prev.svg" alt="" /> previous </button>}
                  {awardIndex!== undergraduate.length - 1 && <button onClick={() => navigate(`/category/undergraduate?award=${awardIndex+1}`)}   >next <img  className='next' src="/next.svg" alt="" />  </button>}
                  {awardIndex=== undergraduate.length - 1 && <button onClick={submitVote} >{loading? <>Submiting.. <span className='spinner dark' ></span></>:'Submit votes'}</button>}

                </div>
            </div>
            <div className="nominees-div">
              {
                nominees && nominees.map((nominee, index) => (
                  <div key={index} className="nominee" onClick={() => handleAddVote(nominee.id)} >
                    {
                      nominee.image.trim() && 
                    <div className="img">
                      <img src={nominee.image} referrerPolicy='no-referrer' alt="image" />
                    </div>
                    }
                    <div className="details">

                      <span>{index + 1}.</span>
                      <label htmlFor={`nominee-${index}`}>{nominee.name}</label>
                      <input type="radio" id={`nominee-${index}`} name="nominee" checked={votes[category_id] == nominee.id}  size={"50"} value={nominee.name} />
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="content-header-bottom mobile">
                
                <div className="buttons">
                  {awardIndex === 0 && <span > </span>}
                  {awardIndex !== 0 && <button onClick={() => navigate(`/category/undergraduate?award=${awardIndex-1}`)} > <img className='prev' src="/prev.svg" alt="" /> previous</button>}
                  {awardIndex!== undergraduate.length - 1 && <button onClick={() => navigate(`/category/undergraduate?award=${awardIndex+1}`)}   >next <img  className='next' src="/next.svg" alt="" /> </button>}
                  {awardIndex=== undergraduate.length - 1 && <button onClick={submitVote} >{loading? <>Submiting.. <span className='spinner dark' ></span></>:'Submit votes'}</button>}

                </div>
            </div>
          </main></>}
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </div>
      );
}

export default Page