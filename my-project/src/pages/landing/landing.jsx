import React from 'react';
import Banner from '../banner/Banner';
import Categories from './Categories';

import Posts from './post/Posts';


function Landing() {
  return (
    <div className="w-full">
      <Banner />
      <div className="flex flex-col sm:flex-row p-4">
        {/* Categories Section */}
        <div className="w-full sm:w-1/3 lg:w-1/4 p-2">
          <Categories />
        </div>

        {/* Posts Section */}
        <div className="w-full sm:w-2/3 lg:w-3/4 p-2">
          <h2 className="text-lg font-semibold"><Posts/></h2>
          {/* Add your posts component here */}
        </div>
      </div>
    </div>
  );
}

export default Landing;
