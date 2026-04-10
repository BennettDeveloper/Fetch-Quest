import React from 'react';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';

const SearchResultsPage = () => {
  return (
    <AppShell>
      <PageContainer>
        <div className="search-results-page">
          <h1>Search Results</h1>
          <p>Your searched games will appear here.</p>
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default SearchResultsPage;