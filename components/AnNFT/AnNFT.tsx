/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";

export default function AnNFT({ nft }: any) {
  useEffect(() => {
    console.log(nft);
  }, []);

  return (
    <div
      className="flex flex-col w-1/4 p-3 border-4 border-white"
      style={{ width: "300px", height: "auto", borderRadius: "4px" }}
    >
      <img src={nft.image} alt={nft.description || nft.name} />
      <div
        className="flex justify-between mt-2"
        style={{
          display: "felx",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <p className="font-bold">Name: {nft.name}</p>
        <p className="font-bold">Description: {nft.description}</p>
        <p className="font-bold">Symbol: {nft.symbol}</p>
      </div>
    </div>
  );
}
