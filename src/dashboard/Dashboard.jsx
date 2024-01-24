import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";


const Dashboard = () => {
  const { user } = useContext(AuthContext);
  console.log("user",user);
  
    return (
        <div>
            
        </div>
    );
};

export default Dashboard;