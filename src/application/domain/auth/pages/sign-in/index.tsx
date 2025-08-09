
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/application/shared/components/ui/form";
import { Input } from "@/application/shared/components/ui/input";
import { PasswordInput } from "@/application/shared/components/ui/password-input";
import { FormContainer, FormHeader, FormTitle, FormWrapper } from '../../components/form';
import { useSignInController } from "./sign-in-controller";
import { Icon } from "@/application/shared/components/ui/icon";
import { Link } from "react-router";
import { Button } from "@/application/shared/components/ui/button";
import { Separator } from "@/application/shared/components/ui/separator";

import Google from '@/application/assets/google.svg';

export const SignInPage: React.FC = () => {
  const { form, handleSubmit, isSubmitted, isValid } = useSignInController();

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>Entre em sua conta</FormTitle>
        {/* <FormSubtitle
          text="Não tem uma senha?"
          span="Primeiro acesso"
          to="/auth/sign-up"
        /> */}
      </FormHeader>

      <Form {...form}>
        <FormWrapper
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="example@gmail.com" 
                    leftIcon={<Icon name="mail" />} 
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput 
                    {...field} 
                    placeholder="******" 
                    className="h-12"
                  />
                </FormControl>
                <div className="flex justify-end">
                  <Link className="text-right text-xs underline underline-offset-2" to="/auth/forgot-password">Esqueceu sua senha?</Link>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-6 mt-6">
            <Button type="submit" disabled={!isValid && isSubmitted} className="w-full" size="lg">
              Acessar minha conta
            </Button>

            <div className="flex items-center justify-center gap-2 w-full">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">Ou</span>
              <Separator className="flex-1" />
            </div>

            <Button type="submit" disabled={!isValid && isSubmitted} variant='outline' size="lg" className="w-full">
              <img src={Google} alt="Google" className="w-8 h-8 mr-2" />
              Entrar com Google
            </Button>
          </div>
        </FormWrapper>
      </Form>
    </FormContainer>
  );
};
