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
      '.cognitive-load-reminder {' +
        'position: fixed;' +
        'top: 80px;' +
        'right: 30px;' +
        'background: #6f42c1;' +
        'color: white;' +
        'padding: 8px 15px;' +
        'border-radius: 20px;' +
        'font-size: 14px;' +
        'z-index: 10000;' +
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
    var cognitiveLoadDigits = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated cognitive load number:", cognitiveLoadDigits);

    // Cognitive load tracking variables
    var cognitiveLoadRecall = "";
    var cognitiveLoadAccuracy = 0;

    // Scrambled Sentence Stimuli - List 1 (Block 1)
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

    // Scrambled Sentence Stimuli - List 2 (Block 2)
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

    // Shuffle both sentence lists
    shuffleArray(list1_sentences);
    shuffleArray(list2_sentences);

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
            <p>1. In this task, you will see scrambled sentences made up of 6 words. Your job is to <strong>unscramble each sentence to form whatever statement comes to mind first</strong>, using exactly 5 of the 6 words provided.</p>
            <p>2. Please do this by clicking words in the order you want them to appear (1-5).</p>
            <p>3. There are two blocks of 20 sentences each. You will have <strong>4 minutes</strong> to complete each block, so work as <strong>quickly as possible</strong>.</p>
            <p>4. Before each block, you will see a 6-digit number. <strong>Please memorize this number</strong> as you will need to enter it at the end of the entire task.</p>
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
          '<p style="font-size: 18px; color: #666;">Screen will automatically continue in 5 seconds...</p>' +
        '</div>';
      },
      choices: [],
      trial_duration: 5000,
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
        // Focus on the input field
        document.getElementById('recall-input').focus();
        
        // Allow Enter key to submit
        document.getElementById('recall-input').addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            document.querySelector('button').click();
          }
        });
      },
      on_finish: function(data) {
        // Get the recalled number
        cognitiveLoadRecall = document.getElementById('recall-input').value;
        cognitiveLoadAccuracy = (cognitiveLoadRecall === cognitiveLoadDigits) ? 1 : 0;
        
        // Store in trial data
        data.cognitive_load_recall = cognitiveLoadRecall;
        data.cognitive_load_accuracy = cognitiveLoadAccuracy;
        data.cognitive_load_correct = cognitiveLoadDigits;
      }
    };

    // Task Complete Screen
    var task_complete = {
      type: "html-keyboard-response",
      stimulus: `
        <div style="font-size:20px; max-width: 600px; margin: 0 auto; text-align: center;">
          <h2>Task Complete!</h2>
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
            '<div><strong>Block ' + blockNumber + '</strong> - Sentence ' + sentenceNumber + ' of 20</div>' +
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
    var block1_start = {
      type: "html-keyboard-response",
      stimulus: '<div style="font-size:20px; max-width: 600px; margin: 0 auto; text-align: center;">' +
        '<h2>Block 1</h2>' +
        '<p>You will now begin the first block of 20 scrambled sentences.</p>' +
        '<p><strong>Remember:</strong> You have <span style="color: #dc3545;">4 minutes</span> to complete as many sentences as possible.</p>' +
        '<p>Keep the number <strong>' + cognitiveLoadDigits + '</strong> in mind throughout the task.</p>' +
        '<p>Press SPACEBAR to start Block 1.</p>' +
      '</div>',
      choices: [" "]
    };

    var block2_start = {
      type: "html-keyboard-response", 
      stimulus: '<div style="font-size:20px; max-width: 600px; margin: 0 auto; text-align: center;">' +
        '<h2>Block 2</h2>' +
        '<p>You will now begin the second block of 20 scrambled sentences.</p>' +
        '<p><strong>Remember:</strong> You have <span style="color: #dc3545;">4 minutes</span> to complete as many sentences as possible.</p>' +
        '<p>Keep the number <strong>' + cognitiveLoadDigits + '</strong> in mind throughout the task.</p>' +
        '<p>Press SPACEBAR to start Block 2.</p>' +
      '</div>',
      choices: [" "]
    };

    // Create timeline variables for Block 1
    var block1_timeline_variables = list1_sentences.map(function(sentence, index) {
      return {
        sentence: sentence,
        block: 1,
        sentence_number: index + 1
      };
    });

    // Create timeline variables for Block 2  
    var block2_timeline_variables = list2_sentences.map(function(sentence, index) {
      return {
        sentence: sentence,
        block: 2,
        sentence_number: index + 1
      };
    });

    // Block 1 Procedure (4-minute time limit)
    var block1_procedure = {
      timeline: [sentence_trial],
      timeline_variables: block1_timeline_variables,
      conditional_function: function() {
        // Check if 4 minutes (240000ms) have elapsed since block start
        var allData = jsPsych.data.get().filter({task: 'block1_start'});
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
            // End the timeline
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

    // Block 2 Procedure (4-minute time limit)
    var block2_procedure = {
      timeline: [sentence_trial],
      timeline_variables: block2_timeline_variables,
      conditional_function: function() {
        // Check if 4 minutes (240000ms) have elapsed since block start
        var allData = jsPsych.data.get().filter({task: 'block2_start'});
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
            // End the timeline
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
    block1_start.data = { task: 'block1_start' };
    block2_start.data = { task: 'block2_start' };

    // Build complete experiment timeline
    experiment_timeline.push(instructions);
    experiment_timeline.push(cognitive_load_display);
    experiment_timeline.push(block1_start);
    experiment_timeline.push(block1_procedure);
    experiment_timeline.push(block2_start);
    experiment_timeline.push(block2_procedure);
    experiment_timeline.push(cognitive_load_recall);
    experiment_timeline.push(task_complete);

    jsPsych.init({
      /* CHANGE HERE: Your JsPsych Timeline */
      timeline: experiment_timeline,
      display_element: 'display_stage',

      // Adding the clean up and continue functions
      on_finish: function (data) {

        // Extract cognitive load data
        Qualtrics.SurveyEngine.setJSEmbeddedData("cognitive_load_digits", cognitiveLoadDigits);
        Qualtrics.SurveyEngine.setJSEmbeddedData("cognitive_load_recall", cognitiveLoadRecall);
        Qualtrics.SurveyEngine.setJSEmbeddedData("cognitive_load_accuracy", cognitiveLoadAccuracy);

        // Get sentence completion data for both blocks  
        var block1_trials = jsPsych.data.get().filter({ 
          task: 'sentence_completion',
          block: 1
        });
        var block2_trials = jsPsych.data.get().filter({ 
          task: 'sentence_completion',
          block: 2  
        });

        // Process Block 1 data
        var block1_word_orders = block1_trials.select('word_order').values.map(function(order) { return order.join(','); });
        var block1_sentences = block1_trials.select('completed_sentence').values;
        var block1_interpretations = block1_trials.select('interpretation').values;
        var block1_times = block1_trials.select('rt').values;
        var block1_total = block1_trials.count();

        // Process Block 2 data
        var block2_word_orders = block2_trials.select('word_order').values.map(function(order) { return order.join(','); });
        var block2_sentences = block2_trials.select('completed_sentence').values;
        var block2_interpretations = block2_trials.select('interpretation').values;
        var block2_times = block2_trials.select('rt').values;
        var block2_total = block2_trials.count();

        // Export Block 1 data to Qualtrics
        Qualtrics.SurveyEngine.setJSEmbeddedData("block1_sentence_completions", block1_word_orders.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("block1_sentences", block1_sentences.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("block1_sentence_interpretations", block1_interpretations.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("block1_completion_times", block1_times.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("block1_total_completed", block1_total);

        // Export Block 2 data to Qualtrics
        Qualtrics.SurveyEngine.setJSEmbeddedData("block2_sentence_completions", block2_word_orders.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("block2_sentences", block2_sentences.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("block2_sentence_interpretations", block2_interpretations.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("block2_completion_times", block2_times.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("block2_total_completed", block2_total);

        console.log("Scrambled Sentence Task Data Export Summary:");
        console.log("Cognitive Load Digits:", cognitiveLoadDigits);
        console.log("Cognitive Load Recall:", cognitiveLoadRecall);
        console.log("Cognitive Load Accuracy:", cognitiveLoadAccuracy);
        console.log("Block 1 Completed:", block1_total);
        console.log("Block 2 Completed:", block2_total);

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