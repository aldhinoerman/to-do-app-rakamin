import axios from 'axios'
import * as endpoint from './endpoint'
import ActionType from '../action-types'

const axiosInstance = (token) => axios.create({
  baseURL: endpoint.TODOS_URL,
  headers: { 'Authorization': 'Bearer ' + token }
})

export const fetchDataAction = (successMessage) => {
  return async (dispatch, getState) => {
    //Initial dispatch to change loading flag
    dispatch({
      type: ActionType.FETCH_DATA
    })

    try {
      //Fetching Group List
      const { data } = await axiosInstance(getState().authToken).get('')

      //Mapping Request Path For Todo List
      const todoListRequest = data.map((group) => axiosInstance(getState().authToken).get(`${group.id}/items`))

      //Fetching Todos for Each Group List
      let todoListData = await axios.all(todoListRequest)

      //Creating Object for TodoListData with :
      //Key: GroupID
      //Value: Array of TodoList for the group
      todoListData = todoListData.reduce((acc, res) => {
        const key = res.config.url.match(/[0-9]+/)
        return {
          ...acc,
          [key]: res.data
        }
      }, {})

      dispatch({
        type: ActionType.FETCH_DATA_SUCCESS,
        payload: {
          groupData: data,
          todoListData,
          successMessage
        }
      })
    } catch (err) {
      dispatch({
        type: ActionType.FETCH_DATA_ERROR,
        payload: {
          errorMessage: err
        }
      })
    }
  }
}

export const addNewGroupAction = (groupTitle, groupDescription) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ActionType.ADD_NEW_GROUP
    })

    try {
      await axiosInstance(getState().authToken).post('', {
        title: groupTitle,
        description: groupDescription
      })

      //Synchronize todoListDatas with Server Datas
      dispatch(fetchDataAction('A new group has been successfully added'))
    } catch (err) {
      dispatch({
        type: ActionType.ADD_NEW_GROUP_ERROR,
        payload: {
          errorMessage: err.response.data.message
        }
      })
    }
  }
}

export const addTaskAction = (groupID, taskName, taskProgress) => {
  return async (dispatch, getState) => {
    //Initial dispatch to change loading flag
    dispatch({
      type: ActionType.ADD_TASK
    })

    try {
      await axiosInstance(getState().authToken).post(`/${groupID}/items`, {
        name: taskName,
        progress_percentage: taskProgress
      })

      //Synchronize todoListDatas with Server Datas
      dispatch(fetchDataAction('A task has been successfully added'))

    } catch (err) {
      dispatch({
        type: ActionType.ADD_TASK_ERROR,
        payload: {
          errorMessage: err
        }
      })
    }
  }
}

export const deleteTaskAction = (groupID, todoID) => {
  return async (dispatch, getState) => {
    //Initial dispatch to change loading flag
    dispatch({
      type: ActionType.DELETE_TASK
    })

    try {
      await axiosInstance(getState().authToken).delete(`/${groupID}/items/${todoID}`)

      //Synchronize todoListDatas with Server Datas
      dispatch(fetchDataAction('A task has been successfully removed'))

    } catch (err) {
      dispatch({
        type: ActionType.DELETE_TASK_ERROR,
        payload: {
          errorMessage: err
        }
      })
    }
  }
}

export const updateTaskAction = (groupID, todoID, taskName, taskProgress) => {
  return async (dispatch, getState) => {
    //Initial dispatch to change loading flag
    dispatch({
      type: ActionType.UPDATE_TASK
    })

    try {
      await axiosInstance(getState().authToken).patch(`/${groupID}/items/${todoID}`, {
        target_todo_id: groupID,
        name: taskName,
        progress_percentage: taskProgress
      })

      //Synchronize todoListDatas with Server Datas
      dispatch(fetchDataAction('A task has been successfully updated'))

    } catch (err) {
      dispatch({
        type: ActionType.UPDATE_TASK_ERROR,
        payload: {
          errorMessage: err
        }
      })
    }
  }
}

export const moveLeftAction = (groupID, todoID, taskName, taskProgress) => {
  return async (dispatch, getState) => {
    //Initial dispatch to change loading flag
    dispatch({
      type: ActionType.MOVE_LEFT
    })

    try {
      const { groupData } = getState()
      const groupIndex = groupData.findIndex((group) => group.id === groupID)

      await axiosInstance(getState().authToken).delete(`/${groupID}/items/${todoID}`)
      await axiosInstance(getState().authToken).post(`/${groupData[groupIndex - 1].id}/items`, {
        name: taskName,
        progress_percentage: taskProgress
      })

      //Synchronize todoListDatas with Server Datas
      dispatch(fetchDataAction('A task has been successfully moved'))

    } catch (err) {
      dispatch({
        type: ActionType.MOVE_LEFT_ERROR,
        payload: {
          errorMessage: err
        }
      })
    }
  }
}

export const moveRightAction = (groupID, todoID, taskName, taskProgress) => {
  return async (dispatch, getState) => {
    //Initial dispatch to change loading flag
    dispatch({
      type: ActionType.MOVE_RIGHT
    })

    try {
      const { groupData } = getState()
      const groupIndex = groupData.findIndex((group) => group.id === groupID)

      await axiosInstance(getState().authToken).delete(`/${groupID}/items/${todoID}`)
      await axiosInstance(getState().authToken).post(`/${groupData[groupIndex + 1].id}/items`, {
        name: taskName,
        progress_percentage: taskProgress
      })

      //Synchronize todoListDatas with Server Datas
      dispatch(fetchDataAction('A task has been successfully moved'))

      dispatch({
        type: ActionType.ACTION_SUCCESS,
        payload: {
          successMessage: 'A task has been successfully moved'
        }
      })
    } catch (err) {
      dispatch({
        type: ActionType.MOVE_RIGHT_ERROR,
        payload: {
          errorMessage: err
        }
      })
    }
  }
}

export const moveAction = (oldGroupID, newGroupID, todoID) => {
  return async (dispatch, getState) => {
    //Fallback value when error happens inside try-catch block (When makes requests)
    const fallbackTodoListData = {
      ...getState().todoListData
    }

    //Initial dispatch to change loading flag
    dispatch({
      type: ActionType.MOVE,
      payload: {
        oldGroupID,
        newGroupID,
        todoID
      }
    })

    try {
      const { name, progress_percentage } = fallbackTodoListData[oldGroupID].find(todo => todo.id === Number(todoID))

      await axiosInstance(getState().authToken).delete(`/${oldGroupID}/items/${todoID}`)
      await axiosInstance(getState().authToken).post(`/${newGroupID}/items`, {
        name,
        progress_percentage
      })

      //Synchronize todoListDatas with Server Datas
      dispatch(fetchDataAction('A task has been successfully moved'))

    } catch (err) {
      console.log(err)
      dispatch({
        type: ActionType.MOVE_ERROR,
        payload: {
          errorMessage: err,
          fallbackTodoListData: fallbackTodoListData
        }
      })
    }
  }
}

export const registerAction = (name, email, password, password_confirmation) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.REGISTER })

    try {
      const { data: { message, auth_token } } = await axios.post(endpoint.REGISTER_URL, {
        name,
        email,
        password,
        password_confirmation
      })

      //Save token to local storage
      localStorage.setItem('authToken', auth_token)

      dispatch({
        type: ActionType.REGISTER_SUCCESS,
        payload: {
          successMessage: message,
          authToken: auth_token
        }
      })
    }
    catch (err) {
      dispatch({
        type: ActionType.REGISTER_ERROR,
        payload: {
          errorMessage: err.response.data.message
        }
      })
    }
  }
}

export const loginAction = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: ActionType.LOGIN
    })

    try {
      const { data: { auth_token } } = await axios.post(endpoint.LOGIN_URL, {
        email,
        password
      })

      //Save token to local storage
      localStorage.setItem('authToken', auth_token)

      dispatch({
        type: ActionType.LOGIN_SUCCESS,
        payload: {
          authToken: auth_token
        }
      })
    }
    catch (err) {
      dispatch({
        type: ActionType.LOGIN_ERROR,
        payload: {
          errorMessage: err.response.data.message
        }
      })
    }
  }
}

export const checkAuthenticationAction = () => {
  return dispatch => {
    const authToken = localStorage.getItem('authToken')

    if (authToken) {
      return dispatch({
        type: ActionType.CHECK_AUTHENTICATION_SUCCESS,
        payload: {
          authToken
        }
      })
    }
  }
}

export const logoutAction = () => {
  return dispatch => {
    dispatch({
      type: ActionType.LOGOUT
    })

    try {
      localStorage.removeItem('authToken')
      setTimeout(() => {
        dispatch({
          type: ActionType.LOGOUT_SUCCESS,
          payload: {
            successMessage: 'You have been logged out'
          }
        })
      }, 100)
    } catch (err) {
      dispatch({
        type: ActionType.LOGOUT_ERROR,
        payload: {
          errorMessage: err
        }
      })
    }
  }

}