import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import PageContainer from '../components/layout/PageContainer';
import GamesGrid from '../components/discover/GamesGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import SectionHeader from '../components/common/SectionHeader';
import Pagination from '../components/common/Pagination';
import { searchDealsByTitle } from '../api/dealsApi';
import { fetchStores } from '../api/storesApi';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '0', 10);

  const [results, setResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSearchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const storesMap = await fetchStores();
        const { deals, totalPages: pages } = await searchDealsByTitle(query, storesMap, currentPage);

        setResults(deals);
        setTotalPages(pages);
      } catch (err) {
        setError('Failed to search for games.');
      } finally {
        setLoading(false);
      }
    };

    loadSearchResults();
  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ q: query, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppShell>
      <PageContainer>
        <div className="search-results-page-content">
          <SectionHeader
            title={query ? `Search Results for "${query}"` : 'Search Results'}
            subtitle={
              query
                ? `Showing game deals that match your search.`
                : 'Enter a game title in the search bar to begin.'
            }
          />

          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && query && results.length > 0 && (
            <>
              <GamesGrid games={results} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {!loading && !error && query && results.length === 0 && (
            <div className="empty-results">
              <h3>No results found</h3>
              <p>Try another title or a broader search term.</p>
            </div>
          )}

          {!loading && !error && !query && (
            <div className="empty-results">
              <h3>No search entered</h3>
              <p>Use the search bar above to look for a game deal.</p>
            </div>
          )}
        </div>
      </PageContainer>
    </AppShell>
  );
};

export default SearchResultsPage;