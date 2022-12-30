import Head from "next/head";
import Image from "next/image";
import sohamLogo from "../assets/soham-logo.png";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const callGenerateEndpoint = async () => {
  
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    console.log(JSON.stringify({ userInput }));
    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Blogging Platform | Soham.xyz</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>NeuralScribe</h1>
            {/* <h2>Experience the Future of Blogging with Our AI-Powered Web3 Platform</h2> */}
          </div>
          <div className="header-subtitle">
            <h2>Writing so intelligent, it's almost artificial</h2>
            {/* <h2>Let NeuralScribe do the heavy lifting (or heavy thinking) for you</h2> */}
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="start typing here"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>Generate</p>
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="header-subtitle">
            <h2>Powered by OpenAI's GPT-3, Blockchain and the superior mind of Soham.xyz</h2>
          </div> */}
      <div className="badge-container grow">
        <a href="https://linktr.ee/shahsoham" target="_blank" rel="noreferrer">
          <div className="badge">
            <Image src={sohamLogo} alt="Soham logo" />
            <p>built by Soham.xyz</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
