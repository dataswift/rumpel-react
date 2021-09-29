import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { getPdaAuthApplicationById, getPdaAuthFunctionById } from "../../services/HattersService";
import { HatApplicationContent } from "hmi/dist/interfaces/hat-application.interface";
import { HatTool } from "../../features/tools/hat-tool.interface";
import { RegistrationRedirectError } from "../../types/Hatters";

type ApplicationsState = {
  parentApp: HatApplicationContent | null;
  dependencyApps: HatApplicationContent[];
  dependencyContracts: HatApplicationContent[];
  dependencyTools: HatTool[];
  error: RegistrationRedirectError | null;
};

export const initialState: ApplicationsState = {
  parentApp: null,
  dependencyApps: [],
  dependencyTools: [],
  dependencyContracts: [],
  error: null,
};

export const slice = createSlice({
  name: 'hmiPdaAuth',
  initialState,
  reducers: {
    updateParentApp: (state, action: PayloadAction<HatApplicationContent>) => {
      state.parentApp = action.payload;
    },
    updateDependencyApps: (state, action: PayloadAction<HatApplicationContent>) => {
      state.dependencyApps.push(action.payload);
    },
    updateDependencyContracts: (state, action: PayloadAction<HatApplicationContent>) => {
      state.dependencyContracts.push(action.payload);
    },
    updateDependencyTools: (state, action: PayloadAction<HatTool>) => {
      state.dependencyTools.push(action.payload);
    },
    updateError: (state, action: PayloadAction<RegistrationRedirectError>) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateParentApp,
  updateDependencyApps,
  updateDependencyContracts,
  updateDependencyTools,
  updateError
} = slice.actions;

export const setParentApp =
  (app: HatApplicationContent): AppThunk =>
    (dispatch) => {
      dispatch(updateParentApp(app));
    };

export const setDependencyApp =
  (app: HatApplicationContent): AppThunk =>
    (dispatch) => {
      dispatch(updateDependencyApps(app));
    };

export const setDependencyContract =
  (app: HatApplicationContent): AppThunk =>
    (dispatch) => {
      dispatch(updateDependencyContracts(app));
    };

export const setDependencyTool =
  (tools: HatTool): AppThunk =>
    (dispatch) => {
      dispatch(updateDependencyTools(tools));
    };

export const selectParentApp = (state: RootState) => state.hmiPdaAuth.parentApp;
export const selectDependencyApp = (state: RootState) => state.hmiPdaAuth.dependencyApps;
export const selectDependencyTools = (state: RootState) => state.hmiPdaAuth.dependencyTools;
export const selectDependencyContracts = (state: RootState) => state.hmiPdaAuth.dependencyContracts;
export const selectHmiSetupError = (state: RootState) => state.hmiPdaAuth.error;

export const getPdaAuthParentApplication = (
  applicationId: string, lang: string
): AppThunk => async (dispatch, getState) => {
  try {
    const currentParentApp = getState().hmiPdaAuth.parentApp;

    if (currentParentApp?.id === applicationId) return;

    const app = await getPdaAuthApplicationById(applicationId, lang);

    if (app.parsedBody) {
      return dispatch(setParentApp(app.parsedBody));
    }
  } catch (error) {
    const err: RegistrationRedirectError = {
      error: 'application_misconfigured',
      reason: 'application_id_not_found',
    };

    return dispatch(updateError(err));
  }
};

export const getPdaAuthParentApplicationPlugDependency = (
  applicationId: string
): AppThunk => async (dispatch, getState) => {
  try {
    const currentApplicationDependencies = getState().hmiPdaAuth.dependencyApps;

    if (currentApplicationDependencies.find(dependency => dependency.id === applicationId)) return;

    const app = await getPdaAuthApplicationById(applicationId);

    if (app.parsedBody) {
      return dispatch(setDependencyApp(app.parsedBody));
    }
  } catch (e) {
    const err: RegistrationRedirectError = {
      error: 'application_misconfigured',
      reason: 'application_dependency_not_found',
    };

    return dispatch(updateError(err));
  }
};

export const getPdaAuthParentApplicationContractDependency = (
  applicationId: string
): AppThunk => async (dispatch, getState) => {
  try {
    const currentApplicationDependencies = getState().hmiPdaAuth.dependencyContracts;

    if (currentApplicationDependencies.find(dependency => dependency.id === applicationId)) return;

    const app = await getPdaAuthApplicationById(applicationId);

    if (app.parsedBody) {
      return dispatch(setDependencyContract(app.parsedBody));
    }
  } catch (e) {
    const err: RegistrationRedirectError = {
      error: 'application_misconfigured',
      reason: 'contract_not_found',
    };

    return dispatch(updateError(err));
  }
};

export const getPdaAuthParentApplicationToolDependency = (
  functionId: string
): AppThunk => async (dispatch, getState) => {
  try {
    const currentToolDependencies = getState().hmi.dependencyTools;

    if (currentToolDependencies.find(dependency => dependency.id === functionId)) return;

    const tool = await getPdaAuthFunctionById(functionId);

    if (tool.parsedBody) {
      return dispatch(setDependencyTool(tool.parsedBody));
    }
  } catch (e) {
    const err: RegistrationRedirectError = {
      error: 'application_misconfigured',
      reason: 'function_not_found',
    };

    return dispatch(updateError(err));
  }
};

export default slice.reducer;
