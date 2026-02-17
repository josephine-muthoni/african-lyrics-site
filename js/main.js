// Main JavaScript with Auto-Update Features

// ==================== DATA STORAGE ====================

// Your Personal Artist Collection
let myArtists = [];
let mySongs = [];
let lastUpdateCheck = null;

// Load data from localStorage
function loadData() {
    console.log("Loading data..."); // Debug log
    
    // Load artists
    if (localStorage.getItem('myArtists')) {
        try {
            myArtists = JSON.parse(localStorage.getItem('myArtists'));
            console.log("Loaded artists:", myArtists.length);
        } catch (e) {
            console.error("Error loading artists:", e);
            myArtists = [];
        }
    } else {
        // Default artists
        myArtists = [
            {
                id: 1,
                name: "Diamond Platnumz",
                country: "Tanzania",
                image: "https://placehold.co/300x200/9b59b6/white?text=Diamond",
                languages: ["Swahili", "English"],
                songs: [
                    {id: 101, title: "MALAWI", language: "Swahili", year: 2025, dateAdded: "2026-02-15"},
                    {id: 102, title: "Jeje", language: "Swahili", year: 2023, dateAdded: "2026-02-15"},
                    {id: 103, title: "Nana", language: "Swahili/English", year: 2024, dateAdded: "2026-02-15"}
                ],
                dateAdded: "2026-02-15",
                yourRating: 5,
                personalNotes: "Pioneer of modern Bongo Flava"
            },
            {
                id: 2,
                name: "Burna Boy",
                country: "Nigeria",
                image: "https://placehold.co/300x200/e67e22/white?text=Burna+Boy",
                languages: ["Yoruba", "English", "Pidgin"],
                songs: [
                    {id: 201, title: "Ye", language: "Yoruba/English", year: 2018, dateAdded: "2026-02-10"},
                    {id: 202, title: "On The Low", language: "English/Yoruba", year: 2019, dateAdded: "2026-02-10"},
                    {id: 203, title: "Last Last", language: "English/Pidgin", year: 2022, dateAdded: "2026-02-10"}
                ],
                dateAdded: "2026-02-10",
                yourRating: 5,
                personalNotes: "Brings Yoruba to global audience"
            }
        ];
        saveArtists();
    }
    
    // Load songs
    if (localStorage.getItem('mySongs')) {
        try {
            mySongs = JSON.parse(localStorage.getItem('mySongs'));
            console.log("Loaded songs:", mySongs.length);
        } catch (e) {
            console.error("Error loading songs:", e);
            mySongs = [];
        }
    } else {
        // Default songs with full lyrics
        mySongs = [
            {
                id: 101,
                title: "MALAWI",
                artist: "Diamond Platnumz",
                artistId: 1,
                language: "Swahili",
                dialect: "Kimvita",
                country: "Tanzania",
                year: 2025,
                lyrics: [
                    {line: 1, text: "MALAWI, MALAWI, wee", translation: "Angels, angels, you"},
                    {line: 2, text: "Nakupenda wewe MALAWI", translation: "I love you, my angel"},
                    {line: 3, text: "Roho yangu inakuita", translation: "My heart is calling you"},
                    {line: 4, text: "Usiniumize MALAWI", translation: "Don't hurt me, my angel"}
                ],
                culturalNotes: "In Swahili love songs, 'MALAWI' refers to beautiful women, not literal angels.",
                dateAdded: "2026-02-15",
                plays: 1245
            },
            {
                id: 102,
                title: "Jeje",
                artist: "Diamond Platnumz",
                artistId: 1,
                language: "Swahili",
                country: "Tanzania",
                year: 2023,
                lyrics: [
                    {line: 1, text: "Jeje, jeje, mapenzi yanauma", translation: "Slowly, slowly, love hurts"},
                    {line: 2, text: "Usiponipenda roho yangu", translation: "If you don't love me, my heart"},
                    {line: 3, text: "Itaniuma, itaniuma", translation: "Will hurt me, will hurt me"}
                ],
                dateAdded: "2026-02-15",
                plays: 892
            },
            {
                id: 201,
                title: "Ye",
                artist: "Burna Boy",
                artistId: 2,
                language: "Yoruba/English",
                country: "Nigeria",
                year: 2018,
                lyrics: [
                    {line: 1, text: "Ye, ye, ye, ye", translation: "Yes, yes, yes, yes"},
                    {line: 2, text: "Omo ologo, ologo, ologo", translation: "Glorious child, glorious, glorious"},
                    {line: 3, text: "Won ni pe mi ni Ye", translation: "They call me Ye"}
                ],
                culturalNotes: "Yoruba praise poetry often uses repetition for emphasis.",
                dateAdded: "2026-02-10",
                plays: 3456
            }
        ];
        saveSongs();
    }
    
    // Load last update check
    if (localStorage.getItem('lastUpdateCheck')) {
        lastUpdateCheck = localStorage.getItem('lastUpdateCheck');
    }
}

// Save functions
function saveArtists() {
    localStorage.setItem('myArtists', JSON.stringify(myArtists));
}

function saveSongs() {
    localStorage.setItem('mySongs', JSON.stringify(mySongs));
}

// ==================== AUTO-UPDATE SYSTEM ====================

// Check for new songs from followed artists
function checkForNewSongs() {
    const liveUpdates = document.getElementById('liveUpdates');
    if (liveUpdates) {
        liveUpdates.innerHTML = 'Checking for new releases...';
    }
    
    // Simulate checking for new songs
    setTimeout(() => {
        const newSong = {
            id: Date.now(),
            title: "New Release " + new Date().toLocaleDateString(),
            artist: "Diamond Platnumz",
            artistId: 1,
            language: "Swahili",
            country: "Tanzania",
            year: 2026,
            lyrics: [
                {line: 1, text: "New song just dropped!", translation: "Wimbo mpya umetoka!"}
            ],
            isNew: true,
            dateAdded: new Date().toISOString().split('T')[0],
            plays: 0
        };
        
        // Add to songs
        mySongs.unshift(newSong);
        
        // Update artist's song list
        const artist = myArtists.find(a => a.id === 1);
        if (artist) {
            artist.songs.unshift({
                id: newSong.id,
                title: newSong.title,
                language: newSong.language,
                year: newSong.year,
                dateAdded: newSong.dateAdded
            });
            saveArtists();
        }
        
        saveSongs();
        lastUpdateCheck = new Date().toISOString();
        localStorage.setItem('lastUpdateCheck', lastUpdateCheck);
        
        // Update UI
        if (liveUpdates) {
            liveUpdates.innerHTML = '✨ New song found! Refresh to see.';
        }
        
        // Reload new releases
        loadNewReleases();
        
        alert(`New song found: "${newSong.title}" by ${newSong.artist}`);
    }, 2000);
}

// Load new releases section
function loadNewReleases() {
    const container = document.getElementById('new-releases');
    if (!container) {
        console.log("New releases container not found");
        return;
    }
    
    container.innerHTML = '';
    
    // Get songs from last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const newSongs = mySongs.filter(song => {
        const songDate = new Date(song.dateAdded);
        return songDate >= oneWeekAgo;
    });
    
    if (newSongs.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: white;">No new releases this week. Check back soon!</p>';
        return;
    }
    
    newSongs.forEach(song => {
        const songCard = createSongCard(song, true);
        container.appendChild(songCard);
    });
}

// Create song card element
function createSongCard(song, isNew = false) {
    const card = document.createElement('div');
    card.className = `song-card ${isNew ? 'new-release' : ''}`;
    card.onclick = () => viewSong(song.id);
    
    card.innerHTML = `
        <div class="song-image" style="background-image: url('https://placehold.co/300x150/3498db/white?text=${encodeURIComponent(song.title)}')">
            <span class="song-language-badge">${song.language}</span>
            ${isNew ? '<span class="release-date-badge">NEW</span>' : ''}
        </div>
        <div class="song-info">
            <h3>${song.title}</h3>
            <div class="song-artist">${song.artist}</div>
            <div class="song-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${song.country}</span>
                <span><i class="fas fa-calendar"></i> ${song.dateAdded}</span>
                <span><i class="fas fa-headphones"></i> ${song.plays || 0}</span>
            </div>
        </div>
    `;
    
    return card;
}

// ==================== NAVIGATION ====================

// View song with full lyrics
function viewSong(songId) {
    // Save to recently viewed
    let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    if (!recentlyViewed.includes(songId)) {
        recentlyViewed.unshift(songId);
        if (recentlyViewed.length > 10) recentlyViewed.pop();
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
    }
    
    // Navigate to song page
    window.location.href = `pages/song.html?id=${songId}`;
}

// View artist page
function viewArtist(artistId) {
    window.location.href = `pages/artist.html?id=${artistId}`;
}

// Search songs
function searchSongs() {
    const searchInput = document.getElementById('languageSearch');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm.trim()) return;
    
    // Search in songs
    const results = mySongs.filter(song => 
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.language.toLowerCase().includes(searchTerm) ||
        song.country.toLowerCase().includes(searchTerm)
    );
    
    if (results.length > 0) {
        // Show first result
        viewSong(results[0].id);
    } else {
        alert(`No songs found for "${searchTerm}". Try adding it!`);
    }
}

// ==================== LOAD HOME PAGE ====================

// Initialize homepage
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing...");
    loadData();
    
    // Check which page we're on and load appropriate content
    if (document.getElementById('your-artists')) {
        loadYourArtists();
    }
    
    if (document.getElementById('recent-songs') || document.getElementById('latest-songs')) {
        loadRecentSongs();
    }
    
    if (document.getElementById('new-releases')) {
        loadNewReleases();
    }
    
    if (document.getElementById('language-families')) {
        loadLanguageFamilies();
    }
    
    updateSiteStats();
    startAutoUpdateTimer();
});

// Load your artists on homepage
function loadYourArtists() {
    const container = document.getElementById('your-artists');
    if (!container) {
        console.log("Your artists container not found");
        return;
    }
    
    container.innerHTML = '';
    
    if (!myArtists || myArtists.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">No artists in your collection yet. Add some!</p>';
        return;
    }
    
    myArtists.slice(0, 4).forEach(artist => {
        const card = document.createElement('div');
        card.className = 'artist-card';
        card.onclick = () => viewArtist(artist.id);
        
        // Check if artist has new songs
        const hasNewSong = artist.songs?.some(song => {
            const songDate = new Date(song.dateAdded);
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return songDate >= oneWeekAgo;
        });
        
        const languagesHtml = artist.languages.map(lang => 
            `<span class="lang-badge">${lang}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="artist-image" style="background-image: url('${artist.image}')">
                ${hasNewSong ? '<span class="new-song-indicator">NEW SONG</span>' : ''}
                <div class="artist-languages">${languagesHtml}</div>
            </div>
            <div class="artist-info">
                <h3>${artist.name} ${artist.yourRating >= 4 ? '⭐' : ''}</h3>
                <div class="artist-country">${artist.country}</div>
                <span class="song-count-small">${artist.songs?.length || 0} songs</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Load recent songs - FIXED: Now checks for both possible IDs
function loadRecentSongs() {
    // Try both possible IDs
    const container = document.getElementById('recent-songs') || document.getElementById('latest-songs');
    if (!container) {
        console.log("Recent songs container not found");
        return;
    }
    
    container.innerHTML = '';
    
    if (!mySongs || mySongs.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 2rem;">No songs yet. Add some!</p>';
        return;
    }
    
    // Sort by date added, newest first
    const sorted = [...mySongs].sort((a, b) => 
        new Date(b.dateAdded) - new Date(a.dateAdded)
    ).slice(0, 6);
    
    sorted.forEach(song => {
        const card = createSongCard(song);
        container.appendChild(card);
    });
}

// Load language families
function loadLanguageFamilies() {
    const container = document.getElementById('language-families');
    if (!container) {
        console.log("Language families container not found");
        return;
    }
    
    const families = [
        {name: "Bantu Languages", color: "#8B4513", count: 892, icon: "🌍", family: "bantu"},
        {name: "West African", color: "#DAA520", count: 567, icon: "🎭", family: "west-african"},
        {name: "Afro-Asiatic", color: "#C0392B", count: 345, icon: "🏺", family: "afro-asiatic"},
        {name: "Nilotic", color: "#27AE60", count: 189, icon: "🌊", family: "nilotic"},
        {name: "Khoisan", color: "#E67E22", count: 43, icon: "👏", family: "khoisan"}
    ];
    
    container.innerHTML = '';
    
    families.forEach(f => {
        const card = document.createElement('div');
        card.className = 'family-card';
        card.onclick = () => window.location.href = `pages/language-family.html?family=${f.family}`;
        card.innerHTML = `
            <div class="family-header" style="background: ${f.color}">
                <h3>${f.icon} ${f.name}</h3>
                <span class="song-count">${f.count} songs</span>
            </div>
            <div class="family-preview">
                <span class="lang-tag">View Languages →</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Update site statistics
function updateSiteStats() {
    const statsContainer = document.getElementById('site-stats');
    if (!statsContainer) return;
    
    // Count unique languages
    const languages = new Set();
    mySongs.forEach(song => languages.add(song.language));
    
    // Count endangered languages (songs in Khoisan family)
    const endangered = mySongs.filter(song => 
        song.language === "!Kung" || song.language === "Taa" || song.language === "Khoekhoe"
    ).length;
    
    statsContainer.innerHTML = `
        <div class="stat">
            <span class="stat-number">${languages.size}</span>
            <span class="stat-label">Languages</span>
        </div>
        <div class="stat">
            <span class="stat-number">${mySongs.length}</span>
            <span class="stat-label">Songs</span>
        </div>
        <div class="stat">
            <span class="stat-number">${endangered}</span>
            <span class="stat-label">Endangered</span>
        </div>
    `;
}

// Auto-update timer
function startAutoUpdateTimer() {
    // Check for updates every 24 hours
    setInterval(() => {
        checkForNewSongs();
    }, 24 * 60 * 60 * 1000);
    
    // Show last update time
    const liveUpdates = document.getElementById('liveUpdates');
    if (liveUpdates && lastUpdateCheck) {
        const date = new Date(lastUpdateCheck);
        liveUpdates.innerHTML = `Last checked: ${date.toLocaleDateString()}`;
    }
}

// ==================== ARTIST MANAGEMENT ====================

// Add new artist
function addArtist(artistData) {
    const newArtist = {
        id: Date.now(),
        ...artistData,
        songs: artistData.songs || [],
        dateAdded: new Date().toISOString().split('T')[0]
    };
    
    myArtists.push(newArtist);
    saveArtists();
    return newArtist.id;
}

// Add new song for artist
function addSong(songData) {
    const newSong = {
        id: Date.now(),
        ...songData,
        plays: 0,
        dateAdded: new Date().toISOString().split('T')[0]
    };
    
    mySongs.push(newSong);
    
    // Add to artist's song list
    const artist = myArtists.find(a => a.id === newSong.artistId);
    if (artist) {
        if (!artist.songs) artist.songs = [];
        artist.songs.push({
            id: newSong.id,
            title: newSong.title,
            language: newSong.language,
            year: newSong.year,
            dateAdded: newSong.dateAdded
        });
        saveArtists();
    }
    
    saveSongs();
    return newSong.id;
}

// Get songs by artist
function getArtistSongs(artistId) {
    return mySongs.filter(song => song.artistId === artistId);
}

// Get song by ID
function getSong(songId) {
    return mySongs.find(s => s.id == songId);
}

// Get artist by ID
function getArtist(artistId) {
    return myArtists.find(a => a.id == artistId);
}