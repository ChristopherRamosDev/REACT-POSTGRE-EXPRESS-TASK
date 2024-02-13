import { useAuth } from "../context/AuthContext";
const ProfilePage = () => {
  const { user } = useAuth();
  return <div>ProfilePage</div>;
};

export default ProfilePage;
