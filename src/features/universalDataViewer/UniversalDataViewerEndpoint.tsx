import React, { useEffect } from "react";
import { useLocation } from "react-router";

const UniversalDataViewerEndpoint: React.FC = () => {
  const location = useLocation<{endpoint ?: string, namespace ?: string}>();
  const { namespace, endpoint } = location.state;

  useEffect(() => {
    console.log(namespace, endpoint);
  }, [endpoint, namespace]);

  return (
    <div>
            lala
    </div>
  );
};

export default UniversalDataViewerEndpoint;
