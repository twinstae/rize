import React from "react";
import App from "./App";
import ReactDOM from "react-dom";
import QueryWrapper from "./hooks/QueryWrapper";
import { Dependencies } from "./hooks/Dependencies";
import useRRDNavigation from "./router/useRRDNavigation";
import useUsernameService from "./config/useUsernameService";
import { toOriginalName } from "./constants";
import Image from "./components/Image";
import { atom, useAtom } from "jotai";
import "./theme/variables.css"
import "./i18n/i18n";
import "./index.css";
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from '@ionic/react-router'
import { WrapperT } from "./global";
setupIonicReact();

const currentTagAtom = atom("");

const DependencyWrapper: WrapperT = ({ children }) => {
  const navigation = useRRDNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  const [tag, setTag] = useAtom(currentTagAtom);

  return (
    <Dependencies.Provider
      value={{
        toNick: toOriginalName,
        navigation,
        usernameService: useUsernameService(),
        Image,
        isDark: colorMode === "dark",
        toggleDark: toggleColorMode,
        tag,
        setTag,
      }}
    >
      {children}
    </Dependencies.Provider>
  );
};

ReactDOM.render(
  <IonApp>
    <IonReactRouter>
      <QueryWrapper>
        <DependencyWrapper>
          <App />
        </DependencyWrapper>
      </QueryWrapper>
    </IonReactRouter>
  </IonApp>,
  document.getElementById("root")
);
