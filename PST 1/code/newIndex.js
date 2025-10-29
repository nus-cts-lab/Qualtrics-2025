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
        'color: #28a745 !important;' +
      '}' +
      '.feedback.incorrect {' +
        'color: #dc3545 !important;' +
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

    // Device detection function
    function getDeviceInfo() {
      var deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        cookieEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toISOString()
      };
      
      // Parse user agent for more readable info
      var ua = navigator.userAgent;
      deviceInfo.browser = 'Unknown';
      deviceInfo.os = 'Unknown';
      deviceInfo.deviceType = 'Desktop';
      
      // Browser detection
      if (ua.includes('Chrome')) deviceInfo.browser = 'Chrome';
      else if (ua.includes('Firefox')) deviceInfo.browser = 'Firefox';
      else if (ua.includes('Safari')) deviceInfo.browser = 'Safari';
      else if (ua.includes('Edge')) deviceInfo.browser = 'Edge';
      
      // OS detection
      if (ua.includes('Windows')) deviceInfo.os = 'Windows';
      else if (ua.includes('Mac')) deviceInfo.os = 'macOS';
      else if (ua.includes('Linux')) deviceInfo.os = 'Linux';
      else if (ua.includes('Android')) deviceInfo.os = 'Android';
      else if (ua.includes('iOS')) deviceInfo.os = 'iOS';
      
      // Device type detection
      if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
        deviceInfo.deviceType = 'Mobile';
      } else if (ua.includes('Tablet') || ua.includes('iPad')) {
        deviceInfo.deviceType = 'Tablet';
      }
      
      return deviceInfo;
    }

    // Get participant ID from Qualtrics
    var ppt = "${e://Field/PROLIFIC_PID}" || "PST1_" + Math.random().toString(36).substr(2, 9);
    
    // Capture device information
    var deviceInfo = getDeviceInfo();

    // Practice scenarios (Practice 1)
    var practiceScenarios = [
      {
        sentence1: "You decide to take a short walk in the park…",
        sentence2: "near your home. As you pass a small garden, you notice…",
        sentence3: "something bright and colourful. It is a yellow…",
        fragment: "fl_wer",
        correctWord: "flower",
        question: "Did you see a yellow flower?",
        correctAnswer: "yes"
      },
      {
        sentence1: "You sit at your desk in the evening, ready to…",
        sentence2: "get some work done. After switching on the lamp,...",
        sentence3: "you press the button to turn on your…",
        fragment: "c_ _puter",
        correctWord: "computer",
        question: "Did you turn on the television?",
        correctAnswer: "no"
      },
      {
        sentence1: "You stop by a cafe on your way home from work.",
        sentence2: "You order a drink and sit at a table near the window.",
        sentence3: "When it arrives, you see that it is a cup of…",
        fragment: "cof_ _e",
        correctWord: "coffee",
        question: "Was it coffee on the table?",
        correctAnswer: "yes"
      }
    ];

    // Main task scenarios (List 1)
    var mainScenarios = [
      // Positive scenarios (List 1)
      {
        sentence1: "Your company signs up for a volleyball tournament that starts next week. You…",
        sentence2: "are asked to be the captain. You lost your first match, so at the next…",
        sentence3: "training you address your team. You think that because of your speech, the team spirit will…",
        fragment: "incr_ _se",
        correctWord: "increase",
        question: "Do you think your speech discouraged your team?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "You have a date at the local pub at 8 p.m.",
        sentence2: "You arrive on time and discover that your date isn't there yet. After your last…",
        sentence3: "conversation, you thought that your date found you…",
        fragment: "attr _ _tive",
        correctWord: "attractive",
        question: "Do you think your date is interested in you after your last conversation?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "Your partner asks you to join them at their company's annual dinner. You don't know any of…",
        sentence2: "partner's colleagues yet. As you get ready to go, you think that the…",
        sentence3: "new people you are about to meet will find you…",
        fragment: "fri _ ndly",
        correctWord: "friendly",
        question: "Will the new acquaintances dislike you?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "You overhear colleagues talking about other people…",
        sentence2: "they like, and you hear your name mentioned.",
        sentence3: "You think they were saying something…",
        fragment: "ple _ sant",
        correctWord: "pleasant",
        question: "Do you think your colleagues are gossiping about your mistakes?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "While walking down a busy street, you see your neighbour…",
        sentence2: "on the other side. You call out, but she doesn't respond.",
        sentence3: "You think this is because she was a bit…",
        fragment: "distr_ _ted",
        correctWord: "distracted",
        question: "Did your neighbour purposely ignore your call on the street?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "You work together with your supervisors in a large office. One morning, you need to call your mother.",
        sentence2: "Everyone is quietly working and can hear what you say. You suspect that they…",
        sentence3: "think that calling your mother from work means that you are…",
        fragment: "l_ving",
        correctWord: "loving",
        question: "Did the others think positively of you for calling your mother from work?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "The morning of your first evaluation with your boss has arrived. She is…",
        sentence2: "known as someone with a strong opinion, and as you wait to…",
        sentence3: "enter, you think that she finds your work…",
        fragment: "ex_ _llent",
        correctWord: "excellent",
        question: "Do you think your new boss has a negative opinion of your work?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "A new task has been assigned to your department, and your supervisor asks you…",
        sentence2: "to take responsibility for it. You have no guidelines to follow and ask…",
        sentence3: "a colleague for advice. Your colleague probably sees this as a sign of…",
        fragment: "pro_ ssionalism",
        correctWord: "professionalism",
        question: "Do you feel you made a mistake by asking for advice on the new project?",
        correctAnswer: "no",
        type: "positive"
      },
      {
        sentence1: "You spend an evening with a friend and get involved…",
        sentence2: "in a conversation about his relationship problems. You expect that…",
        sentence3: "your friend finds your advice…",
        fragment: "use_ ul",
        correctWord: "useful",
        question: "Do you find you gave your friend good advice?",
        correctAnswer: "yes",
        type: "positive"
      },
      {
        sentence1: "You go to a party at a club. While dancing, you see an old friend who is not…",
        sentence2: "far away, and you call out to him. Your friend does not respond, and a moment later, he leaves the…",
        sentence3: "dance floor and heads to the bar. You decide he is not responding because he is…",
        fragment: "occup _ _d",
        correctWord: "occupied",
        question: "Did your friend intentionally ignore you at the club?",
        correctAnswer: "no",
        type: "positive"
      },
      // Depression scenarios (List 1)
      {
        sentence1: "After submitting a project, you hear no…",
        sentence2: "feedback and start doubting yourself. You tell…",
        sentence3: "yourself that your work was completely…",
        fragment: "u_ eless",
        correctWord: "useless",
        question: "Do you think your work was valuable?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "During a team meeting, you hesitate to share your ideas.",
        sentence2: "Everyone has shared insightful perspectives, and you…",
        sentence3: "worry that your suggestions are …",
        fragment: "ina_ _quate",
        correctWord: "inadequate",
        question: "Do you feel your ideas are not good enough?",
        correctAnswer: "yes",
        type: "depression"
      },
      {
        sentence1: "You wake up after a full night's sleep but feel heavy…",
        sentence2: "and unmotivated. The morning seems exhausting…",
        sentence3: "and you feel completely…",
        fragment: "exh_ _sted",
        correctWord: "exhausted",
        question: "Did you feel drained despite sleeping?",
        correctAnswer: "yes",
        type: "depression"
      },
      {
        sentence1: "Completing assignments is usually straightforward for you, but…",
        sentence2: "this time, it feels unusually draining. Even simple steps…",
        sentence3: "take effort, and soon your mind feels completely…",
        fragment: "f_tigued",
        correctWord: "fatigued",
        question: "Were you able to focus and work efficiently?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "You attempt to follow a new recipe to bake a cake for a friend's birthday.",
        sentence2: "Despite your effort, it collapses in the oven and looks nothing like…",
        sentence3: "the picture. You can't help but feel everything you do is…",
        fragment: "unsuc _  _ssful",
        correctWord: "unsuccessful",
        question: "Do you feel your cake was a job well done?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "During a team sport, you make a mistake that costs…",
        sentence2: "your team a point. You can't help but…",
        sentence3: "wish you did better. You feel you…",
        fragment: "f_ iled",
        correctWord: "failed",
        question: "Do you feel your mistake had little impact?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "You planned to start painting again this week…",
        sentence2: "but your canvas remains untouched.",
        sentence3: "Even your favourite hobby feels…",
        fragment: "drea_ ful",
        correctWord: "dreadful",
        question: "Do you feel like engaging in this activity?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "You are at a dinner party, and everyone is laughing and sharing stories.",
        sentence2: "However, you struggle to feel interested.",
        sentence3: "Nothing seems enjoyable, and you feel completely…",
        fragment: "emoti _ _less",
        correctWord: "emotionless",
        question: "Did you enjoy the party?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "You have been applying for several jobs without success.",
        sentence2: "After another rejection, you start doubting whether things can improve.",
        sentence3: "You feel that your efforts are unlikely to succeed and everything will remain…",
        fragment: "hop_ _ess",
        correctWord: "hopeless",
        question: "Do you believe that your situation will improve?",
        correctAnswer: "no",
        type: "depression"
      },
      {
        sentence1: "At a family gathering, everyone shares stories and laughs together.",
        sentence2: "You try to contribute, but nobody responds or acknowledges what you said.",
        sentence3: "After a while, it feels like your efforts to connect are…",
        fragment: "poi_ _less",
        correctWord: "pointless",
        question: "Do you think you could connect with the rest?",
        correctAnswer: "no",
        type: "depression"
      },
      // Anxiety scenarios (List 1)
      {
        sentence1: "At a gathering, you try to share a story…",
        sentence2: "but others start chatting with each other. You immediately…",
        sentence3: "Think they found your story…",
        fragment: "bo _ ing",
        correctWord: "boring",
        question: "Did the group think you were interesting?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "A friend invites you to a dinner they are hosting. They tell you who the other…",
        sentence2: "guests are, but you do not recognise any of the names. You decide to go anyway…",
        sentence3: "and on the way there, you think the other guests will find you…",
        fragment: "ann_ ying",
        correctWord: "annoying",
        question: "Did the other guests at the party like you?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "You accidentally send an email with…",
        sentence2: "a small typo to your boss. Afterwards, you…",
        sentence3: "worry that your boss will think you are…",
        fragment: "inc_ _petent",
        correctWord: "incompetent",
        question: "Do you worry that your boss judged you negatively because of the typo?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "Your partner is coming home from work later than…",
        sentence2: "usual. They haven't messaged all day, and you start thinking…",
        sentence3: "they may have been in an…",
        fragment: "ac_ _dent",
        correctWord: "accident",
        question: "Do you think something bad happened to your partner?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "You apply for several jobs and finally get…",
        sentence2: "called for an interview. Instead of excitement, you keep…",
        sentence3: "thinking you will be…",
        fragment: "rej_ _ted",
        correctWord: "rejected",
        question: "Do you expect a positive outcome from the interview?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "It is your first day at a new job, and you are asked to give a self-introduction at the team…",
        sentence2: "meeting. As the moment approaches, you keep imagining yourself walking to the front…",
        sentence3: "and the scene always ends with you…",
        fragment: "st_mbling",
        correctWord: "stumbling",
        question: "Do you expect the self-introduction to be go well?",
        correctAnswer: "no",
        type: "anxiety"
      },
      {
        sentence1: "You notice a stranger standing near your shop, browsing the window displays. He…",
        sentence2: "glances at you briefly and continues looking around. You…",
        sentence3: "start imagining that he might be planning to…",
        fragment: "ste_l",
        correctWord: "steal",
        question: "Do you think that the man is up to no good?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "While walking in a park, you see a dog running toward you.",
        sentence2: "Even though it looks friendly, you immediately think…",
        sentence3: "it might bite and you feel…",
        fragment: "thr_ _tened",
        correctWord: "threatened",
        question: "Do you believe the dog is dangerous?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "You have a friend who is having family problems, and she calls to confide in you. After you share",
        sentence2: "your opinion, she seems unsure of how to respond. You start thinking about…",
        sentence3: "how this might affect your relationship if you said something…",
        fragment: "wr_ng",
        correctWord: "wrong",
        question: "Do you anticipate that your friend might react negatively to your response?",
        correctAnswer: "yes",
        type: "anxiety"
      },
      {
        sentence1: "You have been in a high-paying job for the past few years, but you were recently retrenched.",
        sentence2: "As you think about your situation and the years ahead, you imagine struggling financially",
        sentence3: "and not being able to support yourself. You start thinking that your future is…",
        fragment: "ble_k",
        correctWord: "bleak",
        question: "Do you foresee experiencing serious financial difficulties in the future?",
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

    // Function to convert fragment to asterisk format for input page
    function convertToAsteriskFormat(fragment) {
      return fragment.replace(/[a-zA-Z]/g, '*');
    }

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
        trial_duration: 3000
      });
      
      // Sentence 2 (2.5 seconds)
      trials.push({
        type: "html-keyboard-response",
        stimulus: '<div class="sentence-line">' + scenario.sentence1 + '</div>' +
                  '<div class="sentence-line">' + scenario.sentence2 + '</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 3000
      });
      
      // Sentence 3 (2.5 seconds)
      trials.push({
        type: "html-keyboard-response",
        stimulus: '<div class="sentence-line">' + scenario.sentence1 + '</div>' +
                  '<div class="sentence-line">' + scenario.sentence2 + '</div>' +
                  '<div class="sentence-line">' + scenario.sentence3 + '</div>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 3000
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
          '<p><strong>Fragment:</strong> ' + convertToAsteriskFormat(scenario.fragment) + '</p>' +
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
            window.currentInputWord = wordInput.value.trim();
            window.currentWordCorrect = wordCorrect;
          });
        },
        on_finish: function(data) {
          data.input_word = window.currentInputWord || '';
          data.word_correct = window.currentWordCorrect || false;
          data.correct_word = scenario.correctWord;
          data.task = isPractice ? 'practice' : 'main';
          data.scenario_type = scenario.type || 'practice';
        }
      });
      
      // Comprehension question
      trials.push({
        type: "html-button-response",
        stimulus: '<div class="comprehension-container">' +
          '<div class="comprehension-question">' + scenario.question + '</div>' +
          '</div>',
        choices: ['Yes', 'No'],
        response_ends_trial: true,
        post_trial_gap: 500,
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
          
          // Add metadata that was previously in the spacebar transition
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
        var practice_input_words = practice_trials.select('input_word').values;
        var practice_correct_words = practice_trials.select('correct_word').values;
        
        // Extract main task data using jsPsych data filtering  
        var main_trials = jsPsych.data.get().filter({ task: 'main' });
        var main_reaction_times = main_trials.select('final_reaction_time').values;
        var main_word_accuracy = main_trials.select('final_word_correct').values;
        var main_comprehension_accuracy = main_trials.select('final_comprehension_correct').values;
        var main_scenario_types = main_trials.select('scenario_type').values;
        var main_input_words = main_trials.select('input_word').values;
        var main_correct_words = main_trials.select('correct_word').values;
        
        // Calculate scenario completion counts
        var practice_count = practice_trials.count();
        var main_count = main_trials.count();
        var total_count = practice_count + main_count;
        
        // Save all data to Qualtrics embedded data using correct API
        Qualtrics.SurveyEngine.setEmbeddedData("pst1_participant_id", ppt);
        Qualtrics.SurveyEngine.setEmbeddedData("practice_reaction_times", practice_reaction_times.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_word_accuracy", practice_word_accuracy.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_comprehension_accuracy", practice_comprehension_accuracy.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_input_words", practice_input_words.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_correct_words", practice_correct_words.join(';'));
        
        Qualtrics.SurveyEngine.setEmbeddedData("main_reaction_times", main_reaction_times.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_word_accuracy", main_word_accuracy.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_comprehension_accuracy", main_comprehension_accuracy.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_scenario_types", main_scenario_types.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_input_words", main_input_words.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_correct_words", main_correct_words.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("list_assignment", "1");
        
        // Save device information
        Qualtrics.SurveyEngine.setEmbeddedData("device_info", JSON.stringify(deviceInfo));
        Qualtrics.SurveyEngine.setEmbeddedData("browser_type", deviceInfo.browser);
        Qualtrics.SurveyEngine.setEmbeddedData("operating_system", deviceInfo.os);
        Qualtrics.SurveyEngine.setEmbeddedData("device_type", deviceInfo.deviceType);
        
        // Save scenario completion counts
        Qualtrics.SurveyEngine.setEmbeddedData("practice_scenarios_completed", practice_count);
        Qualtrics.SurveyEngine.setEmbeddedData("main_scenarios_completed", main_count);
        Qualtrics.SurveyEngine.setEmbeddedData("total_scenarios_completed", total_count);
        
        console.log("PST1 Data Export Summary:");
        console.log("Practice scenarios completed:", practice_trials.count());
        console.log("Main scenarios completed:", main_trials.count());
        console.log("List assignment:", "1");
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