import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./components/Loading";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import RegisterPage from "./pages/RegisterPage";
import DetailPage from "./pages/DetailPage";
import { asyncPreloadProcess } from "./states/isPreload/action";
import { asyncUnsetAuthUser } from "./states/authUser/action";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import CreateThreadPage from "./pages/CreateThreadPage";
import api from "./utils/API";

function App() {
  const authUser = useSelector((state) => state.authUser) ?? null;
  const isPreload = useSelector((state) => state.isPreload) ?? false;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Loading />
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Loading />
      <div className="app-container">
        <header>
          <Navigation authUser={authUser} signOut={onSignOut} />
        </header>
        <main>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/create-thread" element={<CreateThreadPage />} />
            <Route path="/threads/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
