import React from 'react';
import UserLast from '../Users/UserLast'
import MountainImage from './cards/MountainImage';
import LastProductCreate from '../Products/LastProductCreate';

const ContentRowTop = () => {
  return (
    <>
        <MountainImage />
      <div className="row">
        <LastProductCreate />
        <UserLast />
      </div>
    </>
  );
};

export default ContentRowTop;
