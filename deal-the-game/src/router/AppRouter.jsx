import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import DiscoverPage from '../pages/DiscoverPage';
import GameDetailsPage from '../pages/GameDetailsPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<DiscoverPage />} />
        <Route path={ROUTES.GAME_DETAILS} element={<GameDetailsPage />} />
        <Route path={ROUTES.SEARCH} element={<SearchResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;