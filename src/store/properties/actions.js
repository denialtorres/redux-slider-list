//actions are where most of the business logic takes place
//they are dispatched by views or by other actions
// there are 3 types of actions

//async thunks - when doing asynchronous business logic like accessing a service
//sync thunks  when you have substantianl business logicbut its not async
//plain object actions - when you just send plain action to the reducer

import _ from 'lodash';
import * as types from './actionTypes';
import redditService from '../../services/rentealo';

export function fetchTopics() {
  return async(dispatch, getState) => {
    try {
      const subredditArray = await redditService.getDefaultSubreddits();
      const topicsByUrl = _.keyBy(subredditArray, (subreddit) => subreddit.url);
      dispatch({ type: types.TOPICS_FETCHED, topicsByUrl });
    } catch (error) {
      console.error(error);
    }
  };
}
