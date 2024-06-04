import BackButton from "./ui/back-button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Header } from "./ui/header";

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  headerText,
  className = "w-[400px] shadow-md", // Add className prop
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <Header label={headerLabel} headerText={headerText} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
