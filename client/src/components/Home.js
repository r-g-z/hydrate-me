import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/register">Sign Up</Link>

      <p>Lacking in water?</p>
      <p>
        {" "}
        We all need water but how much do you need to drink. Are you reaching
        your daily drinking goals?{" "}
      </p>
    </>
  );
}

export default Home;
