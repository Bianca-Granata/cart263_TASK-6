window.onload = run;

function run() {
  // Add click event listener to the button
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);

  /****** PART A:: FETCH */
  async function fetchText() {
    console.log("in fetch");

    try {
      // Fetch the text file
      const response = await fetch("files/rainbow.txt");

      // Check if fetch was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Convert response to text and store in raw_rainbow_text
      const raw_rainbow_text = await response.text();

      // Hide the button
      document.querySelector("#stepOneButton").style.display = "none";

      // Display the div with id inputDiv
      document.querySelector("#inputDiv").style.display = "block";

      // Display fetched text
      document.querySelector("#rainbow_text").innerText = raw_rainbow_text;

      // Run runPartB once everything else works
      runPartB(raw_rainbow_text);
    } catch (error) {
      console.error("Error fetching rainbow.txt:", error);
      // Optionally, display an error message to the user
    }
  }

  /****** PART B:: TEXT PROCESSING  */

  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

    function producePoem() {
      console.log("Producing poem...");

      // acess the value from the input field
      const userInput = document.querySelector("#phrase").value;

      //ssplits the user input into an array
      // splits and filters empty strings ->
      const phrase_as_array = userInput.split(/[\s\.!\?\n]+/).filter(token => token.length > 0);
      console.log("User input split into array:", phrase_as_array);

      //splits the fetched text (originalRainBowText) into an array (rainbow_tokens)
      const rainbow_tokens = originalRainBowText.split(/[\s\.!\?\n]+/).filter(token => token.length > 0);
      console.log("Fetched text split into array:", rainbow_tokens);


      runPartC(rainbow_tokens, phrase_as_array);
    }
  }

  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_tokens, seed_phrase_array) {
    console.log("Generating poem...");

    // initialize the poem sentence
    let poem_sentence = "";

    // iiterate over each word in the seed_phrase_array
    for (let i = 0; i < seed_phrase_array.length; i++) {
      const currentWord = seed_phrase_array[i]; // Get the current word from the seed phrase

      // iterate over each character in the current word
      for (let j = 0; j < currentWord.length; j++) {
        const currentChar = currentWord[j].toLowerCase(); // Get the current character (case-insensitive)

        // find a word in rainbow_tokens that has the currentChar at the same position (j)
        const foundWord = rainbow_tokens.find((word) => {
          // Ensure the word is long enough and the character matches
          return word.length > j && word[j].toLowerCase() === currentChar;
        });

        // ff a matching word is found, add it to t poem_sentence
        if (foundWord) {
          poem_sentence += foundWord + " "; // Add the word and a space
        } else {
          // if no matching word is found, add a placeholder (optional)
          poem_sentence += "[NO_MATCH] ";
        }
      }
    }

    // Log the generated poem sentence
    console.log("Generated poem sentence:", poem_sentence);

    // ONLY RUN runPartD upon success of all sub tasks above
    runPartD(poem_sentence.trim()); // Trim to remove the trailing space
  }


  /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence) {
    console.log("Visualizing poem:", new_sentence);
    // Add logic to display the poem in the DOM or perform other actions
  }

  /****** PART E:: RESET  */
  function resetPoem() {
    // Reset the UI
    document.querySelector("#stepOneButton").style.display = "block"; // Show the button
    document.querySelector("#inputDiv").style.display = "none"; // Hide the inputDiv
    document.querySelector("#rainbow_text").innerText = ""; // Clear the displayed text
    // Add any other reset logic here
  }
}