import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const BackButton = ({ href, label }) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link to={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
