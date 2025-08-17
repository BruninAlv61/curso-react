import "./App.css";
import { TwitterFollowCard } from "./components/TwitterFollowCard";

const users = [
  {
    userName: "bruninAlv61",
    name: "Brunin",
    isFollowing: true,
  },
  {
    userName: "midudev",
    name: "Miguel Ángel Duran",
    isFollowing: false,
  },
  {
    userName: "LautyDeveloper",
    name: "Lauty",
    isFollowing: true,
  },
];

export const App = () => {
  return (
    <section className="App">
      { 
        users.map(({ userName, name, isFollowing }) => (
            <TwitterFollowCard
                key={userName}
                userName={userName}
                initialIsFollowing={isFollowing}
            >
                {name}
            </TwitterFollowCard>
        ))
      } 
    </section>
  );
};
