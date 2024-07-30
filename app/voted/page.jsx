import React from 'react'

const page = () => {
  return (
    <div className='voted' >
        <div className="message">
            <img src="/avaloria.png" alt="" />
            <h1>THANK YOU FOR VOTING</h1>
            <div className="buttons-container">
                <a href="/category" className="vote-button">Vote Again</a>
                <a className="tickets-button" target="_blank" href="https://wa.me/+2349080267234" >Buy Tickets</a>
          </div>
        </div>
    </div>
  )
}

export default page