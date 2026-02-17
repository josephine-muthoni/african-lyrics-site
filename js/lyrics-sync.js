// Lyrics Synchronization and Display Module

class LyricsSync {
    constructor() {
        this.currentSong = null;
        this.currentLine = 0;
        this.isPlaying = false;
        this.timer = null;
    }

    // Load song lyrics with full display
    displayFullLyrics(song, container) {
        if (!song || !song.lyrics) return;
        
        let html = '';
        let lineNumber = 1;
        
        song.lyrics.forEach(line => {
            // Check if line has both original and translation
            if (line.original && line.translation) {
                html += this.createBilingualLine(lineNumber, line.original, line.translation, line.cultural);
            } 
            // If only original (monolingual display)
            else if (line.text && line.translation) {
                html += this.createBilingualLine(lineNumber, line.text, line.translation, line.cultural);
            }
            // Original only
            else if (line.text) {
                html += this.createOriginalLine(lineNumber, line.text, line.cultural);
            }
            
            lineNumber++;
        });
        
        container.innerHTML = html;
        this.attachLineClickHandlers(container);
    }

    // Create bilingual line (original + translation)
    createBilingualLine(lineNum, original, translation, culturalNote) {
        const culturalIcon = culturalNote ? 
            `<span class="cultural-note-icon" title="${culturalNote}"><i class="fas fa-info-circle"></i></span>` : '';
        
        return `
            <div class="lyrics-line bilingual" data-line="${lineNum}">
                <div class="line-number">${lineNum}</div>
                <div class="line-content">
                    <div class="original-text">${original} ${culturalIcon}</div>
                    <div class="translation-text">${translation}</div>
                </div>
            </div>
        `;
    }

    // Create original language only line
    createOriginalLine(lineNum, text, culturalNote) {
        const culturalIcon = culturalNote ? 
            `<span class="cultural-note-icon" title="${culturalNote}"><i class="fas fa-info-circle"></i></span>` : '';
        
        return `
            <div class="lyrics-line original-only" data-line="${lineNum}">
                <div class="line-number">${lineNum}</div>
                <div class="line-content">
                    <div class="original-text">${text} ${culturalIcon}</div>
                </div>
            </div>
        `;
    }

    // Create word-by-word translation view
    createWordByWordView(lineNum, words, translations) {
        let wordHtml = '';
        for (let i = 0; i < words.length; i++) {
            wordHtml += `
                <span class="word-group">
                    <span class="original-word">${words[i]}</span>
                    <span class="translation-word">${translations[i]}</span>
                </span>
            `;
        }
        
        return `
            <div class="lyrics-line word-by-word" data-line="${lineNum}">
                <div class="line-number">${lineNum}</div>
                <div class="word-by-word-container">
                    ${wordHtml}
                </div>
            </div>
        `;
    }

    // Attach click handlers for line navigation
    attachLineClickHandlers(container) {
        container.querySelectorAll('.lyrics-line').forEach(line => {
            line.addEventListener('click', (e) => {
                const lineNum = line.dataset.line;
                this.jumpToLine(lineNum);
            });
        });
    }

    // Jump to specific line
    jumpToLine(lineNum) {
        // Remove active class from all lines
        document.querySelectorAll('.lyrics-line').forEach(l => {
            l.classList.remove('active');
        });
        
        // Add active class to selected line
        document.querySelectorAll(`[data-line="${lineNum}"]`).forEach(l => {
            l.classList.add('active');
            l.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        
        this.currentLine = parseInt(lineNum);
    }

    // Start auto-scroll with audio (if audio available)
    startSyncWithAudio(audioElement, timestamps) {
        if (!audioElement || !timestamps) return;
        
        audioElement.addEventListener('timeupdate', () => {
            const currentTime = audioElement.currentTime;
            const currentLine = this.findLineByTimestamp(timestamps, currentTime);
            if (currentLine !== this.currentLine) {
                this.jumpToLine(currentLine);
            }
        });
    }

    // Find line by timestamp
    findLineByTimestamp(timestamps, currentTime) {
        for (let i = timestamps.length - 1; i >= 0; i--) {
            if (currentTime >= timestamps[i].start) {
                return timestamps[i].line;
            }
        }
        return 1;
    }

    // Copy lyrics to clipboard
    copyLyrics(song, includeTranslation = true) {
        let text = `${song.title} by ${song.artist}\n`;
        text += `Language: ${song.language}\n`;
        text += `Country: ${song.country}\n`;
        text += `Year: ${song.year}\n`;
        text += `\n${'='.repeat(40)}\n\n`;
        
        song.lyrics.forEach((line, index) => {
            const lineNum = index + 1;
            if (line.original && line.translation && includeTranslation) {
                text += `${lineNum}. ${line.original}\n   ${line.translation}\n\n`;
            } else if (line.text && line.translation && includeTranslation) {
                text += `${lineNum}. ${line.text}\n   ${line.translation}\n\n`;
            } else if (line.text) {
                text += `${lineNum}. ${line.text}\n\n`;
            }
        });
        
        if (song.culturalNotes) {
            text += `\n${'='.repeat(40)}\n`;
            text += `Cultural Notes:\n${song.culturalNotes}\n`;
        }
        
        return text;
    }

    // Print lyrics (for PDF/printing)
    printLyrics(song) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${song.title} - ${song.artist} Lyrics</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
                        h1 { color: #2C3E50; }
                        .header { margin-bottom: 2rem; }
                        .line { margin-bottom: 1rem; padding: 0.5rem; border-bottom: 1px solid #eee; }
                        .original { font-weight: bold; }
                        .translation { color: #666; font-style: italic; margin-left: 1rem; }
                        .cultural { background: #f0f0f0; padding: 1rem; border-radius: 5px; margin-top: 2rem; }
                        @media print {
                            .line { break-inside: avoid; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>${song.title}</h1>
                        <h2>by ${song.artist}</h2>
                        <p>${song.language} | ${song.country} | ${song.year}</p>
                    </div>
                    ${this.formatLyricsForPrint(song)}
                    ${song.culturalNotes ? `
                        <div class="cultural">
                            <h3>Cultural Notes</h3>
                            <p>${song.culturalNotes}</p>
                        </div>
                    ` : ''}
                    <script>
                        window.onload = function() { window.print(); }
                    <\/script>
                </body>
            </html>
        `);
        printWindow.document.close();
    }

    formatLyricsForPrint(song) {
        let html = '';
        song.lyrics.forEach((line, index) => {
            const lineNum = index + 1;
            if (line.original && line.translation) {
                html += `
                    <div class="line">
                        <div class="original">${lineNum}. ${line.original}</div>
                        <div class="translation">${line.translation}</div>
                    </div>
                `;
            } else if (line.text && line.translation) {
                html += `
                    <div class="line">
                        <div class="original">${lineNum}. ${line.text}</div>
                        <div class="translation">${line.translation}</div>
                    </div>
                `;
            } else if (line.text) {
                html += `
                    <div class="line">
                        <div class="original">${lineNum}. ${line.text}</div>
                    </div>
                `;
            }
        });
        return html;
    }
}

// Initialize global lyrics sync instance
const lyricsSync = new LyricsSync();