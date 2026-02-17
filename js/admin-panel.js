// Admin Panel Functions - For Adding Artists and Songs

// ==================== ADMIN DASHBOARD ====================

// Initialize admin panel
function initAdminPanel() {
    loadAdminStats();
    setupFormListeners();
    loadRecentAdditions();
    loadPendingArtists();
}

// Load admin statistics
function loadAdminStats() {
    const stats = {
        totalArtists: myArtists.length,
        totalSongs: mySongs.length,
        totalLanguages: countUniqueLanguages(),
        totalPlays: calculateTotalPlays()
    };
    
    // Update UI
    document.querySelectorAll('.stat-card').forEach(card => {
        const statType = card.dataset.stat;
        if (stats[statType] !== undefined) {
            card.querySelector('.stat-value').textContent = stats[statType];
        }
    });
}

// Count unique languages in collection
function countUniqueLanguages() {
    const languages = new Set();
    mySongs.forEach(song => languages.add(song.language));
    return languages.size;
}

// Calculate total plays
function calculateTotalPlays() {
    return mySongs.reduce((total, song) => total + (song.plays || 0), 0);
}

// Load recent additions
function loadRecentAdditions() {
    const container = document.getElementById('recent-additions');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Get last 5 added songs
    const recent = [...mySongs].sort((a, b) => 
        new Date(b.dateAdded) - new Date(a.dateAdded)
    ).slice(0, 5);
    
    recent.forEach(song => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.language}</td>
            <td>${song.dateAdded}</td>
            <td><button onclick="editSong(${song.id})">Edit</button></td>
        `;
        container.appendChild(row);
    });
}

// Load pending artists (for approval system)
function loadPendingArtists() {
    const pending = JSON.parse(localStorage.getItem('pendingArtists') || '[]');
    const container = document.getElementById('pending-artists');
    if (!container) return;
    
    if (pending.length === 0) {
        container.innerHTML = '<p class="no-pending">No pending artists to approve</p>';
        return;
    }
    
    pending.forEach(artist => {
        const card = document.createElement('div');
        card.className = 'pending-card';
        card.innerHTML = `
            <h4>${artist.name}</h4>
            <p>${artist.country} | ${artist.languages}</p>
            <p class="submitted-by">Submitted by: ${artist.submittedBy || 'Anonymous'}</p>
            <div class="pending-actions">
                <button onclick="approveArtist(${artist.id})" class="approve-btn">✓ Approve</button>
                <button onclick="rejectArtist(${artist.id})" class="reject-btn">✗ Reject</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// ==================== ADD NEW ARTIST ====================

// Add new artist form submission
function addNewArtist(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Parse songs from textarea
    const songsText = formData.get('artist-songs');
    const songs = [];
    if (songsText) {
        songsText.split('\n').forEach(line => {
            if (line.trim()) {
                const parts = line.split('|');
                songs.push({
                    id: Date.now() + Math.random(),
                    title: parts[0]?.trim() || 'Unknown',
                    language: parts[1]?.trim() || formData.get('artist-languages').split(',')[0].trim(),
                    year: parts[2]?.trim() || '2026'
                });
            }
        });
    }
    
    const artistData = {
        name: formData.get('artist-name'),
        country: formData.get('artist-country'),
        languages: formData.get('artist-languages').split(',').map(l => l.trim()),
        image: formData.get('artist-image') || `https://placehold.co/300x200/27ae60/white?text=${formData.get('artist-name').replace(' ', '+')}`,
        songs: songs,
        yourRating: parseInt(formData.get('artist-rating')) || 3,
        personalNotes: formData.get('artist-notes'),
        dateAdded: new Date().toISOString().split('T')[0]
    };
    
    const artistId = addArtist(artistData);
    
    // Add songs to main songs collection
    songs.forEach(song => {
        addSong({
            title: song.title,
            artist: artistData.name,
            artistId: artistId,
            language: song.language,
            country: artistData.country,
            year: song.year,
            lyrics: [
                {line: 1, text: "Lyrics will be added soon", translation: "Translation coming soon"}
            ],
            dateAdded: new Date().toISOString().split('T')[0]
        });
    });
    
    showNotification(`✅ ${artistData.name} added with ${songs.length} songs!`, 'success');
    event.target.reset();
}

// ==================== ADD NEW SONG ====================

// Add new song form submission
function addNewSong(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Parse lyrics from textareas
    const originalLines = formData.get('original-lyrics').split('\n').filter(l => l.trim());
    const translationLines = formData.get('translation-lyrics')?.split('\n').filter(l => l.trim()) || [];
    
    const lyrics = [];
    for (let i = 0; i < originalLines.length; i++) {
        lyrics.push({
            line: i + 1,
            text: originalLines[i],
            translation: translationLines[i] || 'Translation pending'
        });
    }
    
    // Find or create artist
    let artistId = null;
    const artistName = formData.get('song-artist');
    const existingArtist = myArtists.find(a => a.name.toLowerCase() === artistName.toLowerCase());
    
    if (existingArtist) {
        artistId = existingArtist.id;
    } else {
        // Auto-create artist if not exists
        artistId = addArtist({
            name: artistName,
            country: formData.get('song-country'),
            languages: [formData.get('song-language')],
            songs: [],
            yourRating: 3,
            personalNotes: `Auto-created when adding "${formData.get('song-title')}"`
        });
    }
    
    const songData = {
        title: formData.get('song-title'),
        artist: artistName,
        artistId: artistId,
        language: formData.get('song-language'),
        dialect: formData.get('song-dialect') || '',
        country: formData.get('song-country'),
        year: formData.get('song-year') || new Date().getFullYear(),
        lyrics: lyrics,
        culturalNotes: formData.get('cultural-notes'),
        dateAdded: new Date().toISOString().split('T')[0],
        plays: 0
    };
    
    const songId = addSong(songData);
    
    // Update artist's song list
    const artist = myArtists.find(a => a.id === artistId);
    if (artist) {
        if (!artist.songs) artist.songs = [];
        artist.songs.push({
            id: songId,
            title: songData.title,
            language: songData.language,
            year: songData.year,
            dateAdded: songData.dateAdded
        });
        saveArtists();
    }
    
    showNotification(`✅ "${songData.title}" added successfully!`, 'success');
    event.target.reset();
}

// ==================== BULK IMPORT ====================

// Import multiple songs via JSON
function importSongs(jsonData) {
    try {
        const songs = JSON.parse(jsonData);
        let imported = 0;
        
        songs.forEach(songData => {
            // Find or create artist
            let artistId = null;
            const existingArtist = myArtists.find(a => 
                a.name.toLowerCase() === songData.artist.toLowerCase()
            );
            
            if (existingArtist) {
                artistId = existingArtist.id;
            } else {
                artistId = addArtist({
                    name: songData.artist,
                    country: songData.country,
                    languages: [songData.language],
                    songs: [],
                    yourRating: 3,
                    personalNotes: `Imported via bulk upload`
                });
            }
            
            // Add song
            songData.artistId = artistId;
            songData.id = Date.now() + imported;
            songData.dateAdded = new Date().toISOString().split('T')[0];
            songData.plays = 0;
            
            mySongs.push(songData);
            
            // Update artist
            const artist = myArtists.find(a => a.id === artistId);
            if (artist) {
                if (!artist.songs) artist.songs = [];
                artist.songs.push({
                    id: songData.id,
                    title: songData.title,
                    language: songData.language,
                    year: songData.year,
                    dateAdded: songData.dateAdded
                });
            }
            
            imported++;
        });
        
        saveArtists();
        saveSongs();
        
        showNotification(`✅ Imported ${imported} songs successfully!`, 'success');
    } catch (error) {
        showNotification(`❌ Error importing: ${error.message}`, 'error');
    }
}

// ==================== EDIT FUNCTIONS ====================

// Edit song
function editSong(songId) {
    const song = getSong(songId);
    if (!song) return;
    
    // Populate form
    document.getElementById('edit-song-title').value = song.title;
    document.getElementById('edit-song-artist').value = song.artist;
    document.getElementById('edit-song-language').value = song.language;
    document.getElementById('edit-song-country').value = song.country;
    
    // Show edit modal
    document.getElementById('edit-modal').style.display = 'block';
    document.getElementById('edit-modal').dataset.songId = songId;
}

// Save song edits
function saveSongEdits() {
    const songId = document.getElementById('edit-modal').dataset.songId;
    const song = getSong(songId);
    if (!song) return;
    
    song.title = document.getElementById('edit-song-title').value;
    song.artist = document.getElementById('edit-song-artist').value;
    song.language = document.getElementById('edit-song-language').value;
    song.country = document.getElementById('edit-song-country').value;
    
    saveSongs();
    showNotification('✅ Song updated!', 'success');
    document.getElementById('edit-modal').style.display = 'none';
}

// Delete song
function deleteSong(songId) {
    if (!confirm('Are you sure you want to delete this song?')) return;
    
    const song = getSong(songId);
    
    // Remove from artist's song list
    const artist = myArtists.find(a => a.id === song.artistId);
    if (artist && artist.songs) {
        artist.songs = artist.songs.filter(s => s.id !== songId);
        saveArtists();
    }
    
    // Remove from songs
    mySongs = mySongs.filter(s => s.id !== songId);
    saveSongs();
    
    showNotification('✅ Song deleted', 'success');
}

// ==================== NOTIFICATION SYSTEM ====================

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ==================== EXPORT DATA ====================

// Export collection as JSON
function exportCollection() {
    const data = {
        artists: myArtists,
        songs: mySongs,
        exportDate: new Date().toISOString(),
        version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `african-lyrics-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    showNotification('✅ Collection exported!', 'success');
}

// Initialize admin panel on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('admin-dashboard')) {
        initAdminPanel();
    }
});