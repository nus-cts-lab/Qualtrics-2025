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

    // Get participant ID from Qualtrics
    var ppt = "${e://Field/PROLIFIC_PID}" || "AST2_" + Math.random().toString(36).substr(2, 9);

    // Main task scenarios (List 2)
    var mainScenarios = [
      // Depression scenarios (List 2)
      {
        text: "You buy a new outfit for a party. You can tell if you made the right choice by the reaction of the other people.",
        theme: "Self",
        type: "Depression"
      },
      {
        text: "You are organising the annual office party on a small budget. On the night of the party, you look around to see if people are enjoying themselves.",
        theme: "Self", 
        type: "Depression"
      },
      {
        text: "Some important people are visiting the office and you are asked at the last minute to present a project to them. Afterwards, you get feedback on your performance.",
        theme: "Self",
        type: "Depression"
      },
      {
        text: "It is an overcast day, and you are sitting on the beach. You look up to notice the weather really beginning to change.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "Your friend is very keen on skating and persuades you to try it out. At the rink, you put on the skates and step on the ice. You glide forward, slowly at first, then faster.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "As you walk into the interview room, the panel of interviewers welcomes you and proceeds to ask some tough questions. By the end of the interview, you know what the outcome is.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "It's New Year's Eve. You think about the year ahead of you. You are in a thoughtful mood and think back at past achievements and disappointments that you have experienced during your life. Overall, your main feelings so far emerge.",
        theme: "Experiences",
        type: "Depression"
      },
      {
        text: "You go to a place you visited as a child. Walking around makes you feel emotional.",
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

    // Convert practice scenarios to timeline variables format
    var practice_stimuli = practiceScenarios.map(function(scenario, index) {
      return {
        scenario_text: scenario,
        scenario_index: index,
        phase: 'practice',
        total_scenarios: practiceScenarios.length
      };
    });

    // Task instructions
    var initialInstructions = {
      type: "html-keyboard-response",
      stimulus: '<div style="font-size:18px; max-width: 800px; margin: 0 auto; text-align: left; padding: 40px;">' +
        '<h2 style="text-align: center;">Ambiguous Scenarios Task</h2>' +
        '<br>' +
        '<p><strong>Instructions:</strong></p>' +
        '<br>' +
        '<p>In this task, you will be presented with short scenarios. Form a mental image of each scenario. Imagine each scenario happening to you personally. Follow the first image that comes to mind and do not think too much about each one. Then you will rate the pleasantness of the image and describe the outcome of the imagined scenario rate in one short sentence.</p>' +
        '<br>' +
        '<p>To familiarise yourself with the procedure, you\'ll first go through a short practice phase.</p>' +
        '<br>' +
        '<p style="text-align: center; margin-top: 40px; font-weight: bold;">Press the spacebar to start the practice phase.</p>' +
        '</div>',
      choices: [" "]
    };

    // Practice scenario display trial
    var practice_scenario_display = {
      type: "html-button-response",
      stimulus: function() {
        return '<div class="scenario-text">' + jsPsych.timelineVariable('scenario_text') + '</div>';
      },
      choices: ['Next'],
      data: {
        task: 'ast_scenario_display',
        phase: jsPsych.timelineVariable('phase'),
        scenario_index: jsPsych.timelineVariable('scenario_index')
      }
    };

    // Practice rating and description trial
    var practice_rating_trial = {
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
        
        var scenarioIndex = jsPsych.timelineVariable('scenario_index');
        var totalScenarios = jsPsych.timelineVariable('total_scenarios');
        
        return '<div class="rating-container">' +
          '<h3>Scenario ' + (scenarioIndex + 1) + ' of ' + totalScenarios + '</h3>' +
          '<p><strong>How pleasant was your mental image of this scenario?</strong></p>' +
          '<div class="rating-scale">' + ratingScale + '</div>' +
          '<p style="margin-top: 30px;"><strong>Please describe the outcome you imagined:</strong></p>' +
          '<textarea class="description-input" id="practice-outcome-description" placeholder="Describe what you imagined happening..."></textarea>' +
          '</div>';
      },
      choices: ['Continue'],
      data: {
        task: 'ast_rating',
        phase: jsPsych.timelineVariable('phase'),
        scenario_index: jsPsych.timelineVariable('scenario_index'),
        scenario_text: jsPsych.timelineVariable('scenario_text')
      },
      on_load: function() {
        var continueBtn = document.querySelector('button');
        continueBtn.disabled = true;
        continueBtn.classList.add('submit-btn');
        
        function checkFormCompletion() {
          var rating = document.querySelector('input[name="practice-pleasantness"]:checked');
          var description = document.getElementById('practice-outcome-description').value.trim();
          continueBtn.disabled = !(rating && description.length > 0);
        }
        
        var radioButtons = document.querySelectorAll('input[name="practice-pleasantness"]');
        radioButtons.forEach(function(radio) {
          radio.addEventListener('change', checkFormCompletion);
        });
        
        var textArea = document.getElementById('practice-outcome-description');
        textArea.addEventListener('input', checkFormCompletion);
        
        // Capture data when button is clicked (before DOM is cleared)
        continueBtn.addEventListener('click', function() {
          var rating = document.querySelector('input[name="practice-pleasantness"]:checked');
          var description = document.getElementById('practice-outcome-description').value;
          
          // Store data in global scope for on_finish to access
          window.currentPracticeRating = rating ? parseInt(rating.value) : null;
          window.currentPracticeDescription = description || '';
          
          console.log("Button click - Practice rating captured:", window.currentPracticeRating);
          console.log("Button click - Practice description captured:", window.currentPracticeDescription);
        });
      },
      on_finish: function(data) {
        // Use captured data from button click
        data.pleasantness_rating = window.currentPracticeRating || null;
        data.outcome_description = window.currentPracticeDescription || '';
        
        console.log("Practice on_finish - Final rating:", data.pleasantness_rating);
        console.log("Practice on_finish - Final description:", data.outcome_description);
      }
    };

    // Practice procedure combining both trials
    var practice_procedure = {
      timeline: [practice_scenario_display, practice_rating_trial],
      timeline_variables: practice_stimuli
    };

    // Main task instructions
    var mainInstructions = {
      type: "html-keyboard-response", 
      stimulus: '<div style="font-size:18px; max-width: 800px; margin: 0 auto; text-align: left; padding: 40px;">' +
        '<h2 style="text-align: center;">Main Experiment Phase</h2>' +
        '<br>' +
        '<p>That was the practice phase. If anything is unclear, feel free to call the experimenter and ask questions.</p>' +
        '<br>' +
        '<p>Once everything is clear, you can begin the main experiment phase. Your task remains exactly the same as in the practice phase:</p>' +
        '<ol>' +
          '<li>Read the scenarios carefully and imagine yourself in the situation.</li>' +
          '<li>Avoid overthinking the scenario and rate the pleasantness, and describe the outcome based on the first thought that comes to mind</li>' +
        '</ol>' +
        '<br>' +
        '<p><strong>Remember:</strong> Form a mental image of each scenario. Imagine each scenario happening to you personally.</p>' +
        '<br>' +
        '<p style="text-align: center; margin-top: 40px; font-weight: bold;">Press the space bar to start the main experiment phase!</p>' +
        '</div>',
      choices: [" "]
    };

    // Convert main scenarios to timeline variables format
    var main_stimuli = mainScenarios.map(function(scenario, index) {
      return {
        scenario_text: scenario.text,
        scenario_index: index,
        theme: scenario.theme,
        type: scenario.type,
        phase: 'main',
        total_scenarios: mainScenarios.length
      };
    });

    // Main scenario display trial
    var main_scenario_display = {
      type: "html-button-response",
      stimulus: function() {
        return '<div class="scenario-text">' + jsPsych.timelineVariable('scenario_text') + '</div>';
      },
      choices: ['Next'],
      data: {
        task: 'ast_scenario_display',
        phase: jsPsych.timelineVariable('phase'),
        scenario_index: jsPsych.timelineVariable('scenario_index'),
        theme: jsPsych.timelineVariable('theme'),
        type: jsPsych.timelineVariable('type')
      }
    };

    // Main rating and description trial
    var main_rating_trial = {
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
        
        var scenarioIndex = jsPsych.timelineVariable('scenario_index');
        var totalScenarios = jsPsych.timelineVariable('total_scenarios');
        
        return '<div class="rating-container">' +
          '<h3>Scenario ' + (scenarioIndex + 1) + ' of ' + totalScenarios + '</h3>' +
          '<p><strong>How pleasant was your mental image of this scenario?</strong></p>' +
          '<div class="rating-scale">' + ratingScale + '</div>' +
          '<p style="margin-top: 30px;"><strong>Please describe the outcome you imagined:</strong></p>' +
          '<textarea class="description-input" id="main-outcome-description" placeholder="Describe what you imagined happening..."></textarea>' +
          '</div>';
      },
      choices: ['Continue'],
      data: {
        task: 'ast_rating',
        phase: jsPsych.timelineVariable('phase'),
        scenario_index: jsPsych.timelineVariable('scenario_index'),
        scenario_text: jsPsych.timelineVariable('scenario_text'),
        theme: jsPsych.timelineVariable('theme'),
        type: jsPsych.timelineVariable('type')
      },
      on_load: function() {
        var continueBtn = document.querySelector('button');
        continueBtn.disabled = true;
        continueBtn.classList.add('submit-btn');
        
        function checkFormCompletion() {
          var rating = document.querySelector('input[name="main-pleasantness"]:checked');
          var description = document.getElementById('main-outcome-description').value.trim();
          continueBtn.disabled = !(rating && description.length > 0);
        }
        
        var radioButtons = document.querySelectorAll('input[name="main-pleasantness"]');
        radioButtons.forEach(function(radio) {
          radio.addEventListener('change', checkFormCompletion);
        });
        
        var textArea = document.getElementById('main-outcome-description');
        textArea.addEventListener('input', checkFormCompletion);
        
        // Capture data when button is clicked (before DOM is cleared)
        continueBtn.addEventListener('click', function() {
          var rating = document.querySelector('input[name="main-pleasantness"]:checked');
          var description = document.getElementById('main-outcome-description').value;
          
          // Store data in global scope for on_finish to access
          window.currentMainRating = rating ? parseInt(rating.value) : null;
          window.currentMainDescription = description || '';
          
          console.log("Button click - Main rating captured:", window.currentMainRating);
          console.log("Button click - Main description captured:", window.currentMainDescription);
        });
      },
      on_finish: function(data) {
        // Use captured data from button click
        data.pleasantness_rating = window.currentMainRating || null;
        data.outcome_description = window.currentMainDescription || '';
        
        console.log("Main on_finish - Final rating:", data.pleasantness_rating);
        console.log("Main on_finish - Final description:", data.outcome_description);
      }
    };

    // Main procedure combining both trials
    var main_procedure = {
      timeline: [main_scenario_display, main_rating_trial],
      timeline_variables: main_stimuli
    };

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
        // Extract all AST data from jsPsych data store
        var all_trials = jsPsych.data.get().filter({task: 'ast_rating'});
        var practice_trials = all_trials.filter({phase: 'practice'});
        var main_trials = all_trials.filter({phase: 'main'});
        
        // Extract practice data arrays
        var practice_ratings = [];
        var practice_descriptions = [];
        var practice_response_times = [];
        
        practice_trials.values().forEach(function(trial) {
          practice_ratings.push(trial.pleasantness_rating);
          practice_descriptions.push(trial.outcome_description || '');
          practice_response_times.push(trial.rt);
        });
        
        // Extract main data arrays
        var main_ratings = [];
        var main_descriptions = [];
        var main_response_times = [];
        var main_scenario_ids = [];
        var main_themes = [];
        
        main_trials.values().forEach(function(trial) {
          main_ratings.push(trial.pleasantness_rating);
          main_descriptions.push(trial.outcome_description || '');
          main_response_times.push(trial.rt);
          main_scenario_ids.push(trial.scenario_index);
          main_themes.push(trial.theme + '_' + trial.type);
        });
        
        // Save all data to Qualtrics embedded data using correct API
        Qualtrics.SurveyEngine.setEmbeddedData("ast2_participant_id", ppt);
        Qualtrics.SurveyEngine.setEmbeddedData("practice_pleasantness_ratings", practice_ratings.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_outcome_descriptions", practice_descriptions.join('|'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_response_times", practice_response_times.join(';'));
        
        Qualtrics.SurveyEngine.setEmbeddedData("main_pleasantness_ratings", main_ratings.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_outcome_descriptions", main_descriptions.join('|'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_response_times", main_response_times.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_scenario_ids", main_scenario_ids.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_scenario_themes", main_themes.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("list_assignment", "2");
        
        console.log("AST2 Data Export Summary:");
        console.log("Practice scenarios completed:", practice_trials.count());
        console.log("Main scenarios completed:", main_trials.count());
        console.log("List assignment:", "2");
        console.log("Participant ID:", ppt);

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
      practice_procedure,
      mainInstructions,
      main_procedure,
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