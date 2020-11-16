import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { HatClientService } from "../../services/HatClientService";
import { DayGroupedSheFeed, SheFeed } from "./she-feed.interface";
import { startOfDay, subDays } from "date-fns";
import { groupSheFeedByDay } from "../../components/InfiniteScrolling/helper";

const MAX_REPEATS = 5;
let since: number = Math.round(subDays(Date.now(), 30).getTime() / 1000);
let until: number = Math.round(startOfDay(Date.now()).getTime() / 1000);
let step = 1;
let repeats = 0;

type FeedState = {
    feed: SheFeed[];
    displayFeed: DayGroupedSheFeed[];
    updatedAt?: string;
    expirationTime: number;
    fetching: boolean;
};

export const initialState: FeedState = {
  feed: [],
  displayFeed: [],
  expirationTime: 20,
  fetching: true,
};

export const slice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    sheFeed: (state, action: PayloadAction<SheFeed[]>) => {
      state.feed = action.payload;
    },
    sheFeedFetching: (state, action: PayloadAction<boolean>) => {
      state.fetching = action.payload;
    },
    sheFeedDisplayData: (state, action: PayloadAction<DayGroupedSheFeed[]>) => {
      state.displayFeed = action.payload;
    },
  },
});

export const { sheFeed, sheFeedFetching, sheFeedDisplayData } = slice.actions;

export const setSheFeed = (sheFeedData: SheFeed[]): AppThunk => dispatch => {
  dispatch(sheFeed(sheFeedData));
};

export const selectSheFeedFetching = (state: RootState) => state.feed.fetching;
export const selectSheFeedDisplayData = (state: RootState) => state.feed.displayFeed;

export const getSheFeed = (filteredData?: boolean): AppThunk => async (dispatch, getState) => {
  try {
    const currentFeedItems = getState().feed.feed;
    const currentFeedDisplayItems = getState().feed.displayFeed;

    const res = await HatClientService.getInstance().getSheRecords("", since, until);
    
    if (res?.parsedBody) {
      const newSince = Math.round(subDays(since * 1000, 30 * step).getTime() / 1000);
      until = since - 1;
      since = newSince;

      if (res?.parsedBody.length > 0) {
        dispatch(setSheFeed([...currentFeedItems, ...res.parsedBody]));
        dispatch(sheFeedDisplayData([...currentFeedDisplayItems, ...groupSheFeedByDay(res.parsedBody)]));
      }

      if (filteredData) {
        dispatch(sheFeedFetching(false));
      } else {

        if (res?.parsedBody.length > 2 || repeats >= MAX_REPEATS) {
          dispatch(sheFeedFetching(false));
          return;
        }

        if (repeats < MAX_REPEATS) {
          repeats++;
          step++;
          dispatch(getSheFeed());
        }
      }
    }
  } catch (e) {
    // TODO Error Handling
  }
};

export const getInitSheFeed = (): AppThunk => async (dispatch) => {
  if (repeats === 0) {
    dispatch(sheFeedFetching(true));
    dispatch(getSheFeed());
  }
};

export const resetSheFeedValues = (sinceDate?: number, untilDate?: number): AppThunk => async (dispatch) => {
  since = sinceDate || Math.round(subDays(Date.now(), 30).getTime() / 1000);
  until = untilDate || Math.round(startOfDay(Date.now()).getTime() / 1000);
  repeats = 0;
  step = 1;
  dispatch(sheFeedFetching(true));
  dispatch(setSheFeed([]));
  dispatch(sheFeedDisplayData([]));
};

export const getSheFeedFilteredData = (sinceDate: number, untilDate: number): AppThunk => async (dispatch) => {
  dispatch(resetSheFeedValues(sinceDate, untilDate));
  dispatch(getSheFeed(true));
};

export const getMoreSheFeedData = (): AppThunk => async (dispatch) => {
  repeats = 0;
  step = 1;
  dispatch(getSheFeed());
};

export default slice.reducer;
