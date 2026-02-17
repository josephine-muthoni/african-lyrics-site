// Comprehensive African Languages Database
const africanLanguages = {
    bantu: {
        name: "Bantu Languages",
        region: "Central, Eastern, Southern Africa",
        color: "#8B4513",
        languages: [
            {
                id: "swahili",
                name: "Swahili",
                nativeName: "Kiswahili",
                code: "sw",
                countries: ["Tanzania", "Kenya", "Uganda", "Rwanda", "Burundi", "DRC", "Mozambique", "Comoros"],
                speakers: "150 million",
                script: "Latin",
                dialects: ["Kimvita", "Kiamu", "Kibajuni", "Kiunguja", "Kingwana"],
                songCount: 245,
                family: "bantu"
            },
            {
                id: "zulu",
                name: "Zulu",
                nativeName: "isiZulu",
                code: "zu",
                countries: ["South Africa", "Lesotho", "Eswatini"],
                speakers: "27 million",
                script: "Latin",
                dialects: ["KwaZulu-Natal", "Transvaal Zulu"],
                songCount: 89,
                family: "bantu"
            },
            {
                id: "xhosa",
                name: "Xhosa",
                nativeName: "isiXhosa",
                code: "xh",
                countries: ["South Africa", "Zimbabwe", "Lesotho"],
                speakers: "19 million",
                script: "Latin",
                dialects: ["Mpondo", "Thembu", "Mpondomise"],
                songCount: 67,
                family: "bantu"
            },
            {
                id: "shona",
                name: "Shona",
                nativeName: "chiShona",
                code: "sn",
                countries: ["Zimbabwe", "Mozambique", "Botswana"],
                speakers: "14 million",
                script: "Latin",
                dialects: ["Karanga", "Korekore", "Zezuru", "Manyika"],
                songCount: 56,
                family: "bantu"
            },
            {
                id: "kikuyu",
                name: "Kikuyu",
                nativeName: "Gĩkũyũ",
                code: "ki",
                countries: ["Kenya"],
                speakers: "8 million",
                script: "Latin",
                dialects: ["Kirinyaga", "Muranga", "Kiambu", "Nyandarua"],
                songCount: 43,
                family: "bantu"
            },
            {
                id: "luganda",
                name: "Luganda",
                nativeName: "Luganda",
                code: "lg",
                countries: ["Uganda"],
                speakers: "7 million",
                script: "Latin",
                dialects: ["Ludiope", "Lugwere", "Lusoga"],
                songCount: 38,
                family: "bantu"
            },
            {
                id: "kinyarwanda",
                name: "Kinyarwanda",
                nativeName: "Ikinyarwanda",
                code: "rw",
                countries: ["Rwanda", "Uganda", "DRC"],
                speakers: "12 million",
                script: "Latin",
                dialects: ["Rufumbira", "Bwisha"],
                songCount: 45,
                family: "bantu"
            },
            {
                id: "lingala",
                name: "Lingala",
                nativeName: "Lingála",
                code: "ln",
                countries: ["DRC", "Congo Republic", "Angola"],
                speakers: "20 million",
                script: "Latin",
                dialects: ["Lingala de Classe", "Lingala Populaire"],
                songCount: 72,
                family: "bantu"
            }
        ]
    },
    
    westAfrican: {
        name: "West African Languages",
        region: "West Africa",
        color: "#DAA520",
        languages: [
            {
                id: "yoruba",
                name: "Yoruba",
                nativeName: "Èdè Yorùbá",
                code: "yo",
                countries: ["Nigeria", "Benin", "Togo"],
                speakers: "45 million",
                script: "Latin (with diacritics)",
                dialects: ["Oyo", "Ibadan", "Ijebu", "Ife", "Ekiti"],
                songCount: 156,
                family: "westAfrican"
            },
            {
                id: "hausa",
                name: "Hausa",
                nativeName: "هَرْشَن هَوْسَ",
                code: "ha",
                countries: ["Nigeria", "Niger", "Ghana", "Cameroon"],
                speakers: "72 million",
                script: "Latin, Arabic",
                dialects: ["Kano", "Sokoto", "Katsina", "Zaria"],
                songCount: 98,
                family: "westAfrican"
            },
            {
                id: "igbo",
                name: "Igbo",
                nativeName: "Asụsụ Igbo",
                code: "ig",
                countries: ["Nigeria", "Equatorial Guinea"],
                speakers: "32 million",
                script: "Latin",
                dialects: ["Onitsha", "Owerri", "Umuahia", "Enugu"],
                songCount: 87,
                family: "westAfrican"
            },
            {
                id: "twi",
                name: "Twi",
                nativeName: "Twi",
                code: "tw",
                countries: ["Ghana"],
                speakers: "9 million",
                script: "Latin",
                dialects: ["Asante", "Akuapem", "Fante"],
                songCount: 54,
                family: "westAfrican"
            },
            {
                id: "wolof",
                name: "Wolof",
                nativeName: "Wolof",
                code: "wo",
                countries: ["Senegal", "Gambia", "Mauritania"],
                speakers: "10 million",
                script: "Latin, Arabic",
                dialects: ["Dakar", "Saint-Louis", "Kaolack"],
                songCount: 42,
                family: "westAfrican"
            },
            {
                id: "fula",
                name: "Fula",
                nativeName: "Fulfulde",
                code: "ff",
                countries: ["Nigeria", "Senegal", "Guinea", "Mali", "Cameroon"],
                speakers: "25 million",
                script: "Latin, Arabic",
                dialects: ["Pular", "Fulfulde", "Pulaar"],
                songCount: 35,
                family: "westAfrican"
            }
        ]
    },
    
    afroAsiatic: {
        name: "Afro-Asiatic Languages",
        region: "North Africa, Horn of Africa",
        color: "#C0392B",
        languages: [
            {
                id: "amharic",
                name: "Amharic",
                nativeName: "አማርኛ",
                code: "am",
                countries: ["Ethiopia"],
                speakers: "57 million",
                script: "Ge'ez",
                dialects: ["Gondar", "Gojjam", "Wollo", "Shewa"],
                songCount: 112,
                family: "afroAsiatic"
            },
            {
                id: "somali",
                name: "Somali",
                nativeName: "Af-Soomaali",
                code: "so",
                countries: ["Somalia", "Ethiopia", "Kenya", "Djibouti"],
                speakers: "21 million",
                script: "Latin, Arabic",
                dialects: ["Northern", "Benadiri", "Maay"],
                songCount: 76,
                family: "afroAsiatic"
            },
            {
                id: "oromo",
                name: "Oromo",
                nativeName: "Afaan Oromoo",
                code: "om",
                countries: ["Ethiopia", "Kenya"],
                speakers: "36 million",
                script: "Latin, Ge'ez",
                dialects: ["Borana", "Bale", "Arsi", "Wallaga"],
                songCount: 58,
                family: "afroAsiatic"
            },
            {
                id: "tigrinya",
                name: "Tigrinya",
                nativeName: "ትግርኛ",
                code: "ti",
                countries: ["Eritrea", "Ethiopia"],
                speakers: "9 million",
                script: "Ge'ez",
                dialects: ["Eritrean", "Ethiopian"],
                songCount: 34,
                family: "afroAsiatic"
            },
            {
                id: "arabic",
                name: "Arabic (North African)",
                nativeName: "العربية",
                code: "ar",
                countries: ["Egypt", "Sudan", "Libya", "Tunisia", "Algeria", "Morocco"],
                speakers: "150 million",
                script: "Arabic",
                dialects: ["Egyptian", "Sudanese", "Maghrebi", "Hassaniya"],
                songCount: 234,
                family: "afroAsiatic"
            }
        ]
    },
    
    nilotic: {
        name: "Nilotic Languages",
        region: "East Africa, South Sudan",
        color: "#27AE60",
        languages: [
            {
                id: "dholuo",
                name: "Dholuo",
                nativeName: "Dholuo",
                code: "luo",
                countries: ["Kenya", "Tanzania", "Uganda", "South Sudan"],
                speakers: "5 million",
                script: "Latin",
                dialects: ["Trans-Yala", "South Nyanza"],
                songCount: 47,
                family: "nilotic"
            },
            {
                id: "maasai",
                name: "Maasai",
                nativeName: "ɔl Maa",
                code: "mas",
                countries: ["Kenya", "Tanzania"],
                speakers: "1.5 million",
                script: "Latin",
                dialects: ["Purko", "Kisongo", "Matapato"],
                songCount: 23,
                family: "nilotic"
            },
            {
                id: "kalenjin",
                name: "Kalenjin",
                nativeName: "Kalenjin",
                code: "kln",
                countries: ["Kenya"],
                speakers: "5 million",
                script: "Latin",
                dialects: ["Kipsigis", "Nandi", "Keiyo", "Tugen", "Pokot"],
                songCount: 36,
                family: "nilotic"
            },
            {
                id: "dinka",
                name: "Dinka",
                nativeName: "Thuɔŋjäŋ",
                code: "din",
                countries: ["South Sudan", "Sudan"],
                speakers: "4.5 million",
                script: "Latin",
                dialects: ["Agar", "Padang", "Bor", "Rek"],
                songCount: 28,
                family: "nilotic"
            }
        ]
    },
    
    khoisan: {
        name: "Khoisan Languages",
        region: "Southern Africa",
        color: "#E67E22",
        languages: [
            {
                id: "khoekhoe",
                name: "Khoekhoegowab",
                nativeName: "Khoekhoegowab",
                code: "naq",
                countries: ["Namibia", "Botswana", "South Africa"],
                speakers: "300,000",
                script: "Latin",
                dialects: ["Nama", "Damara", "Haiǁom"],
                songCount: 18,
                endangered: true,
                family: "khoisan"
            },
            {
                id: "kung",
                name: "!Kung",
                nativeName: "Juǀʼhoan",
                code: "ktz",
                countries: ["Namibia", "Botswana", "Angola"],
                speakers: "45,000",
                script: "Latin",
                dialects: ["Juǀʼhoan", "Kxoe", "Mangetti"],
                songCount: 9,
                endangered: true,
                family: "khoisan"
            },
            {
                id: "xoo",
                name: "Taa",
                nativeName: "ǃXóõ",
                code: "nmn",
                countries: ["Botswana", "Namibia"],
                speakers: "2,500",
                script: "Latin",
                dialects: ["West ǃXoon", "East ǃXoon"],
                songCount: 5,
                endangered: true,
                family: "khoisan"
            }
        ]
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = africanLanguages;
}