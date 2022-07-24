import React from 'react';
import UserLast from '../Users/UserLast'
import MountainImage from './cards/MountainImage';
import LastProductCreate from '../Products/LastProductCreate';
import CardCategories from '../Categories/CardCategories';

const ContentRowTop = () => {
  return (
    <>
        <MountainImage />
      <div className="row">
        <LastProductCreate />
        <UserLast />
        <CardCategories />
      </div>
    </>
  );
};

export default ContentRowTop;
