// ============================================================================
// PRENS TUTU: GÖLGELERİN TACI - MODÜL 1: ENGINE CORE (engine-core.js)
// İçerik: Web Audio Ses Motoru, 8 Eyaletli Jeopolitik Sistem, Rakip AI, State
// ============================================================================

window.PrinceTutu = window.PrinceTutu || {};

// ----------------------------------------------------------------------------
// 1. PROSEDÜREL WEB AUDIO SES MOTORU (Harici ses dosyası gerektirmez)
// ----------------------------------------------------------------------------
class ProceduralSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  play(type) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      if (type === "click") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.06);
      } 
      else if (type === "coin") {
        // Altın şıngırtısı (Çift yüksek frekanslı çan tınısı)
        [987.77, 1318.51].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.18, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.25);
        });
      } 
      else if (type === "sword") {
        // Metalik kılıç çarpışması (Frekans modülasyonlu testere dişi + beyaz gürültü)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      } 
      else if (type === "dice") {
        // Çoklu zar tıkırtısı
        [0, 0.05, 0.11, 0.16].forEach((offset) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(300 + Math.random() * 400, now + offset);
          gain.gain.setValueAtTime(0.1, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.03);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.03);
        });
      } 
      else if (type === "horn") {
        // Savaş borusu / Kraliyet fanfarı
        [220, 277.18, 329.63].forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.01, now);
          gain.gain.linearRampToValueAtTime(0.1, now + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.85);
        });
      } 
      else if (type === "alert") {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(190, now);
        osc.frequency.linearRampToValueAtTime(130, now + 0.3);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      // Ses kartı meşgulse sessizce geç
    }
  }
}

window.PrinceTutu.Sound = new ProceduralSoundEngine();

// ----------------------------------------------------------------------------
// 2. İMPARATORLUK EYALETLERİ VE STRATEJİK HARİTA VERİSİ (8 BÖLGE)
// ----------------------------------------------------------------------------
window.PrinceTutu.INITIAL_PROVINCES = {
  capital_lalo: {
    id: "capital_lalo",
    name: "Başkent Lalo",
    owner: "player", // 'player' | 'brothers' | 'vampire' | 'furry' | 'doxe' | 'tribes'
    x: 420,
    y: 250,
    neighbors: ["silver_peaks", "golden_plains", "furry_coast", "eastern_pass", "dark_forest"],
    garrison: 8,
    taxIncome: 35,
    unrest: 15,
    defenseBonus: 2,
    description: "Altın Taht'ın bulunduğu imparatorluk merkezi. Saray entrikalarının kalbi."
  },
  eastern_pass: {
    id: "eastern_pass",
    name: "Doğu Kızıl Geçidi",
    owner: "player",
    x: 620,
    y: 240,
    neighbors: ["capital_lalo", "vampire_citadel", "dark_forest"],
    garrison: 6,
    taxIncome: 15,
    unrest: 30,
    defenseBonus: 3,
    description: "Vampir-Kara Elf İttifakı'nın istilasına karşı imparatorluğu koruyan stratejik vadi."
  },
  vampire_citadel: {
    id: "vampire_citadel",
    name: "Gölge Kalesi (Vampir-Elf)",
    owner: "vampire",
    x: 780,
    y: 210,
    neighbors: ["eastern_pass", "dark_forest"],
    garrison: 14,
    taxIncome: 40,
    unrest: 5,
    defenseBonus: 4,
    description: "Vampir Lordları ve Kara Elf büyücülerinin ordularını topladığı karanlık kale."
  },
  furry_coast: {
    id: "furry_coast",
    name: "Furry Ticaret Limanı",
    owner: "furry",
    x: 200,
    y: 260,
    neighbors: ["capital_lalo", "silver_peaks", "golden_plains"],
    garrison: 10,
    taxIncome: 50,
    unrest: 10,
    defenseBonus: 2,
    description: "Furry Cumhuriyeti'nin zengin baharat, silah ve paralı asker limanı."
  },
  golden_plains: {
    id: "golden_plains",
    name: "Güney Bereket Ovaları",
    owner: "brothers",
    x: 410,
    y: 400,
    neighbors: ["capital_lalo", "furry_coast", "doxe_border", "dark_forest"],
    garrison: 7,
    taxIncome: 30,
    unrest: 40,
    defenseBonus: 1,
    description: "Anzak ve Adem'e bağlı köle baronlarının kontrolündeki geniş tarım arazileri."
  },
  doxe_border: {
    id: "doxe_border",
    name: "DOXE Kutsal Manastırı",
    owner: "doxe",
    x: 380,
    y: 520,
    neighbors: ["golden_plains"],
    garrison: 12,
    taxIncome: 35,
    unrest: 5,
    defenseBonus: 3,
    description: "Kölelik kaldırılmadığı için sınırlarını kapatan DOXE Kutsal Şövalyelerinin kalesi."
  },
  silver_peaks: {
    id: "silver_peaks",
    name: "Kuzey Dağ Kabileleri",
    owner: "tribes",
    x: 380,
    y: 100,
    neighbors: ["capital_lalo", "furry_coast"],
    garrison: 9,
    taxIncome: 25,
    unrest: 20,
    defenseBonus: 4,
    description: "Usta demircilerin ve vahşi baltacıların yaşadığı sarp dağlar."
  },
  dark_forest: {
    id: "dark_forest",
    name: "Fısıltı Ormanı",
    owner: "brothers",
    x: 580,
    y: 380,
    neighbors: ["capital_lalo", "eastern_pass", "vampire_citadel", "golden_plains"],
    garrison: 6,
    taxIncome: 20,
    unrest: 25,
    defenseBonus: 2,
    description: "Adem'in paralı suikastçılarının ve kaçakçıların cirit attığı karanlık bölge."
  }
};

// ----------------------------------------------------------------------------
// 3. BAŞLANGIÇ OYUN DURUMU (INITIAL GAME STATE)
// ----------------------------------------------------------------------------
window.PrinceTutu. getInitialState = function () {
  return {
    turn: 1,
    chapter: 1,
    scene: "throne_room_morning",
    actionPoints: 2, // Her tur haritada/fermanda yapılacak maksimum stratejik hamle
    relationships: {
      father: 60,      // İmparator Lalo
      adem: 30,        // Kardeş (19)
      anzak: 25,       // Kardeş (27)
      sister9: 80,     // Küçük kız kardeş (9)
      sister13: 75,    // Küçük kız kardeş (13)
      furries: 70,     // Furry Cumhuriyeti
      people: 50,      // Halk
      advisor: 65      // Baş Danışman
    },
    worldRelations: {
      doxe: 45,          // DOXE Kutsal Krallığı
      vampireElves: 15,  // Vampir-Kara Elf İttifakı
      mountainTribes: 50 // Dağ Kabileleri
    },
    stats: {
      politicalPower: 42,
      moralStanding: 60,
      militarySupport: 38,
      publicSupport: 50,
      intelligence: 55,
      charisma: 65
    },
    armyComposition: {
      infantry: 6,       // Kraliyet Piyadesi (Standart)
      furryArchers: 2,   // Furry Keskin Nişancıları (İlk tur menzilli hasar verir)
      mountainAxemen: 1, // Dağ Baltacıları (Saldırı zarına bonus verir)
      doxePaladins: 0    // DOXE Şövalyeleri (Vampirlere karşı 2x etkili)
    },
    rivalState: {
      anzakGold: 180,
      brotherPlotProgress: 20, // 100 olursa kardeşler saray darbesi yapar!
      vampireInvasionTimer: 6, // 0 olursa Vampir-Kara Elf ordusu Başkent'e yürür
      lastRivalMove: "Anzak ve Adem, Güney Ovalarındaki soylulardan vergi topluyor."
    },
    worldState: {
      economicState: "Durgun",
      militaryStrength: "Hazırlıkta",
      slavery: "Yasal (Tartışmalı)",
      diplomaticStanding: "Gergin"
    },
    inventory: {
      gold: 160,
      items: [
        { id: "royal_seal", name: "Kraliyet Mührü", type: "politik", description: "Baban İmparator Lalo'nun verdiği resmi mühür (+5 Politik Etki)", power: 5 },
        { id: "silver_dagger", name: "Gümüş Hançer", type: "silah", description: "Vampirlere ve suikastçılara karşı etkili hançer (Düelloda +8 Hasar)", power: 4 },
        { id: "wisdom_book", name: "Bilgelik Kitabı", type: "kitap", description: "Eski kralların stratejilerini ve DOXE antlaşmalarını içeren kayıt", power: 3 }
      ]
    },
    decrees: {
      abolishSlavery: false,
      furryTradePact: false,
      martialLaw: false,
      mountainSmithGuild: false,
      royalInquisition: false
    },
    flags: {
      slaveryDiscussed: false,
      brothersConfronted: false,
      vampireThreatKnown: true,
      hasSpyNetwork: false,
      knowsAboutCorruption: false,
      easternVictory: false,
      anzakDefeated: false,
      sistersProtected: false,
      doxeAlliance: false
    },
    provinces: JSON.parse(JSON.stringify(window.PrinceTutu.INITIAL_PROVINCES)),
    historyLog: [
      "👑 Tur 1: İmparator Lalo seni sabah divanına çağırdı."
    ]
  };
};

// ----------------------------------------------------------------------------
// 4. RAKİP YAPAY ZEKA (ANZAK & ADEM ENTRİKA MOTORU + VAMPİR İLERLEYİŞİ)
// ----------------------------------------------------------------------------
window.PrinceTutu.processTurnSimulation = function (state) {
  const next = JSON.parse(JSON.stringify(state));
  next.turn += 1;
  next.actionPoints = 2; // Yeni turda 2 Stratejik Emir Hakkı yenilenir

  // 1. Oyuncunun kontrolündeki eyaletlerden vergi geliri topla
  let turnTax = 0;
  Object.values(next.provinces).forEach((prov) => {
    if (prov.owner === "player") {
      const effectiveTax = Math.max(5, Math.floor(prov.taxIncome * (1 - prov.unrest / 150)));
      turnTax += effectiveTax;
    }
  });

  if (next.decrees.furryTradePact) turnTax += 25;
  next.inventory.gold += turnTax;

  // 2. Anzak ve Adem'in Yapay Zeka Hamlesi (Eğer Anzak yenilmediyse)
  if (!next.flags.anzakDefeated) {
    const roll = Math.random();
    next.rivalState.anzakGold += 45;

    if (roll < 0.35 && next.rivalState.anzakGold >= 60) {
      // Kardeşler soyluları rüşvetle satın alır
      next.rivalState.anzakGold -= 60;
      next.rivalState.brotherPlotProgress = Math.min(100, next.rivalState.brotherPlotProgress + 14);
      next.stats.politicalPower = Math.max(0, next.stats.politicalPower - 3);
      next.rivalState.lastRivalMove = "⚠️ Anzak, saraydaki muhafız komutanlarına 60 Altın rüşvet dağıttı! (Darbe Hazırlığı +14%)";
    } else if (roll < 0.70) {
      // Adem halk arasında dedikodu ve isyan yayar
      next.provinces.capital_lalo.unrest = Math.min(100, next.provinces.capital_lalo.unrest + 10);
      next.rivalState.brotherPlotProgress = Math.min(100, next.rivalState.brotherPlotProgress + 10);
      next.rivalState.lastRivalMove = "🕵️ Adem, Başkent loncalarında senin Furry ve DOXE yanlısı olduğuna dair kara propaganda yaydı!";
    } else {
      // Kardeşler Güney Ovalarına paralı asker yığar
      if (next.provinces.golden_plains.owner === "brothers") {
        next.provinces.golden_plains.garrison += 2;
      }
      next.rivalState.brotherPlotProgress = Math.min(100, next.rivalState.brotherPlotProgress + 8);
      next.rivalState.lastRivalMove = "⚔️ Anzak, Güney Bereket Ovaları'ndaki garnizonuna +2 paralı asker taburu takviye etti.";
    }

    // Eğer oyuncunun Casus Ağı (hasSpyNetwork) varsa darbe planını yavaşlatır!
    if (next.flags.hasSpyNetwork) {
      next.rivalState.brotherPlotProgress = Math.max(0, next.rivalState.brotherPlotProgress - 6);
    }
  } else {
    next.rivalState.lastRivalMove = "🏳️ Anzak mağlup edildiği için kardeşlerin saraydaki hizbi dağılmış durumda.";
  }

  // 3. Vampir - Kara Elf İttifakı Sınır Baskısı
  if (!next.flags.easternVictory && next.provinces.vampire_citadel.owner === "vampire") {
    next.rivalState.vampireInvasionTimer = Math.max(0, next.rivalState.vampireInvasionTimer - 1);
    if (next.rivalState.vampireInvasionTimer === 0) {
      // Vampirler Doğu Geçidi'ne saldırır!
      const east = next.provinces.eastern_pass;
      east.garrison = Math.max(1, east.garrison - 2);
      next.historyLog.unshift("🦇 Vampir-Kara Elf akıncıları Doğu Kızıl Geçidi'ne saldırdı! (-2 Garnizon)");
      next.rivalState.vampireInvasionTimer = 3;
    }
  }

  next.historyLog.unshift(`💰 Tur ${next.turn} Başladı: Eyaletlerden +${turnTax} Altın vergi toplandı.`);
  return next;
};

// ----------------------------------------------------------------------------
// 5. EYALET YÖNETİM AKSİYONLARI (Harita Üzerinden Etkileşim)
// ----------------------------------------------------------------------------
window.PrinceTutu.executeProvinceAction = function (state, provinceId, actionType) {
  const next = JSON.parse(JSON.stringify(state));
  const prov = next.provinces[provinceId];
  if (!prov) return { state: next, message: "Bölge bulunamadı." };

  if (actionType === "recruit_garrison") {
    if (next.inventory.gold < 35) {
      window.PrinceTutu.Sound.play("alert");
      return { state, message: "❌ Garnizon takviyesi için 35 Altın gerekli!" };
    }
    next.inventory.gold -= 35;
    prov.garrison += 3;
    next.armyComposition.infantry += 2;
    next.stats.militarySupport = Math.min(100, next.stats.militarySupport + 4);
    window.PrinceTutu.Sound.play("horn");
    next.historyLog.unshift(`🛡️ ${prov.name} bölgesine +3 Tabur takviye edildi.`);
    return { state: next, message: `🛡️ ${prov.name} garnizonu +3 Tabur güçlendirildi!` };
  }

  if (actionType === "pacify_unrest") {
    if (next.inventory.gold < 25) {
      window.PrinceTutu.Sound.play("alert");
      return { state, message: "❌ Halka erzak dağıtmak için 25 Altın gerekli!" };
    }
    next.inventory.gold -= 25;
    prov.unrest = Math.max(0, prov.unrest - 25);
    prov.taxIncome += 5;
    next.stats.publicSupport = Math.min(100, next.stats.publicSupport + 5);
    window.PrinceTutu.Sound.play("coin");
    next.historyLog.unshift(`🌾 ${prov.name} halkına erzak dağıtıldı (İsyan riski düştü, Vergi +5).`);
    return { state: next, message: `🌾 ${prov.name} bölgesinde huzur sağlandı (-25 İsyan, +5 Vergi)!` };
  }

  if (actionType === "spy_sabotage") {
    if (!next.flags.hasSpyNetwork && next.inventory.gold < 40) {
      window.PrinceTutu.Sound.play("alert");
      return { state, message: "❌ Sabotaj için Gölge Casus Ağı veya 40 Altın gerekli!" };
    }
    if (!next.flags.hasSpyNetwork) next.inventory.gold -= 40;
    prov.garrison = Math.max(1, prov.garrison - 3);
    prov.unrest = Math.min(100, prov.unrest + 20);
    window.PrinceTutu.Sound.play("sword");
    next.historyLog.unshift(`🕵️ Casusların ${prov.name} bölgesindeki düşman ikmal depolarını ateşe verdi! (-3 Düşman Taburu)`);
    return { state: next, message: `🕵️ ${prov.name} düşman garnizonu sabotajla zayıflatıldı (-3 Tabur)!` };
  }

  return { state: next, message: "İşlem tamamlandı." };
};