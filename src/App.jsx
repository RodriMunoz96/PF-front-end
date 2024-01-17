import HomePage from "./peges/Home/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Forms/LoginForm/login";
import FormParent from "./components/Forms/FormParent/FormParent";
import NotFound from "./peges/NotFound/NotFound";
import AddUserForm from "./components/Forms/addUserForm/addUserForm";
import ViewParent from "./components/ViewParent/ViewParent";
import FormStudent from "./components/Forms/FormStudent/formStudent";
import Admin from "./peges/Admin/Admin";
import ViewSuperAdmin from "./components/ViewSuperAdmin/ViewSuperAdmin";
import AdminForm from "./components/ViewSuperAdmin/MainComponents/Dashboard/Admins/AdminForm/AdminForm";
import GradeForm from "./components/ViewSuperAdmin/MainComponents/Dashboard/Grades/GradeForm/GradeForm";
import StudentDetail from "./peges/AdminPages/StudentDetail/StudentDetail";
import ParentDetail from "./peges/AdminPages/ParentDetail/ParentDetail";
import ComentarioDetail from "./peges/AdminPages/ComentarioDetail/ComentarioDetail";
import Testimonios from "./components/Testimonios/Testimonios";
import GradeEdit from "./components/ViewSuperAdmin/MainComponents/Dashboard/Grades/EditGrade";
//iportaciones

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/formParent" element={<FormParent />} />
        <Route path="/viewParent/:id" element={<ViewParent />} />
        <Route exact path="/studentForm" element={<FormStudent />} />
        <Route exact path="/addUser" element={<AddUserForm />} />
        <Route exact path="/Admin" element={<Admin />} />
        <Route exact path="/viewSuperAdmin/:id" element={<ViewSuperAdmin />} />
        <Route exact path="/registerAdmin" element={<AdminForm />} />
        <Route exact path="/addGrade" element={<GradeForm />} />
        <Route path="/admin/studentDetail/:id" element={<StudentDetail />} />
        <Route path="/admin/parentDetail/:id" element={<ParentDetail />} />
        <Route path="/grades/edit/:id" element={<GradeEdit />} />
        <Route path="/testimonios" element={<Testimonios />} />
        <Route
          path="/admin/comentarioDetail/:id"
          element={<ComentarioDetail />}
        />
        <Route exact path="/*" element={<NotFound />} />
      </Routes>
      
    </>
  );
}

export default App;
