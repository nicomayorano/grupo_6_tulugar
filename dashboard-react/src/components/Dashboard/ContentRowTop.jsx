import React from 'react';
import UserLast from '../UserLast'
import ContentRowProducts from './cards/ContentRowProducts';
import LastProductCreate from './LastProductCreate';

const ContentRowTop = () => {
  return (
    <>
      
        
        {/* <!-- Content Row Movies--> */}
        <ContentRowProducts />
        {/* <!-- End movies in Data Base --> */}

        {/* <!-- Content Row Last Movie in Data Base --> */}
        <div className="row">
          {/* <!-- Last Movie in DB --> */}
          <LastProductCreate />
          {/* <!-- End content row last movie in Data Base --> */}
        
          {/* <!--   <GenresInDb /> --> */}
          <UserLast />
        </div>
      
    </>
  );
};

export default ContentRowTop;
