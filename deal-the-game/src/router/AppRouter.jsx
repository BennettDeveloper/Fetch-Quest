import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import DiscoverPage from '../pages/DiscoverPage';
import GameDetailsPage from '../pages/GameDetailsPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import RoulettePage from '../pages/RoulettePage';
import VibesPage from '../pages/VibesPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<DiscoverPage />} />
        <Route path={ROUTES.GAME_DETAILS} element={<GameDetailsPage />} />
        <Route path={ROUTES.SEARCH} element={<SearchResultsPage />} />
        <Route path={ROUTES.ROULETTE} element={<RoulettePage />} />
        <Route path={ROUTES.VIBES} element={<VibesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;