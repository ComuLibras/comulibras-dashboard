import { Logo } from "@/application/shared/components/logo";
import { Outlet } from "react-router";

type Props = {
  title: string;
  description: string;
}

export const AuthLayout: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="h-screen w-full flex justify-between items-center">
      <div className="flex items-center flex-col gap-1 w-full">
        <Logo />
        <div className="max-w-[300px] flex flex-col gap-1 items-center text-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[500px]">  
          <Outlet />
        </div>
      </div>
    </div>
  );
}
