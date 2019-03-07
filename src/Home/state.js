import { API_ENDPOINT } from '../common/config';

import * as FetchHelper from '../common/fetch.helper';
import * as StateHelper from '../common/state.helper';

import { AuthService } from '../Auth/Auth.service';

import * as Activity from '../Shared/Activity.service';

/**
 * Module Name
 */

export const MODULE = 'Home';

/**
 * Initial State
 */

const INITIAL_STATE = {
  tasks: null,
};

/**
 * Reset
 */

const reset = StateHelper.createSimpleOperation(MODULE, 'reset');

export const $reset = reset.action;

/**
 * Fetch Index
 */

const fetchTasks = StateHelper.createAsyncOperation(MODULE, 'fetchTasks');

export function $fetchTasks() {
  return (dispatch) => {
    Activity.processing(MODULE, fetchTasks.name);
    dispatch(fetchTasks.request());

    return fetch(`${API_ENDPOINT}/task`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(fetchTasks.success(result)))
      .catch((error) => dispatch(fetchTasks.failure(error)))
      .finally(() => Activity.done(MODULE, fetchTasks.name));
  };
}

/**
 * Create task
 */

const createTask = StateHelper.createAsyncOperation(MODULE, 'createTask');

export function $createTask(text) {
  return async (dispatch) => {
    Activity.processing(MODULE, createTask.name);
    dispatch(createTask.request());

    return fetch(`${API_ENDPOINT}/task/create`, {
      headers: {
        Authorization: `Bearer ${AuthService.getAccessToken()}`,
      },
      body: JSON.stringify(text),
    })
      .then(FetchHelper.ResponseHandler, FetchHelper.ErrorHandler)
      .then((result) => dispatch(createTask.success(result)))
      .catch((error) => dispatch(createTask.failure(error)))
      .finally(() => Activity.done(MODULE, createTask.name));
  };
}

/**
 * Complete task
 */

const completeTask = StateHelper.createSimpleOperation(MODULE, 'completeTask');

export function $completeTask(taskId) {
  return completeTask.action({ id: taskId });
}

/**
 * Uncomplete task
 */

const uncompleteTask = StateHelper.createSimpleOperation(MODULE, 'uncompleteTask');

export function $uncompleteTask(taskId) {
  return uncompleteTask.action({ id: taskId });
}

/**
 * Edit task
 */

const editTask = StateHelper.createSimpleOperation(MODULE, 'editTask');

export function $editTask(taskId, text) {
  return editTask.action({ id: taskId, text });
}

/**
 * Reducer
 */

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case reset.TYPE:
      return INITIAL_STATE;
    case fetchTasks.REQUEST:
      return {
        ...state,
        tasks: null,
      };
    case fetchTasks.SUCCESS:
      return {
        ...state,
        tasks: action.data,
      };
    case fetchTasks.FAILURE:
      return {
        ...state,
        tasks: null,
      };
    case createTask.SUCCESS:
      return {
        ...state,
        tasks: state.tasks.concat(action.result),
      };
    case completeTask.TYPE:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return {
              ...task,
              done: true,
            };
          }

          return task;
        }),
      };
    case uncompleteTask.TYPE:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return {
              ...task,
              done: false,
            };
          }

          return task;
        }),
      };
    default:
      return state;
  }
}

/**
 * Persister
 */

export function persister({ index }) {
  return {
    index,
  };
}
