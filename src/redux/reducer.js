import {
  GET_ALL_USERS,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_USER_ACTIVE,
  GET_STUDENT,
  GET_ALL_STUDENTS,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  GET_STUDENTS_BY_PARENTS,
  GET_ALL_PARENTS,
  GET_PARENT,
  UPDATE_PARENT,
  DELETE_PARENT,
  PARENT_NOT_FOUND,
  GET_PARENT_ID,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  GET_ALL_ADMINS,
  GET_ADMIN_BY_ID,
  SET_CURRENT_PAGE,
  GET_ADMIN_BY_NAME,
  GET_ADMIN_BY_EMAIL,
  BAN_ADMIN,
  RESTORE_ADMIN,
  FILTER_BY_STATE,
  GET_ALL_GRADES,
  GET_GRADE_BY_ID,
  UPDATE_GRADE,
  REMOVE_GRADE,
  FILTER_BY_STATE_GRADE,
  POST_GRADE,
  GET_VALORACION,
  GET_HAS_RATED,
  SAVE_COMENTARIO_ID,
} from "./action-types";

const initialState = {
  allAdmins: [],
  allAdminsCopy: [],
  adminDetail: {},

  allGrades: [],
  allGradesCopy: [],
  gradesDetail: {},
  allComentarios: [],
  comentarioId: "",
  allUsers: [],
  user: {},
  allStudents: [],
  studentsByParent: [],
  student: {},
  allParents: [],
  parent: {},
  parentId: {},
  currentPage: 1,
  token: null,
  loading: false,
  error: null,
  rated: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SAVE_COMENTARIO_ID:
      return {
        ...state,
        comentarioId: payload,
      };
    case GET_HAS_RATED:
      return {
        ...state,
        rated: payload,
      };
    case GET_VALORACION:
      return {
        ...state,
        valoracionId: payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: payload,
      };

    case GET_USER:
      return {
        ...state,
        user: payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        user: payload,
      };

    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== payload),
      };

    case SET_USER_ACTIVE:
      return {
        ...state,
        loggedUser: { id: payload },
      };

    case GET_STUDENT:
      return {
        ...state,
        student: payload,
      };

    case GET_ALL_STUDENTS:
      return {
        ...state,
        allStudents: payload,
      };

    case UPDATE_STUDENT:
      return {
        ...state,
        student: payload,
      };

    case DELETE_STUDENT:
      return {
        ...state,
        allStudents: state.allStudents.filter(
          (student) => student.id !== payload
        ),
      };

    case GET_STUDENTS_BY_PARENTS:
      return {
        ...state,
        studentsByParent: payload,
      };

    case GET_PARENT:
      return {
        ...state,
        parent: payload,
      };

    case GET_ALL_PARENTS:
      return {
        ...state,
        allParents: payload,
      };

    case UPDATE_PARENT:
      return {
        ...state,
        parent: payload,
      };

    case DELETE_PARENT:
      return {
        ...state,
        allParents: state.allParents.filter((parent) => parent.id !== payload),
      };

    case GET_PARENT_ID:
      return {
        ...state,
        parentId: payload,
      };

    case PARENT_NOT_FOUND:
      return { ...state, parent: payload };

    case LOGIN_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, token: payload };

    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    case LOGOUT_USER:
      return { ...initialState };

    /* SUPERADMIN */

    /* GET ALL ADMINS */
    case GET_ALL_ADMINS: {
      return {
        ...state,
        allAdmins: payload,
        allAdminsCopy: payload,
        currentPage: 1,
      };
    }
    /* GET ADMIN BY ID */
    case GET_ADMIN_BY_ID: {
      return {
        ...state,
        adminDetail: payload,
      };
    }
    /* SET CURRENT PAGE */
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: payload,
      };
    }
    /* GET ADMIN BY NAME */
    case GET_ADMIN_BY_NAME: {
      return {
        ...state,
        allAdmins: payload,
        allAdminsCopy: payload,
        currentPage: 1,
      };
    }
    /* GET ADMIN BY EMAIL */
    case GET_ADMIN_BY_EMAIL: {
      return {
        ...state,
        allAdmins: payload,
        allAdminsCopy: payload,
        currentPage: 1,
      };
    }
    /* BAN ADMIN */
    case BAN_ADMIN: {
      return {
        ...state,
      };
    }

    /* RESTORE ADMIN */
    case RESTORE_ADMIN: {
      return {
        ...state,
      };
    }

    /* FILTER BY STATE */
    case FILTER_BY_STATE: {
      if (payload === "active") {
        const activeAdmins = state.allAdmins.filter((admin) => {
          if (admin.state) {
            return admin;
          }
        });

        return {
          ...state,
          allAdminsCopy: activeAdmins,
          currentPage: 1,
        };
      } else if (payload === "banned") {
        const bannedAdmins = state.allAdmins.filter((admin) => {
          if (!admin.state) {
            return admin;
          }
        });

        return {
          ...state,
          allAdminsCopy: bannedAdmins,
          currentPage: 1,
        };
      } else {
        return {
          ...state,
          allAdminsCopy: state.allAdmins,
          currentPage: 1,
        };
      }
    }

    /* GET ALL GRADES */
    case GET_ALL_GRADES: {
      return {
        ...state,
        allGrades: payload,
        allGradesCopy: payload,
        currentPage: 1,
      };
    }

    /* GET GRADE BY ID */
    case GET_GRADE_BY_ID: {
      return {
        ...state,
        gradesDetail: payload,
      };
    }

    /* UPDATE GRADE */
    case UPDATE_GRADE: {
      return {
        ...state,
        gradesDetail: payload,
      };
    }

    /* REMOVE GRADE */
    case REMOVE_GRADE: {
      return {
        ...state,
      };
    }

    /* FILTER BY STATE OF GRADE */
    case FILTER_BY_STATE_GRADE: {
      if (payload === "active") {
        const activeGrades = state.allGrades.filter((grade) => {
          if (grade.state) {
            return grade;
          }
        });

        return {
          ...state,
          allGradesCopy: activeGrades,
          currentPage: 1,
        };
      } else if (payload === "banned") {
        const bannedGrades = state.allGrades.filter((grade) => {
          if (!grade.state) {
            return grade;
          }
        });

        return {
          ...state,
          allGradesCopy: bannedGrades,
          currentPage: 1,
        };
      } else {
        return {
          ...state,
          allGradesCopy: state.allGrades,
          currentPage: 1,
        };
      }
    }

    /**************** */
    case POST_GRADE: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
