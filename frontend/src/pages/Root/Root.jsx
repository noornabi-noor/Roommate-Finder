import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigation } from "react-router-dom";
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';
import FallbackLoader from '../../Components/FallbackLoader/FallbackLoader';
import React, { useState, useEffect, Suspense } from "react";
import Footer from "../../Components/Footer/Footer";
import { ThemeProvider } from '../../context/ThemeContext';


const Root = () => {

      const navigation = useNavigation();
      const [loadingState, setLoadingState] = useState(false);

      useEffect(() => {
          const loadingTimer = setTimeout(() => setLoadingState(true), 100);
          const stopLoadingTimer = setTimeout(() => setLoadingState(false), 200);

          return () => {
              clearTimeout(loadingTimer);
              clearTimeout(stopLoadingTimer);
          };
      }, []);

  return (
    <div className="relative">
            {(navigation.state === 'loading' || loadingState) && <LoadingSpinner />}
            <ThemeProvider>
                <Navbar />
            </ThemeProvider>

            
            
            <Suspense fallback={<FallbackLoader />}>
                <Outlet />
            </Suspense>

            <Footer/>
        </div>
  );
};

export default Root;