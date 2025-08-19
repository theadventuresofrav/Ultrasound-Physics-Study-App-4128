import React from 'react';
import { GetStarted } from '@questlabs/react-sdk';
import { questConfig } from '../config/questConfig';

function GetStartedButton() {
  return (
    <GetStarted 
      questId={questConfig.GET_STARTED_QUESTID}
      uniqueUserId={localStorage.getItem('userId') || questConfig.USER_ID}
      autoHide={false}
    >
      <GetStarted.Header />
      <GetStarted.Progress />
      <GetStarted.Content />
      <GetStarted.Footer />
    </GetStarted>
  );
}

export default GetStartedButton;