import { Link } from "react-router-dom";
function Hero() {
  const items = [
    "Vultr Cloud Compute",
    "Vultr Block Storage",
    "IPFS (InterPlanetary File System)",
    "Ethereum/Binance Smart Chain/Polygon Blockchain",
    "DAOstack or Aragon (for DAO Governance)",
    "NFT Marketplace Framework (e.g., OpenSea SDK)",
  ];

  return (
    <section className="flex mx-2 md:mx-4 flex-col items-center gap-12 pt-10">
      <div className="top-container">
        <Link to="/">
          <div className="badge-section text-xs m-auto text-[#6941C6] flex gap-3 pt-1 pr-1 pb-1 pl-1 rounded-2xl w-max items-center justify-center bg-gray-100">
            <p className="label-1 bg-white pl-1 pr-1 justify-start rounded-2xl">
              New feature
            </p>
            <div className="label-2 flex gap-1">
              <p>Checkout the options aswell as askAI</p>
              <img src="HeroSection/arrow-right.svg" alt="arrow-right" />
            </div>
          </div>
        </Link>
        <Link to="/">
          <div className="flex gap-2 justify-center mt-4 h-12">
            <img src="/HeroSection/layers.svg" alt="" />
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              EcoAIFinder
            </h1>
          </div>
        </Link>
        <div className="heading-section mt-3 flex flex-col gap-0 sm:gap-4 items-center">
          <p className="text-gray-500 text-2xl md:text-4xl font-semibold text-center flex-wrap">
            Revolutionize Startup Funding
          </p>
          <h1 className="text-2xl md:text-4xl font-semibold text-center flex-wrap">
            Decentralized Platform for Inclusive and Versatile Startup Funding
          </h1>
        </div>
        <div className="btn-section flex justify-center gap-2 sm:gap-6 mt-8">
          <Link to="/askAI">
            <button className="flex px-1 md:px-2 items-center gap-2 py-2 border rounded-md">
              <img
                width={20}
                src="HeroSection/play-circle.svg"
                alt="play-circle"
              />
              <h1>Ask-AI (Give promt) </h1>
            </button>
          </Link>
          <Link to="/options">
            <button className="px-2 md:px-3 rounded-md bg-[#7F56D9] p-2 text-gray-50">
              Choose best suited options
            </button>
          </Link>
        </div>
      </div>
      <div className="bottom-container">
        <div className="img-section">
          <img
            className="lg:w-[90%] m-auto"
            src="HeroSection/Macbook-Pro-16-mockup.png"
            alt="mackbook"
          />
        </div>
        <p className="text-center text-sm mt-6 md:mt-10 text-gray-500">
          Prodets and tools incoperated in VentureX
        </p>

        {/* <div className="flex flex-col md:flex-row justify-between items-center md:mx-4 lg:mx-20 mt-8 mb-6 gap-8 md:gap-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center text-center gap-4 md:gap-2"
            >
              <div className="text-part font-semibold text-2xl md:text-lg">
                {item}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

export default Hero;
