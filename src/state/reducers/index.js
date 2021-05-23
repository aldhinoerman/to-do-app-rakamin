import ActionType from "../action-types"
import produce from "immer"

const initialState = {
  groupData: [],
  todoListData: {},
  loading: false,
  errorMessage: null,
  successMessage: null,
  authToken: null
}

//State mutations are done with help from Immer Library to reduce spread operator usage
const reducer = produce((state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOGIN:
    case ActionType.LOGOUT:
    case ActionType.REGISTER:
    case ActionType.FETCH_DATA:
    case ActionType.ADD_NEW_GROUP:
    case ActionType.ADD_TASK:
    case ActionType.UPDATE_TASK:
    case ActionType.DELETE_TASK:
    case ActionType.MOVE_LEFT:
    case ActionType.MOVE_RIGHT:
      state.loading = true
      state.errorMessage = null
      state.successMessage = null
      return state
    case ActionType.MOVE:
      //Mutates todoListData before loading
      const { oldGroupID, newGroupID, todoID } = action.payload
      const draggedTodoIndex = state.todoListData[oldGroupID].findIndex(todo => todo.id === Number(todoID))
      const draggedTodo = state.todoListData[oldGroupID].splice(draggedTodoIndex, 1)
      state.todoListData[newGroupID] = [...state.todoListData[newGroupID], ...draggedTodo]
      state.loading = true
      state.errorMessage = null
      return state
    case ActionType.REGISTER_SUCCESS:
    case ActionType.LOGIN_SUCCESS:
      state.authToken = action.payload.authToken
      state.successMessage = action.payload.successMessage
      state.loading = false
      return state
    case ActionType.FETCH_DATA_SUCCESS:
      state.groupData = action.payload.groupData
      state.todoListData = action.payload.todoListData
      state.loading = false
      state.successMessage = action.payload.successMessage
      return state
    case ActionType.ACTION_SUCCESS:
      state.loading = false
      state.successMessage = action.payload.successMessage
      return state
    case ActionType.CHECK_AUTHENTICATION_SUCCESS:
      state.authToken = action.payload.authToken
      return state
    case ActionType.LOGOUT_SUCCESS:
      state.loading = false
      state.authToken = null
      state.successMessage = action.payload.successMessage
      return state
    case ActionType.FETCH_DATA_ERROR:
    case ActionType.ADD_NEW_GROUP_ERROR:
    case ActionType.ADD_TASK_ERROR:
    case ActionType.UPDATE_TASK_ERROR:
    case ActionType.DELETE_TASK_ERROR:
    case ActionType.MOVE_LEFT_ERROR:
    case ActionType.MOVE_RIGHT_ERROR:
    case ActionType.LOGIN_ERROR:
    case ActionType.REGISTER_ERROR:
      state.loading = false
      state.errorMessage = action.payload.errorMessage
      return state
    case ActionType.MOVE_ERROR:
      state.todoListData = action.payload.fallbackTodoListData
      state.loading = false
      state.errorMessage = action.payload.errorMessage
      return state
    case ActionType.LOGOUT_ERROR:
      state.loading = false
      state.errorMessage = action.payload.errorMessage
      return state
    default:
      return state
  }
}, initialState)

export default reducer