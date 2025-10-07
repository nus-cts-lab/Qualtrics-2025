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

  // Add CSS styling for PST interface
  var css = '<style>' +
      '#display_stage_background {' +
        'width: 100vw;' +
        'background-color: black;' +
        'z-index: -1;' +
      '}' +
      '#display_stage {' +
        'position: fixed !important;' +
        'left: 1vw !important;' +
        'top: 1vh !important;' +
        'height: 98vh !important;' +
        'width: 98vw !important;' +
        'background-color: white !important;' +
        'color: black !important;' +
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
      '.scenario-text {' +
        'font-size: 20px;' +
        'line-height: 1.6;' +
        'text-align: center;' +
        'max-width: 800px;' +
        'margin: 0 auto;' +
        'padding: 40px 20px;' +
        'color: white;' +
      '}' +
      '.sentence-line {' +
        'font-size: 18px;' +
        'line-height: 1.8;' +
        'text-align: center;' +
        'max-width: 700px;' +
        'margin: 0 auto 20px auto;' +
        'color: black;' +
        'background-color: white;' +
      '}' +
      '.word-fragment {' +
        'font-size: 24px;' +
        'font-weight: bold;' +
        'text-align: center;' +
        'color: black;' +
        'margin: 40px 0;' +
      '}' +
      '.input-container {' +
        'text-align: center;' +
        'max-width: 500px;' +
        'margin: 0 auto;' +
        'padding: 20px;' +
        'color: black;' +
      '}' +
      '.word-input {' +
        'width: 300px;' +
        'height: 40px;' +
        'font-size: 18px;' +
        'padding: 10px;' +
        'border: 2px solid #007bff;' +
        'border-radius: 8px;' +
        'text-align: center;' +
        'margin: 20px 0;' +
      '}' +
      '.comprehension-container {' +
        'text-align: center;' +
        'max-width: 600px;' +
        'margin: 0 auto;' +
        'padding: 20px;' +
        'color: black;' +
      '}' +
      '.comprehension-question {' +
        'font-size: 18px;' +
        'margin: 30px 0;' +
      '}' +
      '.yn-buttons {' +
        'display: flex;' +
        'justify-content: center;' +
        'gap: 40px;' +
        'margin: 30px 0;' +
      '}' +
      '.yn-btn {' +
        'background-color: #007bff;' +
        'color: white;' +
        'border: none;' +
        'padding: 15px 30px;' +
        'font-size: 16px;' +
        'border-radius: 8px;' +
        'cursor: pointer;' +
        'min-width: 80px;' +
      '}' +
      '.yn-btn:hover {' +
        'background-color: #0056b3;' +
      '}' +
      '.feedback {' +
        'font-size: 20px;' +
        'font-weight: bold;' +
        'text-align: center;' +
        'margin: 30px 0;' +
      '}' +
      '.feedback.correct {' +
        'color: #28a745;' +
      '}' +
      '.feedback.incorrect {' +
        'color: #dc3545;' +
      '}' +
      '.instructions {' +
        'background-color: white;' +
        'color: black;' +
        'padding: 40px;' +
        'border-radius: 10px;' +
        'max-width: 800px;' +
        'margin: 0 auto;' +
      '}' +
    '</style>';
  
  jQuery(css).appendTo('head');

  // Append the display_stage Div using jQuery
  jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
  jQuery("<div id = 'display_stage'></div>").appendTo('body');

  function initExp() {

    // Get participant ID from Qualtrics
    var ppt = "${e://Field/PROLIFIC_PID}" || "PST2_" + Math.random().toString(36).substr(2, 9);

    // Practice scenarios (Practice 2)
    var practiceScenarios = [
      {
        sentence1: "You and your family are attending your cousin's birthday party.",
        sentence2: "After eating cake, it is time to open her presents. Your family…",
        sentence3: "is giving her a present wrapped in paper that is…",
        fragment: "ye _ _ow",
        correctWord: "yellow",
        question: "Was the wrapping paper yellow?",
        correctAnswer: "yes"
      },
      {
        sentence1: "You walk into the kitchen in the morning and…",
        sentence2: "decide to make yourself a drink. You take a mug from the cupboard..",
        sentence3: "and pour in some boiling water. The drink is very…",
        fragment: "h_t",
        correctWord: "hot",
        question: "Was the drink cold?",
        correctAnswer: "no"
      },
      {
        sentence1: "You are reading a novel on the sofa",
        sentence2: "late at night. After finishing a chapter…",
        sentence3: "you carefully turn over to the next…",
        fragment: "p_ge",
        correctWord: "page",
        question: "Did you turn to the next page?",
        correctAnswer: "yes"
      }
    ];

    // Main task scenarios (List 2)
    var mainScenarios = [
      // Positive scenarios (List 2)
      {
        sentence1: "You buy a new smartphone, but when you get home,…",
        sentence2: "you decide that you don't like it. You return to the store and get",
        sentence3: "your money back. The store assistant is very…",
        fragment: "h_lpful",
        correctWord: "helpful",
        question: "Did the store assistant make the return process easy for you?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "You prepared a birthday surprise for your best friend.",
        sentence2: "When the cake is brought out, tears welled up in her eyes.",
        sentence3: "You think she cried because she is…",
        fragment: "overj_ yed",
        correctWord: "overjoyed",
        question: "Do you think your friend was surprised?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "You organise a day out with family and friends. The trip does not go very well…",
        sentence2: "and you feel disappointed. A few weeks later, you meet again and…",
        sentence3: "this time the plan is different. You predict that this time a positive outcome will be…",
        fragment: "l_kely",
        correctWord: "likely",
        question: "Will the next outing also end badly?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "Your boss organises a meeting to discuss a new project, involving most…",
        sentence2: "of the office staff. You are suddenly asked to contribute your…",
        sentence3: "ideas to the discussion. You think your boss finds your ideas…",
        fragment: "inno_ _tive",
        correctWord: "innovative",
        question: "Do you think your boss will reject your ideas at the meeting?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "You decide to go dancing again and during a break, you talk with a regular..",
        sentence2: "about your children. You discuss discipline, but you have opposing views.",
        sentence3: "Despite that, the conversation felt…",
        fragment: "resp_ _tful",
        correctWord: "respectful",
        question: "Did the person you met at dance treat your differing opinions considerately?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "When you pick up your child from school, you hear some parents talking about others.",
        sentence2: "As you get closer, you catch your name. When they see you, they smile and greet you.",
        sentence3: "From what they said, you feel…",
        fragment: "ac_ _pted",
        correctWord: "accepted",
        question: "Did the parents speak positively about you?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "You have been writing for years with a pen pal from Belgium, and finally he…",
        sentence2: "has arranged to come. While waiting at the station for his train…",
        sentence3: "to arrive, you think he will find you …",
        fragment: "ni_ e",
        correctWord: "nice",
        question: "Do you think you will make a good impression on your pen pal at the station?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "You are asked to attend a conference in Australia for your company. Your…",
        sentence2: "usual travel companion becomes ill a few days before departure, so your boss asks someone…",
        sentence3: "you don't know to go. You think the trip will be…",
        fragment: "sm_ _th",
        correctWord: "smooth",
        question: "Do you think the business trip with your new colleague will go well?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "Your best friend organises a blind date for you, and as you sit in the bar…",
        sentence2: "waiting to meet your date for the first time, you wonder how it…",
        sentence3: "will go. You feel that your date will think you are…",
        fragment: "pl_ _sant",
        correctWord: "pleasant",
        question: "Will you make a bad impression on your date?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "You invite your colleagues for a dinner at your…",
        sentence2: "home, even though you know you don't always click. Afterwards, …",
        sentence3: "during the cleanup, you think the evening was…",
        fragment: "enjo _ _ble",
        correctWord: "enjoyable",
        question: "Did you have fun during the dinner?",
        correctAnswer: "yes",
        type: "positive"
      },
      // Depression scenarios (List 2)
      {
        sentence1: "You spent hours preparing for a group presentation, but…",
        sentence2: "afterwards nobody comments on your effort. You tell yourself…",
        sentence3: "that your work was entirely…",
        fragment: "wo_ _hless",
        correctWord: "worthless",
        question: "Do you think your contribution was valued by others?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "You volunteer to organise a fundraising event for a hospital. After spending months",
        sentence2: "preparing and coordinating, your efforts seem to go unnoticed.",
        sentence3: "You cannot shake the feeling that your work is…",
        fragment: "unimp_ _tant",
        correctWord: "unimportant",
        question: "Do you feel that your work was appreciated?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "Normally, watching a movie or playing a video game is relaxing for you.",
        sentence2: "However, recently, you have struggled to concentrate or engage with it.",
        sentence3: "After a short while, you feel completely…",
        fragment: "t_ red",
        correctWord: "tired",
        question: "Were you able to enjoy the activity as usual?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "Lately, even getting out of bed in the morning feels like a struggle. The…",
        sentence2: "day stretches ahead, filled with tasks you once managed easily but…",
        sentence3: "now they feel impossible and you are extremely…",
        fragment: "drai _ed",
        correctWord: "drained",
        question: "Do you have the energy and motivation to complete your tasks?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "During an interview, you make a mistake by mentioning incorrect facts.",
        sentence2: "Thinking back, you feel you could have done better.",
        sentence3: "You start doubting yourself and feel..",
        fragment: "def_ _ted",
        correctWord: "defeated",
        question: "Do you think you performed well in the interview?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "During a work presentation, you forget to cover an important point that…",
        sentence2: "your manager highlighted. You notice some colleagues…",
        sentence3: "whispering afterwards and feel that you significantly…",
        fragment: "underperf_ _med",
        correctWord: "underperformed",
        question: "Did you think you did a good job?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "You usually enjoy going for walks in the park, but…",
        sentence2: "it hasn't been interesting anymore. Even the sights and…",
        sentence3: "sounds you normally like leave you feeling…",
        fragment: "indif_ _ent",
        correctWord: "indifferent",
        question: "Did the walk feel enjoyable?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "Your friend invites you to a cooking class you usually…",
        sentence2: "love, but today nothing sparks your curiosity or excitement.",
        sentence3: "You find yourself zoning out and feeling…",
        fragment: "lifel_ss",
        correctWord: "lifeless",
        question: "Did you enjoy the class?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "You have been trying to stick to a new workout routine…",
        sentence2: "for the past few weeks, but you see very little progress.",
        sentence3: "No matter how hard you try, you feel whatever you do will be…",
        fragment: "f_tle",
        correctWord: "futile",
        question: "Do you think your exercise routine will help you reach your goal?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "You have been studying for an important exam for weeks, but…",
        sentence2: "the material feels overwhelming. No matter how much time…",
        sentence3: "you spend revising, you start to think that you passing the exam is…",
        fragment: "imp_ _sible",
        correctWord: "impossible",
        question: "Do you feel confident you can pass the exam?",
        correctAnswer: "no",
        type: "depression"
      },
      // Anxiety scenarios (List 2)
      {
        sentence1: "You post a photo of yourself on social media…",
        sentence2: "but it gets very few likes. You assume this…",
        sentence3: "means people secretly think you are…",
        fragment: "unl_kable",
        correctWord: "unlikable",
        question: "Do you believe others enjoyed your post?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "During your class, you finish your work early and the teacher gives you…",
        sentence2: "a new task to complete. You read through it and cannot figure out how to start…",
        sentence3: "so you ask for advice. Your teacher may see your request for help as a sign of…",
        fragment: "w_ _kness",
        correctWord: "weakness",
        question: "Was your teacher understanding when you asked for help?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "You hear that your company is restructuring and some",
        sentence2: "roles may change. You start imagining the worst,…",
        sentence3: "convinced that you will be completely…",
        fragment: "r_moved",
        correctWord: "removed",
        question: "Do you think you will have a stable role after the restructuring?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "Your car makes an unusual sound…",
        sentence2: "while driving home. You immediately picture a huge repair bill,…",
        sentence3: "certain the engine must be entirely…",
        fragment: "dam_ ged",
        correctWord: "damaged",
        question: "Do you think the issue is small?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "During a discussion, you get involved in a debate with colleagues about a certain…",
        sentence2: "topic. You later discover that they found your opinion unusual. If the topic…",
        sentence3: "comes up again in the group discussion, you expect that you will be",
        fragment: "excl _ _ed",
        correctWord: "excluded",
        question: "Did the others find your opinion interesting?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "Every year, you organise a Christmas party for your friends. It didn't go…",
        sentence2: "so well last year and therefore you changed the plans slightly. You expect that the problems…",
        sentence3: "from the last party will be…",
        fragment: "rep_ _ ted",
        correctWord: "repeated",
        question: "Do you believe that you will have problems with your party again?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "While walking home, you notice a shadow moving across an alley.",
        sentence2: "Even though it could be a cat, your heart starts racing and you imagine…",
        sentence3: "someone following you. You start thinking you might get…",
        fragment: "att_ _ked",
        correctWord: "attacked",
        question: "Do you think you are at risk now?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "You notice that a fire alarm in your office building has a small light blinking. Even though it might just be a…",
        sentence2: "maintenance signal, you imagine the alarm going off and a fire breaking out.",
        sentence3: "You start thinking this is an…",
        fragment: "emer_ _ncy",
        correctWord: "emergency",
        question: "Do you believe there is an immediate danger in the building?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "Out of the blue, you received a message from an old friend whom you haven't seen for years.",
        sentence2: "She wants to meet you and explains that she has changed a lot since the last time you saw her. You start thinking…",
        sentence3: "how she might judge you now, specifically whether you changed for the…",
        fragment: "w_rse",
        correctWord: "worse",
        question: "Are you concerned that your friend thinks poorly of you?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "You are planning a long trip abroad. You double checked your itinerary…",
        sentence2: "but an uncomfortable feeling makes you feel something will go terribly wrong and…",
        sentence3: "the whole vacation will turn out…",
        fragment: "b_dly",
        correctWord: "badly",
        question: "Do you think the trip will not go as planned?",
        correctAnswer: "yes",
        type: "anxiety"
      }
    ];


    // Task instructions
    var initialInstructions = {
      type: "html-keyboard-response",
      stimulus: '<div class="instructions">' +
        '<h2 style="text-align: center;">Probes Scenario Task</h2>' +
        '<br>' +
        '<p><strong>Instructions:</strong></p>' +
        '<br>' +
        '<p>In the following task, you will be asked to read short stories/scenarios. While reading, try to imagine yourself as best you can in the described situation. The scenarios automatically appear on the screen sentence by sentence. In the last sentence, you will notice that the final word word is presented only as a fragment.</p>' +
        '<br>' +
        '<p>For example, the last word could be "un_ver_iteit" for "university." Your task is to use the content of the scenario to determine the fragmented word. If you know the correct answer, press the spacebar as quickly as possible. This reaction time will be recorded.</p>' +
        '<br>' +
        '<p>You will then be asked to type the missing word in its entirety. Do this and click NEXT to continue.</p>' +
        '<br>' +
        '<p>Finally, there will be a yes/no question about the content of the scenario. Once you\'ve answered this by clicking the correct box, the following scenario (sentence by sentence) will appear on the screen.</p>' +
        '<br>' +
        '<p>To familiarise yourself with the procedure, you\'ll first go through a short practice phase.</p>' +
        '<p style="text-align: center; margin-top: 40px; font-weight: bold;">Press the spacebar to start the practice phase.</p>' +
        '</div>',
      choices: [" "]
    };

    // Create practice phase trials
    var practiceTrials = [];
    
    practiceScenarios.forEach(function(scenario, index) {
      // Sequential sentence presentation
      practiceTrials.push(createScenarioSequence(scenario, index + 1, practiceScenarios.length, true));
    });

    // Main task instructions
    var mainInstructions = {
      type: "html-keyboard-response", 
      stimulus: '<div class="instructions">' +
        '<h2 style="text-align: center;">Main Experiment Phase</h2>' +
        '<br>' +
        '<p>That was the practice phase. If anything is unclear, feel free to call the experimenter and ask questions.</p>' +
        '<br>' +
        '<p>Once everything is clear, you can begin the main experiment phase. Your task remains exactly the same as in the practice phase:</p>' +
        '<br>' +
        '<p>Read the scenarios carefully and imagine yourself in the situation.</p>' +
        '<p>Try to decipher the missing word as quickly as possible and press the space bar as quickly as possible when you know it. This reaction time will be recorded.</p>' +
        '<p>Fill in the missing word (completely) and click NEXT with the mouse.</p>' +
        '<p>Answer the content question with the mouse.</p>' +
        '<br>' +
        '<p><strong>Remember:</strong> It\'s important to imagine yourself in every situation you read, even if it couldn\'t happen to you. Understanding how you might feel in that situation will help you answer the questions.</p>' +
        '<p style="text-align: center; margin-top: 40px; font-weight: bold;">Press the space bar to start the main experiment phase!</p>' +
        '</div>',
      choices: [" "]
    };

    // Create main task trials with randomization
    var mainTrials = [];
    var shuffledMainScenarios = jsPsych.randomization.shuffle(mainScenarios);
    
    shuffledMainScenarios.forEach(function(scenario, index) {
      mainTrials.push(createScenarioSequence(scenario, index + 1, shuffledMainScenarios.length, false));
    });

    // Function to create scenario sequence
    function createScenarioSequence(scenario, scenarioNum, totalScenarios, isPractice) {
      var trials = [];
      var fragmentStartTime;
      var reactionTime;
      var wordCorrect;
      var comprehensionCorrect;
      
      // Sentence 1 (2.5 seconds)
      trials.push({
        type: "html-keyboard-response",
        stimulus: '<div class="sentence-line">' + scenario.sentence1 + '</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 2500
      });
      
      // Sentence 2 (2.5 seconds)
      trials.push({
        type: "html-keyboard-response",
        stimulus: '<div class="sentence-line">' + scenario.sentence1 + '</div>' +
                  '<div class="sentence-line">' + scenario.sentence2 + '</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 2500
      });
      
      // Sentence 3 (2.5 seconds)
      trials.push({
        type: "html-keyboard-response",
        stimulus: '<div class="sentence-line">' + scenario.sentence1 + '</div>' +
                  '<div class="sentence-line">' + scenario.sentence2 + '</div>' +
                  '<div class="sentence-line">' + scenario.sentence3 + '</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 2500
      });
      
      // Word fragment with spacebar reaction time
      trials.push({
        type: "html-keyboard-response",
        stimulus: '<div class="sentence-line">' + scenario.sentence1 + '</div>' +
                  '<div class="sentence-line">' + scenario.sentence2 + '</div>' +
                  '<div class="sentence-line">' + scenario.sentence3 + '</div>' +
                  '<div class="word-fragment">' + scenario.fragment + '</div>' +
                  '<p style="color: black; text-align: center; margin-top: 40px;">Press SPACEBAR when you know the word!</p>',
        choices: [" "],
        on_start: function() {
          fragmentStartTime = performance.now();
        },
        on_finish: function(data) {
          reactionTime = performance.now() - fragmentStartTime;
          data.reaction_time = reactionTime;
          data.fragment = scenario.fragment;
          data.correct_word = scenario.correctWord;
        }
      });
      
      // Word input
      trials.push({
        type: "html-button-response",
        stimulus: '<div class="input-container">' +
          '<h3>Scenario ' + scenarioNum + ' of ' + totalScenarios + '</h3>' +
          '<p>Type the complete word:</p>' +
          '<p><strong>Fragment:</strong> ' + scenario.fragment + '</p>' +
          '<input type="text" class="word-input" id="word-input" placeholder="Enter the complete word...">' +
          '</div>',
        choices: ['Next'],
        on_load: function() {
          var continueBtn = document.querySelector('button');
          continueBtn.disabled = true;
          
          var wordInput = document.getElementById('word-input');
          wordInput.focus();
          
          function checkInput() {
            var inputValue = wordInput.value.trim().toLowerCase();
            continueBtn.disabled = inputValue.length === 0;
          }
          
          wordInput.addEventListener('input', checkInput);
          wordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !continueBtn.disabled) {
              continueBtn.click();
            }
          });
          
          // Store value when button is clicked
          continueBtn.addEventListener('click', function() {
            var inputWord = wordInput.value.trim().toLowerCase();
            var correctWord = scenario.correctWord.toLowerCase();
            wordCorrect = inputWord === correctWord;
            
            // Store in global scope for on_finish
            window.currentInputWord = inputWord;
            window.currentWordCorrect = wordCorrect;
          });
        },
        on_finish: function(data) {
          data.input_word = window.currentInputWord || '';
          data.word_correct = window.currentWordCorrect || false;
          data.correct_word = scenario.correctWord;
        }
      });
      
      // Comprehension question
      trials.push({
        type: "html-button-response",
        stimulus: '<div class="comprehension-container">' +
          '<div class="comprehension-question">' + scenario.question + '</div>' +
          '</div>',
        choices: ['Yes', 'No'],
        on_finish: function(data) {
          var userAnswer;
          var buttonIndex = data.button_pressed !== undefined ? data.button_pressed : data.response;
          
          if (buttonIndex === 0) {
            userAnswer = 'yes';
          } else if (buttonIndex === 1) {
            userAnswer = 'no';
          }
          
          comprehensionCorrect = userAnswer === scenario.correctAnswer;
          data.user_answer = userAnswer;
          data.comprehension_correct = comprehensionCorrect;
          data.correct_answer = scenario.correctAnswer;
        }
      });
      
      // Feedback
      trials.push({
        type: "html-keyboard-response",
        stimulus: function() {
          var feedbackText = comprehensionCorrect ? "Correct!" : "Incorrect!";
          var feedbackClass = comprehensionCorrect ? "correct" : "incorrect";
          
          return '<div class="comprehension-container">' +
            '<div class="feedback ' + feedbackClass + '">' + feedbackText + '</div>' +
            '<p style="color: black; text-align: center; margin-top: 30px;">Press SPACEBAR to continue</p>' +
            '</div>';
        },
        choices: [" "],
        on_finish: function(data) {
          data.task = isPractice ? 'practice' : 'main';
          data.scenario_type = scenario.type || 'practice';
          data.final_reaction_time = reactionTime;
          data.final_word_correct = wordCorrect;
          data.final_comprehension_correct = comprehensionCorrect;
        }
      });
      
      return trials;
    }

    // Task complete screen
    var taskComplete = {
      type: "html-keyboard-response",
      stimulus: '<div class="instructions">' +
        '<h2>Task Complete!</h2>' +
        '<br>' +
        '<p>Thank you for participating in the Probes Scenario Task.</p>' +
        '<br>' +
        '<p>Press SPACEBAR to finish.</p>' +
        '</div>',
      choices: [" "],
      on_finish: function() {
        // Extract practice data using jsPsych data filtering
        var practice_trials = jsPsych.data.get().filter({ task: 'practice' });
        var practice_reaction_times = practice_trials.select('final_reaction_time').values;
        var practice_word_accuracy = practice_trials.select('final_word_correct').values;
        var practice_comprehension_accuracy = practice_trials.select('final_comprehension_correct').values;
        
        // Extract main task data using jsPsych data filtering  
        var main_trials = jsPsych.data.get().filter({ task: 'main' });
        var main_reaction_times = main_trials.select('final_reaction_time').values;
        var main_word_accuracy = main_trials.select('final_word_correct').values;
        var main_comprehension_accuracy = main_trials.select('final_comprehension_correct').values;
        var main_scenario_types = main_trials.select('scenario_type').values;
        
        // Save all data to Qualtrics embedded data using correct API
        Qualtrics.SurveyEngine.setEmbeddedData("pst2_participant_id", ppt);
        Qualtrics.SurveyEngine.setEmbeddedData("practice_reaction_times", practice_reaction_times.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_word_accuracy", practice_word_accuracy.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_comprehension_accuracy", practice_comprehension_accuracy.join(';'));
        
        Qualtrics.SurveyEngine.setEmbeddedData("main_reaction_times", main_reaction_times.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_word_accuracy", main_word_accuracy.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_comprehension_accuracy", main_comprehension_accuracy.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_scenario_types", main_scenario_types.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("list_assignment", "2");
        
        console.log("PST2 Data Export Summary:");
        console.log("Practice scenarios completed:", practice_trials.count());
        console.log("Main scenarios completed:", main_trials.count());
        console.log("List assignment:", "2");
        console.log("Participant ID:", ppt);

        // End the jsPsych experiment
        jsPsych.endExperiment();
        
        // Clear the stage
        jQuery('#display_stage').remove();
        jQuery('#display_stage_background').remove();

        // Simulate click on Qualtrics "next" button
        qthis.clickNextButton();
      }
    };

    // Flatten all trial arrays
    var allPracticeTrials = [];
    practiceTrials.forEach(function(trialArray) {
      allPracticeTrials = allPracticeTrials.concat(trialArray);
    });
    
    var allMainTrials = [];
    mainTrials.forEach(function(trialArray) {
      allMainTrials = allMainTrials.concat(trialArray);
    });

    // Create timeline
    var timeline = [
      initialInstructions,
      ...allPracticeTrials,
      mainInstructions,
      ...allMainTrials,
      taskComplete
    ];

    // Initialize jsPsych
    jsPsych.init({
      timeline: timeline,
      display_element: 'display_stage',
      on_finish: function() {
        console.log("PST1 experiment completed");
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