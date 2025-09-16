# Scrambled Sentence Task for Qualtrics

A complete implementation of the scrambled sentence task for psychological research, compatible with Qualtrics survey platform.

## Quick Start

Follow these steps to implement the task in your Qualtrics survey:

### Step 1: Create New Qualtrics Survey

1. Log into your Qualtrics account
2. Create a new block in your survey by clicking **"Add Block"**
3. Create a new question by clicking **"+ Add new question"**

### Step 2: Set Up Survey Flow with Embedded Data

1. In your survey, go to the left navigation bar and click the second icon to access **"Survey Flow"**
2. On the block containing your scrambled sentence task, click **"Add Below"**
3. Select **"Embedded Data"**
4. Create the following embedded data fields (click "Create New Field" for each):
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
5. Click **"Apply"** to save

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

1. Once you click **"+ Add new question"**, select the **"Text/Graphic"** option
2. Hover over **"Click to write the question text"** and click on it
3. Click **"HTML View"** at the right corner
4. **Delete all existing content** in the HTML editor
5. Copy-and-paste the code in `scrambled_sentence_task.html` into this box
6. Click **"Save"**

### Step 5: Add the Task JavaScript

1. Go to the left navigation bar and click on **"JavaScript"**
2. **Delete all the code** in the JavaScript editor
3. Copy-and-paste the code in `scrambled_sentence_task.js` into this box
4. Click **"Save"**

### Step 6: Configure Question Settings

1. Click the **gear icon** (Question Options) on your task question  
2. Under **"Request Response"**, select **"Off"**
3. Ensure the question follows the correct experiment structure

The code has been embedded successfully!

### Step 7: Test Your Survey

1. Head back to the survey tab and click **"Preview"**
2. Go through the complete task to ensure proper functionality
3. Verify the task completion and data collection works correctly

### Step 8: Launch Your Survey

1. Go to **"Publish"** tab
2. Click **"Publish Survey"**
3. Copy the survey link to share with participants

## Data Analysis

### Key Variables

When you export your data from Qualtrics, it will be accessible through its `.csv` data file export. The embedded data fields will contain:

**Primary Measures:**
- **`taskResults`**: Complete task data in JSON format
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
- **`sentence_X_valence`**: Automated valence coding

### Automated Valence Coding

The task includes **automatic sentiment analysis** that:

1. **Analyzes each sentence** using predefined word dictionaries
2. **Codes responses** as positive, negative, neutral, mixed, or incomplete
3. **Calculates ratios** automatically for immediate analysis

**Valence Categories:**
- **Positive**: More positive than negative words chosen
- **Negative**: More negative than positive words chosen  
- **Neutral**: No clear positive/negative words used
- **Mixed**: Equal positive and negative words chosen
- **Incomplete**: Fewer than 5 words selected

## Advanced Instructions

To customize your scrambled sentence task (e.g., change the stimuli, fixation cross, or durations), you can modify the relevant sections in the `scrambled_sentence_task.html` and `scrambled_sentence_task.js` files.

The most common customization might be to change the sentence stimuli. Look for the sentence arrays in the JavaScript code and modify them according to your experimental needs.

Having some **basic knowledge of HTML, CSS, and JavaScript** will be helpful to ensure that no errors occur when making changes directly to the code.
