Qualtrics.SurveyEngine.addOnload(function () {
  console.log("Qualtrics addOnload started");

  // Prevent double execution
  if (window.scrambledSentenceTaskInitialized) {
    console.log("Task already initialized, skipping");
    return;
  }
  window.scrambledSentenceTaskInitialized = true;

  // Retrieve Qualtrics object and save in qthis
  var qthis = this;
  console.log("qthis retrieved:", qthis);

  // Hide buttons
  qthis.hideNextButton();
  console.log("Next button hidden");

  // Append the display_stage Div using jQuery
  // jQuery is loaded in Qualtrics by default
  jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
  jQuery("<div id = 'display_stage'></div>").appendTo('body');
  console.log("Display stage divs created");

  if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
    console.log("Qualtrics detected, starting initialization sequence");
    
    // Use initialization pattern from working sample
    function startInitialization() {
      try {
        // Ensure DOM elements are ready
        var displayStage = document.getElementById('display_stage');
        var displayBackground = document.getElementById('display_stage_background');
        
        if (!displayStage || !displayBackground) {
          console.warn("Display elements not ready, retrying...");
          setTimeout(startInitialization, 100);
          return;
        }
        
        console.log("DOM ready, calling initExp()");
        initExp();
      } catch (error) {
        console.error("Error in initialization:", error);
      }
    }
    
    // Start initialization with small delay to ensure DOM is ready
    setTimeout(startInitialization, 50);
  } else {
    console.log("ERROR: Qualtrics not detected or in mobile preview");
  }

  // Initialize the Scrambled Sentence Task
  function initExp() {
    console.log("initExp() started");

    /* EXPERIMENT VARIABLES */

    // Fisher-Yates Algorithm for Random Shuffling of Arrays
    const shuffleArray = arr => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    // Generate random 6-digit cognitive load number
    const cognitiveLoadDigits = Math.floor(100000 + Math.random() * 900000).toString();

    // List 1 Sentences
    var list1_sentences = [
      { 
        words: ["Life", "is", "good", "cruel", "to", "me"], 
        positive_word: "good", 
        negative_word: "cruel",
        negative_category: "D"
      },
      { 
        words: ["I", "want", "to", "keep", "stop", "trying"], 
        positive_word: "keep", 
        negative_word: "stop",
        negative_category: "D"
      },
      { 
        words: ["I", "expect", "to", "be", "happy", "miserable"], 
        positive_word: "happy", 
        negative_word: "miserable",
        negative_category: "D"
      },
      { 
        words: ["I", "usually", "feel", "very", "good", "bad"], 
        positive_word: "good", 
        negative_word: "bad",
        negative_category: "D"
      },
      { 
        words: ["Something", "nothing", "is", "wrong", "with", "me"], 
        positive_word: "nothing", 
        negative_word: "Something",
        negative_category: "D"
      },
      { 
        words: ["I", "have", "succeeded", "failed", "at", "life"], 
        positive_word: "succeeded", 
        negative_word: "failed",
        negative_category: "D"
      },
      { 
        words: ["I", "like", "dislike", "who", "I", "am"], 
        positive_word: "like", 
        negative_word: "dislike",
        negative_category: "D"
      },
      { 
        words: ["I", "have", "something", "nothing", "to", "give"], 
        positive_word: "something", 
        negative_word: "nothing",
        negative_category: "D"
      },
      { 
        words: ["My", "life", "is", "very", "interesting", "stressful"], 
        positive_word: "interesting", 
        negative_word: "stressful",
        negative_category: "D"
      },
      { 
        words: ["I", "am", "confident", "disappointed", "in", "myself"], 
        positive_word: "confident", 
        negative_word: "disappointed",
        negative_category: "D"
      },
      { 
        words: ["I", "daydream", "worry", "about", "the", "future"], 
        positive_word: "daydream", 
        negative_word: "worry",
        negative_category: "GA"
      },
      { 
        words: ["I", "do", "dont", "sleep", "very", "well"], 
        positive_word: "do", 
        negative_word: "dont",
        negative_category: "GA"
      },
      { 
        words: ["I", "often", "feel", "very", "happy", "tense"], 
        positive_word: "happy", 
        negative_word: "tense",
        negative_category: "GA"
      },
      { 
        words: ["I", "face", "avoid", "my", "worst", "fears"], 
        positive_word: "face", 
        negative_word: "avoid",
        negative_category: "GA"
      },
      { 
        words: ["I", "am", "always", "on", "form", "edge"], 
        positive_word: "form", 
        negative_word: "edge",
        negative_category: "GA"
      },
      { 
        words: ["I", "appear", "sensible", "foolish", "to", "others"], 
        positive_word: "sensible", 
        negative_word: "foolish",
        negative_category: "GA"
      },
      { 
        words: ["People", "laugh", "at", "my", "jokes", "clothes"], 
        positive_word: "jokes", 
        negative_word: "clothes",
        negative_category: "GA"
      },
      { 
        words: ["People", "think", "I", "am", "nice", "boring"], 
        positive_word: "nice", 
        negative_word: "boring",
        negative_category: "GA"
      },
      { 
        words: ["I", "usually", "enjoy", "endure", "social", "engagements"], 
        positive_word: "enjoy", 
        negative_word: "endure",
        negative_category: "GA"
      },
      { 
        words: ["I", "usually", "attend", "avoid", "social", "events"], 
        positive_word: "attend", 
        negative_word: "avoid",
        negative_category: "GA"
      }
    ];

    // List 2 Sentences
    var list2_sentences = [
      { 
        words: ["I", "am", "equal", "inferior", "to", "others"], 
        positive_word: "equal", 
        negative_word: "inferior",
        negative_category: "D"
      },
      { 
        words: ["My", "life", "is", "generally", "interesting", "boring"], 
        positive_word: "interesting", 
        negative_word: "boring",
        negative_category: "D"
      },
      { 
        words: ["The", "future", "looks", "very", "bright", "dismal"], 
        positive_word: "bright", 
        negative_word: "dismal",
        negative_category: "D"
      },
      { 
        words: ["I", "remember", "regret", "what", "I've", "done"], 
        positive_word: "remember", 
        negative_word: "regret",
        negative_category: "D"
      },
      { 
        words: ["I", "am", "a", "worthwhile", "worthless", "person"], 
        positive_word: "worthwhile", 
        negative_word: "worthless",
        negative_category: "D"
      },
      { 
        words: ["Life", "has", "not", "been", "bad", "good"], 
        positive_word: "good", 
        negative_word: "bad",
        negative_category: "D"
      },
      { 
        words: ["People", "do", "don't", "care", "about", "me"], 
        positive_word: "do", 
        negative_word: "don't",
        negative_category: "D"
      },
      { 
        words: ["I", "am", "generally", "a", "success", "failure"], 
        positive_word: "success", 
        negative_word: "failure",
        negative_category: "D"
      },
      { 
        words: ["My", "personal", "relationships", "are", "satisfying", "disappointing"], 
        positive_word: "satisfying", 
        negative_word: "disappointing",
        negative_category: "D"
      },
      { 
        words: ["Life", "is", "well", "not", "worth", "living"], 
        positive_word: "well", 
        negative_word: "not",
        negative_category: "D"
      },
      { 
        words: ["I", "love", "struggle", "to", "fully", "relax"], 
        positive_word: "love", 
        negative_word: "struggle",
        negative_category: "GA"
      },
      { 
        words: ["I", "feel", "relaxed", "upset", "at", "home"], 
        positive_word: "relaxed", 
        negative_word: "upset",
        negative_category: "GA"
      },
      { 
        words: ["I", "sometimes", "read", "worry", "for", "hours"], 
        positive_word: "read", 
        negative_word: "worry",
        negative_category: "GA"
      },
      { 
        words: ["I", "think", "I'm", "a", "winner", "worrier"], 
        positive_word: "winner", 
        negative_word: "worrier",
        negative_category: "GA"
      },
      { 
        words: ["I", "win", "cry", "all", "the", "time"], 
        positive_word: "win", 
        negative_word: "cry",
        negative_category: "GA"
      },
      { 
        words: ["I", "say", "the", "right", "wrong", "things"], 
        positive_word: "right", 
        negative_word: "wrong",
        negative_category: "GA"
      },
      { 
        words: ["People", "notice", "my", "talents", "mistakes"], 
        positive_word: "talents", 
        negative_word: "mistakes",
        negative_category: "GA"
      },
      { 
        words: ["I", "make", "a", "good", "bad", "impression"], 
        positive_word: "good", 
        negative_word: "bad",
        negative_category: "GA"
      },
      { 
        words: ["My", "laugh", "sounds", "so", "happy", "ridiculous"], 
        positive_word: "happy", 
        negative_word: "ridiculous",
        negative_category: "GA"
      },
      { 
        words: ["Other", "people", "approve", "disapprove", "of", "me"], 
        positive_word: "approve", 
        negative_word: "disapprove",
        negative_category: "GA"
      }
    ];

    // Shuffle both lists
    shuffleArray(list1_sentences);
    shuffleArray(list2_sentences);

    /* EXPERIMENT STATE VARIABLES */

    var currentState = 'welcome'; // welcome, cognitive_load, black_screen, block1, block2, recall, end
    var currentBlock = 1;
    var currentSentenceIndex = 0;
    var blockStartTime = 0;
    var sentenceStartTime = 0;
    var blockTimer = null;
    var timeRemaining = 240; // 4 minutes in seconds

    // Data collection arrays
    var block1_data = {
      completions: [],
      sentences: [],
      interpretations: [],
      completion_times: [],
      total_completed: 0
    };

    var block2_data = {
      completions: [],
      sentences: [],
      interpretations: [],
      completion_times: [],
      total_completed: 0
    };

    /* UTILITY FUNCTIONS */
    
    function showErrorMessage(message) {
      console.error("Error:", message);
      var displayStage = document.getElementById('display_stage');
      if (displayStage) {
        displayStage.innerHTML = `
          <div class="task-container">
            <h2 style="color: red;">Error</h2>
            <p>${message}</p>
            <p>Please refresh the page and try again.</p>
            <button class="submit-button" onclick="location.reload()">Refresh Page</button>
          </div>
        `;
      }
    }
    
    function validateTaskState() {
      var displayStage = document.getElementById('display_stage');
      if (!displayStage) {
        showErrorMessage("Required display elements not found. Please refresh the page.");
        return false;
      }
      return true;
    }

    function formatTime(seconds) {
      var minutes = Math.floor(seconds / 60);
      var secs = seconds % 60;
      return minutes + ":" + (secs < 10 ? "0" : "") + secs;
    }

    function updateTimerDisplay() {
      var timerElement = document.getElementById('timer-display');
      if (timerElement) {
        timerElement.textContent = "Time Remaining: " + formatTime(timeRemaining);
      }
    }

    function updateProgressDisplay() {
      var progressElement = document.getElementById('progress-display');
      if (progressElement) {
        progressElement.textContent = "Sentence " + (currentSentenceIndex + 1) + " of 20";
      }
    }

    function constructSentence(words, wordOrder) {
      // Create the sentence based on word order
      var orderedWords = [];
      for (var i = 1; i <= 5; i++) {
        var position = wordOrder.indexOf(i);
        if (position !== -1) {
          orderedWords.push(words[position]);
        }
      }
      return orderedWords.join(' ');
    }

    function classifySentence(sentence, sentenceData) {
      // Use the already constructed sentence for classification
      var hasPositive = sentence.includes(sentenceData.positive_word);
      var hasNegative = sentence.includes(sentenceData.negative_word);
      
      if (hasPositive && hasNegative) {
        return 'mixed';
      } else if (hasPositive) {
        return 'positive';
      } else if (hasNegative) {
        return 'negative_' + sentenceData.negative_category;
      } else {
        return 'unclear';
      }
    }

    function validateWordOrder(wordOrder) {
      // Check if each number 1-5 is used exactly once
      var usedNumbers = [];
      for (var i = 0; i < wordOrder.length; i++) {
        var num = parseInt(wordOrder[i]);
        if (num >= 1 && num <= 5 && usedNumbers.indexOf(num) === -1) {
          usedNumbers.push(num);
        }
      }
      return usedNumbers.length === 5;
    }

    /* DISPLAY FUNCTIONS */

    function showWelcomeScreen() {
      console.log("showWelcomeScreen() called");
      
      if (!validateTaskState()) {
        return;
      }
      
      var displayStage = document.getElementById('display_stage');
      console.log("display_stage element:", displayStage);
      
      displayStage.innerHTML = `
        <div class="task-container">
          <h1>Scrambled Sentence Task</h1>
          <div class="instruction-text">
            <p><strong>Instructions:</strong></p>
            <p>In this task, you will see scrambled sentences made up of 6 words. Your job is to <strong>unscramble each sentence to form whatever statement comes to mind first</strong>, using exactly 5 of the 6 words provided.</p>
            <p>You will do this by numbering the words from 1 to 5 in the order you want them to appear in your sentence.</p>
            <p>There are two blocks of 20 sentences each. You will have <strong>4 minutes</strong> to complete each block, so work as <strong>quickly as possible</strong>.</p>
            <p>Before each block, you will see a 6-digit number. <strong>Please memorize this number</strong> as you will need to enter it at the end of the entire task.</p>
            <p>Click the button below to begin.</p>
          </div>
          <button class="submit-button" id="start-task-button" onclick="window.startCognitiveLoadBackup && window.startCognitiveLoadBackup()">Start Task</button>
        </div>
      `;
      console.log("Welcome screen HTML set successfully");
      
      // Add event listener for start button with improved DOM timing
      function bindStartButton() {
        var startButton = document.getElementById('start-task-button');
        if (startButton) {
          startButton.addEventListener('click', function() {
            console.log("Start Task button clicked");
            try {
              startCognitiveLoad();
            } catch (error) {
              console.error("Error in startCognitiveLoad:", error);
            }
          });
          console.log("Start button event listener added successfully");
          return true;
        } else {
          console.warn("Start button not found, retrying...");
          return false;
        }
      }
      
      // Wait for DOM to be ready, then bind with retries
      setTimeout(() => {
        if (!bindStartButton()) {
          setTimeout(() => {
            if (!bindStartButton()) {
              console.error("Failed to bind start button after retries");
              showErrorMessage("Button functionality failed to load. Please try clicking the Start Task button or refresh the page.");
            }
          }, 300);
        }
      }, 500);
    }

    function showCognitiveLoad() {
      console.log("showCognitiveLoad() called");
      var displayStage = document.getElementById('display_stage');
      if (!displayStage) {
        console.error("ERROR: display_stage element not found in showCognitiveLoad!");
        return;
      }
      
      displayStage.innerHTML = `
        <div class="task-container">
          <h2>Please memorize this number:</h2>
          <div class="cognitive-load-display">${cognitiveLoadDigits}</div>
          <p>Remember this number throughout the task!</p>
        </div>
      `;
      console.log("Cognitive load display set successfully");
      
      setTimeout(() => {
        console.log("Moving to black screen after 5 seconds");
        try {
          showBlackScreen();
        } catch (error) {
          console.error("Error in showBlackScreen:", error);
        }
      }, 5000); // Show for 5 seconds
    }

    function showBlackScreen() {
      console.log("showBlackScreen() called");
      
      // State validation  
      if (currentState !== 'cognitive_load') {
        console.warn("Invalid state transition to black_screen from:", currentState);
      }
      
      // DOM validation
      var displayStage = document.getElementById('display_stage');
      if (!displayStage) {
        console.error("ERROR: display_stage not found in showBlackScreen");
        return;
      }
      
      currentState = 'black_screen';
      displayStage.innerHTML = `
        <div class="task-container">
          <h2>Get ready...</h2>
        </div>
      `;
      
      setTimeout(() => {
        try {
          if (currentBlock === 1) {
            startBlock1();
          } else {
            startBlock2();
          }
        } catch (error) {
          console.error("Error transitioning from black screen:", error);
        }
      }, 3000); // Show for 3 seconds
    }

    function showSentenceTask() {
      var sentences = currentBlock === 1 ? list1_sentences : list2_sentences;
      var currentSentence = sentences[currentSentenceIndex];
      
      if (!currentSentence) {
        finishBlock();
        return;
      }

      // Create scrambled version for display while preserving original order for data tracking
      var displayWords = [...currentSentence.words]; // Copy the array
      var originalToScrambledMapping = [];
      
      // Create mapping before shuffling
      for (var i = 0; i < displayWords.length; i++) {
        originalToScrambledMapping[i] = i;
      }
      
      // Shuffle both the words and the mapping together
      for (var i = displayWords.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        // Swap words
        var tempWord = displayWords[i];
        displayWords[i] = displayWords[j];
        displayWords[j] = tempWord;
        // Swap mapping
        var tempMapping = originalToScrambledMapping[i];
        originalToScrambledMapping[i] = originalToScrambledMapping[j];
        originalToScrambledMapping[j] = tempMapping;
      }

      var wordsHtml = '';
      for (var i = 0; i < displayWords.length; i++) {
        wordsHtml += `
          <div class="word-item">
            <div class="word-text">${displayWords[i]}</div>
            <input type="number" class="word-input" min="1" max="5" data-word-index="${originalToScrambledMapping[i]}">
          </div>
        `;
      }

      document.getElementById('display_stage').innerHTML = `
        <div class="task-container">
          <div class="block-indicator">Block ${currentBlock}</div>
          <div class="timer-display" id="timer-display"></div>
          <div class="progress-display" id="progress-display"></div>
          
          <div class="sentence-container">
            <h3>Unscramble this sentence using numbers 1-5:</h3>
            <div class="scrambled-words">
              ${wordsHtml}
            </div>
            <button class="submit-button" id="submit-sentence" disabled onclick="window.submitSentenceBackup && window.submitSentenceBackup()">Submit Sentence</button>
          </div>
        </div>
      `;

      updateTimerDisplay();
      updateProgressDisplay();
      sentenceStartTime = Date.now();

      // Add event listeners for input validation
      var inputs = document.querySelectorAll('.word-input');
      inputs.forEach(function(input) {
        input.addEventListener('input', validateInputs);
      });
      
      // Add event listener for submit button with improved DOM timing
      function bindSubmitSentenceButton() {
        var submitButton = document.getElementById('submit-sentence');
        if (submitButton) {
          submitButton.addEventListener('click', function() {
            console.log("Submit sentence button clicked");
            try {
              submitSentence();
            } catch (error) {
              console.error("Error in submitSentence:", error);
            }
          });
          console.log("Submit sentence event listener added successfully");
          return true;
        } else {
          console.warn("Submit sentence button not found, retrying...");
          return false;
        }
      }
      
      // Wait for DOM to be ready, then bind with retries
      setTimeout(() => {
        if (!bindSubmitSentenceButton()) {
          setTimeout(() => {
            if (!bindSubmitSentenceButton()) {
              console.error("Failed to bind submit sentence button after retries");
            }
          }, 300);
        }
      }, 500);
    }

    function validateInputs() {
      var inputs = document.querySelectorAll('.word-input');
      var values = [];
      var isValid = true;

      inputs.forEach(function(input) {
        input.classList.remove('error');
        var value = parseInt(input.value);
        if (value >= 1 && value <= 5) {
          values.push(value);
        } else if (input.value !== '') {
          isValid = false;
          input.classList.add('error');
        }
      });

      // Check for duplicates
      var uniqueValues = [...new Set(values)];
      if (uniqueValues.length !== values.length) {
        isValid = false;
        inputs.forEach(function(input) {
          var value = parseInt(input.value);
          if (values.filter(v => v === value).length > 1) {
            input.classList.add('error');
          }
        });
      }

      // Enable submit button if we have exactly 5 unique values 1-5
      var submitButton = document.getElementById('submit-sentence');
      if (submitButton) {
        submitButton.disabled = !(isValid && uniqueValues.length === 5);
      }
    }

    function showRecallScreen() {
      document.getElementById('display_stage').innerHTML = `
        <div class="task-container">
          <h2>Task Complete!</h2>
          <p>Please enter the 6-digit number you were asked to remember:</p>
          <input type="text" class="recall-input" id="recall-input" maxlength="6" placeholder="######">
          <br>
          <button class="submit-button" id="submit-recall-button" onclick="window.submitRecallBackup && window.submitRecallBackup()">Submit</button>
        </div>
      `;
      
      // Add event listener for submit button with improved DOM timing
      function bindSubmitRecallButton() {
        var submitRecallButton = document.getElementById('submit-recall-button');
        if (submitRecallButton) {
          submitRecallButton.addEventListener('click', function() {
            console.log("Submit recall button clicked");
            try {
              submitRecall();
            } catch (error) {
              console.error("Error in submitRecall:", error);
            }
          });
          console.log("Submit recall event listener added successfully");
          return true;
        } else {
          console.warn("Submit recall button not found, retrying...");
          return false;
        }
      }
      
      // Wait for DOM to be ready, then bind with retries
      setTimeout(() => {
        if (!bindSubmitRecallButton()) {
          setTimeout(() => {
            if (!bindSubmitRecallButton()) {
              console.error("Failed to bind submit recall button after retries");
            }
          }, 300);
        }
      }, 500);
    }

    /* TASK FLOW FUNCTIONS */

    function startCognitiveLoad() {
      console.log("startCognitiveLoad() called");
      
      // State validation
      if (currentState !== 'welcome') {
        console.warn("Invalid state transition to cognitive_load from:", currentState);
      }
      
      // DOM validation
      var displayStage = document.getElementById('display_stage');
      if (!displayStage) {
        console.error("ERROR: display_stage not found in startCognitiveLoad");
        return;
      }
      
      currentState = 'cognitive_load';
      try {
        showCognitiveLoad();
        console.log("showCognitiveLoad() completed successfully");
      } catch (error) {
        console.error("Error in showCognitiveLoad:", error);
      }
    }

    function startBlock1() {
      console.log("startBlock1() called");
      
      // State validation
      if (currentState !== 'black_screen') {
        console.warn("Invalid state transition to block1 from:", currentState);
      }
      
      // DOM validation
      var displayStage = document.getElementById('display_stage');
      if (!displayStage) {
        console.error("ERROR: display_stage not found in startBlock1");
        return;
      }
      
      currentState = 'block1';
      currentBlock = 1;
      currentSentenceIndex = 0;
      blockStartTime = Date.now();
      timeRemaining = 240; // Reset to 4 minutes
      
      // Start block timer
      blockTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
          finishBlock();
        }
      }, 1000);

      showSentenceTask();
    }

    function startBlock2() {
      currentState = 'block2';
      currentBlock = 2;
      currentSentenceIndex = 0;
      blockStartTime = Date.now();
      timeRemaining = 240; // Reset to 4 minutes
      
      // Start block timer
      blockTimer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 0) {
          finishBlock();
        }
      }, 1000);

      showSentenceTask();
    }

    function submitSentence() {
      var sentences = currentBlock === 1 ? list1_sentences : list2_sentences;
      var currentSentence = sentences[currentSentenceIndex];
      var inputs = document.querySelectorAll('.word-input');
      var wordOrder = [];

      inputs.forEach(function(input) {
        wordOrder.push(parseInt(input.value) || 0);
      });

      // Record completion time
      var completionTime = Date.now() - sentenceStartTime;
      
      // Construct sentence once
      var constructedSentence = constructSentence(currentSentence.words, wordOrder);
      
      // Classify using the already constructed sentence
      var interpretation = classifySentence(constructedSentence, currentSentence);
      
      // Store data
      var blockData = currentBlock === 1 ? block1_data : block2_data;
      blockData.completions.push(wordOrder.join(','));
      blockData.sentences.push(constructedSentence);
      blockData.interpretations.push(interpretation);
      blockData.completion_times.push(completionTime);
      blockData.total_completed++;

      // Move to next sentence
      currentSentenceIndex++;
      
      if (currentSentenceIndex >= 20) {
        finishBlock();
      } else {
        showSentenceTask();
      }
    }

    function finishBlock() {
      if (blockTimer) {
        clearInterval(blockTimer);
        blockTimer = null;
      }

      if (currentBlock === 1) {
        // Start cognitive load for block 2
        showCognitiveLoad();
      } else {
        // Show recall screen
        showRecallScreen();
      }
    }

    function submitRecall() {
      var recallInput = document.getElementById('recall-input');
      var recallValue = recallInput.value;
      var isCorrect = recallValue === cognitiveLoadDigits;

      // Save all data to Qualtrics
      Qualtrics.SurveyEngine.setJSEmbeddedData("cognitive_load_digits", cognitiveLoadDigits);
      Qualtrics.SurveyEngine.setJSEmbeddedData("cognitive_load_recall", recallValue);
      Qualtrics.SurveyEngine.setJSEmbeddedData("cognitive_load_accuracy", isCorrect ? "1" : "0");
      
      Qualtrics.SurveyEngine.setJSEmbeddedData("block1_sentence_completions", block1_data.completions.join(';'));
      Qualtrics.SurveyEngine.setJSEmbeddedData("block1_sentences", block1_data.sentences.join(';'));
      Qualtrics.SurveyEngine.setJSEmbeddedData("block1_sentence_interpretations", block1_data.interpretations.join(';'));
      Qualtrics.SurveyEngine.setJSEmbeddedData("block1_completion_times", block1_data.completion_times.join(';'));
      Qualtrics.SurveyEngine.setJSEmbeddedData("block1_total_completed", block1_data.total_completed.toString());
      
      Qualtrics.SurveyEngine.setJSEmbeddedData("block2_sentence_completions", block2_data.completions.join(';'));
      Qualtrics.SurveyEngine.setJSEmbeddedData("block2_sentences", block2_data.sentences.join(';'));
      Qualtrics.SurveyEngine.setJSEmbeddedData("block2_sentence_interpretations", block2_data.interpretations.join(';'));
      Qualtrics.SurveyEngine.setJSEmbeddedData("block2_completion_times", block2_data.completion_times.join(';'));
      Qualtrics.SurveyEngine.setJSEmbeddedData("block2_total_completed", block2_data.total_completed.toString());

      // Clean up and continue to next question
      jQuery('#display_stage').remove();
      jQuery('#display_stage_background').remove();
      qthis.clickNextButton();
    }

    // Make functions globally accessible for both event listeners and backup onclick
    window.startCognitiveLoad = startCognitiveLoad;
    window.submitSentence = submitSentence;
    window.submitRecall = submitRecall;
    
    // Create backup functions for inline onclick handlers
    window.startCognitiveLoadBackup = function() {
      console.log("Backup startCognitiveLoad called");
      try {
        startCognitiveLoad();
      } catch (error) {
        console.error("Error in backup startCognitiveLoad:", error);
      }
    };
    
    window.submitSentenceBackup = function() {
      console.log("Backup submitSentence called");
      try {
        submitSentence();
      } catch (error) {
        console.error("Error in backup submitSentence:", error);
      }
    };
    
    window.submitRecallBackup = function() {
      console.log("Backup submitRecall called");
      try {
        submitRecall();
      } catch (error) {
        console.error("Error in backup submitRecall:", error);
      }
    };

    // Final initialization check and start
    function finalizeInitialization() {
      console.log("Finalizing initialization...");
      
      if (!validateTaskState()) {
        showErrorMessage("Task initialization failed. The display elements could not be created properly.");
        return;
      }
      
      console.log("All systems ready, starting experiment");
      showWelcomeScreen();
    }
    
    // Start the experiment with final validation
    setTimeout(finalizeInitialization, 100);
  }
});

Qualtrics.SurveyEngine.addOnReady(function () {
  /*Place your JavaScript here to run when the page is fully displayed*/
});

Qualtrics.SurveyEngine.addOnUnload(function () {
  /*Place your JavaScript here to run when the page is unloaded*/
});