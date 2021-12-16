/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";

export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  console.log(nfts);

  const MintMany = () => {
    const [mintCount, setMintCount] = useState(5);

    return (
      <>
        <button
          onClick={() => startMintMultiple(mintCount)}
          disabled={isMinting}
          className="px-4 py-2 mx-auto font-bold text-white transition-opacity rounded-lg hover:opacity-70 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
        >
          {isMinting ? "loading" : `mint ${mintCount}`}
        </button>

        <input
          disabled={isMinting}
          type="number"
          min={2}
          max={10}
          className="px-2 mx-auto mt-5 font-bold text-white bg-gray-500"
          value={mintCount}
          onChange={(e) => setMintCount((e.target as any).value)}
        />
        <p className="mx-auto mt-2">min 2; max 10;</p>
      </>
    );
  };

  return (
    <div
      style={{
        color: "white",
        fontFamily: "monospace",
        backgroundColor:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        background: "#457fca",
      }}
    >
      <Head>
        <title style={{ fontFamily: "fantasy" }}>FANF-candy-machine</title>
        <meta
          name="description"
          content="Simplified NextJs with typescript example app integrated with Metaplex's Candy Machine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen mx-6">
        <Toaster />
        <div
          className="flex items-center justify-between w-full mt-3"
          style={{ borderBottom: "1px solid white", padding: "0.5rem" }}
        >
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "monospace" }}
          >
            FANF <span style={{ color: "#FFBDDD" }}>candy</span> machine
          </h1>
          {connected && (
            <div
              style={{
                border: "1px solid white",
                borderRadius: "4px",
                padding: "1rem",
                width: "fit-content",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <p
                className="mr-auto text-sm"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <li className="font-bold ">
                  Available: {nftsData.itemsRemaining}
                </li>{" "}
                <li className="font-bold ml-2">
                  Minted: {nftsData.itemsRedeemed}
                </li>{" "}
                <li className="font-bold ml-2">
                  Total: {nftsData.itemsAvailable}
                </li>
              </p>
            </div>
          )}
          <div className="flex items-center">
            {connected && (
              <div className="flex items-end mr-2">
                <p className="text-xs">balance</p>
                <p className=" font-bold mx-2 leading-none">
                  {balance.toFixed(2)}
                </p>
                <p
                  className="font-bold leading-none text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, #00FFA3, #03E1FF, #DC1FFF)`,
                  }}
                >
                  SOL
                </p>
              </div>
            )}
            <WalletMultiButton
              style={{
                backgroundColor:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                background: "#2a5298",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "2rem",
          }}
        >
          {connected ? (
            <>
              {new Date(mintStartDate).getTime() < Date.now() ? (
                <>
                  {isSoldOut ? (
                    <p>SOLD OUT</p>
                  ) : (
                    <>
                      <div className="flex flex-col w-1/2">
                        <h1 className="mb-10 text-3xl font-bold">Mint One</h1>
                        <button
                          onClick={startMint}
                          disabled={isMinting}
                          className="px-4 py-2 mx-auto font-bold text-white transition-opacity rounded-lg hover:opacity-70 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
                        >
                          {isMinting ? "loading" : "mint 1"}
                        </button>
                      </div>
                      <div className="flex flex-col w-1/2">
                        <h1 className="mb-10 text-3xl font-bold">Mint Many</h1>
                        <MintMany />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Countdown
                  date={mintStartDate}
                  onMount={({ completed }) => completed && setIsMintLive(true)}
                  onComplete={() => setIsMintLive(true)}
                />
              )}
            </>
          ) : (
            <p>connect wallet to mint</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold">My NFTs</h2>
          <div className="flex mt-3 gap-x-2">
            {(nfts as any).map((nft: any, i: number) => {
              return <AnNFT key={i} nft={nft} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
