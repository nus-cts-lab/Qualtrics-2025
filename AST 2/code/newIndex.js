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

  // Add CSS styling for AST interface
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
      '.scenario-text {' +
        'font-size: 20px;' +
        'line-height: 1.6;' +
        'text-align: center;' +
        'max-width: 800px;' +
        'margin: 0 auto;' +
        'padding: 40px 20px;' +
      '}' +
      '.rating-container {' +
        'text-align: center;' +
        'max-width: 700px;' +
        'margin: 0 auto;' +
        'padding: 20px;' +
      '}' +
      '.rating-scale {' +
        'display: flex;' +
        'justify-content: space-between;' +
        'align-items: center;' +
        'margin: 30px 0;' +
        'padding: 0 20px;' +
      '}' +
      '.rating-item {' +
        'display: flex;' +
        'flex-direction: column;' +
        'align-items: center;' +
        'cursor: pointer;' +
      '}' +
      '.rating-item input[type="radio"] {' +
        'margin-bottom: 5px;' +
        'transform: scale(1.5);' +
      '}' +
      '.rating-item label {' +
        'font-size: 14px;' +
        'text-align: center;' +
        'min-height: 40px;' +
        'display: flex;' +
        'align-items: center;' +
      '}' +
      '.description-input {' +
        'width: 100%;' +
        'height: 100px;' +
        'font-size: 16px;' +
        'padding: 15px;' +
        'border: 2px solid #007bff;' +
        'border-radius: 8px;' +
        'resize: vertical;' +
        'font-family: inherit;' +
      '}' +
      '.submit-btn {' +
        'background-color: #007bff;' +
        'color: white;' +
        'border: none;' +
        'padding: 12px 30px;' +
        'font-size: 16px;' +
        'border-radius: 5px;' +
        'cursor: pointer;' +
        'margin-top: 20px;' +
      '}' +
      '.submit-btn:hover {' +
        'background-color: #0056b3;' +
      '}' +
      '.submit-btn:disabled {' +
        'background-color: #cccccc;' +
        'cursor: not-allowed;' +
      '}' +
    '</style>';
  
  jQuery(css).appendTo('head');

  // Append the display_stage Div using jQuery
  jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
  jQuery("<div id = 'display_stage'></div>").appendTo('body');

  function initExp() {

    // Practice scenarios (List 2)
    var practiceScenarios = [
      "You are walking down the street when a familiar voice calls out your name loudly. You turn to see who it is.",
      "You are having a hot cup of coffee at a cafe. Suddenly, someone walks up to you and asks you a question.",
      "As you reach home, you see that the lights are on. It must mean that someone is at home."
    ];

    // Main task scenarios (List 2)
    var mainScenarios = [
      // Depression scenarios (List 2)
      {
        text: "You buy a new outfit for a party. You can tell if you made the right choice by the reaction of the other people.",
        theme: "Self",
        type: "Depression"
      },
      {
        text: "You are hosting a dinner party for 10 people and got pretty stressed out while preparing the food. You can tell from the initial reaction of the guests how they like the food.",
        theme: "Self", 
        type: "Depression"
      },
      {
        text: "You give a speech at your friend's wedding. When you have finished, you observe the audience's reaction.",
        theme: "Self",
        type: "Depression"
      },
      {
        text: "You are in a reflective mood and think back at past achievements and disappointments that you have experienced during your life. Overall, your main feelings about your life so far emerge.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "You go to a place you visited as a child. Walking around makes you feel emotional.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "It is the end of December. You reflect upon the year behind you.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "It is an overcast day, and you are sitting on the beach. You look up to notice the weather really beginning to change.",
        theme: "Experiences",
        type: "Depression"
      },
      {
        text: "Your friend is very keen on skating and persuades you to try it out. At the rink, you put on the skates and step on the ice. You glide forward, slowly at first, then faster.",
        theme: "Experiences",
        type: "Depression"
      },
      // Anxiety scenarios (List 2)
      {
        text: "You had just finished your driving test. Your driving instructor calls you over to inform you of the outcome.",
        theme: "Uncertainty",
        type: "Anxiety"
      },
      {
        text: "You are getting your bag checked at the airport security. The officer gestures to you to step aside. You turn to him but is unable to figure out why.",
        theme: "Uncertainty",
        type: "Anxiety"
      },
      {
        text: "You are swimming at the beach when you feel something brush against your leg. You pause and glance at the water around you.",
        theme: "Threat expectancy",
        type: "Anxiety"
      },
      {
        text: "You are camping in a forest and are very cold. You decide to light a fire. The flames grow in intensity much faster than you imagined.",
        theme: "Threat expectancy",
        type: "Anxiety"
      },
      {
        text: "Your lunch break has just ended, and you are returning to work. Immediately after you walk in, your boss asks, \"Where did you go?\".",
        theme: "Worry",
        type: "Anxiety"
      },
      {
        text: "You signed up for a new sports class. The evening before, you think about what the other participants will be like.",
        theme: "Worry",
        type: "Anxiety"
      },
      {
        text: "You shared something with a group of friends. They immediately burst out laughing.",
        theme: "Social evaluation",
        type: "Anxiety"
      },
      {
        text: "You sent a message to someone, and you repeatedly see the \"typing…\" bubble appear and disappear. A few minutes later, they finally respond.",
        theme: "Social evaluation",
        type: "Anxiety"
      }
    ];

    // Data collection arrays
    var practiceRatings = [];
    var practiceDescriptions = [];
    var practiceResponseTimes = [];
    
    var mainRatings = [];
    var mainDescriptions = [];
    var mainResponseTimes = [];
    var mainScenarioIds = [];
    var mainThemes = [];

    // Task instructions
    var initialInstructions = {
      type: "html-keyboard-response",
      stimulus: '<div style="font-size:18px; max-width: 800px; margin: 0 auto; text-align: left; padding: 40px;">' +
        '<h2 style="text-align: center;">Ambiguous Scenarios Task</h2>' +
        '<br>' +
        '<p><strong>Instructions:</strong></p>' +
        '<p>In this task, you will be presented with short scenarios. Form a mental image of each scenario. Imagine each scenario happening to you personally. Follow the first image that comes to mind and do not think too much about each one. Then rate how pleasant your image is, as well as how vivid it is.</p>' +
        '<p>The scenarios will automatically move on after a few seconds. The scenarios will be presented over two slides. After the second slide, you will rate the pleasantness of the image and describe the outcome of the imagined scenario. After filling it out, the next scenario will appear on the screen in the same format.</p>' +
        '<p>To familiarise yourself with the procedure, you\'ll first go through a short practice phase.</p>' +
        '<p style="text-align: center; margin-top: 40px; font-weight: bold;">Press the spacebar to start the practice phase.</p>' +
        '</div>',
      choices: [" "]
    };

    // Create practice phase trials
    var practiceTrials = [];
    
    practiceScenarios.forEach(function(scenario, index) {
      // Single slide (manual advance)
      practiceTrials.push({
        type: "html-button-response",
        stimulus: '<div class="scenario-text">' + scenario + '</div>',
        choices: ['Next']
      });
      
      // Rating and description page
      practiceTrials.push({
        type: "html-button-response",
        stimulus: function() {
          var ratingScale = '';
          for (var i = 1; i <= 9; i++) {
            var labelText = i.toString();
            if (i === 1) labelText += '<br>Extremely<br>Unpleasant';
            if (i === 9) labelText += '<br>Extremely<br>Pleasant';
            
            ratingScale += '<div class="rating-item">' +
              '<input type="radio" id="practice-rating-' + i + '" name="practice-pleasantness" value="' + i + '">' +
              '<label for="practice-rating-' + i + '">' + labelText + '</label>' +
              '</div>';
          }
          
          return '<div class="rating-container">' +
            '<h3>Scenario ' + (index + 1) + ' of ' + practiceScenarios.length + '</h3>' +
            '<p><strong>How pleasant was your mental image of this scenario?</strong></p>' +
            '<div class="rating-scale">' + ratingScale + '</div>' +
            '<p style="margin-top: 30px;"><strong>Please describe the outcome you imagined:</strong></p>' +
            '<textarea class="description-input" id="practice-outcome-description" placeholder="Describe what you imagined happening..."></textarea>' +
            '</div>';
        },
        choices: ['Continue'],
        on_load: function() {
          // Variables to store form values
          var currentRating = null;
          var currentDescription = '';
          
          // Disable continue button until both rating selected AND text entered
          var continueBtn = document.querySelector('button');
          continueBtn.disabled = true;
          continueBtn.classList.add('submit-btn');
          
          // Function to check if both conditions are met
          function checkFormCompletion() {
            var rating = document.querySelector('input[name="practice-pleasantness"]:checked');
            var description = document.getElementById('practice-outcome-description').value.trim();
            
            continueBtn.disabled = !(rating && description.length > 0);
          }
          
          // Check form completion when rating changes
          var radioButtons = document.querySelectorAll('input[name="practice-pleasantness"]');
          radioButtons.forEach(function(radio) {
            radio.addEventListener('change', checkFormCompletion);
          });
          
          // Check form completion when text input changes
          var textArea = document.getElementById('practice-outcome-description');
          textArea.addEventListener('input', checkFormCompletion);
          
          // Store values when button is clicked
          continueBtn.addEventListener('click', function() {
            var rating = document.querySelector('input[name="practice-pleasantness"]:checked');
            var description = document.getElementById('practice-outcome-description').value;
            
            currentRating = rating ? parseInt(rating.value) : null;
            currentDescription = description;
            
            // Store in global scope for on_finish
            window.currentPracticeRating = currentRating;
            window.currentPracticeDescription = currentDescription;
          });
        },
        on_finish: function(data) {
          practiceRatings.push(window.currentPracticeRating);
          practiceDescriptions.push(window.currentPracticeDescription || '');
          practiceResponseTimes.push(data.rt);
        }
      });
    });

    // Main task instructions
    var mainInstructions = {
      type: "html-keyboard-response", 
      stimulus: '<div style="font-size:18px; max-width: 800px; margin: 0 auto; text-align: left; padding: 40px;">' +
        '<h2 style="text-align: center;">Main Experiment Phase</h2>' +
        '<br>' +
        '<p>That was the practice phase. If anything is unclear, feel free to call the experimenter and ask questions.</p>' +
        '<p>Once everything is clear, you can begin the main experiment phase. Your task remains exactly the same as in the practice phase:</p>' +
        '<ol>' +
          '<li>Read the scenarios carefully and imagine yourself in the situation.</li>' +
          '<li>Avoid overthinking the scenario and rate the pleasantness, and describe the outcome based on the first thought that comes to mind</li>' +
        '</ol>' +
        '<p><strong>Remember:</strong> Form a mental image of each scenario. Imagine each scenario happening to you personally.</p>' +
        '<p style="text-align: center; margin-top: 40px; font-weight: bold;">Press the space bar to start the main experiment phase!</p>' +
        '</div>',
      choices: [" "]
    };

    // Create main task trials
    var mainTrials = [];
    
    mainScenarios.forEach(function(scenario, index) {
      // Single slide (manual advance)
      mainTrials.push({
        type: "html-button-response",
        stimulus: '<div class="scenario-text">' + scenario.text + '</div>',
        choices: ['Next']
      });
      
      // Rating and description page
      mainTrials.push({
        type: "html-button-response",
        stimulus: function() {
          var ratingScale = '';
          for (var i = 1; i <= 9; i++) {
            var labelText = i.toString();
            if (i === 1) labelText += '<br>Extremely<br>Unpleasant';
            if (i === 9) labelText += '<br>Extremely<br>Pleasant';
            
            ratingScale += '<div class="rating-item">' +
              '<input type="radio" id="main-rating-' + i + '" name="main-pleasantness" value="' + i + '">' +
              '<label for="main-rating-' + i + '">' + labelText + '</label>' +
              '</div>';
          }
          
          return '<div class="rating-container">' +
            '<h3>Scenario ' + (index + 1) + ' of ' + mainScenarios.length + '</h3>' +
            '<p><strong>How pleasant was your mental image of this scenario?</strong></p>' +
            '<div class="rating-scale">' + ratingScale + '</div>' +
            '<p style="margin-top: 30px;"><strong>Please describe the outcome you imagined:</strong></p>' +
            '<textarea class="description-input" id="main-outcome-description" placeholder="Describe what you imagined happening..."></textarea>' +
            '</div>';
        },
        choices: ['Continue'],
        on_load: function() {
          // Variables to store form values
          var currentRating = null;
          var currentDescription = '';
          
          // Disable continue button until both rating selected AND text entered
          var continueBtn = document.querySelector('button');
          continueBtn.disabled = true;
          continueBtn.classList.add('submit-btn');
          
          // Function to check if both conditions are met
          function checkFormCompletion() {
            var rating = document.querySelector('input[name="main-pleasantness"]:checked');
            var description = document.getElementById('main-outcome-description').value.trim();
            
            continueBtn.disabled = !(rating && description.length > 0);
          }
          
          // Check form completion when rating changes
          var radioButtons = document.querySelectorAll('input[name="main-pleasantness"]');
          radioButtons.forEach(function(radio) {
            radio.addEventListener('change', checkFormCompletion);
          });
          
          // Check form completion when text input changes
          var textArea = document.getElementById('main-outcome-description');
          textArea.addEventListener('input', checkFormCompletion);
          
          // Store values when button is clicked
          continueBtn.addEventListener('click', function() {
            var rating = document.querySelector('input[name="main-pleasantness"]:checked');
            var description = document.getElementById('main-outcome-description').value;
            
            currentRating = rating ? parseInt(rating.value) : null;
            currentDescription = description;
            
            // Store in global scope for on_finish
            window.currentMainRating = currentRating;
            window.currentMainDescription = currentDescription;
          });
        },
        on_finish: function(data) {
          mainRatings.push(window.currentMainRating);
          mainDescriptions.push(window.currentMainDescription || '');
          mainResponseTimes.push(data.rt);
          mainScenarioIds.push(index);
          mainThemes.push(scenario.theme + '_' + scenario.type);
        }
      });
    });

    // Task complete screen
    var taskComplete = {
      type: "html-keyboard-response",
      stimulus: '<div style="font-size:20px; max-width: 600px; margin: 0 auto; text-align: center;">' +
        '<h2>Task Complete!</h2>' +
        '<br>' +
        '<p>Thank you for participating in the Ambiguous Scenarios Task.</p>' +
        '<p>Press SPACEBAR to finish.</p>' +
        '</div>',
      choices: [" "],
      on_finish: function() {
        // Save all data to Qualtrics embedded data
        Qualtrics.SurveyEngine.setJSEmbeddedData("practice_pleasantness_ratings", practiceRatings.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("practice_outcome_descriptions", practiceDescriptions.join('|'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("practice_response_times", practiceResponseTimes.join(';'));
        
        Qualtrics.SurveyEngine.setJSEmbeddedData("main_pleasantness_ratings", mainRatings.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("main_outcome_descriptions", mainDescriptions.join('|'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("main_response_times", mainResponseTimes.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("main_scenario_ids", mainScenarioIds.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("main_scenario_themes", mainThemes.join(';'));
        Qualtrics.SurveyEngine.setJSEmbeddedData("list_assignment", "2");
        Qualtrics.SurveyEngine.setJSEmbeddedData("total_scenarios_completed", mainRatings.filter(r => r !== null).length.toString());
        
        console.log("AST2 Data Export Summary:");
        console.log("Practice scenarios completed:", practiceRatings.filter(r => r !== null).length);
        console.log("Main scenarios completed:", mainRatings.filter(r => r !== null).length);
        console.log("List assignment:", "2");

        // End the jsPsych experiment
        jsPsych.endExperiment();
        
        // Clear the stage
        jQuery('#display_stage').remove();
        jQuery('#display_stage_background').remove();

        // Simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
        qthis.clickNextButton();
      }
    };

    // Create timeline
    var timeline = [
      initialInstructions,
      ...practiceTrials,
      mainInstructions,
      ...mainTrials,
      taskComplete
    ];

    // Initialize jsPsych
    jsPsych.init({
      timeline: timeline,
      display_element: 'display_stage',
      on_finish: function() {
        console.log("AST2 experiment completed");
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