import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { getDataRecords, selectEndpointDataPreview } from "./universalDataViewerSlice";
import { useDispatch, useSelector } from "react-redux";

const UniversalDataViewerEndpoint: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{endpoint ?: string, namespace ?: string}>();
  const [loading, setLoading] = useState(false);
  const [dataPreviewFlat, setDataPreviewFlat] = useState<Array<any>>([]);
  const dataPreview = useSelector(selectEndpointDataPreview);
  const { namespace, endpoint } = location?.state || {};

  useEffect(() => {

    if (!namespace && !endpoint) {
      history.push('/universal-data-viewer');
    }

    if (namespace && endpoint && !dataPreview.hasOwnProperty(`${ namespace }/${ endpoint }`)) {
      dispatch(getDataRecords(namespace, endpoint, '1', '0'));
    }
  }, [endpoint, namespace, history, dataPreview, dispatch]);

  useEffect(() => {
    const preview: Array<any> = [];

    if (dataPreview.hasOwnProperty(`${ namespace }/${ endpoint }`)) {
      dataPreview[`${ namespace }/${ endpoint }`].forEach(data => {
        const flatObj = flattenObject(data.data);
        preview.push(flatObj);
      });

      setDataPreviewFlat(preview);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataPreview]);

  const onLoadMore = () => {
    if (namespace && endpoint) {
      dispatch(getDataRecords(namespace, endpoint, '19', '1'));
      setLoading(true);
    }
  };

  function flattenObject(ob: any) {
    let toReturn = {};

    for (let i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if ((typeof ob[i]) == 'object' && ob[i] !== null) {
        let flatObject = flattenObject(ob[i]);
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          // @ts-ignore
          toReturn[i + ':' + x] = flatObject[x];
        }
      } else {
        // @ts-ignore
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }

  return (
    <div className={'universal-data-viewer-endpoint'}>
      <h2 className={'universal-data-viewer-endpoint-title'}>
        { namespace + "/" + endpoint }
      </h2>
      {dataPreview && dataPreview[`${ namespace }/${ endpoint }`] &&
      (dataPreviewFlat.map((obj, index) => {
        return (
          <div className={'universal-data-viewer-endpoint-data-preview'} key={'data-preview' + index}>
            <div>{index}</div>
            {
              Object.entries(obj).map(([key, value], index) => {
                return <div key={key + index} className={'universal-data-viewer-endpoint-data-preview-item'}>
                  <h3>{key}</h3>
                  <p>{value as string}</p>
                </div>;
              })
            }
          </div>
        );
      })
      )}

      {!loading &&
      <button className={'btn btn-accent'} onClick={() => onLoadMore()}>
        Load more
      </button>
      }

    </div>
  );
};

export default UniversalDataViewerEndpoint;
