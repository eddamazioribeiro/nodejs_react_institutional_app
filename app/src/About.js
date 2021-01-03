import React from 'react';
import Layout from './Layout';

const About = () => {
  return(
    <Layout>
      <div className="containter text-center">
        <h1 className="pt-5">About</h1>
        <hr/>
        <p className="lead">
          This is our Institutional Page.<br/>
          You can find usefull information about us here.
        </p>
      </div>
    </Layout>
  );
}

export default About;