 

export default function Home() {
 
  return (
    <div className="avaloria-page">
      <div className="container">

        <header className="header">
          <img src="/vote-logo.png" alt="" />
        </header>
        <div className="content">
          {/* <div className="image-container">
            <img src={unicornImage} alt="Unicorn" className="unicorn-image" />
          </div> */}
          <div className="text-container">
            <img src="/hero.png" alt="" />
            <p>Vote for your favorite contestants <br/> in the various categories</p>
          </div>
          <div className="buttons-container">
            <a href="/category" className="vote-button">Vote now</a>
            <a className="tickets-button" href="https://wa.me/+2349080267234" >Buy Tickets</a>
          </div>
        </div>

      </div>

    </div>
  );
}
