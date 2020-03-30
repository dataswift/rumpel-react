import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { get } from '../../services/BackendService';
import {HatApplication} from "@dataswift/hat-js/lib/interfaces/hat-application.interface";

type ApplicationsState = {
    parentApp: HatApplication | null;
    dependencyApps: HatApplication[];
    updatedAt?: string;
    expirationTime: number;
};

const initialState: ApplicationsState = {
    parentApp: null,
    dependencyApps: [],
    expirationTime: 5
};

export const slice = createSlice({
    name: 'hatLogin',
    initialState,
    reducers: {
        parentApp: (state, action: PayloadAction<HatApplication>) => {
            state.parentApp = action.payload;
        },
        dependencyApps: (state, action: PayloadAction<Array<HatApplication>>) => {
            state.dependencyApps.push(...action.payload);
        },
    },
});

export const { parentApp, dependencyApps } = slice.actions;

export const setParentApp = (app: HatApplication): AppThunk => dispatch => {
    dispatch(parentApp(app));
};

export const setDependencyApps = (app: Array<HatApplication>): AppThunk => dispatch => {
    dispatch(dependencyApps(app));
};

export const selectParentApp = (state: RootState) => state.hatLogin.parentApp;
export const selectDependencyApps = (state: RootState) => state.hatLogin.dependencyApps;

export const getApplication = (id: string, lang: string): AppThunk => async dispatch => {
    try {
        let url = `/api/applications/${id}`;

        if (lang && lang !== 'en') {
            url += `?lang=${lang}`;
        }

        const app = await get<HatApplication>(url);
        if (app.parsedBody) {
            return dispatch(setParentApp(app.parsedBody));
        }
    } catch (error) {
        // const err: RegistrationRedirectError = {
        //   error: 'application_misconfigured',
        //   reason: 'application_id_not_found',
        // };

        // return dispatch(setApps(err));
    }
};

export const getApplications = (parentAppId: string): AppThunk => async dispatch => {
    let url = `/api/applications/${parentAppId}`;

    const app = await get<HatApplication>(url);
    if (app.parsedBody) {
        return dispatch(setParentApp(app.parsedBody))
    }
};

export default slice.reducer;
