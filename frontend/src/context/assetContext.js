import React, { useState } from "react";

const AssetContext = React.createContext({});

const AssetProvider = ({ children }) => {
  const [asset, setAsset] = useState({});
  return (
    <AssetContext.Provider value={{ asset, setAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export { AssetContext, AssetProvider };
