"use client"

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCategories, setCategories, selectLoading, addVote, selectVotes, sendVotes, selectVotingFeedback, selectVotingError, clearMessages } from '@/lib/store/slices/category.slice';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation' 
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
import jwt from "jsonwebtoken"




const Page = () => {
    const {general} = useAppSelector(selectCategories);
    const votes = useAppSelector(selectVotes)
    const votingFeedback = useAppSelector(selectVotingFeedback);
    const votingError = useAppSelector(selectVotingError);
    const loading = useAppSelector(selectLoading)

    const query = useSearchParams()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const navigate = (x) => router.push(x)

    const awardIndex =  Number(query.get('award'))
    const {category_id, category_name, nominees} = general?.length > 0 && general[awardIndex]

    // console.log(nominees)

    const handleAddVote = (nomineeID) => {
      dispatch(addVote({id: category_id, nomineeID}))
      
    }

    // const submitVote = () => {
    //   dispatch(sendVotes({ votes, categoryEndpoint: "general" }));
    // }

    const submitVote = () => {
      // console.log(process.env.SECRET)
      const options = {
        expiresIn: '6s', 
      };
      const secret = process.env.NEXT_PUBLIC_JWT_SECRET
      const token = jwt.sign({vote: "votes"} ,secret, options)
      dispatch(sendVotes({ votes, categoryEndpoint: "general", token }));

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

  const moveToFirstPosition = (data, targetName) => {
    // Find the index of the object with the matching name
    const array = data?.length > 0? [...data] : []
    
    if(array?.length > 5){
      // console.log(array)

      const index = array.findIndex(obj => obj.name === targetName);
    
      // If the object is found and it's not already in the second position
      if (index !== -1 && index !== 1) {
        // Remove the object from its current position
        const [item] = array.splice(index, 1);

        // console.log(item)
    
        // Insert the object at the second position (index 1)
        array.splice(0, 0, item);
      }

    
      return array;
    }
  };

  const moveToSecondPosition = (data, targetName) => {
    // Find the index of the object with the matching name
    // console.log(data)

    let array = data?.length > 0? [...data] : []
    if(array?.length > 5){

      const index = array.findIndex(obj => obj.name === targetName);
    
      // If the object is found and it's not already in the second position
      if (index !== -1 && index !== 1) {
        // Remove the object from its current position
        const [item] = array.splice(index, 1);
    
        // Insert the object at the second position (index 1)
        array.splice(1, 0, item);
      }
    
      return array;
    }
  };

  const firstData = moveToSecondPosition(nominees, "Mide Victor")
  console.log(firstData)

  const renderedNominees = moveToFirstPosition(firstData, 'Ayomide Yusuf')
  console.log(renderedNominees)

  const chooseOne = (first, second) => {
    if (!first[0]?.name){
      console.log(first[0])
      return second
    }
    return first
  }


    return (
        <div className="voting-page">
          {general?.length > 0 && <><header className="header">
            <div className="status-bar" style={general.length && {display: "grid", gridTemplateColumns: `repeat(${general.length}, 1fr)`}} >
                {
                    general && general.map((award, index) => (
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

                  {awardIndex !== 0 && <button onClick={() => navigate(`/category/general?award=${awardIndex-1}`)} >  <img className='prev' src="/prev.svg" alt="" /> previous </button>}
                  {awardIndex!== general.length - 1 && <button onClick={() => navigate(`/category/general?award=${awardIndex+1}`)}   >next <img  className='next' src="/next.svg" alt="" />  </button>}
                  {awardIndex=== general.length - 1 && <button onClick={submitVote} >{loading? <>Submiting.. <span className='spinner dark' ></span></>:'Submit votes'}</button>}

                </div>
            </div>
            <div className="nominees-div">
              {
                ( nominees)?.map((nominee, index) => (
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
                
                <div className="buttons mobile">
                  {awardIndex === 0 && <span > </span>}
                  {awardIndex !== 0 && <button onClick={() => navigate(`/category/general?award=${awardIndex-1}`)} > <img className='prev' src="/prev.svg" alt="" /> previous</button>}
                  {awardIndex!== general.length - 1 && <button onClick={() => navigate(`/category/general?award=${awardIndex+1}`)}   >next <img  className='next' src="/next.svg" alt="" /> </button>}
                  {awardIndex=== general.length - 1 && <button onClick={submitVote} >{loading? <>Submiting.. <span className='spinner dark' ></span></>:'Submit votes'}</button>}

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