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

  // Add CSS styling for free viewing task
  var css = '<style>' +
      '#display_stage_background {' +
        'width: 100vw;' +
        'background-color: black;' +
        'z-index: -1;' +
      '}' +
      '#display_stage {' +
        'position: fixed !important;' +
        'left: 0 !important;' +
        'top: 0 !important;' +
        'height: 100vh !important;' +
        'width: 100vw !important;' +
        'background-color: black !important;' +
        'z-index: 9999 !important;' +
        'overflow: hidden !important;' +
        'cursor: none !important;' +
        'font-family: Arial, sans-serif !important;' +
        'display: block !important;' +
        'visibility: visible !important;' +
      '}' +
      '.image-container {' +
        'position: absolute;' +
        'top: 0;' +
        'left: 0;' +
        'width: 100vw;' +
        'height: 100vh;' +
        'background: black;' +
      '}' +
      '.image-quadrant {' +
        'position: absolute;' +
        'width: 300px;' +
        'height: 300px;' +
        'background-size: cover;' +
        'background-position: center;' +
        'background-repeat: no-repeat;' +
      '}' +
      '.spotlight-overlay {' +
        'position: absolute;' +
        'top: 0;' +
        'left: 0;' +
        'width: 100vw;' +
        'height: 100vh;' +
        'background: black;' +
        'pointer-events: none;' +
        'z-index: 10;' +
      '}' +
      '.instructions-container {' +
        'position: absolute;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'background: white;' +
        'padding: 30px 50px;' +
        'border-radius: 15px;' +
        'max-width: 1000px;' +
        'width: 90%;' +
        'text-align: center;' +
        'box-shadow: 0 4px 20px rgba(0,0,0,0.3);' +
      '}' +
      '.instructions-container h1 {' +
        'color: #333;' +
        'margin-bottom: 20px;' +
      '}' +
      '.instructions-container p {' +
        'color: #666;' +
        'line-height: 1.4;' +
        'margin-bottom: 8px;' +
        'text-align: left;' +
      '}' +
      '.center-text {' +
        'text-align: center !important;' +
      '}' +
      '.fixation-cross {' +
        'position: absolute;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%);' +
        'font-size: 48px;' +
        'color: white;' +
        'font-weight: bold;' +
        'font-family: Arial, sans-serif;' +
        'z-index: 100;' +
      '}' +
    '</style>';
  jQuery(css).appendTo('head');

  // Append the display_stage Div using jQuery
  jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
  jQuery("<div id = 'display_stage'></div>").appendTo('body');

  // Wrap jsPsych.init() in a function
  function initExp() {

    /**
     * EXPERIMENT CONFIGURATION
     */
    var experimentConfig = {
      "config": {
        "numImageTrials": 12,
        "numFillerItems": 8,
        "imageViewingTime": 10000,
        "spotlightRadius": 150,
        "positions": [
          {"name": "top-left", "x": -0.3, "y": 0.2},
          {"name": "top-right", "x": 0.3, "y": 0.2},
          {"name": "bottom-left", "x": -0.3, "y": -0.2},
          {"name": "bottom-right", "x": 0.3, "y": -0.2}
        ]
      },
      "imageTrials": [
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_d9fQUMxnzcEoCLZ",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_2HRkVBTFSbqQ0kZ",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ulsrpqCwqlZnmxo",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_FH18W85W69A2lUp"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_A5fmJnBoOahYrKN",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_nWhtueuiy69UWsq",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ZzaiqsSdb3XiTUb",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_rX5sksFv9ojR5Kr"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_xB8jcSlp2jdWxji",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_CHlIUVFBC0eNf6B",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0orhbYR6HyPxgiq",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_8GiSvyFKt1GkdhL"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_z5jyI6zAEiPsVG8",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_r6ex52fKAlbJ7FL",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_re6tsH7SeJ9zGvb",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Sb9xaP13u860Zsh"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_fru7fr8wLzFO7O1",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ZoICFmO3fnQYgKb",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_j94qvrJV7pvdvwA",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_lQe1EC3RZmTVKB9"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_qynncmRmomnyD6z",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_J24rThM98xpFXYL",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_suSpXSzvEZRnBkt",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_iCrITS5to71P9NE"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_lwsTOpyBJ2yimbH",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_A7OjoI74BH4hO17",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_a6zxWuRyfRZXiQm",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_HsCN4z6lDYdg4h7"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_1UDODKzAAmdso2A",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3AZfdSZ8IL3GcOr",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_VezA0wNsn9gt1iX",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_kjJmLmee2Vgq3Tp"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_FsI5PAiHZNvjbMN",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_EF28GAmHUFwUN1x",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_CmOvAoMIKxrsDGC",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_mM7jz4ZK5alEMMm"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_os6EDD1StABPzq7",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_KngBGbqkEbXZ4y0",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_QiJvcFQDiHeH5on",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_kW7M9HFDDuc3qWF"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0EX7vAe3KnWgp2Y",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_lOdZzWC7ymSWqVv",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_CcwuawC1bXnOYNM",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_OAzjn0rvotqQEth"
        },
        {
          "dysphoric": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_aAGxVHNEmo1p3Gj",
          "threat": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_wOedn2jIaG9KBoa",
          "positive": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_x0k8Q2nqOlECpnU",
          "neutral": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Ax6rStq3rkah18R"
        }
      ],
      "neutralFillers": [
        {
          "filler1": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_TlFnNAD36BuDom2",
          "filler2": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_xwkoQf7KKgfILJO",
          "filler3": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_47Yx0FFP3BWXGoC",
          "filler4": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_BQj5dbk2wuzCSro"
        },
        {
          "filler1": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_UTbPgiHtVQFWl36",
          "filler2": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_0zUEA0J1ANjbXP3",
          "filler3": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_iaB4XzeVUeZntZ0",
          "filler4": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_caCrLJF0gDlt2zd"
        },
        {
          "filler1": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_DqCAjzxMgsr1mev",
          "filler2": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_J7ZsXQnvtpJ6PrX",
          "filler3": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_buXYBIh9JrXXayX",
          "filler4": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_xFvryIFdcXNikeb"
        },
        {
          "filler1": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_SnnTspL4YX9SwnP",
          "filler2": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_D503BWTFuqrUWdJ",
          "filler3": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Qub0dA1INBLxYRv",
          "filler4": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_h3yUBxnU6A5D1qA"
        },
        {
          "filler1": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_LORjnGvQPDaAvJp",
          "filler2": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ajipYU7L0PWab2N",
          "filler3": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_ICzsMkEoQoOK3Gm",
          "filler4": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_RlaI20wBedfZWqR"
        },
        {
          "filler1": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_mVqbfQfUDqSpEYt",
          "filler2": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_UGwScdQPXYNx5CM",
          "filler3": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_KngBGbqkEbXZ4y0",
          "filler4": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_4fRf5jKGV0wP10i"
        },
        {
          "filler1": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_TcbXF8Luj3MzL2M",
          "filler2": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_vYTFJvnmPY8K7gA",
          "filler3": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_I1C7N0AgHdLmXRG",
          "filler4": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_zZqP0LF90GqgW9T"
        },
        {
          "filler1": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_WMoQYJDxiLDrTD1",
          "filler2": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_lN2wTjZiR9vVdxi",
          "filler3": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_3RNQM4akJYandEt",
          "filler4": "https://nus.au1.qualtrics.com/ControlPanel/Graphic.php?IM=IM_BuYvLtHDv6Esgz5"
        }
      ]
    };

    /**
     * UTILITY FUNCTIONS
     */

    // Fisher-Yates Algorithm for Random Shuffling of Arrays
    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }

    // Generate participant ID
    var participantId = "${e://Field/PROLIFIC_PID}" || "FVT_" + Math.random().toString(36).substring(2, 11);
    var sessionId = "1";
    var experimentStartTime = new Date().toISOString();

    // Global data storage
    var trialData = [];
    var mouseData = [];
    var participantInfo = {
      participant_id: participantId,
      session_id: sessionId,
      start_time: experimentStartTime,
      browser_info: navigator.userAgent,
      screen_resolution: screen.width + "x" + screen.height
    };

    // Create shuffled trial list
    var allTrials = [];
    
    // Add emotional image trials
    experimentConfig.imageTrials.forEach(function(trial, index) {
      allTrials.push({
        trial_type: "emotional",
        trial_number: index + 1,
        images: trial
      });
    });

    // Add filler trials
    experimentConfig.neutralFillers.forEach(function(trial, index) {
      allTrials.push({
        trial_type: "filler",
        trial_number: experimentConfig.imageTrials.length + index + 1,
        images: trial
      });
    });

    // Shuffle trials
    shuffleArray(allTrials);

    /**
     * EXPERIMENT TIMELINE
     */
    var experiment_timeline = [];

    // Instructions
    var instructions = {
      type: "html-keyboard-response",
      stimulus: `
        <div class="instructions-container">
          <h1>Free Viewing Task</h1>
          <p><strong>Instructions:</strong></p>
          <br>
          <p>In this task, you will view sets of images displayed on the screen. Please move your cursor to look at the images.</p>
          <br>
          <p><strong>Note the following:</strong></p>
          <p>• You will see 4 images arranged in different areas of the screen</p>
          <p>• Each set of images will be displayed for exactly 10 seconds</p>
          <p>• You can move your mouse cursor around to reveal different parts of the images</p>
          <p>• Between each trial, you will see a fixation cross (+) - please move your cursor to this cross</p>
          <p>• There are no right or wrong answers - just look at what interests you</p>
          <br>
          <p>The task consists of 20 image sets in total and will take approximately 3-4 minutes to complete.</p>
          <br>
          <p class="center-text"><strong>Press SPACEBAR when you're ready to begin.</strong></p>
        </div>
      `,
      choices: [" "]
    };

    // Fixation cross trial
    var fixation_trial = {
      type: "html-keyboard-response",
      stimulus: '<div class="fixation-cross">+</div>',
      choices: [],
      trial_duration: 2000
    };

    // Free viewing trial
    var free_viewing_trial = {
      type: "html-keyboard-response",
      stimulus: function() {
        return '<div class="image-container" id="image-container">' +
          '<div class="spotlight-overlay" id="spotlight-overlay"></div>' +
          '</div>';
      },
      choices: [],
      trial_duration: experimentConfig.config.imageViewingTime,
      on_load: function() {
        var trial = jsPsych.timelineVariable('trial');
        var trialNumber = allTrials.indexOf(trial) + 1;
        var trialStartTime = Date.now();
        var trialStartTimeISO = new Date().toISOString();
        
        // Store trial data
        var currentTrialData = {
          participant_id: participantId,
          session_id: sessionId,
          trial_number: trialNumber,
          trial_type: trial.trial_type,
          trial_start_time: trialStartTimeISO,
          trial_duration: experimentConfig.config.imageViewingTime,
          timestamp: trialStartTimeISO
        };

        // Position images in quadrants
        var container = document.getElementById('image-container');
        var positions = experimentConfig.config.positions.slice();
        shuffleArray(positions);
        
        var imageKeys = Object.keys(trial.images);
        var imagePositions = {};
        var imageCategories = {};
        
        imageKeys.forEach(function(key, index) {
          var position = positions[index];
          var imagePath = trial.images[key];
          
          // Convert relative positions to absolute pixel positions
          var centerX = window.innerWidth / 2;
          var centerY = window.innerHeight / 2;
          var absoluteX = centerX + (position.x * window.innerWidth) - 150; // 150 = half image width
          var absoluteY = centerY + (position.y * window.innerHeight) - 150; // 150 = half image height
          
          // Create image element
          var imageDiv = document.createElement('div');
          imageDiv.className = 'image-quadrant';
          imageDiv.style.left = absoluteX + 'px';
          imageDiv.style.top = absoluteY + 'px';
          imageDiv.style.backgroundImage = 'url(' + imagePath + ')';
          imageDiv.setAttribute('data-category', key);
          imageDiv.setAttribute('data-position', position.name);
          
          container.appendChild(imageDiv);
          
          imagePositions[key] = position.name;
          imageCategories[key] = key;
        });
        
        currentTrialData.images_shown = Object.values(trial.images);
        currentTrialData.image_positions = imagePositions;
        currentTrialData.image_categories = imageCategories;
        
        trialData.push(currentTrialData);

        // Set up mouse tracking
        var mouseTrackingActive = true;
        var overlay = document.getElementById('spotlight-overlay');
        
        function updateSpotlight(e) {
          if (!mouseTrackingActive) return;
          
          // Get overlay position relative to viewport
          var overlayRect = overlay.getBoundingClientRect();
          
          // Convert viewport coordinates to overlay-relative coordinates
          var mouseX = e.clientX - overlayRect.left;
          var mouseY = e.clientY - overlayRect.top;
          var radius = experimentConfig.config.spotlightRadius;
          
          // Create radial gradient for spotlight effect
          var gradient = 'radial-gradient(circle at ' + mouseX + 'px ' + mouseY + 'px, ' +
            'transparent ' + radius + 'px, ' +
            'black ' + (radius + 50) + 'px)';
          
          overlay.style.background = gradient;
          
          // Record mouse position (use original viewport coordinates for data)
          var timestamp = Date.now();
          var relativeTimestamp = timestamp - trialStartTime;
          
          mouseData.push({
            participant_id: participantId,
            session_id: sessionId,
            trial_number: trialNumber,
            timestamp_relative: relativeTimestamp,
            timestamp_absolute: new Date(timestamp).toISOString(),
            mouse_x: e.clientX,
            mouse_y: e.clientY,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight
          });
        }
        
        // Add mouse tracking
        document.addEventListener('mousemove', updateSpotlight);
        
        
        // Store cleanup function
        window.currentTrialCleanup = function() {
          mouseTrackingActive = false;
          document.removeEventListener('mousemove', updateSpotlight);
        };
      },
      on_finish: function(data) {
        // Cleanup
        if (window.currentTrialCleanup) {
          window.currentTrialCleanup();
        }
        
        data.task = 'free_viewing_trial';
      }
    };

    // Task complete screen
    var task_complete = {
      type: "html-keyboard-response",
      stimulus: `
        <div class="instructions-container">
          <h1>Task Complete!</h1>
          <br>
          <p>Thank you for participating in the Free Viewing Task.</p>
          <p>Your data has been recorded successfully.</p>
          <br>
          <p class="center-text"><strong>Press SPACEBAR to finish.</strong></p>
        </div>
      `,
      choices: [" "]
    };

    // Create timeline variables for all trials
    var timeline_variables = allTrials.map(function(trial) {
      return { trial: trial };
    });

    // Create the main procedure
    var main_procedure = {
      timeline: [fixation_trial, free_viewing_trial],
      timeline_variables: timeline_variables
    };

    // Build experiment timeline
    experiment_timeline.push(instructions);
    experiment_timeline.push(main_procedure);
    experiment_timeline.push(task_complete);

    jsPsych.init({
      timeline: experiment_timeline,
      display_element: 'display_stage',
      on_finish: function (data) {
        
        // Finalize participant info
        participantInfo.end_time = new Date().toISOString();
        participantInfo.total_trials_completed = trialData.length;

        // Convert data to CSV format for Qualtrics
        function arrayToCSV(array) {
          if (array.length === 0) return '';
          
          var headers = Object.keys(array[0]);
          var csvContent = headers.join(',') + '\n';
          
          array.forEach(function(row) {
            var values = headers.map(function(header) {
              var value = row[header];
              if (typeof value === 'object') {
                value = JSON.stringify(value);
              }
              return '"' + String(value).replace(/"/g, '""') + '"';
            });
            csvContent += values.join(',') + '\n';
          });
          
          return csvContent;
        }

        // Generate CSV data
        var trialDataCSV = arrayToCSV(trialData);
        var mouseDataCSV = arrayToCSV(mouseData);
        var participantInfoCSV = arrayToCSV([participantInfo]);

        // Save data to Qualtrics embedded data
        Qualtrics.SurveyEngine.setEmbeddedData("fvt_participant_id", participantId);
        Qualtrics.SurveyEngine.setEmbeddedData("fvt_session_id", sessionId);
        Qualtrics.SurveyEngine.setEmbeddedData("fvt_trials_completed", trialData.length);
        Qualtrics.SurveyEngine.setEmbeddedData("fvt_mouse_events_recorded", mouseData.length);
        
        // Store CSV data
        Qualtrics.SurveyEngine.setEmbeddedData("trial_data_csv", trialDataCSV);
        Qualtrics.SurveyEngine.setEmbeddedData("mouse_data_csv", mouseDataCSV);
        Qualtrics.SurveyEngine.setEmbeddedData("participant_info_csv", participantInfoCSV);

        console.log("Free Viewing Task Data Export Summary:");
        console.log("Participant ID:", participantId);
        console.log("Trials completed:", trialData.length);
        console.log("Mouse events recorded:", mouseData.length);
        console.log("Trial data CSV length:", trialDataCSV.length);
        console.log("Mouse data CSV length:", mouseDataCSV.length);

        // Clear the stage
        jQuery('#display_stage').remove();
        jQuery('#display_stage_background').remove();

        // Continue to next Qualtrics question
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