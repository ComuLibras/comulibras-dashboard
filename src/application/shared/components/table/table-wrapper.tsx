import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/application/shared/components/ui/card";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  renderAddButton?: () => React.ReactNode;
}

export const TableWrapper: React.FC<Props> = (props) => {
  const { title, subtitle, children, renderAddButton } = props;

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </div>

        {renderAddButton?.()}
      </CardHeader>
      <CardContent>
        <div className="w-full">
          {children}
        </div>
      </CardContent>
    </Card>
  )
};
