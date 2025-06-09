import { RegisterForm } from './RegisterForm';
import ExpressAPI from './express-api';

interface RegisterPageProps {
  expressApi: ExpressAPI;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ expressApi }) => {
  return (
    <RegisterForm expressApi={ expressApi } /> 
  )
};