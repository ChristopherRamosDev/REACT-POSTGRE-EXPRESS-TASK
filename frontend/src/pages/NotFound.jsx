import { Link } from "react-router-dom";
import { Card } from "./components/ui";
const NotFound = () => {
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        <h1 className="text-4xl">Page Not Found</h1>
        <h3 className="text-3xl">404</h3>
        <Link to="/">Back to home</Link>
      </Card>
    </div>
  );
};

export default NotFound;
