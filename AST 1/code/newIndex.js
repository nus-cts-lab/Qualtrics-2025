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

    // Practice scenarios (List 1)
    var practiceScenarios = [
      "You are cooking dinner and taste a spoonful of your soup. The flavour is stronger than you expected.",
      "You wake up on a weekend morning and notice sunlight streaming through the window. You stretch and take a deep breath, thinking about your day ahead.",
      "You receive a letter in the post with your name on it. As you open it, you wonder what it contains."
    ];

    // Main task scenarios (List 1)
    var mainScenarios = [
      // Depression scenarios (List 1)
      {
        text: "As you enter the room, the commission welcomes you and begins with the oral examination. After just a few minutes, you know intuitively how the examination will go.",
        theme: "Self",
        type: "Depression"
      },
      {
        text: "You are interested in a job, but think you might be under-qualified and so ask for details. When you speak to the people, you realise what your chances are of getting the job.",
        theme: "Self", 
        type: "Depression"
      },
      {
        text: "Your partner asks you to buy a present for his/her sister's birthday as he/she is busy. When the sister opens it, her face shows you how she feels.",
        theme: "Self",
        type: "Depression"
      },
      {
        text: "You are going to see a very good friend at the station. You have not seen them for years. You feel emotional, thinking about how much they might have changed.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "Your best friend convinces you to go on a blind date and as you sit in the bar waiting to meet your date, you think about how it will go.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "You are starting a new job that you very much want. You think about what it will be like.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "Your next birthday is approaching soon. You reflect on your life so far.",
        theme: "Experiences",
        type: "Depression"
      },
      {
        text: "When you clean up the attic, you find some of your old photo albums that you have not looked at in a while. You begin to browse …",
        theme: "Experiences",
        type: "Depression"
      },
      // Anxiety scenarios (List 1)
      {
        text: "The outcome of your tests is out. As you log into the portal, the page freezes before displaying the results.",
        theme: "Uncertainty",
        type: "Anxiety"
      },
      {
        text: "After a long day of work, your partner comes home and says, \"Can we talk?\".",
        theme: "Uncertainty",
        type: "Anxiety"
      },
      {
        text: "As you walk to your car in the carpark, you notice a shadow moving nearby. You glance around and see..",
        theme: "Threat expectancy",
        type: "Anxiety"
      },
      {
        text: "You are driving on the expressway when a warning light suddenly appears on your dashboard. The light remains as you continue driving.",
        theme: "Threat expectancy",
        type: "Anxiety"
      },
      {
        text: "You are scheduled to present at a meeting tomorrow. As you rehearse in the mirror, you think back about the last presentation you had.",
        theme: "Worry",
        type: "Anxiety"
      },
      {
        text: "Today, your supervisor called you to their office to discuss the quality of your work over the past few months.",
        theme: "Worry",
        type: "Anxiety"
      },
      {
        text: "This is your first networking event with other professionals. You see a group of people in a conversation. As you approach them, everyone turns to look at you.",
        theme: "Social evaluation",
        type: "Anxiety"
      },
      {
        text: "You are pitching your team's idea to the committee. Someone asks and question and you answer it. You turn to see your manager's face and notice his expression.",
        theme: "Social evaluation",
        type: "Anxiety"
      }
    ];

    // Get participant ID from Qualtrics
    var ppt = "${e://Field/PROLIFIC_PID}" || "AST1_" + Math.random().toString(36).substr(2, 9);

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

    // Convert practice scenarios to timeline variables format
    var practice_stimuli = practiceScenarios.map(function(scenario, index) {
      return {
        scenario_text: scenario,
        scenario_index: index,
        phase: 'practice',
        total_scenarios: practiceScenarios.length
      };
    });

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
        Qualtrics.SurveyEngine.setEmbeddedData("ast1_participant_id", ppt);
        Qualtrics.SurveyEngine.setEmbeddedData("practice_pleasantness_ratings", practice_ratings.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_outcome_descriptions", practice_descriptions.join('|'));
        Qualtrics.SurveyEngine.setEmbeddedData("practice_response_times", practice_response_times.join(';'));
        
        Qualtrics.SurveyEngine.setEmbeddedData("main_pleasantness_ratings", main_ratings.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_outcome_descriptions", main_descriptions.join('|'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_response_times", main_response_times.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_scenario_ids", main_scenario_ids.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("main_scenario_themes", main_themes.join(';'));
        Qualtrics.SurveyEngine.setEmbeddedData("list_assignment", "1");
        
        console.log("AST1 Data Export Summary:");
        console.log("Practice scenarios completed:", practice_trials.count());
        console.log("Main scenarios completed:", main_trials.count());
        console.log("List assignment:", "1");
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
        console.log("AST1 experiment completed");
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