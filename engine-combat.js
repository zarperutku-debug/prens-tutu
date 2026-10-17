// ============================================================================
// PRENS TUTU: GÖLGELERİN TACI - MODÜL 3: COMBAT & DUEL ENGINE (engine-combat.js)
// İçerik: Birim Tabanlı 3v2 Zar Muharebe Motoru, Monte Carlo Olasılık, Düello
// ============================================================================

window.PrinceTutu = window.PrinceTutu || {};

window.PrinceTutu.CombatEngine = {
  // 1. Muharebe Başlatıcı (Ordudaki özel birimlerin sayısını ve bonuslarını hesaplar)
  createBattleState(gameState, targetProvinceId = "eastern_pass") {
    const comp = gameState.armyComposition;
    const totalPlayerUnits =
      comp.infantry + comp.furryArchers + comp.mountainAxemen + comp.doxePaladins;
    const leadershipBonus = Math.floor(gameState.stats.militarySupport / 15);
    const totalTroops = totalPlayerUnits + leadershipBonus;

    const enemyTroops =
      targetProvinceId === "vampire_citadel" ? 18 : 14;

    const winProb = this.estimateWinProbability(
      totalTroops,
      enemyTroops,
      comp.mountainAxemen > 0 || gameState.stats.intelligence >= 60,
      comp.doxePaladins > 0
    );

    return {
      targetProvinceId,
      playerTroops: totalTroops,
      maxPlayerTroops: totalTroops,
      enemyTroops: enemyTroops,
      maxEnemyTroops: enemyTroops,
      round: 0,
      archerVolleyUsed: false,
      paladinPurgeUsed: false,
      playerDice: [],
      enemyDice: [],
      winProbability: winProb,
      units: { ...comp },
      hasTacticalEdge: gameState.stats.intelligence >= 60,
      status: "ongoing", // 'ongoing' | 'won' | 'lost'
      battleLog: [
        `⚔️ Cephe Hattı Kuruldu! Toplam ${totalTroops} Tabur (${comp.infantry} Piyade, ${comp.furryArchers} Furry Okçu, ${comp.mountainAxemen} Dağ Baltacısı, ${comp.doxePaladins} DOXE Paladini + ${leadershipBonus} Komuta Bonusu).`,
        `🦇 Karşıda ${enemyTroops} Taburluk Vampir-Kara Elf İttifakı ordusu var. Tahmini Kazanma Olasılığın: %${winProb}`
      ]
    };
  },

  // 2. Monte Carlo Simülasyonu ile Gerçek Zamanlı Kazanma Olasılığı (% Win Rate)
  estimateWinProbability(pTroops, eTroops, hasDiceBonus, hasPaladins) {
    if (pTroops <= 0) return 0;
    if (eTroops <= 0) return 100;
    const trials = 250;
    let wins = 0;

    for (let t = 0; t < trials; t++) {
      let p = pTroops;
      let e = eTroops;
      while (p > 0 && e > 0) {
        const pCount = Math.min(3, p);
        const eCount = Math.min(2, e);
        const pRolls = Array.from({ length: pCount }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);
        const eRolls = Array.from({ length: eCount }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);

        if (hasDiceBonus && pRolls.length > 0) pRolls[0] = Math.min(6, pRolls[0] + 1);

        const comps = Math.min(pRolls.length, eRolls.length);
        for (let i = 0; i < comps; i++) {
          if (pRolls[i] > eRolls[i]) {
            e -= hasPaladins && i === 0 && pRolls[0] === 6 ? 2 : 1;
          } else {
            p -= 1;
          }
        }
      }
      if (p > 0) wins++;
    }
    return Math.round((wins / trials) * 100);
  },

  // 3. Furry Okçuları İlk Tur Menzilli Yaylım Ateşi (Zar atmadan düşman kırar)
  triggerArcherVolley(battleState) {
    if (battleState.archerVolleyUsed || battleState.units.furryArchers <= 0 || battleState.status !== "ongoing") {
      return battleState;
    }
    window.PrinceTutu.Sound.play("sword");
    const archers = battleState.units.furryArchers;
    const kills = Math.max(1, Math.min(4, Math.floor(archers * 0.85)));
    const nextEnemy = Math.max(0, battleState.enemyTroops - kills);
    const nextStatus = nextEnemy === 0 ? "won" : "ongoing";
    const winProb = this.estimateWinProbability(battleState.playerTroops, nextEnemy, battleState.hasTacticalEdge, battleState.units.doxePaladins > 0);

    return {
      ...battleState,
      enemyTroops: nextEnemy,
      archerVolleyUsed: true,
      winProbability: winProb,
      status: nextStatus,
      battleLog: [
        `🏹 FURRY OKÇU YAYLIM ATEŞİ! ${archers} Furry Nişancı Taburu gökyüzünü oklarla kararttı: Düşman -${kills} Tabur kaybetti!`,
        ...battleState.battleLog
      ]
    };
  },

  // 4. Risk Tarzı 3v2 Zar Muharebe Turu
  executeBattleRound(battleState, tactic = "standard") {
    if (battleState.status !== "ongoing") return battleState;
    window.PrinceTutu.Sound.play("dice");

    const nextRound = battleState.round + 1;
    const pDiceCount = Math.min(3, battleState.playerTroops);
    const eDiceCount = Math.min(2, battleState.enemyTroops);

    let pRolls = Array.from({ length: pDiceCount }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);
    let eRolls = Array.from({ length: eDiceCount }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => b - a);

    const bonusNotes = [];

    // Zeka >= 60 veya Dağ Baltacısı varsa en yüksek zara +1
    if ((battleState.hasTacticalEdge || battleState.units.mountainAxemen > 0) && pRolls.length > 0) {
      pRolls[0] = Math.min(6, pRolls[0] + 1);
      bonusNotes.push("Taktik/Baltacı +1");
    }

    // Topyekün Süvari Hücumu
    if (tactic === "all_out" && pRolls.length > 1) {
      pRolls[1] = Math.min(6, pRolls[1] + 1);
      bonusNotes.push("Hücum +1");
    }

    let pLoss = 0;
    let eLoss = 0;
    const comparisons = Math.min(pRolls.length, eRolls.length);

    for (let i = 0; i < comparisons; i++) {
      if (pRolls[i] > eRolls[i]) {
        eLoss++;
        // DOXE Kutsal Paladinleri 6 attığında Vampirlere +1 ekstra kutsal hasar verir
        if (i === 0 && pRolls[0] === 6 && battleState.units.doxePaladins > 0) {
          eLoss++;
          bonusNotes.push("⚖️ DOXE Paladin Kutsal Darbe (+1)");
        }
      } else {
        pLoss++; // Eşitlikte savunan kazanır
      }
    }

    if (tactic === "all_out" && pLoss > 0) {
      pLoss++;
      bonusNotes.push("Açık Cephe Riski (-1)");
    }

    const nextPlayer = Math.max(0, battleState.playerTroops - pLoss);
    const nextEnemy = Math.max(0, battleState.enemyTroops - eLoss);

    let nextStatus = "ongoing";
    let msg = `🎲 Tur ${nextRound}: Sen [${pRolls.join(", ")}] vs Vampir-Elf [${eRolls.join(", ")}] ${
      bonusNotes.length ? `(${bonusNotes.join(", ")})` : ""
    } ➔ Düşman -${eLoss}, Sen -${pLoss} Tabur.`;

    if (nextEnemy === 0) {
      nextStatus = "won";
      window.PrinceTutu.Sound.play("horn");
      msg = `🏆 KESİN ZAFER! Vampir-Kara Elf ordusu tamamen imha edildi!`;
    } else if (nextPlayer === 0) {
      nextStatus = "lost";
      window.PrinceTutu.Sound.play("alert");
      msg = `💀 BOZGUN! Birliklerin ağır kayıplarla geri çekildi.`;
    }

    const winProb = this.estimateWinProbability(
      nextPlayer,
      nextEnemy,
      battleState.hasTacticalEdge || battleState.units.mountainAxemen > 0,
      battleState.units.doxePaladins > 0
    );

    return {
      ...battleState,
      round: nextRound,
      playerTroops: nextPlayer,
      enemyTroops: nextEnemy,
      playerDice: pRolls,
      enemyDice: eRolls,
      winProbability: winProb,
      status: nextStatus,
      battleLog: [msg, ...battleState.battleLog]
    };
  },

  // 5. Anzak ile Birebir Taht Düellosu Motoru
  createDuelState(gameState) {
    const hasSilverDagger = gameState.inventory.items.some((i) => i.name.includes("Gümüş Hançer"));
    const hasNorthernArmor = gameState.decrees.mountainSmithGuild;

    return {
      playerHP: hasNorthernArmor ? 125 : 100,
      maxPlayerHP: hasNorthernArmor ? 125 : 100,
      anzakHP: 130,
      maxAnzakHP: 130,
      stamina: 100,
      hasSilverDagger,
      hasNorthernArmor,
      anzakIntent: "Ağır Yukarıdan İndirme (Heavy Slash)", // Oyuncunun okuyabileceği bir sonraki Anzak hamlesi
      status: "ongoing",
      duelLog: [
        "⚔️ Taht Odası'nda muhafızlar çember oluşturdu! Ağabeyin Anzak (27) çift elli kraliyet kılıcını çekti.",
        hasSilverDagger
          ? "🗡️ Gümüş Hançer elinde (+8 Keskinlik Hasarı)."
          : "⚠️ Gümüş Hançer yok!",
        hasNorthernArmor
          ? "🛡️ Kuzey Çeliği Zırhın kuşanıldı (+25 Ekstra Can)."
          : ""
      ].filter(Boolean)
    };
  },

  executeDuelRound(duelState, moveType, gameState) {
    if (duelState.status !== "ongoing") return duelState;
    window.PrinceTutu.Sound.play("sword");

    const daggerBonus = duelState.hasSilverDagger ? 8 : 2;
    let pDmg = 0; // Oyuncunun aldığı hasar
    let aDmg = 0; // Anzak'ın aldığı hasar
    let stamDelta = 0;
    let moveDesc = "";

    const currentIntent = duelState.anzakIntent;

    if (moveType === "dagger_lunge") {
      // Hızlı Gümüş Hançer Saplaması
      aDmg = Math.floor(Math.random() * 14) + 16 + daggerBonus;
      pDmg = currentIntent.includes("Ağır") ? 18 : 11;
      stamDelta = -18;
      moveDesc = `🗡️ Şimşek Hızında Saplama! Anzak'ın zırh boşluğuna ${aDmg} hasar vurdun (Aldığın hasar: ${pDmg}).`;
    } else if (moveType === "parry_riposte") {
      // Siper & Kontra (Özellikle Ağır Darbeye karşı yıkıcıdır)
      if (currentIntent.includes("Ağır")) {
        aDmg = 34 + daggerBonus;
        pDmg = 3;
        moveDesc = `🛡️ KUSURSUZ SAVUŞTURMA! Anzak'ın ağır darbesini boşa çıkarıp göğsüne ${aDmg} kritik kontra indirdin!`;
      } else {
        aDmg = 14;
        pDmg = 10;
        moveDesc = `🛡️ Savunma gardı aldın ve ${aDmg} karşı hasar verdin (Aldığın hasar: ${pDmg}).`;
      }
      stamDelta = +15;
    } else if (moveType === "royal_psyche") {
      // Zeka & Karizma ile Psikolojik Sarsıntı
      const statPower = Math.floor((gameState.stats.intelligence + gameState.stats.charisma) / 4.5);
      aDmg = statPower;
      pDmg = 6;
      stamDelta = +10;
      moveDesc = `🧠 Kraliyet Otoritesi! Anzak'ın paralı askerlerinin önünde onun meşruiyetini ezdin: ${aDmg} Mental/Fiziksel darbe!`;
    }

    const nextAnzakHP = Math.max(0, duelState.anzakHP - aDmg);
    const nextPlayerHP = Math.max(0, duelState.playerHP - pDmg);
    const nextStamina = Math.max(0, Math.min(100, duelState.stamina + stamDelta));

    const intents = [
      "Ağır Yukarıdan İndirme (Heavy Slash) — Kontraya Açık!",
      "Hızlı Yan Kesik (Swift Cleave)",
      "Omuz Darbesi ve Kılıç Kabzası (Guard Break)",
      "Ağır Yukarıdan İndirme (Heavy Slash) — Kontraya Açık!"
    ];
    const nextIntent = intents[Math.floor(Math.random() * intents.length)];

    let nextStatus = "ongoing";
    if (nextAnzakHP === 0) {
      nextStatus = "won";
      window.PrinceTutu.Sound.play("horn");
      moveDesc = "👑 ZAFER! Anzak kılıcını düşürüp diz çöktü! Tüm Taht Odası 'Yaşasın Prens Tutu!' diye inliyor!";
    } else if (nextPlayerHP === 0) {
      nextStatus = "lost";
      window.PrinceTutu.Sound.play("alert");
      moveDesc = "🩸 Ağır yaralandın! Baş Danışman ve muhafızlar sis bombasıyla seni düello alanından kaçırdı.";
    }

    return {
      ...duelState,
      playerHP: nextPlayerHP,
      anzakHP: nextAnzakHP,
      stamina: nextStamina,
      anzakIntent: nextIntent,
      status: nextStatus,
      duelLog: [moveDesc, ...duelState.duelLog]
    };
  }
};