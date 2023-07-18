import React from 'react';
import {Loader, Section} from 'react-bulma-components';

function Loading() {
  return (
    <Section>
      <div className='columns is-centered'>
        <Loader style={{width: 100, height: 100}}></Loader>
      </div>
    </Section>
  );
}

export default Loading;
