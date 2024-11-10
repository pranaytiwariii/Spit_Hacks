import mail from "/Features/mail.svg";
import zap from "/Features/zap.svg";
import barChart from "/Features/bar-chart-2.svg";
import smile from "/Features/smile.svg";
import command from "/Features/command.svg";
import message from "/Features/message-circle.svg";

function Features() {
  const FeaturesArr = [
    {
      header: "Multi-Method Fundraising",
      subHead:
        "Offers flexibility with multiple funding options, including crypto, fiat, and NFT-based contributions. Investors and startups can choose the methods best suited to their needs.",
      img: mail, // Replace with the appropriate image if available
    },
    {
      header: "Milestone-Based Funding",
      subHead:
        "Fund disbursements are tied to predetermined milestones, allowing investors to release funds incrementally and encouraging startups to meet performance targets.",
      img: zap, // Replace with the appropriate image if available
    },
    {
      header: "Decentralized Governance (DAO)",
      subHead:
        "Enables investors to participate in startup decisions through DAO-based governance, empowering them to vote on milestones, fund releases, and critical project choices.",
      img: barChart, // Replace with the appropriate image if available
    },
    {
      header: "Cross-Chain Compatibility",
      subHead:
        "Supports transactions on Ethereum, Binance Smart Chain, and Polygon, widening access to investors and enabling seamless transactions across chains.",
      img: smile, // Replace with the appropriate image if available
    },
    {
      header: "NFT Marketplace",
      subHead:
        "Allows investors to purchase, trade, or hold NFTs representing their investment or voting rights in startups, adding a unique and transferable investment component.",
      img: command, // Replace with the appropriate image if available
    },
    {
      header: "KYC/AML Compliance",
      subHead:
        "Integrated KYC/AML verification ensures security and regulatory compliance, enabling safe transactions and promoting platform trustworthiness.",
      img: message, // Replace with the appropriate image if available
    },
  ];

  return (
    <div className="flex flex-col py-24 px-8">
      {/* main div */}
      <div className="text-center mb-16">
        {/* text part */}
        <p className="text-[#6941C6] text-base mb-3">Features</p>

        <p className=" text-4xl text-[#101828] mb-5 font-semibold">
          Analytics that feels like it’s from the future
        </p>

        <p className="text-xl text-[#667085] sm:text-2xl sm:px-12 lg:px-72">
          Powerful, self-serve product and growth analytics to help you convert,
          engage, and retain more users.
        </p>
      </div>

      <div className="flex justify-around flex-wrap gap-8 sm:px-28 ">
        {/* svgs */}

        {FeaturesArr.map((step, index) => (
          <div key={index} className="flex items-center flex-col max-w-sm">
            {/* mail svg */}
            <div className="mb-5 bg-[#F4EBFF] rounded-full border-[#F9F5FF] p-3 border-8">
              <img src={step.img} />
            </div>

            <p className=" text-xl">{step.header}</p>

            <p className=" text-base text-[#667085] text-center">
              {step.subHead}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
