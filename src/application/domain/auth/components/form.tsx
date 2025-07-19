
import { Link } from "react-router";

interface IChildren {
  children: React.ReactNode;
}

const FormTitle: React.FC<IChildren> = ({ children }) => {
  return <h1 className="text-2xl tracking-tight font-bold">{children}</h1>
};

interface IFormSubtitle  {
  text: string;
  span: string;
  to: string;
}

const FormSubtitle: React.FC<IFormSubtitle> = ({ span, text, to }) => {
  return (
    <h2 className="text-muted-foreground tracking-tighter gap-2 flex">
      {text}
      <Link className="text-primary font-semibold underline underline-offset-2" to={to}>{span}</Link>
    </h2>
  )
};

const FormHeader: React.FC<IChildren> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-1">
      {children}
    </div>
  )
};


const FormContainer: React.FC<IChildren> = ({ children }) => {
  return (
    <div className="w-full border border-solid border-muted rounded-lg p-6 shadow-xs">
      {children}
    </div>
  )
};

type IFormWrapperProps = React.FormHTMLAttributes<HTMLFormElement>;

const FormWrapper: React.FC<IFormWrapperProps> = ({ children, ...props }) => {
  return (
    <form className="w-full space-y-8 mt-8" {...props}>
      <div className="space-y-4">
        {children}
      </div>
    </form>
  )
}

export {
  FormContainer, FormHeader, FormSubtitle, FormTitle, FormWrapper
};

