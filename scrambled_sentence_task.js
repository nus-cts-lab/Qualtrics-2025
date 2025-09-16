// Scrambled Sentence Task JavaScript for Qualtrics
// Sentence stimuli based on the provided lists
const sentences = [
    ['life', 'is', 'good', 'cruel', 'to', 'me'],
    ['i', 'am', 'equal', 'inferior', 'to', 'others'],
    ['i', 'want', 'to', 'keep', 'stop', 'trying'],
    ['my', 'life', 'is', 'generally', 'interesting', 'boring'],
    ['i', 'expect', 'to', 'be', 'happy', 'miserable'],
    ['the', 'future', 'looks', 'very', 'bright', 'dismal'],
    ['i', 'usually', 'feel', 'very', 'good', 'bad'],
    ['i', 'remember', 'regret', 'what', 'i', 'done'],
    ['something', 'nothing', 'is', 'wrong', 'with', 'me'],
    ['i', 'am', 'a', 'worthwhile', 'worthless', 'person'],
    ['i', 'have', 'succeeded', 'failed', 'at', 'life'],
    ['life', 'has', 'not', 'been', 'bad', 'good'],
    ['i', 'like', 'dislike', 'who', 'i', 'am'],
    ['people', 'do', 'not', 'care', 'about', 'me'],
    ['i', 'have', 'something', 'nothing', 'to', 'give'],
    ['i', 'am', 'generally', 'a', 'success', 'failure'],
    ['my', 'life', 'is', 'very', 'interesting', 'stressful'],
    ['my', 'personal', 'relationships', 'are', 'satisfying', 'disappointing'],
    ['i', 'am', 'confident', 'disappointed', 'in', 'myself'],
    ['life', 'is', 'well', 'not', 'worth', 'living']
];

let currentDigits = '';
let startTime = 0;
let timerInterval = null;
let currentSentenceIndex = 0;
let responses = [];

// Valence coding dictionaries
const positiveWords = [
    'good', 'equal', 'keep', 'interesting', 'happy', 'bright', 'worthwhile', 'succeeded',
    'satisfying', 'confident', 'well', 'worth', 'nice', 'approve', 'winner', 'form', 
    'sensible', 'right', 'talents', 'enjoy', 'attend', 'relax', 'sleep'
];

const negativeWords = [
    'cruel', 'inferior', 'stop', 'boring', 'miserable', 'dismal', 'worthless', 'failed',
    'disappointing', 'disappointed', 'not', 'bad', 'dislike', 'dont', 'struggle', 'avoid',
    'cry', 'edge', 'foolish', 'wrong', 'mistakes', 'endure', 'upset', 'tense', 'worry',
    'worrier', 'disapprove', 'regret', 'nothing', 'stressful'
];

function generateRandomDigits() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function analyzeValence(sentence) {
    if (!sentence || sentence.trim() === '') return 'incomplete';
    
    const words = sentence.toLowerCase().split(' ').map(word => word.trim());
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
        if (positiveWords.includes(word)) positiveCount++;
        if (negativeWords.includes(word)) negativeCount++;
    });
    
    // Return valence based on which words were chosen
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    if (positiveCount === negativeCount && positiveCount > 0) return 'mixed';
    return 'neutral';
}

function calculateValenceScores(responses) {
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    let mixedCount = 0;
    let incompleteCount = 0;
    let completedSentences = 0;
    
    const valenceResults = responses.map((response, index) => {
        const valence = analyzeValence(response.finalSentence);
        
        if (response.words.length === 5) {
            completedSentences++;
            switch(valence) {
                case 'positive': positiveCount++; break;
                case 'negative': negativeCount++; break;
                case 'neutral': neutralCount++; break;
                case 'mixed': mixedCount++; break;
                case 'incomplete': incompleteCount++; break;
            }
        } else {
            incompleteCount++;
        }
        
        return {
            sentence: index + 1,
            response: response.finalSentence || 'INCOMPLETE',
            valence: valence,
            completed: response.words.length === 5
        };
    });
    
    const valenceRatio = completedSentences > 0 ? (positiveCount / completedSentences) : 0;
    const negativityRatio = completedSentences > 0 ? (negativeCount / completedSentences) : 0;
    
    return {
        valenceResults: valenceResults,
        summary: {
            completedSentences: completedSentences,
            positiveCount: positiveCount,
            negativeCount: negativeCount,
            neutralCount: neutralCount,
            mixedCount: mixedCount,
            incompleteCount: incompleteCount,
            valenceRatio: Math.round(valenceRatio * 100) / 100,
            negativityRatio: Math.round(negativityRatio * 100) / 100
        }
    };
}

function showCognitiveLoad() {
    currentDigits = generateRandomDigits();
    document.getElementById('digit-display').textContent = currentDigits;
    document.getElementById('cognitive-load-screen').classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('cognitive-load-screen').classList.add('hidden');
        document.getElementById('black-screen').classList.remove('hidden');
        
        setTimeout(() => {
            document.getElementById('black-screen').classList.add('hidden');
            startMainTask();
        }, 10000); // 10 second black screen
    }, 5000); // 5 second digit display
}

function startMainTask() {
    document.getElementById('main-task').classList.remove('hidden');
    createSentenceItems();
    startTimer();
}

function createSentenceItems() {
    const container = document.getElementById('sentences-container');
    container.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const sentenceWords = sentences[i % sentences.length];
        const scrambledWords = shuffleArray(sentenceWords);
        
        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'sentence-item';
        sentenceDiv.innerHTML = `
            <div class="sentence-number">Sentence ${i + 1}</div>
            <div class="words-container" id="sentence-${i}">
                ${scrambledWords.map((word, index) => `
                    <div class="word-item">
                        <span class="word-text">${word}</span>
                        <input type="number" class="word-input" min="1" max="5" 
                               data-sentence="${i}" data-word="${word}" data-position="${index}"
                               onchange="updateProgress()">
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(sentenceDiv);
    }
}

function startTimer() {
    startTime = Date.now();
    const duration = 4 * 60 * 1000; // 4 minutes in milliseconds
    
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = duration - elapsed;
        
        if (remaining <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').textContent = 'Time: 0:00';
            completeTrial();
            return;
        }
        
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        document.getElementById('timer').textContent = 
            `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function updateProgress() {
    const inputs = document.querySelectorAll('.word-input');
    let completed = 0;
    
    for (let i = 0; i < 20; i++) {
        const sentenceInputs = document.querySelectorAll(`[data-sentence="${i}"]`);
        const filledInputs = Array.from(sentenceInputs).filter(input => input.value !== '');
        if (filledInputs.length === 5) {
            completed++;
        }
    }
    
    const progressPercent = (completed / 20) * 100;
    document.getElementById('progress-bar').style.width = progressPercent + '%';
}

function completeTrial() {
    clearInterval(timerInterval);
    
    // Collect responses
    responses = [];
    for (let i = 0; i < 20; i++) {
        const sentenceInputs = document.querySelectorAll(`[data-sentence="${i}"]`);
        const sentenceResponse = {
            sentence: i + 1,
            words: [],
            completionTime: Date.now() - startTime
        };
        
        sentenceInputs.forEach(input => {
            if (input.value !== '') {
                sentenceResponse.words.push({
                    word: input.dataset.word,
                    position: parseInt(input.value),
                    originalPosition: parseInt(input.dataset.position)
                });
            }
        });
        
        // Sort by position to get the final sentence
        sentenceResponse.words.sort((a, b) => a.position - b.position);
        sentenceResponse.finalSentence = sentenceResponse.words.map(w => w.word).join(' ');
        
        responses.push(sentenceResponse);
    }
    
    document.getElementById('main-task').classList.add('hidden');
    document.getElementById('digit-recall').classList.remove('hidden');
}

function completeTask() {
    const recalledDigits = document.getElementById('recalled-digits').value;
    const digitAccuracy = recalledDigits === currentDigits;
    
    // Calculate valence scores
    const valenceAnalysis = calculateValenceScores(responses);
    
    // Store final results
    const finalResults = {
        responses: responses,
        cognitiveLoad: {
            originalDigits: currentDigits,
            recalledDigits: recalledDigits,
            accuracy: digitAccuracy
        },
        totalTime: Date.now() - startTime,
        valenceAnalysis: valenceAnalysis
    };
    
    // Qualtrics Integration - Store data in embedded data fields
    if (typeof Qualtrics !== 'undefined' && Qualtrics.SurveyEngine) {
        // Store comprehensive task results
        Qualtrics.SurveyEngine.setEmbeddedData('taskResults', JSON.stringify(finalResults));
        
        // Store summary statistics
        Qualtrics.SurveyEngine.setEmbeddedData('memoryAccuracy', digitAccuracy ? 'correct' : 'incorrect');
        Qualtrics.SurveyEngine.setEmbeddedData('completedSentences', valenceAnalysis.summary.completedSentences);
        Qualtrics.SurveyEngine.setEmbeddedData('totalTaskTime', Math.round(finalResults.totalTime / 1000));
        
        // Store valence measures (primary outcomes)
        Qualtrics.SurveyEngine.setEmbeddedData('positiveCount', valenceAnalysis.summary.positiveCount);
        Qualtrics.SurveyEngine.setEmbeddedData('negativeCount', valenceAnalysis.summary.negativeCount);
        Qualtrics.SurveyEngine.setEmbeddedData('neutralCount', valenceAnalysis.summary.neutralCount);
        Qualtrics.SurveyEngine.setEmbeddedData('valenceRatio', valenceAnalysis.summary.valenceRatio);
        Qualtrics.SurveyEngine.setEmbeddedData('negativityRatio', valenceAnalysis.summary.negativityRatio);
        
        // Store individual sentence responses and valences
        for (let i = 0; i < valenceAnalysis.valenceResults.length; i++) {
            const result = valenceAnalysis.valenceResults[i];
            Qualtrics.SurveyEngine.setEmbeddedData(`sentence_${i + 1}_response`, result.response);
            Qualtrics.SurveyEngine.setEmbeddedData(`sentence_${i + 1}_valence`, result.valence);
        }
        
        // Move to next question in Qualtrics
        jQuery('#NextButton').click();
    } else {
        // Display results (for testing outside Qualtrics)
        document.getElementById('digit-recall').classList.add('hidden');
        document.getElementById('completion').classList.remove('hidden');
        
        document.getElementById('results').innerHTML = `
            <h3>Task Summary</h3>
            <p>Sentences completed: ${valenceAnalysis.summary.completedSentences}/20</p>
            <p>Memory accuracy: ${digitAccuracy ? 'Correct' : 'Incorrect'}</p>
            <p>Total time: ${Math.round(finalResults.totalTime / 1000)} seconds</p>
            <h4>Valence Analysis</h4>
            <p>Positive responses: ${valenceAnalysis.summary.positiveCount} (${Math.round(valenceAnalysis.summary.valenceRatio * 100)}%)</p>
            <p>Negative responses: ${valenceAnalysis.summary.negativeCount} (${Math.round(valenceAnalysis.summary.negativityRatio * 100)}%)</p>
            <p>Neutral/Mixed: ${valenceAnalysis.summary.neutralCount + valenceAnalysis.summary.mixedCount}</p>
            <textarea readonly style="width: 100%; height: 300px; font-family: monospace; font-size: 12px;">${JSON.stringify(finalResults, null, 2)}</textarea>
        `;
    }
}

// Initialize the task
window.onload = function() {
    setTimeout(showCognitiveLoad, 1000); // Start after 1 second
};