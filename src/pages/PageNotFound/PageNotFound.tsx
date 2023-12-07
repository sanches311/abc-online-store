import * as React from 'react';
import styled from 'styled-components';

const PageNotFound: React.FC = () => {
  const WrapperPage = styled.div`
    margin: 30px;
  `;

  return (
    <WrapperPage>
      <h1>Page not found</h1>
    </WrapperPage>
  );
};

export default PageNotFound;
