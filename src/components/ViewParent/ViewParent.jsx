import AsideParent from "./AsideParent/AsideParent";
import MyProfile from "./MainComponents/MyProfile/MyProfile";
import MyChildren from "./MainComponents/MyChildren/MyChildren";
import StudentForm from "../Forms/FormStudent/formStudent";
import Feedback from "../Feedback/Feedback";
import FeedbackEdition from "../Feedback/FeedbackEdition";
import style from "./viewParent.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getParentId } from "../../redux/actions/actions-parents";

function ViewParent() {
  const locationMyProfile = useLocation().pathname.includes(
    "/viewParent/myProfile"
  );
  const locationMyChildren = useLocation().pathname.includes(
    "/viewParent/myChildren"
  );
  const locationStudentForm = useLocation().pathname.includes(
    "/viewParent/studentForm"
  );
  const locationComentario = useLocation().pathname.includes(
    "/viewParent/comentario"
  );
  const locationComentarioEdit = useLocation().pathname.includes(
    "/viewParent/comentEdit"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    dispatch(getParentId(userId));
  });

  return (
    <div className={style.container}>
      <AsideParent />
      <main className={style.container_main}>
        {locationMyProfile ? <MyProfile /> : null}
        {locationMyChildren ? <MyChildren /> : null}
        {locationStudentForm ? <StudentForm /> : null}
        {locationComentario ? <Feedback /> : null}
        {locationComentarioEdit ? <FeedbackEdition /> : null}
      </main>
    </div>
  );
}

export default ViewParent;
