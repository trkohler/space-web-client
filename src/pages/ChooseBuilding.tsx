import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/auth";

export const ChooseBuilding = () => {
  const { profile } = useAuth();
  return (
    <Layout>
      <div>
        <h1>Choose Building</h1>
        {profile && (
          <div>
            <p>{profile.name}</p>
            <p>{profile.email}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
