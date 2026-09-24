import { RegisterForm } from "../../features/auth/components/RegisterForm/RegisterForm";
import s from "./RegisterPage.module.scss";

export const RegisterPage = () => {
  return (
    <div className={s.container}>
      <div className={s.left}></div>
      <div className={s.right}>
        <RegisterForm />
      </div>
    </div>
  );
};
