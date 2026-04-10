import React from 'react';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';

const NotFoundPage = () => {
  return (
    <AppShell>
      <PageContainer>
        <div className="not-found-page">
          <h1>404</h1>
          <p>This page wandered off into the bargain bin.</p>
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default NotFoundPage;