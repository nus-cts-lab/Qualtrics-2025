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
        text: "The probation period at your new job is almost over. You get invited to your boss and receive feedback on how you have done so far.",
        theme: "Future",
        type: "Depression"
      },
      {
        text: "You are going to see your sister in her school play. You have left it to the last minute to get there. As you drive up to the school and see the carpark, you anticipate how long it will take for you to arrive.",
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
        text: "After a long day of work, your partner comes home and says, \"We need to talk\".",
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
        text: "Today, your supervisor called you to their office to discuss the change in the quality of your work over the past few weeks.",
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
        Qualtrics.SurveyEngine.setJSEmbeddedData("list_assignment", "1");
        Qualtrics.SurveyEngine.setJSEmbeddedData("total_scenarios_completed", mainRatings.filter(r => r !== null).length.toString());
        
        console.log("AST1 Data Export Summary:");
        console.log("Practice scenarios completed:", practiceRatings.filter(r => r !== null).length);
        console.log("Main scenarios completed:", mainRatings.filter(r => r !== null).length);
        console.log("List assignment:", "1");

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