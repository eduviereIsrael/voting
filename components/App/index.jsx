

import React from 'react';

import Data from '../data';
import axios from 'axios';
// import { j }

const fetchNominees = async () => {
  try {

    const undergraduateResponse = await axios.get('https://ules-awards-323191032ef6.herokuapp.com/nominees/type/undergraduate');
    const graduateResponse = await axios.get('https://ules-awards-323191032ef6.herokuapp.com/nominees/type/graduate');
    const generalResponse = await axios.get('https://ules-awards-323191032ef6.herokuapp.com/nominees/type/general');

    return {
      undergraduate: undergraduateResponse.data,
      graduate: graduateResponse.data,
      general: generalResponse.data,
    };

  } catch (error) {
    console.error('Error fetching nominees:', error);
    return {
      undergraduate: [],
      graduate: [],
      general: [],
    };
  }
};

const AppWrapper = async ({children}) => {

  const data = await fetchNominees()


  return (
    <div className='App' >
      <Data data={data} />
        {children}
    </div>
  )
}

export default AppWrapper