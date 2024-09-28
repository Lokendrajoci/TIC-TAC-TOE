import { useRef, useState } from "react";
import "./App.css";

function App() {
  let FinalResult = false;
  let TextResult = "";
  let Result = [
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [0, 4, 8],
    [2, 4, 6],
    [6, 7, 8],
  ];
  const [indexOfO, setIndexOfO] = useState([]); // State for tracking O indices
  const [indexOFX, setIndexOFX] = useState([]); // State for tracking X indices
  const gameValue = ["0", "X"];
  const [count, setCount] = useState(0); // Use state to track the current move
  const divRefs = useRef([]); // Use an array of refs for each div
  const [isVisible, setIsVisible] = useState(0);
  const gamePlay = (index) => {
    setIsVisible(isVisible + 1);
    if (divRefs.current[index] && divRefs.current[index].innerHTML === "") {
      let content;

      if (count === 0) {
        content = gameValue[0]; // Set content to "0"
        setCount(1); // Toggle count to 1 (next turn will be "X")
        setIndexOfO([...indexOfO, index]); // Append the index for "0"
      } else {
        content = gameValue[1]; // Set content to "X"
        setCount(0); // Toggle count to 0 (next turn will be "0")
        setIndexOFX([...indexOFX, index]); // Append the index for "X"
      }

      divRefs.current[index].innerHTML = content; // Set content
      divRefs.current[index].style.color = content === "0" ? "blue" : "red"; // Different colors for 0 and X
      divRefs.current[index].style.fontSize = "2rem";
    }
  };
  indexOfO.sort();
  indexOFX.sort();

  const isAnySubarrayPresentInO = (Result, indexOfO) => {
    return Result.some(
      (subArray) => subArray.every((element) => indexOfO.includes(element)) // Check if all elements of subArray are in indexOfO
    );
  };

  const result1 = isAnySubarrayPresentInO(Result, indexOfO); // Correctly calls isAnySubarrayPresentInO

  const isAnySubarrayPresentInX = (Result, indexOFX) => {
    return Result.some(
      (subArray) => subArray.every((element) => indexOFX.includes(element)) // Check if all elements of subArray are in indexOFX
    );
  };

  const result2 = isAnySubarrayPresentInX(Result, indexOFX); // Now correctly calls isAnySubarrayPresentInX

  if (result1) {
    FinalResult = result1;
    TextResult = "⭕ WIN";
  } else if (result2) {
    FinalResult = result2;
    TextResult = "❌ WIN";
  } else if (isVisible == 9) {
    FinalResult = true;
    TextResult = "DRAW";
  }

  const PageReload = () => {
    window.location.reload();
  };
  return (
    <>
      <div
        className="flex justify-center items-center h-screen bg-amber-400"
        style={{
          backgroundColor: "#A9C9FF",
          backgroundImage: "linear-gradient(180deg, #A9C9FF 0%, #FFBBEC 100%)",
        }}
      >
        <div
          className="w-96 h-5/6 border-double border-4 border-sky-500 rounded-lg 
          flex flex-col justify-center "
          style={{
            boxShadow: "17px 10px 15px 11px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h1 className="text-center font-bold text-5xl	mb-8 text-fuchsia-900		">TIC TAC TOE</h1>
          {/* First row */}
          <div className="w-full h-20 bg-cyan-600 flex">
            <div
              ref={(el) => (divRefs.current[0] = el)} // Assign ref to each div
              className="h-full basis-1/3 bg-white border-r-4 border-b-4 border-black flex justify-center  items-center "
              onClick={() => gamePlay(0)} // Pass index for each div
            ></div>
            <div
              ref={(el) => (divRefs.current[1] = el)}
              className="h-full basis-1/3 bg-white border-b-4 border-black flex justify-center  items-center"
              onClick={() => gamePlay(1)}
            ></div>
            <div
              ref={(el) => (divRefs.current[2] = el)}
              className="h-full basis-1/3 bg-white border-l-4 border-b-4 border-black flex justify-center  items-center"
              onClick={() => gamePlay(2)}
            ></div>
          </div>

          {/* Second row */}
          <div className="w-full h-20 bg-blue-600 flex">
            <div
              ref={(el) => (divRefs.current[3] = el)}
              className="h-full basis-1/3 bg-white border-r-4 border-b-4 border-black flex justify-center  items-center"
              onClick={() => gamePlay(3)}
            ></div>
            <div
              ref={(el) => (divRefs.current[4] = el)}
              className="h-full basis-1/3 bg-white border-b-4 border-black flex justify-center  items-center"
              onClick={() => gamePlay(4)}
            ></div>
            <div
              ref={(el) => (divRefs.current[5] = el)}
              className="h-full basis-1/3 bg-white border-l-4 border-b-4 border-black flex justify-center  items-center"
              onClick={() => gamePlay(5)}
            ></div>
          </div>

          {/* Third row */}
          <div className="w-full h-20 bg-violet-700 flex">
            <div
              ref={(el) => (divRefs.current[6] = el)}
              className="h-full basis-1/3 bg-white border-r-4 border-black flex justify-center  items-center"
              onClick={() => gamePlay(6)}
            ></div>
            <div
              ref={(el) => (divRefs.current[7] = el)}
              className="h-full basis-1/3 bg-white border-black flex justify-center  items-center"
              onClick={() => gamePlay(7)}
            ></div>
            <div
              ref={(el) => (divRefs.current[8] = el)}
              className="h-full basis-1/3 bg-white border-l-4 border-black flex justify-center  items-center"
              onClick={() => gamePlay(8)}
            ></div>
          </div>
        </div>

        <div>
          {FinalResult && (
            <div
              className="h-72 w-96 bg-slate-400 flex flex-col justify-center items-center rounded-lg  gap-5 z-1 text-lg	

	"
              style={{ position: "absolute", bottom: "180px", right: "37.5%" }}
            >
              <p className="border-solid border-2 border-black w-24 h-12 text-center	pt-1.5">
                {TextResult}{" "}
              </p>
              <button
                className="border-solid border-2 border-sky-500 bg-rose-600 rounded h-10 w-32	 hover:rounded-lg hover:bg-rose-400	 transition duration-300 "
                onClick={PageReload}
              >
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
