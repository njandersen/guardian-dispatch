import { Toaster } from "react-hot-toast";

import { useUserData } from "../lib/hooks";
import { UserContext } from "../lib/context";
import NavBar from "../components/UI/NavBar";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <NavBar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
