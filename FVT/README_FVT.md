# Free-Viewing-Task-Qualtrics (Streamlined)

This repository contains the instructions and code for implementing a **Free Viewing Task** designed to be embedded into Qualtrics surveys.

This task measures attention patterns and visual preferences using emotional images (dysphoric, threat, positive, neutral) displayed in four screen quadrants. Participants complete a single-round free-viewing task where mouse cursor movements simulate eye tracking, with a "spotlight" effect revealing only the area around the cursor.

For any questions, please open new issues on this repository - and if you wish to contribute to the documentation or fix any errors, feel free to make a pull request.

## Task Overview

**Procedure:**

- Participants view 20 trials of image sets (12 emotional + 8 neutral filler trials)
- Each trial displays 4 images arranged in different screen quadrants
- Each trial lasts exactly 10 seconds with countdown timer
- Mouse cursor creates a 200px "spotlight" effect revealing image content
- Images are randomized in position across trials
- No explicit task requirements - natural viewing behavior

**Measures:**

- **Trial Data**: Trial-level metadata (trial type, images shown, positions, timing, round information)
- **Mouse Tracking**: Detailed cursor coordinates with timestamps and movement metrics
- **Participant Info**: Basic participant demographics and session details

## Image Categories

The task uses carefully selected emotional images:

- **Dysphoric**: Sad/depressive images (e.g., 2141.jpg, 2455.jpg, 9530.jpg)
- **Threat**: Threatening/fearful images (e.g., 1120.jpg, 6260.jpg, 6821.jpg)
- **Positive**: Pleasant/happy images (e.g., 1340.jpg, 2224.jpg, 4610.jpg)
- **Neutral**: Emotionally neutral images (e.g., 2038.jpg, 7185.jpg, 2745.1.jpg)
- **Fillers**: Additional neutral images for baseline trials

## Streamlined Structure

```
FVT_streamlined/
├── assets/           # Screenshots for documentation
│   ├── 1.PNG
│   ├── 2.PNG
│   └── ... (20 PNG files)
├── images/           # All 80 images in single folder
│   ├── 2141.jpg     # Emotional and filler images
│   ├── 1120.jpg
│   └── ...
├── code/
│   ├── index.html
│   └── newIndex.js   # Updated with simplified paths
└── README_FVT.md
```

## Embedding Instructions

The Free Viewing Task can be embedded into a Qualtrics survey following the steps below.

### Adding the Task as a Question

To begin, create a new block in your survey by clicking **"Add Block"**.

![alt text](assets/1.PNG)

After that, create a new question by clicking **"+ Add new question"**.

![alt text](assets/2.PNG)

Once you click on the **"+ Add new question"** button, a dropdown will appear. Select the **"Text / Graphic"** option.

![alt text](assets/3.PNG)

This will result in a template question, as shown below.

![alt text](assets/4.PNG)

From here, hover above the **"Click to write the question text"**, and click on it. This should show you several more options.

![alt text](assets/5.PNG)

From here, click on **"HTML View"** at the right corner. The following popup will appear.

![alt text](assets/6.PNG)

Copy-and-paste the code in `code/index.html` into this box, and then click **"Save"**.

![alt text](assets/7.PNG)

Once you have done so, the question should now look like this.

![alt text](assets/8.PNG)

### Adding the Free Viewing Task Code

Now, go to the left navigation bar. You should see several options like below (if you do not see them, try clicking on the question once more). Here, click on **"JavaScript"**.

![alt text](assets/9.PNG)

The following popup will appear.

![alt text](assets/10.PNG)

Delete all the code in here, copy-and-paste the code in `code/newIndex.js` into this box, and then click **"Save"**.

![alt text](assets/11.PNG)

The code has been embedded successfully!

### Adding Images to Qualtrics

**IMPORTANT**: You need to upload all 80 images from the `images/` folder to your Qualtrics Graphics Library:

1. **Go to [Graphics Library](https://www.qualtrics.com/support/survey-platform/account-library/graphics-library/)** in your Qualtrics account
2. **Create a folder** called `images`
3. **Upload all 80 .jpg files** from the `images/` folder
4. **Update image paths** in the JavaScript code to use Qualtrics URLs

**Example path update:**

```js
// Current (local path):
"dysphoric": "images/2141.jpg"

// Update to (Qualtrics URL):
"dysphoric": "https://university.qualtrics.com/ControlPanel/Graphic.php?IM=IM_xxxxxxxxxxxxx"
```

### Adding the Embedded Data

Now, the last thing to tackle is the data recording process. Go to the left navigation bar once more, and this time click on the second icon. This will take you to the **"Survey flow"** page.

![alt text](assets/12.PNG)

The **"Survey flow"** page should look something like this. This is an example taken from a pre-existing survey; the question names were crossed out for privacy purposes.

![alt text](assets/13.PNG)

Here, there should be a block for your Free Viewing Task (or whatever it is named). On the block containing your Free Viewing Task, click on **"Add Below"**.

![alt text](assets/14.PNG)

This will popup.

![alt text](assets/15.PNG)

Here, click on **"Embedded Data"**.

![alt text](assets/16.PNG)

This will be the result of clicking on **"Embedded Data"**.

![alt text](assets/17.PNG)

Here, what you need to do is to create 7 separate data entries named:

- `fvt_participant_id`
- `fvt_session_id`
- `fvt_trials_completed`
- `fvt_mouse_events_recorded`
- `trial_data_csv`
- `mouse_data_csv`
- `participant_info_csv`

When you do this, Qualtrics will automatically log these data, and it will be accessible through its `.csv` data file export. After you have included all data fields, it should look similar to this:

![alt text](assets/18.PNG)

Remember to click on **"Apply"** at the bottom of the page.

![alt text](assets/19.PNG)

And you're all set! Head back to the survey tab, and publish the survey.

![alt text](assets/20.PNG)

## Data Output

The experiment collects comprehensive data across three main files:

### Trial Data (`trial_data_csv`)

Contains trial-level metadata for each of the 20 trials:

- `participant_id`: Unique participant identifier
- `session_id`: Session number (default: "1")
- `trial_number`: Trial sequence (1-20)
- `trial_type`: "emotional" or "filler"
- `trial_start_time`: ISO timestamp when trial began
- `trial_duration`: Length of trial (10000ms)
- `images_shown`: Array of image file paths displayed
- `image_positions`: Mapping of image categories to screen quadrants
- `image_categories`: Category labels for each image
- `timestamp`: Overall timestamp for the trial

**Example trial data row:**

```csv
participant_id,session_id,trial_number,trial_type,trial_start_time,trial_duration,images_shown,image_positions,image_categories,timestamp
FVT_abc123,1,1,emotional,2024-01-15T10:30:45.123Z,10000,"[""images/2141.jpg"",""images/1120.jpg"",""images/1340.jpg"",""images/2038.jpg""]","{""dysphoric"":""top-left"",""threat"":""top-right"",""positive"":""bottom-left"",""neutral"":""bottom-right""}","{""dysphoric"":""dysphoric"",""threat"":""threat"",""positive"":""positive"",""neutral"":""neutral""}",2024-01-15T10:30:45.123Z
```

### Mouse Tracking Data (`mouse_data_csv`)

Contains detailed cursor movement data sampled during mouse movement:

- `participant_id`: Unique participant identifier
- `session_id`: Session number
- `trial_number`: Which trial the mouse data belongs to
- `timestamp_relative`: Milliseconds since trial start
- `timestamp_absolute`: ISO timestamp of mouse event
- `mouse_x`: X-coordinate of cursor position
- `mouse_y`: Y-coordinate of cursor position
- `viewport_width`: Browser window width
- `viewport_height`: Browser window height

**Example mouse data row:**

```csv
participant_id,session_id,trial_number,timestamp_relative,timestamp_absolute,mouse_x,mouse_y,viewport_width,viewport_height
FVT_abc123,1,1,1250,2024-01-15T10:30:46.373Z,640,480,1920,1080
```

### Participant Information (`participant_info_csv`)

Contains session-level participant metadata:

- `participant_id`: Unique participant identifier
- `session_id`: Session number
- `start_time`: ISO timestamp when experiment began
- `end_time`: ISO timestamp when experiment completed
- `browser_info`: User agent string (browser/OS information)
- `screen_resolution`: Display resolution (e.g., "1920x1080")
- `total_trials_completed`: Number of trials finished

**Example participant info row:**

```csv
participant_id,session_id,start_time,end_time,browser_info,screen_resolution,total_trials_completed
FVT_abc123,1,2024-01-15T10:30:00.000Z,2024-01-15T10:33:45.123Z,"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",1920x1080,20
```

## Data Analysis Recommendations

**For Mouse Tracking Analysis:**

- Use `timestamp_relative` to align mouse movements within trials
- Calculate fixation duration by analyzing periods of low mouse movement
- Analyze attention patterns by mapping mouse coordinates to image quadrant regions
- Examine viewing preferences across emotional image categories

**For Trial Analysis:**

- Compare viewing patterns between emotional vs. filler trials
- Analyze position effects (whether quadrant location influences viewing)
- Examine individual differences in emotional image preferences
- Calculate dwell time and revisits to different image categories

## Advanced Instructions

The code for the Free Viewing Task is contained inside `code/newIndex.js` file.

**Customizing Images:**
To modify the image sets, locate the `experimentConfig` object (starting around line 127). Each emotional trial follows this format:

```js
{
  "dysphoric": "images/2141.jpg",
  "threat": "images/1120.jpg",
  "positive": "images/1340.jpg",
  "neutral": "images/2038.jpg"
}
```

And each filler trial follows this format:

```js
{
  "filler1": "images/2235.jpg",
  "filler2": "images/7006.jpg",
  "filler3": "images/7010.jpg",
  "filler4": "images/5760.jpg"
}
```

**Customizing Timing:**

- Trial duration: Change `imageViewingTime: 10000` (line 131) for different trial lengths (currently 10 seconds = 10,000ms)
- Spotlight radius: Modify `spotlightRadius: 200` (line 132) to change the size of the reveal area (currently 200px)
- Number of trials: Adjust `numImageTrials: 12` and `numFillerItems: 8` (lines 129-130) to change trial counts

**Customizing Layout:**

- Image positions: Modify the `positions` array (lines 133-138) to change quadrant locations
- Image size: Change `.image-quadrant` CSS (lines 59-66) to adjust image dimensions (currently 300x300px)
- Spotlight effect: Modify the gradient calculation in `updateSpotlight()` function (lines 429-435) for different visual effects

**Adding New Image Categories:**
To add new emotional categories, modify both the image trial structure and ensure the data collection properly captures the new category labels in the `image_categories` field.
