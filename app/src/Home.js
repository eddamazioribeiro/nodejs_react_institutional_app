import React from 'react';
import Layout from './Layout';

const Home = () => {
  return(
    <Layout>
      <div className="container text-center">
        <h1 className="pt-5">Home</h1>
        <hr/>
        <p className="lead">
          Welcome to our page!
        </p>
      </div>
    </Layout>
  );
}

export default Home;