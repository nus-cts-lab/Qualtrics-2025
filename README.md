# Scrambled Sentence Task for Qualtrics

A complete implementation of the scrambled sentence task for psychological research, compatible with Qualtrics survey platform.

## Quick Start

Follow these steps to implement the task in your Qualtrics survey:

### Step 1: Create New Qualtrics Survey

1. Log into your Qualtrics account
2. Click **"Create Survey"** → **"Survey"**
3. Name your survey (e.g., "Scrambled Sentence Study")
4. Choose **"Get started from scratch"**

### Step 2: Set Up Survey Flow with Embedded Data

1. In your survey, click **"Survey Flow"** (top menu)
2. Click **"Add a New Element Here"** → **"Embedded Data"**
3. Add the following embedded data fields (click "Create New Field" for each):
   ```
   taskResults
   memoryAccuracy
   completedSentences
   totalTaskTime
   positiveCount
   negativeCount
   neutralCount
   valenceRatio
   negativityRatio
   sentence_1_response
   sentence_1_valence
   sentence_2_response
   sentence_2_valence
   ... (continue through sentence_20_response and sentence_20_valence)
   ```
4. Click **"Apply"** to save

### Step 3: Add Task Instructions (Optional)

1. Go back to **"Builder"** tab
2. Click **"Create a New Question"**
3. Select **"Text/Graphic"**
4. Add participant instructions:

   ```
   SCRAMBLED SENTENCE TASK

   Instructions:
   • You will see a 6-digit number for 5 seconds - remember it
   • After a brief pause, you'll see 20 scrambled sentences
   • Unscramble each sentence by numbering 5 of the 6 words (1-5)
   • Form whatever statement comes to mind first
   • You have 4 minutes total - work quickly
   • At the end, you'll recall the 6-digit number

   Click Next when ready to begin.
   ```

### Step 4: Create the Main Task Question

1. Click **"Create a New Question"**
2. Select **"Text/Graphic"**
3. In the question editor, click the **"HTML View"** button (`<>`)
4. **Delete all existing content** in the HTML editor
5. Open the file `scrambled_sentence_task.html` and **copy ALL content**
6. **Paste** the entire HTML content into the Qualtrics HTML editor
7. Click **"Normal View"** to exit HTML mode

### Step 5: Configure the Task Question

1. Click the **gear icon** (Question Options) on your task question
2. Under **"Request Response"**, select **"Off"**
3. Click **"Add JavaScript"**
4. In the JavaScript editor, paste this code:

```javascript
Qualtrics.SurveyEngine.addOnload(function () {
  // Hide the Next button initially
  jQuery("#NextButton").hide();

  // Override the completeTask function to integrate with Qualtrics
  window.originalCompleteTask = window.completeTask;
  window.completeTask = function () {
    const recalledDigits = document.getElementById("recalled-digits").value;
    const digitAccuracy = recalledDigits === currentDigits;

    // Collect all response data
    const finalResults = {
      responses: responses,
      cognitiveLoad: {
        originalDigits: currentDigits,
        recalledDigits: recalledDigits,
        accuracy: digitAccuracy,
      },
      totalTime: Date.now() - startTime,
      completedSentences: responses.filter((r) => r.words.length === 5).length,
    };

    // Calculate valence scores
    const valenceAnalysis = finalResults.valenceAnalysis;

    // Store data in Qualtrics embedded data
    Qualtrics.SurveyEngine.setEmbeddedData(
      "taskResults",
      JSON.stringify(finalResults)
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "memoryAccuracy",
      digitAccuracy ? "Correct" : "Incorrect"
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "completedSentences",
      valenceAnalysis.summary.completedSentences
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "totalTaskTime",
      Math.round(finalResults.totalTime / 1000)
    );

    // Store valence analysis results
    Qualtrics.SurveyEngine.setEmbeddedData(
      "positiveCount",
      valenceAnalysis.summary.positiveCount
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "negativeCount",
      valenceAnalysis.summary.negativeCount
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "neutralCount",
      valenceAnalysis.summary.neutralCount
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "valenceRatio",
      valenceAnalysis.summary.valenceRatio
    );
    Qualtrics.SurveyEngine.setEmbeddedData(
      "negativityRatio",
      valenceAnalysis.summary.negativityRatio
    );

    // Store individual sentence responses and valence
    valenceAnalysis.valenceResults.forEach((result, index) => {
      Qualtrics.SurveyEngine.setEmbeddedData(
        "sentence_" + (index + 1) + "_response",
        result.response
      );
      Qualtrics.SurveyEngine.setEmbeddedData(
        "sentence_" + (index + 1) + "_valence",
        result.valence
      );
    });

    // Hide task and show completion message
    document.getElementById("digit-recall").classList.add("hidden");
    document.getElementById("completion").classList.remove("hidden");

    // Proceed to next page after 2 seconds
    setTimeout(function () {
      jQuery("#NextButton").show().click();
    }, 2000);
  };
});
```

5. Click **"Save"**

### Step 6: Test Your Survey

1. Click **"Preview"** in the top-right corner
2. Go through the complete task:
   - Note the 6-digit number during the 5-second display
   - Complete a few sentences during the 4-minute task
   - Enter the recalled digits
   - Verify the completion message appears
3. Check that the survey advances automatically

### Step 7: Verify Data Collection

1. After testing, go to **"Data & Analysis"**
2. Click **"View Results"**
3. Check that your embedded data fields contain values:
   - `memoryAccuracy`: "Correct" or "Incorrect"
   - `completedSentences`: Number (0-20)
   - `totalTaskTime`: Time in seconds
   - `valenceRatio`: Positive response ratio (0.0-1.0)
   - `positiveCount`/`negativeCount`: Response counts
   - `sentence_X_response`: Individual sentence responses
   - `sentence_X_valence`: Automated valence coding (positive/negative/neutral/mixed)

### Step 8: Launch Your Survey

1. Go to **"Publish"** tab
2. Click **"Publish Survey"**
3. Copy the survey link to share with participants

## Data Analysis

### Key Variables

**Primary Measures:**

- **`valenceRatio`**: Proportion of positive responses (0.0-1.0) - **main outcome measure**
- **`negativityRatio`**: Proportion of negative responses (0.0-1.0)
- **`positiveCount`**: Number of positive sentence interpretations
- **`negativeCount`**: Number of negative sentence interpretations
- **`neutralCount`**: Number of neutral/ambiguous responses

**Secondary Variables:**

- **`memoryAccuracy`**: Whether participant recalled digits correctly
- **`completedSentences`**: Number of sentences completed (out of 20)
- **`totalTaskTime`**: Total time spent on task (seconds)
- **`sentence_X_response`**: Individual sentence responses
- **`sentence_X_valence`**: Automated valence coding (positive/negative/neutral/mixed/incomplete)

### Automated Valence Coding

The task now includes **automatic sentiment analysis** that:

1. **Analyzes each sentence** using predefined word dictionaries
2. **Codes responses** as positive, negative, neutral, mixed, or incomplete
3. **Calculates ratios** automatically for immediate analysis

**Word Classification Examples:**

- **Positive**: good, equal, keep, interesting, happy, bright, worthwhile, succeeded, confident, well
- **Negative**: cruel, inferior, stop, boring, miserable, dismal, worthless, failed, disappointed, regret

**Valence Categories:**

- **Positive**: More positive than negative words chosen
- **Negative**: More negative than positive words chosen
- **Neutral**: No clear positive/negative words used
- **Mixed**: Equal positive and negative words chosen
- **Incomplete**: Fewer than 5 words selected

### Interpreting Results

**Valence Ratio Interpretation:**

- **0.7-1.0**: Positive cognitive bias (optimistic interpretations)
- **0.4-0.6**: Balanced/neutral interpretation style
- **0.0-0.3**: Negative cognitive bias (pessimistic interpretations)
