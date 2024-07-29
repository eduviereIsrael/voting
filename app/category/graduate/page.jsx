"use client"

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { selectCategories, selectLoading, setCategories, addVote, selectVotes, sendVotes, selectVotingFeedback, selectVotingError, clearMessages } from '@/lib/store/slices/category.slice';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation' 
import toast, { Toaster } from 'react-hot-toast';


const Page = () => {
    const {graduate} = useAppSelector(selectCategories);
    const votes = useAppSelector(selectVotes)
    const votingFeedback = useAppSelector(selectVotingFeedback);
    const votingError = useAppSelector(selectVotingError);
    const loading = useAppSelector(selectLoading)
    const query = useSearchParams()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const navigate = (x) => router.push(x)

    const awardIndex =  Number(query.get('award'))
    const {category_id, category_name, nominees} = graduate?.length > 0 && graduate[awardIndex]

    // console.log(nominees)

    const handleAddVote = (nomineeID) => {
      dispatch(addVote({id: category_id, nomineeID}))
      
    }

    const submitVote = () => {
      dispatch(sendVotes({ votes, categoryEndpoint: "graduate" }));
    }

    useEffect(() => {
      if (votingFeedback) {
          toast.success(votingFeedback);
          const timer = setTimeout(() => {
              dispatch(clearMessages());
              router.push("/category")

          }, 5000); // 10 seconds timeout

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
          }, 5000); // 10 seconds timeout

          // Cleanup the timeout on component unmount or if the effect is triggered again
          return () => clearTimeout(timer);
      }
  }, [votingError, dispatch]);



    return (
        <div className="voting-page">
          {graduate?.length > 0 && <><header className="header">
            <div className="status-bar" style={graduate.length && {display: "grid", gridTemplateColumns: `repeat(${graduate.length}, 1fr)`}} >
                {
                    graduate && graduate.map((award, index) => (
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
                  {awardIndex !== 0 && <button onClick={() => navigate(`/category/graduate?award=${awardIndex-1}`)} > <img className='prev' src="/prev.svg" alt="" /> previous</button>}
                  {awardIndex!== graduate.length - 1 && <button onClick={() => navigate(`/category/graduate?award=${awardIndex+1}`)}   >next <img  className='next' src="/next.svg" alt="" /> </button>}
                  {awardIndex=== graduate.length - 1 && <button onClick={submitVote} >{loading? <>Submiting.. <span className='spinner dark' ></span></>:'Submit votes'}</button>}

                </div>
            </div>
            <div className="nominees-div">
              {
                nominees && nominees.map((nominee, index) => (
                  <div key={index} className="nominee" onClick={() => handleAddVote(nominee.id)} >
                    <div className="img">
                      <img src={nominee.image} alt={`${nominee.name}'s image`} />
                    </div>
                    <div className="details">

                      <span>{index + 1}.</span>
                      <label htmlFor={`nominee-${index}`}>{nominee.name}</label>
                      <input type="radio" id={`nominee-${index}`} name="nominee" checked={votes[category_id] == nominee.id}  size={"50"} value={nominee.name} />
                    </div>
                  </div>
                ))
              }
            </div>
          </main></>}
          {/* <ToastContainer /> */}
          <Toaster
            position="top-right"
            reverseOrder={false}
          />

        </div>
      );
}

export default Page