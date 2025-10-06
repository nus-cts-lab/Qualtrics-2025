Qualtrics.SurveyEngine.addOnload(function () {

  // Retrieve Qualtrics object and save in qthis
  var qthis = this;

  // Hide buttons
  qthis.hideNextButton();

  // Defining and load required resources
  var jslib_url = "https://lhw-1.github.io/jspsych-6.3.1/";
  var requiredResources = [
    jslib_url + "jspsych.js",
    jslib_url + "plugins/jspsych-html-keyboard-response.js",
    jslib_url + "plugins/jspsych-html-button-response.js"
  ];

  function loadScript(idx) {
    console.log("Loading ", requiredResources[idx]);
    jQuery.getScript(requiredResources[idx], function () {
      if ((idx + 1) < requiredResources.length) {
        loadScript(idx + 1);
      } else {
        initExp();
      }
    });
  }

  if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
    loadScript(0);
  }

  // Add CSS styling for scrambled sentence interface
  var css = '<style>' +
      '#display_stage_background {' +
        'width: 100vw;' +
        'background-color: white;' +
        'z-index: -1;' +
      '}' +
      '#display_stage {' +
        'position: fixed !important;' +
        'left: 1vw !important;' +
        'top: 1vh !important;' +
        'height: 98vh !important;' +
        'width: 98vw !important;' +
        'background-color: white !important;' +
        'box-shadow: 1px 1px 1px #999 !important;' +
        'border-radius: 15px !important;' +
        'z-index: 9999 !important;' +
        'overflow-y: auto !important;' +
        'overflow-x: hidden !important;' +
        'padding: 20px !important;' +
        'font-family: Arial, sans-serif !important;' +
        'display: block !important;' +
        'visibility: visible !important;' +
      '}' +
      '.sentence-container {' +
        'max-width: 900px;' +
        'margin: 20px auto;' +
        'padding: 30px;' +
        'background: #f8f9fa;' +
        'border-radius: 15px;' +
        'border: 2px solid #e9ecef;' +
      '}' +
      '.timer-display {' +
        'position: fixed;' +
        'top: 20px;' +
        'right: 30px;' +
        'background: #dc3545;' +
        'color: white;' +
        'padding: 10px 20px;' +
        'border-radius: 25px;' +
        'font-size: 18px;' +
        'font-weight: bold;' +
        'z-index: 10000;' +
      '}' +
      '.word-container {' +
        'display: flex;' +
        'flex-wrap: wrap;' +
        'justify-content: center;' +
        'gap: 15px;' +
        'margin: 30px 0;' +
        'min-height: 80px;' +
      '}' +
      '.word-item {' +
        'background: #007bff;' +
        'color: white;' +
        'padding: 12px 18px;' +
        'border-radius: 8px;' +
        'font-size: 18px;' +
        'font-weight: 500;' +
        'cursor: pointer;' +
        'user-select: none;' +
        'transition: all 0.2s ease;' +
        'min-width: 80px;' +
        'text-align: center;' +
        'border: 2px solid transparent;' +
      '}' +
      '.word-item:hover {' +
        'background: #0056b3;' +
        'transform: translateY(-2px);' +
        'box-shadow: 0 4px 8px rgba(0,123,255,0.3);' +
      '}' +
      '.word-item.selected {' +
        'background: #28a745;' +
        'border: 2px solid #1e7e34;' +
      '}' +
      '.number-input {' +
        'position: absolute;' +
        'top: -8px;' +
        'right: -8px;' +
        'background: #ffc107;' +
        'color: #000;' +
        'border-radius: 50%;' +
        'width: 25px;' +
        'height: 25px;' +
        'font-size: 14px;' +
        'font-weight: bold;' +
        'display: flex;' +
        'align-items: center;' +
        'justify-content: center;' +
        'border: 2px solid #fff;' +
      '}' +
      '.sentence-preview {' +
        'background: white;' +
        'border: 2px solid #007bff;' +
        'border-radius: 10px;' +
        'padding: 20px;' +
        'margin: 20px 0;' +
        'min-height: 60px;' +
        'font-size: 20px;' +
        'text-align: center;' +
        'color: #333;' +
      '}' +
      '.progress-info {' +
        'display: flex;' +
        'justify-content: space-between;' +
        'align-items: center;' +
        'margin-bottom: 20px;' +
        'padding: 15px;' +
        'background: #e3f2fd;' +
        'border-radius: 10px;' +
      '}' +
      '@media (max-width: 768px) {' +
        '.word-item {' +
          'font-size: 16px;' +
          'padding: 10px 14px;' +
          'min-width: 70px;' +
        '}' +
        '.sentence-container {' +
          'padding: 20px;' +
          'margin: 10px;' +
        '}' +
        '.timer-display {' +
          'font-size: 16px;' +
          'padding: 8px 15px;' +
          'right: 20px;' +
        '}' +
      '}' +
    '</style>';
  jQuery(css).appendTo('head');

  // Append the display_stage Div using jQuery
  jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
  jQuery("<div id = 'display_stage'></div>").appendTo('body');


  // Wrap jsPsych.init() in a function
  function initExp() {

    /**
     * EXPERIMENT VARIABLES
     */

    // Fisher-Yates Algorithm for Random Shuffling of Arrays
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    // Generate random 6-digit cognitive load number
    // Get participant ID from Qualtrics
    var ppt = "${e://Field/PROLIFIC_PID}" || "SST1_" + Math.random().toString(36).substr(2, 9);
    
    var cognitiveLoadDigits = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated cognitive load number:", cognitiveLoadDigits);

    // Cognitive load tracking variables
    var cognitiveLoadRecall = "";
    var cognitiveLoadAccuracy = 0;
    
    // Timer expiration tracking
    var timerExpired = false;

    // Scrambled Sentence Stimuli - List 1
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
        words: ["Something", "Nothing", "is", "wrong", "with", "me"], 
        positive_word: "Nothing", 
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

    // Practice Sentences
    var practice_sentences = [
      { 
        words: ["I", "visit", "the", "theatre", "cinema", "often"], 
        positive_word: "theatre", 
        negative_word: "cinema",
        negative_category: "P"
      },
      { 
        words: ["I", "expect", "to", "see", "snow", "rain"], 
        positive_word: "snow", 
        negative_word: "rain",
        negative_category: "P"
      },
      { 
        words: ["I", "have", "a", "small", "dog", "cat"], 
        positive_word: "dog", 
        negative_word: "cat",
        negative_category: "P"
      }
    ];

    // Shuffle sentence lists
    shuffleArray(list1_sentences);
    shuffleArray(practice_sentences);

    /**
     * EXPERIMENT TIMELINE
     */

    // Initialize Experiment Timeline
    var experiment_timeline = [];

    // Instructions / Welcome Screen
    var instructions = {
      type: "html-keyboard-response",
      stimulus: `
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
          max-width: 800px;
          text-align: center;
          width: 90%;
        ">
          <h1>Scrambled Sentence Task</h1>
          <br>
          <div style="text-align: left; line-height: 1.6; margin: 20px 0;">
            <p><strong>Instructions:</strong></p>
            <br>
            <p>1. In this task, you will see scrambled sentences made up of 6 words. Your job is to <strong>unscramble each sentence to form whatever statement comes to mind first</strong>, using exactly 5 of the 6 words provided.</p>
            <br>
            <p>2. Please do this by clicking words in the order you want them to appear (1-5).</p>
            <br>
            <p>3. You will start with a few <strong>practice rounds</strong> to get familiar with the task.</p>
            <br>
            <p>4. Then there are the main trials with 20 sentences. You will have <strong>4 minutes</strong> to complete as many as possible, so work as <strong>quickly as possible</strong>.</p>
            <br>
            <p>5. Before the main trials, you will see a 6-digit number. <strong>Please memorize this number</strong> as you will need to enter it at the end of the entire task.</p>
            <br>
            <p style="text-align: center;"><strong>Press SPACEBAR to begin.</strong></p>
          </div>
        </div>
      `,
      choices: [" "]
    };

    // Cognitive Load Display Screen
    var cognitive_load_display = {
      type: "html-keyboard-response",
      stimulus: function() {
        console.log("Displaying cognitive load number:", cognitiveLoadDigits);
        return '<div style="font-size:24px; width: 100vw; height: 100vh; background: white; position: absolute; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center;">' +
          '<h1 style="color: #d32f2f; margin-bottom: 40px; font-size: 36px;">MEMORIZE THIS NUMBER</h1>' +
          '<div style="font-size: 72px; font-weight: bold; color: #1976d2; letter-spacing: 16px; margin: 80px 0; background: #fff3cd; padding: 40px 60px; border: 5px solid #dc3545; border-radius: 15px; font-family: Arial, monospace; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">' +
            cognitiveLoadDigits +
          '</div>' +
          '<p style="font-size: 24px; color: #333; font-weight: bold; margin: 20px 0;">Remember this number throughout the entire task!</p>' +
          '<p style="font-size: 18px; color: #666;">Screen will automatically continue in <span id="countdown-timer" style="font-weight: bold; color: #d32f2f;">5</span> seconds...</p>' +
        '</div>';
      },
      choices: [],
      trial_duration: 5000,
      on_load: function() {
        var timeLeft = 5;
        var countdownElement = document.getElementById('countdown-timer');
        
        var countdown = setInterval(function() {
          timeLeft--;
          if (countdownElement && timeLeft >= 0) {
            countdownElement.textContent = timeLeft;
          }
          if (timeLeft < 0) {
            clearInterval(countdown);
          }
        }, 1000);
      },
      data: {
        task: 'cognitive_load_display',
        cognitive_load_number: cognitiveLoadDigits
      }
    };

    // Cognitive Load Recall Screen
    var cognitive_load_recall = {
      type: "html-button-response",
      stimulus: `
        <div style="font-size:20px; max-width: 600px; margin: 0 auto; text-align: center;">
          <h2>Number Recall</h2>
          <br>
          <p>Please enter the 6-digit number you were asked to remember:</p>
          <input type="text" id="recall-input" maxlength="6" style="
            font-size: 24px; 
            padding: 10px; 
            text-align: center; 
            letter-spacing: 4px;
            border: 2px solid #007bff;
            border-radius: 5px;
            margin: 20px 0;
            width: 200px;
            font-family: 'Courier New', monospace;
          " placeholder="000000">
        </div>
      `,
      choices: ['Submit'],
      on_load: function() {
        // Store reference to input value for later use
        window.cognitiveLoadInputValue = "";
        
        // Focus on the input field with null check
        var inputElement = document.getElementById('recall-input');
        if (inputElement) {
          inputElement.focus();
          
          // Update stored value whenever input changes
          inputElement.addEventListener('input', function(e) {
            window.cognitiveLoadInputValue = e.target.value;
          });
          
          // Allow Enter key to submit
          inputElement.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
              window.cognitiveLoadInputValue = e.target.value; // Ensure we capture latest value
              var submitButton = document.querySelector('button');
              if (submitButton) {
                submitButton.click();
              }
            }
          });
        } else {
          console.warn('Could not find recall-input element for focus/event binding');
        }
      },
      on_finish: function(data) {
        // Use the stored value instead of trying to read from DOM
        cognitiveLoadRecall = window.cognitiveLoadInputValue || "";
        cognitiveLoadAccuracy = (cognitiveLoadRecall === cognitiveLoadDigits) ? 1 : 0;
        
        // Store in trial data
        data.cognitive_load_recall = cognitiveLoadRecall;
        data.cognitive_load_accuracy = cognitiveLoadAccuracy;
        data.cognitive_load_correct = cognitiveLoadDigits;
        
        // Clean up
        delete window.cognitiveLoadInputValue;
      }
    };

    // Task Complete Screen
    var task_complete = {
      type: "html-keyboard-response",
      stimulus: `
        <div style="font-size:20px; max-width: 600px; margin: 0 auto; text-align: center;">
          <h2>Task Complete!</h2>
          <br>
          <p>Thank you for participating in the Scrambled Sentence Task.</p>
          <p>Press SPACEBAR to finish.</p>
        </div>
      `,
      choices: [" "]
    };

    // Data collection functions
    function constructSentence(words, wordOrder) {
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

    // Interactive Sentence Unscrambling Trial
    var sentence_trial = {
      type: "html-button-response",
      stimulus: function() {
        var sentence = jsPsych.timelineVariable('sentence');
        var originalWords = sentence.words;
        var blockNumber = jsPsych.timelineVariable('block');
        var sentenceNumber = jsPsych.timelineVariable('sentence_number');
        
        // Create a shuffled copy of the words array
        var shuffledWords = originalWords.slice(); // Make a copy
        shuffleArray(shuffledWords);
        
        // Create mapping from shuffled positions to original positions
        var positionMapping = [];
        for (var i = 0; i < shuffledWords.length; i++) {
          var originalIndex = originalWords.indexOf(shuffledWords[i]);
          // Handle duplicate words by finding the next available original index
          while (positionMapping.includes(originalIndex)) {
            originalIndex = originalWords.indexOf(shuffledWords[i], originalIndex + 1);
          }
          positionMapping[i] = originalIndex;
        }
        
        // Store mapping for use in click handlers
        window.currentPositionMapping = positionMapping;
        window.originalWords = originalWords;
        
        // Create word buttons using shuffled words
        var wordButtons = shuffledWords.map(function(word, index) {
          return '<div class="word-item" data-word-index="' + index + '" data-word="' + word + '" id="word-' + index + '">' +
                 '<span class="word-text">' + word + '</span>' +
                 '<div class="number-input" id="number-' + index + '" style="display: none;"></div>' +
                 '</div>';
        }).join('');

        return '<div class="sentence-container">' +
          '<div class="progress-info">' +
            '<div><strong>' + blockNumber + '</strong> - Sentence ' + sentenceNumber + ' of ' + (blockNumber === 'Practice' ? '3' : '20') + '</div>' +
          '</div>' +
          '<h3>Click words in order (1-5) to unscramble the sentence:</h3>' +
          '<div class="word-container">' + wordButtons + '</div>' +
          '<div class="sentence-preview" id="sentence-preview">Click 5 words to form your sentence...</div>' +
          '<p style="text-align: center; color: #666;">' +
            '<strong>Click 5 words</strong> in the order you want them to appear, then click <strong>Next</strong>' +
          '</p>' +
        '</div>';
      },
      choices: ['Next'],
      button_html: '<button class="jspsych-btn" disabled>%choice%</button>',
      on_load: function() {
        var selectedCount = 0;
        var selectedOrder = [];
        var maxSelection = 5;
        
        // Word click handler
        var wordItems = document.querySelectorAll('.word-item');
        wordItems.forEach(function(item, index) {
          item.addEventListener('click', function() {
            
            // If word is already selected, deselect it
            if (item.classList.contains('selected')) {
              item.classList.remove('selected');
              var numberDiv = document.getElementById('number-' + index);
              if (numberDiv && numberDiv.textContent) {
                var currentNumber = parseInt(numberDiv.textContent);
                numberDiv.style.display = 'none';
                
                // Remove from selectedOrder and adjust numbering
                selectedOrder = selectedOrder.filter(function(entry) { return entry.index !== index; });
                selectedCount--;
                
                // Renumber remaining selections
                selectedOrder.forEach(function(entry) {
                  if (entry.number > currentNumber) {
                    entry.number--;
                    var entryDiv = document.getElementById('number-' + entry.index);
                    if (entryDiv) {
                      entryDiv.textContent = entry.number;
                    }
                  }
                });
              }
              
            } else if (selectedCount < maxSelection) {
              // Select new word
              selectedCount++;
              item.classList.add('selected');
              var numberDiv = document.getElementById('number-' + index);
              if (numberDiv) {
                numberDiv.textContent = selectedCount;
                // Keep number hidden from participant view
                numberDiv.style.display = 'none';
                
                selectedOrder.push({
                  index: index,
                  number: selectedCount,
                  word: item.getAttribute('data-word') // Get clean word from data attribute
                });
              }
            }
            
            // Update sentence preview
            updateSentencePreview();
            
            // Enable/disable Next button
            var nextButton = document.querySelector('.jspsych-btn');
            if (nextButton) {
              if (selectedCount === maxSelection) {
                nextButton.disabled = false;
                nextButton.style.background = '#28a745';
              } else {
                nextButton.disabled = true;
                nextButton.style.background = '#6c757d';
              }
            }
          });
        });
        
        function updateSentencePreview() {
          var preview = document.getElementById('sentence-preview');
          if (preview) {
            if (selectedCount === 0) {
              preview.textContent = 'Click 5 words to form your sentence...';
              preview.style.color = '#999';
            } else {
              // Sort by selection order and create sentence
              var sortedWords = selectedOrder
                .sort(function(a, b) { return a.number - b.number; })
                .map(function(entry) { return entry.word; }); // Clean words from data attribute
              
              if (selectedCount === maxSelection) {
                preview.textContent = sortedWords.join(' ');
                preview.style.color = '#333';
                preview.style.fontWeight = 'bold';
              } else {
                preview.textContent = sortedWords.join(' ') + '...';
                preview.style.color = '#666';
                preview.style.fontWeight = 'normal';
              }
            }
          }
        }
        
        // Store the selection data for retrieval
        window.currentSelection = {
          getOrder: function() {
            // Map shuffled indices back to original word positions
            return selectedOrder
              .sort(function(a, b) { return a.number - b.number; })
              .map(function(entry) { 
                return window.currentPositionMapping[entry.index] + 1; 
              });
          },
          getSentence: function() {
            return constructSentence(window.originalWords, this.getOrder());
          }
        };
      },
      on_finish: function(data) {
        var sentence = jsPsych.timelineVariable('sentence');
        var wordOrder = window.currentSelection.getOrder();
        var completedSentence = window.currentSelection.getSentence();
        var interpretation = classifySentence(completedSentence, sentence);
        
        // Store trial data using original word array
        data.sentence_words = window.originalWords;
        data.word_order = wordOrder;
        data.completed_sentence = completedSentence;
        data.interpretation = interpretation;
        data.positive_word = sentence.positive_word;
        data.negative_word = sentence.negative_word;
        data.negative_category = sentence.negative_category;
        data.block = jsPsych.timelineVariable('block');
        data.sentence_number = jsPsych.timelineVariable('sentence_number');
        data.task = 'sentence_completion';
      }
    };

    // Block Preparation Screens
    var practice_start = {
      type: "html-keyboard-response",
      stimulus: '<div style="' +
        'position: absolute;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'font-size: 20px;' +
        'max-width: 600px;' +
        'text-align: left;' +
        'width: 90%;' +
      '">' +
        '<h2 style="text-align: center;">Practice Rounds</h2>' +
        '<br>' +
        '<p>Let\'s start with a few practice sentences to get familiar with the task.</p>' +
        '<p>You will see 3 practice sentences. Take your time to understand how the task works.</p>' +
        '<p><strong>Remember:</strong> Click 5 words in the order you want them to appear to form a sentence.</p>' +
        '<br>' +
        '<p style="text-align: center;"><strong>Press SPACEBAR to start the practice.</strong></p>' +
      '</div>',
      choices: [" "]
    };

    var practice_complete = {
      type: "html-keyboard-response",
      stimulus: '<div style="' +
        'position: absolute;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'font-size: 20px;' +
        'max-width: 600px;' +
        'text-align: left;' +
        'width: 90%;' +
      '">' +
        '<h2 style="text-align: center;">Practice Complete!</h2>' +
        '<br>' +
        '<p>Great job! You\'ve completed the practice rounds.</p>' +
        '<br>' +
        '<p>Now you\'re ready for the main task. You will see a number to memorize. You will be asked to enter this number at the end of the task. The main task consists of 20 sentences and must be completed within 4 minutes.</p>' +
        '<br>' +
        '<p><strong>Remember:</strong> Work as quickly as possible during the main blocks!</p>' +
        '<br>' +
        '<p style="text-align: center;"><strong>Press SPACEBAR to continue.</strong></p>' +
      '</div>',
      choices: [" "]
    };

    var main_start = {
      type: "html-keyboard-response",
      stimulus: '<div style="' +
        'position: absolute;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'font-size: 20px;' +
        'max-width: 600px;' +
        'text-align: left;' +
        'width: 90%;' +
      '">' +
        '<h2 style="text-align: center;">Main Trials</h2>' +
        '<br>' +
        '<p>You will now begin the main block of 20 scrambled sentences.</p>' +
        '<br>' +
        '<p><strong>Remember:</strong> You have <span style="color: #dc3545;">4 minutes</span> to complete as many sentences as possible.</p>' +
        '<br>' +
        '<p>Keep the number <strong>' + cognitiveLoadDigits + '</strong> in mind throughout the task.</p>' +
        '<br>' +
        '<p style="text-align: center;"><strong>Press SPACEBAR to start the Main Trials.</strong></p>' +
      '</div>',
      choices: [" "]
    };

    // Create timeline variables for Practice
    var practice_timeline_variables = practice_sentences.map(function(sentence, index) {
      return {
        sentence: sentence,
        block: "Practice",
        sentence_number: index + 1
      };
    });

    // Create timeline variables for Main Trials
    var main_timeline_variables = list1_sentences.map(function(sentence, index) {
      return {
        sentence: sentence,
        block: "Main",
        sentence_number: index + 1
      };
    });

    // Practice Procedure (no time limit)
    var practice_procedure = {
      timeline: [sentence_trial],
      timeline_variables: practice_timeline_variables
    };

    // Main Trials Procedure (4-minute time limit)
    var main_procedure = {
      timeline: [sentence_trial],
      timeline_variables: main_timeline_variables,
      conditional_function: function() {
        // Stop if timer has expired
        if (timerExpired) {
          return false;
        }
        // Check if 4 minutes (240000ms) have elapsed since main trials start
        var allData = jsPsych.data.get().filter({task: 'main_start'});
        if (allData.count() > 0) {
          var blockStartTime = allData.select('time_elapsed').values[0];
          var currentTime = jsPsych.totalTime();
          var timeElapsed = currentTime - blockStartTime;
          return timeElapsed < 240000; // 4 minutes in milliseconds
        }
        return true;
      },
      on_timeline_start: function() {
        // Add timer display
        var timerDiv = document.createElement('div');
        timerDiv.id = 'block-timer';
        timerDiv.className = 'timer-display';
        timerDiv.innerHTML = '4:00';
        document.body.appendChild(timerDiv);
        
        // Start countdown
        var timeLeft = 240; // 4 minutes in seconds
        var timer = setInterval(function() {
          timeLeft--;
          var minutes = Math.floor(timeLeft / 60);
          var seconds = timeLeft % 60;
          timerDiv.innerHTML = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
          
          if (timeLeft <= 0) {
            clearInterval(timer);
            timerDiv.innerHTML = '0:00';
            // Set timer expired flag
            timerExpired = true;
            
            // Force the current trial to end immediately
            jsPsych.finishTrial();
            // End the current timeline - will take effect after current trial ends
            jsPsych.endCurrentTimeline();
          }
        }, 1000);
        
        // Store timer reference
        window.currentBlockTimer = timer;
      },
      on_timeline_finish: function() {
        // Clean up timer
        if (window.currentBlockTimer) {
          clearInterval(window.currentBlockTimer);
        }
        var timerDiv = document.getElementById('block-timer');
        if (timerDiv) {
          timerDiv.remove();
        }
      }
    };

    // Add block start markers for timing
    practice_start.data = { task: 'practice_start' };
    main_start.data = { task: 'main_start' };

    // Build complete experiment timeline
    experiment_timeline.push(instructions);
    experiment_timeline.push(practice_start);
    experiment_timeline.push(practice_procedure);
    experiment_timeline.push(practice_complete);
    experiment_timeline.push(cognitive_load_display);
    experiment_timeline.push(main_start);
    experiment_timeline.push(main_procedure);
    experiment_timeline.push(cognitive_load_recall);
    experiment_timeline.push(task_complete);

    jsPsych.init({
      /* CHANGE HERE: Your JsPsych Timeline */
      timeline: experiment_timeline,
      display_element: 'display_stage',

      // Adding the clean up and continue functions
      on_finish: function (data) {

        // Note: Cognitive load recall always runs now, regardless of timer expiration

        // Save all data to Qualtrics embedded data using correct API
        Qualtrics.SurveyEngine.setEmbeddedData("sst1_participant_id", ppt);
        Qualtrics.SurveyEngine.setEmbeddedData("cognitive_load_digits", cognitiveLoadDigits);
        Qualtrics.SurveyEngine.setEmbeddedData("cognitive_load_recall", cognitiveLoadRecall);
        Qualtrics.SurveyEngine.setEmbeddedData("cognitive_load_accuracy", cognitiveLoadAccuracy);

        // Get sentence completion data for practice and main trials
        var practice_trials = jsPsych.data.get().filter({ 
          task: 'sentence_completion',
          block: "Practice"
        });
        var main_trials = jsPsych.data.get().filter({ 
          task: 'sentence_completion',
          block: "Main"
        });

        // Process Practice data
        var practice_word_orders = practice_trials.select('word_order').values.map(function(order) { return order.join(','); });
        var practice_sentences = practice_trials.select('completed_sentence').values;
        var practice_interpretations = practice_trials.select('interpretation').values;
        var practice_times = practice_trials.select('rt').values;
        var practice_total = practice_trials.count();

        // Process Main Trials data
        var main_word_orders = main_trials.select('word_order').values.map(function(order) { return order.join(','); });
        var main_sentences = main_trials.select('completed_sentence').values;
        var main_interpretations = main_trials.select('interpretation').values;
        var main_times = main_trials.select('rt').values;
        var main_total = main_trials.count();

        // Export Practice data to Qualtrics
        Qualtrics.SurveyEngine.setEmbeddedData("practice_sentence_completions", practice_word_orders.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_sentences", practice_sentences.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_sentence_interpretations", practice_interpretations.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_completion_times", practice_times.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_total_completed", practice_total);

        // Export Main Trials data to Qualtrics
        Qualtrics.SurveyEngine.setEmbeddedData("main_sentence_completions", main_word_orders.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_sentences", main_sentences.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_sentence_interpretations", main_interpretations.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_completion_times", main_times.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_total_completed", main_total);
        Qualtrics.SurveyEngine.setEmbeddedData("list_assignment", "1");

        console.log("Scrambled Sentence Task Data Export Summary:");
        console.log("Cognitive Load Digits:", cognitiveLoadDigits);
        console.log("Cognitive Load Recall:", cognitiveLoadRecall);
        console.log("Cognitive Load Accuracy:", cognitiveLoadAccuracy);
        console.log("SST1 Data Export Summary:");
        console.log("Practice Completed:", practice_total);
        console.log("Main Trials Completed:", main_total);
        console.log("List assignment:", "1");
        console.log("Participant ID:", ppt);
        console.log("Timer Expired:", timerExpired);

        // Clear the stage
        jQuery('#display_stage').remove();
        jQuery('#display_stage_background').remove();

        // Simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
      }
    });
  }
});

Qualtrics.SurveyEngine.addOnReady(function () {
  /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
  /*Place your JavaScript here to run when the page is unloaded*/

});