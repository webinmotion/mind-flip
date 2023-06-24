import Filter from "./FilterComponent";
import GameCard from "./GameCard";
// import SearchComponent from "./Searchcomponent";
import Topnav from "./Topnav";

export default function HomePage() {
  return (
    <div className=" ">
      <Topnav />
      <div className="mx-auto mb-4 mt-2 flex max-w-[1024px] flex-col justify-center">
        <h1 className="mt-2 text-center text-3xl font-semibold">
          Play and Earn
        </h1>
        <h2 className="mt-2 max-w-[1024px] text-center text-2xl">
          "Play Games, Earn Rewards: Enjoy Endless Fun and Get Rewarded for Your
          Skills!" <br />
        </h2>
        <h6 className="mt-2 max-w-[1024px] text-center text-2xl">
          The games are timed and must be completed within the allocated time to
          qualify for rewards
        </h6>
      </div>
      <div className="mt mx-auto mb-3 flex max-w-[1024px] flex-col lg:flex-row">
        {/* <SearchComponent /> */}
        <div className="lg:overflow-auto lg:sticky  lg:h-screen lg:sticky lg:top-20">
          <Filter />
        </div>
        <div className="mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-2">
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </div>
      </div>
    </div>
  );
}
