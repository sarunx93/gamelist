import React, { useState, useEffect, useContext } from "react";

const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [modalMeOpen, setModalMeOpen] = useState(false);
  const [modalProjectOpen, setModalProjectOpen] = useState(false);
  const [sidebarOpen, setSiderbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModalMe = () => {
    setModalMeOpen(true);
  };
  const closeModalMe = () => {
    setModalMeOpen(false);
  };
  const openModalProj = () => {
    setModalProjectOpen(true);
  };
  const closeModalProj = () => {
    setModalProjectOpen(false);
  };
  const sidebarOpenHandler = () => {
    setSiderbarOpen(true);
  };
  const sidebarCloseHandler = () => {
    setSiderbarOpen(false);
  };

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          "x-rapidapi-key":
            "8e16be4ecamsh6b9af4265b2c4c0p1d1b55jsnfeaad88fd949",
        },
      });
      const data = await response.json();
      setIsLoading(false);
      if (data) {
        setGames(data);
      } else {
        setGames([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(games[0]);
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <AppContext.Provider
      value={{
        games,
        modalMeOpen,
        modalProjectOpen,
        sidebarOpen,
        openModalMe,
        closeModalMe,
        openModalProj,
        closeModalProj,
        sidebarOpenHandler,
        sidebarCloseHandler,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
