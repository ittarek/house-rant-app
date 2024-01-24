import Dashboard from "../../dashboard/Dashboard";
import RoomCard from "./RoomCard";


const Home = () => {
    return (
        <div className="lg:flex  items-center mt-11">
          <RoomCard /> 
    <Dashboard />
        </div>
    );
};

export default Home