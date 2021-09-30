import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPdaAuthParentApplication,
  getPdaAuthParentApplicationContractDependency,
  getPdaAuthParentApplicationPlugDependency,
  getPdaAuthParentApplicationToolDependency,
  selectDependencyApp,
  selectDependencyContracts,
  selectDependencyTools,
  selectHmiSetupError,
  selectParentApp,
} from '../redux/pdaAuth/hmiPdaAuthSlice';

export default function usePdaAuthHmi(
  applicationId?: string,
  lang: string = 'en',
  skipDeps = false,
) {
  const dispatch = useDispatch();
  const parentApp = useSelector(selectParentApp);
  const dependencyApps = useSelector(selectDependencyApp);
  const dependencyTools = useSelector(selectDependencyTools);
  const dependencyContracts = useSelector(selectDependencyContracts);
  const hmiSetupError = useSelector(selectHmiSetupError);

  useEffect(() => {
    if (!applicationId || parentApp?.id === applicationId) return;

    dispatch(getPdaAuthParentApplication(applicationId, lang));
  }, [applicationId, dispatch, lang, parentApp?.id]);

  useEffect(() => {
    if (!parentApp?.dependencies || skipDeps) return;

    if (parentApp.dependencies.plugs.length > 0) {
      parentApp.dependencies.plugs.forEach((appId) => {
        dispatch(getPdaAuthParentApplicationPlugDependency(appId));
      });
    }

    if (parentApp.dependencies.tools.length > 0) {
      parentApp.dependencies.tools.forEach((toolId) => {
        dispatch(getPdaAuthParentApplicationToolDependency(toolId));
      });
    }

    if (parentApp.dependencies.contracts.length > 0) {
      parentApp.dependencies.contracts.forEach((contractId) => {
        dispatch(getPdaAuthParentApplicationContractDependency(contractId));
      });
    }
  }, [dispatch, parentApp, skipDeps]);

  return {
    parentApp,
    dependencyApps,
    dependencyTools,
    dependencyContracts,
    hmiSetupError,
  };
}
