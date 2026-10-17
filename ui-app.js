// ============================================================================
// PRENS TUTU: GÖLGELERİN TACI - MODÜL 4: REACT UI & SVG MAP (ui-app.js)
// İçerik: Ana Gösterge Paneli, İnteraktif SVG Eyalet Haritası, Savaş/Düello UI
// ============================================================================

const { useState, useEffect, useMemo } = React;

const Icon = ({ name, size = 18, className = "" }) => {
  const paths = {
    crown: <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    sword: <path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />,
    heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
    coins: <><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4" /></>,
    map: <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z M15 5.764v15 M9 3.236v15" />,
    scroll: <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4 M19 17V5a2 2 0 0 0-2-2H4" />,
    dice: <><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M16 8h.01 M8 8h.01 M8 16h.01 M16 16h.01 M12 12h.01"/></>,
    alert: <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z M12 9v4 M12 17h.01" />,
    volume: <path d="M11 5 6 9H2v6h4l5 4V5Z M15.54 8.46a5 5 0 0 1 0 7.07 M19.07 4.93a10 10 0 0 1 0 14.14" />
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[name] || paths.crown}
    </svg>
  );
};

const PrinceTutuApp = () => {
  const [gameState, setGameState] = useState(() => window.PrinceTutu.getInitialState());
  const [activeTab, setActiveTab] = useState("story"); // 'story' | 'map' | 'decrees' | 'codex'
  const [selectedProvince, setSelectedProvince] = useState("capital_lalo");
  const [battleState, setBattleState] = useState(null);
  const [duelState, setDuelState] = useState(null);
  const [bannerMsg, setBannerMsg] = useState("👑 Prens Tutu v3.0 Modüler Motoru Aktif! Seçimlerin tüm eyaletleri etkiler.");
  const [muted, setMuted] = useState(false);

  const toggleMute = () => {
    window.PrinceTutu.Sound.muted = !muted;
    setMuted(!muted);
  };

  // Krallık Durumu Özeti
  const kingdomStatus = useMemo(() => {
    const { politicalPower, militarySupport, publicSupport } = gameState.stats;
    const avg = Math.round((politicalPower + militarySupport + publicSupport) / 3);
    if (avg >= 65) return { label: "Güçlü İmparatorluk", color: "text-emerald-400 border-emerald-500/40 bg-emerald-950/50" };
    if (avg >= 48) return { label: "İstikrarlı Denge", color: "text-blue-400 border-blue-500/40 bg-blue-950/50" };
    if (avg >= 35) return { label: "Hassas / Kırılgan", color: "text-amber-400 border-amber-500/40 bg-amber-950/50" };
    return { label: "Kritik Çöküş Riski", color: "text-red-400 border-red-500/40 bg-red-950/50" };
  }, [gameState.stats]);

  // Seçenek uygunluk kontrolü
  const checkChoice = (choice) => {
    if (choice.goldCost && gameState.inventory.gold < choice.goldCost) {
      return { ok: false, reason: `${choice.goldCost} Altın Gerekli` };
    }
    if (choice.requiresItem) {
      const has = gameState.inventory.items.some((i) => i.name === choice.requiresItem);
      if (!has) return { ok: false, reason: `${choice.requiresItem} Gerekli` };
    }
    if (choice.requiresStat) {
      const val = gameState.stats[choice.requiresStat.stat] || 0;
      if (val < choice.requiresStat.value) {
        return { ok: false, reason: `${choice.requiresStat.label} >= ${choice.requiresStat.value}` };
      }
    }
    if (choice.requiresCustom && !choice.requiresCustom(gameState)) {
      return { ok: false, reason: choice.customReason };
    }
    return { ok: true, reason: null };
  };

  // Hikaye Seçimi İşleyici
  const handleStoryChoice = (choice) => {
    const check = checkChoice(choice);
    if (!check.ok) {
      window.PrinceTutu.Sound.play("alert");
      return;
    }
    window.PrinceTutu.Sound.play("click");

    let next = JSON.parse(JSON.stringify(gameState));

    if (choice.goldCost) next.inventory.gold -= choice.goldCost;

    if (choice.statChange) {
      const sc = choice.statChange;
      if (sc.relationships) {
        Object.entries(sc.relationships).forEach(([k, v]) => {
          next.relationships[k] = Math.max(0, Math.min(100, (next.relationships[k] || 0) + v));
        });
      }
      if (sc.worldRelations) {
        Object.entries(sc.worldRelations).forEach(([k, v]) => {
          next.worldRelations[k] = Math.max(0, Math.min(100, (next.worldRelations[k] || 0) + v));
        });
      }
      if (sc.stats) {
        Object.entries(sc.stats).forEach(([k, v]) => {
          next.stats[k] = Math.max(0, Math.min(100, (next.stats[k] || 0) + v));
        });
      }
      if (sc.flags) {
        Object.entries(sc.flags).forEach(([k, v]) => {
          next.flags[k] = v;
        });
      }
      if (sc.worldState) {
        Object.entries(sc.worldState).forEach(([k, v]) => {
          next.worldState[k] = v;
        });
      }
      if (sc.inventory?.gold) {
        next.inventory.gold += sc.inventory.gold;
        window.PrinceTutu.Sound.play("coin");
      }
      if (sc.armyDelta) {
        Object.entries(sc.armyDelta).forEach(([unit, count]) => {
          next.armyComposition[unit] = (next.armyComposition[unit] || 0) + count;
        });
      }
      if (sc.rivalDelta?.brotherPlotProgress) {
        next.rivalState.brotherPlotProgress = Math.max(
          0,
          Math.min(100, next.rivalState.brotherPlotProgress + sc.rivalDelta.brotherPlotProgress)
        );
      }
    }

    // Tur simülasyonu (Vergi + Anzak/Adem Yapay Zeka Hamlesi)
    next = window.PrinceTutu.processTurnSimulation(next);

    if (choice.nextScene && window.PrinceTutu.SCENES[choice.nextScene]) {
      next.scene = choice.nextScene;
      next.chapter = window.PrinceTutu.SCENES[choice.nextScene].chapter || next.chapter;
      next.historyLog.unshift(`📖 ${choice.text}`);
    }

    setBannerMsg(`✨ ${choice.consequence}`);
    setGameState(next);

    if (choice.specialAction === "startBattle") {
      setBattleState(window.PrinceTutu.CombatEngine.createBattleState(next, "eastern_pass"));
    } else if (choice.specialAction === "startDuel") {
      setDuelState(window.PrinceTutu.CombatEngine.createDuelState(next));
    }
  };

  // Kararname İlan Etme
  const handleEnactDecree = (decree) => {
    if (gameState.decrees[decree.id]) return;
    if (gameState.inventory.gold < decree.costGold) {
      window.PrinceTutu.Sound.play("alert");
      setBannerMsg("❌ Bu ferman için yeterli altının yok!");
      return;
    }
    if (decree.reqStat && gameState.stats[decree.reqStat.stat] < decree.reqStat.value) {
      window.PrinceTutu.Sound.play("alert");
      setBannerMsg(`❌ Gereksinim karşılanmıyor: ${decree.reqStat.label}`);
      return;
    }

    window.PrinceTutu.Sound.play("horn");
    const next = JSON.parse(JSON.stringify(gameState));
    next.inventory.gold -= decree.costGold;
    next.decrees[decree.id] = true;

    if (decree.id === "abolishSlavery") {
      next.worldRelations.doxe = Math.min(100, next.worldRelations.doxe + 30);
      next.relationships.people = Math.min(100, next.relationships.people + 25);
      next.armyComposition.doxePaladins += 2;
      next.worldState.slavery = "Yasaklandı";
    } else if (decree.id === "furryTradePact") {
      next.inventory.gold += 120;
      next.relationships.furries = Math.min(100, next.relationships.furries + 20);
      next.armyComposition.furryArchers += 2;
      next.worldState.economicState = "Altın Çağ";
    } else if (decree.id === "martialLaw") {
      next.stats.militarySupport = Math.min(100, next.stats.militarySupport + 18);
      next.stats.publicSupport = Math.max(0, next.stats.publicSupport - 10);
      next.armyComposition.infantry += 3;
    } else if (decree.id === "mountainSmithGuild") {
      next.worldRelations.mountainTribes = Math.min(100, next.worldRelations.mountainTribes + 25);
      next.armyComposition.mountainAxemen += 3;
      next.inventory.items.push({
        id: "north_armor",
        name: "Kuzey Çeliği Kraliyet Zırhı",
        type: "silah",
        description: "Dağ demircilerinin dövdüğü zırh (Düelloda +25 Can)",
        power: 8
      });
    } else if (decree.id === "royalInquisition") {
      next.flags.hasSpyNetwork = true;
      next.rivalState.brotherPlotProgress = Math.max(0, next.rivalState.brotherPlotProgress - 35);
      next.stats.politicalPower = Math.min(100, next.stats.politicalPower + 12);
    }

    next.historyLog.unshift(`📜 Ferman İlan Edildi: ${decree.title}`);
    setGameState(next);
    setBannerMsg(`📜 ${decree.title} yürürlüğe girdi!`);
  };

  // Savaş Sonucu İşleyici
  const closeBattleModal = () => {
    if (!battleState) return;
    const next = JSON.parse(JSON.stringify(gameState));
    if (battleState.status === "won") {
      next.flags.easternVictory = true;
      next.stats.militarySupport = Math.min(100, next.stats.militarySupport + 20);
      next.stats.politicalPower = Math.min(100, next.stats.politicalPower + 15);
      next.inventory.gold += 120;
      next.provinces[battleState.targetProvinceId].owner = "player";
      next.provinces[battleState.targetProvinceId].garrison = battleState.playerTroops;
      next.worldState.militaryStrength = "Muzaffer";
      next.historyLog.unshift("🏆 Doğu Cephesi Zaferi kazanıldı! (+120 Savaş Ganimeti Altını)");
      setBannerMsg("🏆 Savaş Kazanıldı! +120 Altın, +20 Askeri Destek, +15 Politik Güç!");
    } else if (battleState.status === "lost") {
      next.stats.militarySupport = Math.max(0, next.stats.militarySupport - 10);
      setBannerMsg("⚠️ Birliklerin geri çekildi (-10 Askeri Destek).");
    }
    setGameState(next);
    setBattleState(null);
  };

  // Düello Sonucu İşleyici
  const closeDuelModal = () => {
    if (!duelState) return;
    const next = JSON.parse(JSON.stringify(gameState));
    if (duelState.status === "won") {
      next.flags.anzakDefeated = true;
      next.rivalState.brotherPlotProgress = 0;
      next.stats.politicalPower = Math.min(100, next.stats.politicalPower + 25);
      next.stats.militarySupport = Math.min(100, next.stats.militarySupport + 20);
      next.provinces.golden_plains.owner = "player";
      next.historyLog.unshift("⚔️ Ağabey Anzak Taht Düellosu'nda mağlup edildi!");
      setBannerMsg("⚔️ Anzak'ı düelloda yendin! Kardeşlerin darbe planı çöktü ve Güney Ovaları sana katıldı!");
    }
    setGameState(next);
    setDuelState(null);
  };

  const currentScene = window.PrinceTutu.SCENES[gameState.scene];
  const activeProv = gameState.provinces[selectedProvince];

  const getOwnerBadge = (owner) => {
    const map = {
      player: { text: "Prens Tutu (Sen)", cls: "bg-blue-600 text-white", fill: "#2563eb" },
      brothers: { text: "Anzak & Adem Hizbi", cls: "bg-orange-600 text-white", fill: "#ea580c" },
      vampire: { text: "Vampir-Kara Elf İttifakı", cls: "bg-red-700 text-white", fill: "#b91c1c" },
      furry: { text: "Furry Cumhuriyeti", cls: "bg-emerald-600 text-white", fill: "#059669" },
      doxe: { text: "DOXE Kutsal Krallığı", cls: "bg-indigo-600 text-white", fill: "#4f46e5" },
      tribes: { text: "Kuzey Dağ Klanları", cls: "bg-amber-600 text-black", fill: "#d97706" }
    };
    return map[owner] || map.player;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 pb-12">
      <div className="container mx-auto px-4 pt-5 max-w-7xl">
        
        {/* ÜST BAŞLIK & KRALLIK TELEMETRİ BARI */}
        <header className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-5 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/40 rounded-xl royal-glow">
                <Icon name="crown" size={32} className="text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-extrabold royal-font bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Prens Tutu: Gölgelerin Tacı
                  </h1>
                  <span className="px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-bold rounded">
                    v3.0 Modüler
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Tur {gameState.turn} • Bölüm {gameState.chapter} • Konum: {currentScene?.location}
                </p>
              </div>
            </div>

            {/* Navigasyon Sekmeleri */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => { window.PrinceTutu.Sound.play("click"); setActiveTab("story"); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "story" ? "bg-yellow-500 text-black shadow-lg" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
              >
                <Icon name="crown" size={15} /> Hikaye & Divan
              </button>
              <button
                onClick={() => { window.PrinceTutu.Sound.play("click"); setActiveTab("map"); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "map" ? "bg-yellow-500 text-black shadow-lg" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
              >
                <Icon name="map" size={15} /> İnteraktif Eyalet Haritası (8 Bölge)
              </button>
              <button
                onClick={() => { window.PrinceTutu.Sound.play("click"); setActiveTab("decrees"); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "decrees" ? "bg-yellow-500 text-black shadow-lg" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
              >
                <Icon name="scroll" size={15} /> Fermanlar & Ordu
              </button>
              <button
                onClick={() => { window.PrinceTutu.Sound.play("click"); setActiveTab("codex"); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "codex" ? "bg-yellow-500 text-black shadow-lg" : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
              >
                📚 Lore Ansiklopedisi
              </button>
              <button
                onClick={() => setBattleState(window.PrinceTutu.CombatEngine.createBattleState(gameState, "eastern_pass"))}
                className="px-3 py-2 bg-red-900/80 hover:bg-red-800 border border-red-500/40 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Icon name="dice" size={15} /> Savaş Simülatörü
              </button>
              <button
                onClick={() => setDuelState(window.PrinceTutu.CombatEngine.createDuelState(gameState))}
                className="px-3 py-2 bg-amber-900/80 hover:bg-amber-800 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Icon name="sword" size={15} /> Anzak Düellosu
              </button>
              <button
                onClick={toggleMute}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs"
                title="Sesi Aç/Kapat"
              >
                {muted ? "🔇" : "🔊"}
              </button>
            </div>
          </div>

          {/* Bildirim ve Rakip AI Telemetri Şeridi */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
            <div className="text-indigo-300 font-medium">{bannerMsg}</div>
            <div className="flex items-center gap-4">
              <span className="text-orange-300">
                ⚠️ Kardeşlerin Darbe Hazırlığı: <strong>%{gameState.rivalState.brotherPlotProgress}</strong>
              </span>
              <span className="text-red-300">
                🦇 Vampir Saldırı Sayacı: <strong>{gameState.rivalState.vampireInvasionTimer} Tur</strong>
              </span>
            </div>
          </div>
        </header>

        {/* ANA 3 SÜTUNLU DÜZEN */}
        <div className="grid lg:grid-cols-4 gap-6">
          
          {/* SOL PANEL: İSTATİSTİKLER, ORDU BİRLİKLERİ VE ENVANTER */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                <Icon name="shield" size={16} /> Karakter İstatistikleri
              </h3>
              {Object.entries(gameState.stats).map(([k, val]) => {
                const names = {
                  politicalPower: "Politik Güç",
                  moralStanding: "Ahlaki Duruş",
                  militarySupport: "Askeri Destek",
                  publicSupport: "Halk Desteği",
                  intelligence: "Zeka (Taktik)",
                  charisma: "Karizma"
                };
                return (
                  <div key={k} className="mb-2.5">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">{names[k]}</span>
                      <span className="font-bold text-white">{val}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          val >= 70 ? "bg-emerald-500" : val >= 45 ? "bg-blue-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ordu Birlikleri Özeti */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
                <Icon name="sword" size={16} /> Kraliyet Ordusu Birlikleri
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-slate-800/80 rounded-lg">
                  <span>🛡️ Kraliyet Piyadesi</span>
                  <strong className="text-white">{gameState.armyComposition.infantry} Tabur</strong>
                </div>
                <div className="flex justify-between p-2 bg-slate-800/80 rounded-lg">
                  <span>🏹 Furry Keskin Nişancısı</span>
                  <strong className="text-emerald-400">{gameState.armyComposition.furryArchers} Tabur</strong>
                </div>
                <div className="flex justify-between p-2 bg-slate-800/80 rounded-lg">
                  <span>🪓 Kuzey Dağ Baltacısı</span>
                  <strong className="text-amber-400">{gameState.armyComposition.mountainAxemen} Tabur</strong>
                </div>
                <div className="flex justify-between p-2 bg-slate-800/80 rounded-lg">
                  <span>⚖️ DOXE Kutsal Paladini</span>
                  <strong className="text-indigo-400">{gameState.armyComposition.doxePaladins} Tabur</strong>
                </div>
              </div>
            </div>

            {/* Hazine ve Envanter */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3 p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl">
                <span className="text-xs text-amber-200 font-semibold">Kraliyet Hazinesi</span>
                <span className="text-base font-extrabold text-yellow-400 flex items-center gap-1">
                  💰 {gameState.inventory.gold} Altın
                </span>
              </div>
              <div className="space-y-2">
                {gameState.inventory.items.map((item, i) => (
                  <div key={i} className="p-2.5 bg-slate-800/70 border border-slate-700/60 rounded-xl text-xs">
                    <div className="flex justify-between font-bold text-white mb-0.5">
                      <span>{item.name}</span>
                      <span className="text-emerald-400">+{item.power} Etki</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ORTA PANEL: AKTİF SEKME İÇERİĞİ (HİKAYE / HARİTA / FERMANLAR / LORE) */}
          <div className="lg:col-span-2">
            
            {/* SEKME 1: HİKAYE & DİVAN */}
            {activeTab === "story" && currentScene && (
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl min-h-[580px] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-5">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-yellow-500 font-bold">
                        Bölüm {currentScene.chapter} • {currentScene.location}
                      </span>
                      <h2 className="text-2xl font-bold royal-font text-yellow-400 mt-0.5">{currentScene.title}</h2>
                    </div>
                    {currentScene.endingBadge && (
                      <span className="px-3 py-1 bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold rounded-full">
                        {currentScene.endingBadge}
                      </span>
                    )}
                  </div>

                  <div className="text-slate-200 leading-relaxed whitespace-pre-line text-base mb-8">
                    {currentScene.description}
                  </div>
                </div>

                {currentScene.isEnding ? (
                  <div className="p-6 bg-gradient-to-r from-amber-950/70 via-indigo-950/70 to-slate-900 border border-amber-500/50 rounded-2xl text-center">
                    <h3 className="text-xl font-bold royal-font text-yellow-300 mb-2">İmparatorluk Tarihi Yazıldı!</h3>
                    <p className="text-xs text-slate-300 mb-4">
                      Diğer finalleri görmek veya farklı bir ordu/diplomasi stratejisi denemek için yeni oyun başlatabilirsin.
                    </p>
                    <button
                      onClick={() => setGameState(window.PrinceTutu.getInitialState())}
                      className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl text-sm shadow-lg"
                    >
                      🔄 Yeni Saltanat Başlat
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400">Kararın Nedir?</h4>
                    {currentScene.choices.map((ch, idx) => {
                      const check = checkChoice(ch);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleStoryChoice(ch)}
                          disabled={!check.ok}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            check.ok
                              ? "bg-gradient-to-r from-slate-800/95 to-indigo-950/80 hover:from-indigo-900 hover:to-purple-900 border-indigo-500/30 hover:border-yellow-400/70 hover:translate-x-1"
                              : "bg-slate-900/40 border-slate-800 opacity-50 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                            <span className="font-bold text-sm text-white">{ch.text}</span>
                            <div className="flex items-center gap-1.5">
                              {ch.goldCost && (
                                <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 rounded text-xs font-semibold">
                                  💰 {ch.goldCost} Altın
                                </span>
                              )}
                              {ch.requiresItem && (
                                <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs font-semibold">
                                  📦 {ch.requiresItem}
                                </span>
                              )}
                              {!check.ok && (
                                <span className="px-2 py-0.5 bg-red-500/20 text-red-300 rounded text-xs font-semibold">
                                  🔒 {check.reason}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-blue-300 italic">{ch.consequence}</div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* SEKME 2: İNTERAKTİF 8 EYALETLİ SVG STRATEJİ HARİTASI */}
            {activeTab === "map" && (
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold royal-font text-yellow-400">🗺️ İmparatorluk Stratejik Haritası</h2>
                    <p className="text-xs text-slate-400">Bir eyalete tıklayarak garnizon takviye et, isyan bastır veya casus sabotajı düzenle.</p>
                  </div>
                </div>

                {/* SVG Harita Tuvali */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden mb-5">
                  <svg viewBox="0 0 920 600" className="w-full h-auto">
                    <defs>
                      <radialGradient id="mapBg" cx="50%" cy="50%" r="70%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#020617" />
                      </radialGradient>
                    </defs>
                    <rect width="920" height="600" fill="url(#mapBg)" />

                    {/* Komşuluk Yolları (Tedarik Hatları) */}
                    {Object.values(gameState.provinces).map((prov) =>
                      prov.neighbors.map((nId) => {
                        const target = gameState.provinces[nId];
                        if (!target || prov.id > target.id) return null;
                        return (
                          <line
                            key={`${prov.id}-${target.id}`}
                            x1={prov.x}
                            y1={prov.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="#475569"
                            strokeWidth="2.5"
                            strokeDasharray="6 6"
                          />
                        );
                      })
                    )}

                    {/* Eyalet Düğümleri */}
                    {Object.values(gameState.provinces).map((prov) => {
                      const badge = getOwnerBadge(prov.owner);
                      const isSelected = selectedProvince === prov.id;
                      return (
                        <g
                          key={prov.id}
                          className="province-node"
                          onClick={() => {
                            window.PrinceTutu.Sound.play("click");
                            setSelectedProvince(prov.id);
                          }}
                        >
                          <circle
                            cx={prov.x}
                            cy={prov.y}
                            r={isSelected ? 42 : 35}
                            fill={badge.fill}
                            stroke={isSelected ? "#facc15" : "#e2e8f0"}
                            strokeWidth={isSelected ? 4 : 2}
                          />
                          <text x={prov.x} y={prov.y - 4} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
                            🛡️ {prov.garrison}
                          </text>
                          <text x={prov.x} y={prov.y + 14} textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">
                            +{prov.taxIncome}💰
                          </text>
                          <rect
                            x={prov.x - 75}
                            y={prov.y + 44}
                            width="150"
                            height="22"
                            rx="6"
                            fill="rgba(15, 23, 42, 0.9)"
                            stroke="#334155"
                          />
                          <text x={prov.x} y={prov.y + 59} textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">
                            {prov.name}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Seçili Eyalet Yönetim Paneli */}
                {activeProv && (
                  <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl">
                    <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-yellow-400">{activeProv.name}</h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getOwnerBadge(activeProv.owner).cls}`}>
                        Hakimiyet: {getOwnerBadge(activeProv.owner).text}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-3">{activeProv.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-center">
                      <div className="p-2 bg-slate-900 rounded-lg">🛡️ Garnizon: <strong>{activeProv.garrison} Tabur</strong></div>
                      <div className="p-2 bg-slate-900 rounded-lg">💰 Vergi Geliri: <strong>+{activeProv.taxIncome} Altın/Tur</strong></div>
                      <div className="p-2 bg-slate-900 rounded-lg">🔥 İsyan Riski: <strong>%{activeProv.unrest}</strong></div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {activeProv.owner === "player" ? (
                        <>
                          <button
                            onClick={() => {
                              const res = window.PrinceTutu.executeProvinceAction(gameState, activeProv.id, "recruit_garrison");
                              setGameState(res.state);
                              setBannerMsg(res.message);
                            }}
                            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold"
                          >
                            🛡️ +3 Tabur Garnizon Ekle (35 Altın)
                          </button>
                          <button
                            onClick={() => {
                              const res = window.PrinceTutu.executeProvinceAction(gameState, activeProv.id, "pacify_unrest");
                              setGameState(res.state);
                              setBannerMsg(res.message);
                            }}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold"
                          >
                            🌾 Halka Erzak Dağıt (-25% İsyan, +5 Vergi | 25 Altın)
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              const res = window.PrinceTutu.executeProvinceAction(gameState, activeProv.id, "spy_sabotage");
                              setGameState(res.state);
                              setBannerMsg(res.message);
                            }}
                            className="px-3.5 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg text-xs font-bold"
                          >
                            🕵️ Düşman Garnizonunu Sabote Et (-3 Tabur | Casus Ağı veya 40 Altın)
                          </button>
                          {activeProv.owner === "vampire" && (
                            <button
                              onClick={() => setBattleState(window.PrinceTutu.CombatEngine.createBattleState(gameState, activeProv.id))}
                              className="px-3.5 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-xs font-bold"
                            >
                              ⚔️ Bu Kaleye Sefer Düzenle!
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SEKME 3: KRALİYET FERMANLARI */}
            {activeTab === "decrees" && (
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <h2 className="text-xl font-bold royal-font text-yellow-400">📜 İmparatorluk Fermanları ve Reform Divanı</h2>
                <p className="text-xs text-slate-400">
                  İlan ettiğin fermanlar hem orduna yeni elit taburlar (Paladin, Furry Nişancı, Dağ Baltacısı) ekler hem de imparatorluğun kaderini değiştirir.
                </p>
                <div className="space-y-3">
                  {window.PrinceTutu.DECREES_DATA.map((dec) => {
                    const enacted = gameState.decrees[dec.id];
                    return (
                      <div key={dec.id} className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <div className="font-bold text-sm text-white">{dec.title}</div>
                          <p className="text-xs text-slate-300 my-1">{dec.description}</p>
                          <div className="text-[11px] text-emerald-400 font-semibold">✨ Etki: {dec.effectLabel}</div>
                        </div>
                        <button
                          disabled={enacted}
                          onClick={() => handleEnactDecree(dec)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 ${
                            enacted ? "bg-emerald-900/50 text-emerald-300 border border-emerald-500/40" : "bg-yellow-500 hover:bg-yellow-400 text-black"
                          }`}
                        >
                          {enacted ? "Yürürlükte ✓" : dec.costGold > 0 ? `Mühürle (${dec.costGold} Altın)` : "Mühürle (Ücretsiz)"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SEKME 4: LORE ANSİKLOPEDİSİ */}
            {activeTab === "codex" && (
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
                <h2 className="text-xl font-bold royal-font text-yellow-400">📚 İmparatorluk Arşivleri ve Lore Kodeksi</h2>
                <div className="space-y-3">
                  {window.PrinceTutu.LORE_CODEX.map((entry, idx) => (
                    <div key={idx} className="p-4 bg-slate-800/80 border border-slate-700 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-amber-300 text-sm">{entry.title}</span>
                        <span className="text-[11px] px-2 py-0.5 bg-slate-700 rounded text-slate-300">{entry.category}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{entry.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SAĞ PANEL: İLİŞKİLER, RAKİP AI VE GÜNLÜK */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-pink-400 mb-3 flex items-center gap-2">
                <Icon name="heart" size={16} /> Saray & Dış İlişkiler
              </h3>
              <div className="space-y-1.5 text-xs mb-4">
                {Object.entries(gameState.relationships).map(([k, v]) => {
                  const labels = {
                    father: "İmparator Lalo",
                    adem: "Adem (19)",
                    anzak: "Anzak (27)",
                    sister9: "Kız Kardeş (9)",
                    sister13: "Kız Kardeş (13)",
                    furries: "Furry Cumhuriyeti",
                    people: "Halk",
                    advisor: "Baş Danışman"
                  };
                  return (
                    <div key={k} className="flex justify-between">
                      <span className="text-slate-300">{labels[k]}</span>
                      <span className={`font-bold ${v >= 70 ? "text-emerald-400" : v >= 45 ? "text-blue-400" : "text-red-400"}`}>
                        {v}/100
                      </span>
                    </div>
                  );
                })}
              </div>

              <h4 className="text-xs font-bold uppercase text-amber-400 pt-2 border-t border-slate-800 mb-2">Komşu Güçler</h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span>⚖️ DOXE Krallığı</span><strong className="text-blue-400">{gameState.worldRelations.doxe}/100</strong></div>
                <div className="flex justify-between"><span>⚒️ Dağ Kabileleri</span><strong className="text-amber-400">{gameState.worldRelations.mountainTribes}/100</strong></div>
                <div className="flex justify-between"><span>🦇 Vampir-Kara Elf</span><strong className="text-red-400">{gameState.worldRelations.vampireElves}/100</strong></div>
              </div>
            </div>

            {/* Krallık Durumu & AI İstihbarat Raporu */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className={`text-center py-2 px-3 rounded-xl border font-bold text-xs mb-3 ${kingdomStatus.color}`}>
                Durum: {kingdomStatus.label}
              </div>
              <div className="p-3 bg-orange-950/40 border border-orange-500/30 rounded-xl text-xs text-orange-200 mb-3">
                <div className="font-bold text-orange-400 mb-1">🕵️ Son İstihbarat Raporu:</div>
                {gameState.rivalState.lastRivalMove}
              </div>
              <div className="text-[11px] text-slate-400 space-y-1 mb-3">
                <div>💰 Ekonomi: <strong className="text-white">{gameState.worldState.economicState}</strong></div>
                <div>⚔️ Ordu: <strong className="text-white">{gameState.worldState.militaryStrength}</strong></div>
                <div>🔗 Kölelik: <strong className="text-white">{gameState.worldState.slavery}</strong></div>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl max-h-36 overflow-y-auto text-[11px] space-y-1 border border-slate-800">
                {gameState.historyLog.map((h, i) => (
                  <div key={i} className="text-slate-300 border-b border-slate-900 pb-1">{h}</div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* =====================================================================
          MODAL 1: 3v2 RISK ZAR SAVAŞ SİMÜLATÖRÜ (MONTE CARLO + BİRİM BONUSLU)
         ===================================================================== */}
      {battleState && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-red-500/60 rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
              <div>
                <h3 className="text-xl font-bold royal-font text-red-400">⚔️ Doğu Cephesi Taktiksel Zar Muharebesi</h3>
                <p className="text-xs text-slate-400">Saldıran 3 Zar, Savunan 2 Zar atar. Eşitlikte savunan kazanır.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold rounded-full">
                Tahmini Zafer Şansı: %{battleState.winProbability}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-blue-950/50 border border-blue-500/40 rounded-xl text-center">
                <div className="text-xs font-bold text-blue-300">PRENS TUTU KOALİSYONU</div>
                <div className="text-4xl font-extrabold my-2">{battleState.playerTroops} Tabur</div>
                <div className="flex justify-center gap-2 min-h-[38px]">
                  {battleState.playerDice.map((d, i) => (
                    <span key={i} className="w-9 h-9 flex items-center justify-center bg-blue-600 font-bold rounded-lg border border-blue-300">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-red-950/50 border border-red-500/40 rounded-xl text-center">
                <div className="text-xs font-bold text-red-300">VAMPİR - KARA ELF ORDUSU</div>
                <div className="text-4xl font-extrabold my-2">{battleState.enemyTroops} Tabur</div>
                <div className="flex justify-center gap-2 min-h-[38px]">
                  {battleState.enemyDice.map((d, i) => (
                    <span key={i} className="w-9 h-9 flex items-center justify-center bg-red-700 font-bold rounded-lg border border-red-300">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-4 max-h-36 overflow-y-auto text-xs space-y-1.5">
              {battleState.battleLog.map((l, i) => (
                <div key={i} className="text-slate-200 border-b border-slate-900 pb-1">{l}</div>
              ))}
            </div>

            {battleState.status === "ongoing" ? (
              <div className="flex flex-wrap gap-2.5 justify-between">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setBattleState(window.PrinceTutu.CombatEngine.executeBattleRound(battleState, "standard"))}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 font-bold rounded-xl text-xs"
                  >
                    🎲 3v2 Taarruz Zarı At
                  </button>
                  <button
                    onClick={() => setBattleState(window.PrinceTutu.CombatEngine.executeBattleRound(battleState, "all_out"))}
                    className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 font-bold rounded-xl text-xs"
                  >
                    🔥 Topyekün Hücum (2. Zara +1 Bonus)
                  </button>
                  {!battleState.archerVolleyUsed && battleState.units.furryArchers > 0 && (
                    <button
                      onClick={() => setBattleState(window.PrinceTutu.CombatEngine.triggerArcherVolley(battleState))}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-xs"
                    >
                      🏹 Furry Okçu Yaylım Ateşi (Bedava Hasar!)
                    </button>
                  )}
                </div>
                <button onClick={closeBattleModal} className="px-3 py-2 bg-slate-800 rounded-xl text-xs text-slate-400">
                  Geri Çekil
                </button>
              </div>
            ) : (
              <button
                onClick={closeBattleModal}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-bold rounded-xl"
              >
                {battleState.status === "won" ? "🏆 Zaferi Kutla ve Savaş Ganimetini Al (+120 Altın)" : "Cepheden Ayrıl"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: ANZAK İLE BİREBİR TAHT DÜELLOSU
         ===================================================================== */}
      {duelState && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-2xl max-w-xl w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold royal-font text-amber-400 mb-2">🗡️ Kraliyet Düellosu: Prens Tutu vs Anzak</h3>
            <div className="p-2.5 bg-amber-950/50 border border-amber-500/30 rounded-xl text-xs text-amber-200 mb-4">
              👁️ <strong>Anzak'ın Hazırlandığı Hamle:</strong> {duelState.anzakIntent}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-slate-800 rounded-xl">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-emerald-400">Prens Tutu</span>
                  <span>{duelState.playerHP}/{duelState.maxPlayerHP} HP</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${(duelState.playerHP / duelState.maxPlayerHP) * 100}%` }} />
                </div>
              </div>

              <div className="p-3 bg-slate-800 rounded-xl">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-red-400">Ağabey Anzak</span>
                  <span>{duelState.anzakHP}/{duelState.maxAnzakHP} HP</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full" style={{ width: `${(duelState.anzakHP / duelState.maxAnzakHP) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-4 max-h-36 overflow-y-auto text-xs space-y-1.5">
              {duelState.duelLog.map((l, i) => (
                <div key={i} className="text-slate-200 border-b border-slate-900 pb-1">{l}</div>
              ))}
            </div>

            {duelState.status === "ongoing" ? (
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  onClick={() => setDuelState(window.PrinceTutu.CombatEngine.executeDuelRound(duelState, "dagger_lunge", gameState))}
                  className="p-3 bg-red-900/80 hover:bg-red-800 border border-red-500/40 rounded-xl text-xs font-bold"
                >
                  🗡️ Gümüş Hançer Sapla
                </button>
                <button
                  onClick={() => setDuelState(window.PrinceTutu.CombatEngine.executeDuelRound(duelState, "parry_riposte", gameState))}
                  className="p-3 bg-blue-900/80 hover:bg-blue-800 border border-blue-500/40 rounded-xl text-xs font-bold"
                >
                  🛡️ Siper & Kontra (Ağır Darbeyi Ezer!)
                </button>
                <button
                  onClick={() => setDuelState(window.PrinceTutu.CombatEngine.executeDuelRound(duelState, "royal_psyche", gameState))}
                  className="p-3 bg-purple-900/80 hover:bg-purple-800 border border-purple-500/40 rounded-xl text-xs font-bold"
                >
                  🧠 Psikolojik Sarsıntı
                </button>
              </div>
            ) : (
              <button onClick={closeDuelModal} className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl">
                Düelloyu Tamamla
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PrinceTutuApp />);