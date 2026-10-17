// ============================================================================
// PRENS TUTU: GÖLGELERİN TACI - MODÜL 2: DATA & STORY (data-story.js)
// İçerik: 5 Kraliyet Fermanı, Lore Ansiklopedisi, 15 Dallanan Sahne & 5 Final
// ============================================================================

window.PrinceTutu = window.PrinceTutu || {};

// ----------------------------------------------------------------------------
// 1. İMPARATORLUK KARARNAMELERİ (DECREES VERİTABANI)
// ----------------------------------------------------------------------------
window.PrinceTutu.DECREES_DATA = [
  {
    id: "abolishSlavery",
    title: "⛓️ Köleliği İmparatorluk Genelinde Yasakla",
    costGold: 0,
    reqStat: { stat: "politicalPower", value: 45, label: "Politik Güç 45+" },
    description: "Köle pazarlarını kapatır. DOXE Kutsal Krallığı ordusundan +2 Kutsal Paladin Taburu kazandırır, Halk ve DOXE ilişkilerini zirveye taşır. Ancak Anzak'ın Güney Baronlarını öfkelendirir.",
    effectLabel: "+30 DOXE, +25 Halk, +2 DOXE Paladin Birimi, Kölelik: Yasaklandı"
  },
  {
    id: "furryTradePact",
    title: "🐾 Furry Cumhuriyeti İmtiyazlı Gümrük Paktı",
    costGold: 40,
    reqStat: null,
    description: "Batı limanlarını Furry ticaret loncalarına açar. Anında +120 Altın sıcak para, her tur +25 ekstra vergi ve orduna +2 Furry Keskin Nişancı Taburu kazandırır.",
    effectLabel: "+80 Net Altın, +25/Tur Vergi, +20 Furry İlişkisi, +2 Furry Okçu Birimi"
  },
  {
    id: "martialLaw",
    title: "⚔️ Sınır Boyu Olağanüstü Hal ve Sıkıyönetim",
    costGold: 25,
    reqStat: null,
    description: "Doğu Kızıl Geçidi ve Başkent'te askeri disiplin ilan eder. Orduna +3 Kraliyet Piyade Taburu ve +18 Askeri Destek sağlar, ancak halk arasında huzursuzluk yaratır.",
    effectLabel: "+18 Askeri Destek, +3 Piyade Birimi, -10 Halk Desteği"
  },
  {
    id: "mountainSmithGuild",
    title: "⚒️ Kuzey Dağ Klanları Çelik Ocakları Antlaşması",
    costGold: 50,
    reqStat: null,
    description: "Dağ Kabilelerinin usta demircilerine kraliyet imtiyazı verir. Orduna +3 Vahşi Dağ Baltacısı Taburu katar ve düellolarda silah gücünü artırır.",
    effectLabel: "+25 Dağ Kabileleri, +3 Dağ Baltacısı Birimi, Envantere 'Kuzey Çeliği Zırh'"
  },
  {
    id: "royalInquisition",
    title: "🕵️ Gölge İstihbarat ve Anti-Yolsuzluk Divanı",
    costGold: 45,
    reqStat: { stat: "intelligence", value: 58, label: "Zeka 58+" },
    description: "Baş Danışman liderliğinde gizli bir iç istihbarat teşkilatı kurar. Anzak ve Adem'in darbe hazırlığını (Plot Progress) anında %35 düşürür ve casus ağını aktif eder.",
    effectLabel: "Casus Ağı Aktif, Kardeşlerin Darbe Planı -35%, +12 Politik Güç"
  }
];

// ----------------------------------------------------------------------------
// 2. DÜNYA ANSİKLOPEDİSİ (LORE CODEX)
// ----------------------------------------------------------------------------
window.PrinceTutu.LORE_CODEX = [
  {
    title: "İmparator Lalo ve Taht Krizi",
    category: "Hanedan",
    text: "68 yaşındaki İmparator Lalo, kırk yıllık saltanatının sonunda ağır bir hastalıkla pençeleşiyor. Üç oğlu arasında en zeki ve adil olanı Prens Tutu olsa da, 27 yaşındaki savaş yanlısı Anzak ve 19 yaşındaki entrikacı Adem tahtı zorla ele geçirmek için soylularla gizli ittifaklar kuruyor."
  },
  {
    title: "Vampir - Kara Elf İttifakı (Doğu Tehdidi)",
    category: "Dış Güçler",
    text: "Yüzyıllardır birbirleriyle savaşan Kan Lordları ve Gölge Ormanı'nın Kara Elfleri, ilk kez tek bir sancak altında birleşti. Doğu Kızıl Geçidi düşerse başkent Lalo tamamen savunmasız kalacak."
  },
  {
    title: "Furry Cumhuriyeti (Batı Müttefiki)",
    category: "Diplomasi",
    text: "Batı kıyılarındaki zengin ticaret limanlarını yöneten Furry Cumhuriyeti, imparatorluğun en büyük finansörü ve barut/okçu tedarikçisidir. Ancak Anzak'ın ırkçı ve saldırgan politikaları bu kadim dostluğu tehdit ediyor."
  },
  {
    title: "DOXE Kutsal Krallığı ve Kölelik Krizi",
    category: "Diplomasi",
    text: "Güneydeki teokratik DOXE Krallığı, İmparatorluk topraklarında kölelik devam ettiği sürece Vampir-Kara Elf savaşına tek bir şövalye bile göndermeyeceğini ilan etti. Köleliği kaldırmak DOXE'nin efsanevi Paladinlerini yanına çeker."
  },
  {
    title: "Küçük Kız Kardeşler (9 ve 13 Yaşında)",
    category: "Aile",
    text: "Saraydaki acımasız taht kavgasında seni karşılıksız seven iki kişi: 9 ve 13 yaşlarındaki küçük kız kardeşlerin. Sarayın gizli koridorlarında duydukları fısıltılar hayat kurtarabilir, ancak kardeşlerin onları sana karşı rehin olarak kullanmak isteyebilir."
  }
];

// ----------------------------------------------------------------------------
// 3. ANA HİKAYE VE DALLANAN SAHNE AĞACI (SCENES)
// ----------------------------------------------------------------------------
window.PrinceTutu.SCENES = {
  // ================= BÖLÜM 1: SARAYDA SABAH =================
  throne_room_morning: {
    chapter: 1,
    title: "Taht Odası - Çöken İmparatorluğun Sabahı",
    location: "Başkent Lalo — Altın Taht Salonu",
    description: "Sabah güneşi yüksek vitray pencerelerden süzülerek mermer zemine kan kırmızısı ve altın rengi gölgeler düşürüyor. Baban İmparator Lalo, altın tahtında çökmüş oturuyor; altmış sekiz yaşından çok daha yaşlı görünüyor. Gözlerinin altındaki koyu halkalar uykusuz gecelerden, bir zamanlar gururlu olan omuzları ise çökmekte olan bir krallığın ağırlığından bahsediyor.\n\nAğabeyin Anzak (27) eli kılıcının kabzasında, kardeşin Adem (19) ise sinsi bir tebessümle tahtın yanında durmuş fısıldaşıyor. Sen içeri girince aniden susuyorlar; gözleri seni hesaplayıcı bir ilgiyle takip ediyor.\n\n'Ah, Tutu,' diyor baban yorgun ve çatallı bir sesle. 'Yaklaş oğlum. Doğu sınırımız yanıyor, hazine eriyor ve kardeşlerinle konuşacak çok şeyimiz var.'",
    choices: [
      {
        text: "Saygıyla diz çöküp babanın elini öp ve krallığın yükünü paylaşmaya hazır olduğunu söyle",
        consequence: "Babanın otoritesini onurlandır (+8 İmparator, +4 Karizma, +3 Ahlak)",
        statChange: { relationships: { father: 8 }, stats: { charisma: 4, moralStanding: 3 } },
        nextScene: "council_discussion"
      },
      {
        text: "Önce Anzak ve Adem'in gözlerinin içine bakarak onları selamla, sonra babana dön",
        consequence: "Aile içi diplomatik dengeyi koru (+5 Adem, +5 Anzak, Kardeşlerin Darbe Hızı -5%)",
        statChange: { relationships: { adem: 5, anzak: 5 }, rivalDelta: { brotherPlotProgress: -5 } },
        nextScene: "council_discussion"
      },
      {
        text: "Kardeşlerini tamamen yok sayarak doğrudan tahtın basamaklarına çık",
        consequence: "Gerçek varis olduğunu tüm saraya ilan et (+8 Politik Güç, -6 Anzak, -6 Adem)",
        statChange: { relationships: { father: 4, adem: -6, anzak: -6 }, stats: { politicalPower: 8 } },
        nextScene: "council_discussion"
      },
      {
        text: "Kraliyet Mührü'nü hafifçe göstererek Baş Danışman'a gizli bir işaret ver",
        consequence: "Bürokratik ittifakı erken devreye sok (+10 Danışman, +5 Zeka, +4 Politik Güç)",
        requiresItem: "Kraliyet Mührü",
        statChange: { relationships: { advisor: 10 }, stats: { intelligence: 5, politicalPower: 4 } },
        nextScene: "council_discussion"
      }
    ]
  },

  council_discussion: {
    chapter: 1,
    title: "Kraliyet Savaş Konseyi",
    location: "Başkent Lalo — Strateji Odası",
    description: "Büyük meşe masanın üzerindeki imparatorluk haritası kırmızı iğnelerle dolu. Yüzü çapraz kılıç yaralarıyla kaplı yaşlı savaşçı Lord Komutan Vex, doğu sınırını işaret ediyor:\n\n'Casuslarımızın raporları korkunç Hünkarım. Vampir Lordları ve Kara Elf büyücüleri Doğu Kızıl Geçidi'nin hemen ötesinde 14 taburluk bir ordu topladı. Üstelik Güneydeki DOXE Kutsal Krallığı, topraklarımızda kölelik devam ettiği için yardım antlaşmasını askıya aldı!'\n\nAnzak masaya yumruğunu indiriyor: 'DOXE'nin rahiplerine ihtiyacımız yok! Baba, ordunun komutasını bana ver, o kan emicileri sınırda ezeyim!'\nAdem hemen atılıyor: 'Ve savaş masrafları için Furry tüccarlarına ek vergi koyalım!'\n\nİmparator Lalo öksürerek sana dönüyor: 'Sen ne diyorsun Tutu? Hangi cepheden başlamalıyız?'",
    choices: [
      {
        text: "🎲 [Cepheye Git] 'Sınır komutasını ben alıyorum Baba! Doğu Kızıl Geçidi'nde düşmanı bizzat durduracağım!'",
        consequence: "Orduyu denetler ve Taktiksel Savaş Simülatörünü (3v2 Risk Zar Motoru) başlatır!",
        specialAction: "startBattle",
        statChange: { stats: { militarySupport: 8 }, relationships: { father: 6 } },
        nextScene: "private_chambers"
      },
      {
        text: "DOXE Krallığı'nın desteğini geri kazanmak için kölelik reformunu masaya yatır",
        consequence: "Diplomatik ve ahlaki liderlik göster (+8 Politik Güç, +6 Zeka, +15 DOXE)",
        statChange: {
          stats: { politicalPower: 8, intelligence: 6, moralStanding: 8 },
          worldRelations: { doxe: 15 },
          flags: { slaveryDiscussed: true }
        },
        nextScene: "private_chambers"
      },
      {
        text: "Adem'e sert çık: 'Furry Cumhuriyeti bizim en sadık müttefikimizdir, onlara ek vergi koymak ihanettir!'",
        consequence: "Furry Elçisinin takdirini kazan (+15 Furry, +40 Ticaret Altını, -5 Adem)",
        statChange: {
          relationships: { furries: 15, adem: -5 },
          inventory: { gold: 40 },
          stats: { charisma: 5, politicalPower: 4 }
        },
        nextScene: "private_chambers"
      },
      {
        text: "Hazine'den 50 Altın ayırarak hem sınırda hem sarayda Gölge Casus Ağı kur",
        consequence: "Gizli istihbarat teşkilatını başlat (+9 Zeka, Casus Ağı Aktif)",
        goldCost: 50,
        statChange: {
          stats: { intelligence: 9, politicalPower: 5 },
          flags: { hasSpyNetwork: true },
          rivalDelta: { brotherPlotProgress: -10 }
        },
        nextScene: "private_chambers"
      }
    ]
  },

  // ================= BÖLÜM 2: GECE FISILTILARI VE KOMPLO =================
  private_chambers: {
    chapter: 2,
    title: "Özel Odalar - Gece Yarısı Fısıltıları",
    location: "Saray Batı Kanadı — Prens Tutu'nun Dairesi",
    description: "Konsey toplantısından sonra odana çekildin. Şöminedeki ateş çıtırdarken Bilgelik Kitabı'nı inceliyorsun. Aniden kapında çok hafif, ürkek bir tıkırtı duyuluyor. Kapıyı açtığında 13 ve 9 yaşlarındaki iki küçük kız kardeşinin el ele tutuşmuş, titreyerek koridorda beklediğini görüyorsun.\n\n13 yaşındaki kardeşin içeri girip kapıyı sürgülüyor: 'Tutu abi, çok korkuyoruz! Bir saat önce Adem'in dairesinin önünden geçerken içeride Güneyin Köle Baronlarını ve siyah pelerinli suikastçıları gördük. Babamızın ilacına zehir katmaktan ve seni ortadan kaldırmaktan bahsediyorlardı!'\n\n9 yaşındaki en küçük kardeşin ise cübbene sarılıyor: 'Abi, bizi Anzak'ın adamlarına verme...'",
    choices: [
      {
        text: "Kardeşlerine sarıl, kendi özel muhafızlarını onların kapısına dik ve tüm isimleri not al",
        consequence: "Kardeşlerini güvenceye al ve komployu deşifre et (+15 Kız Kardeşler, Yolsuzluk Kanıtı)",
        statChange: {
          relationships: { sister13: 15, sister9: 15 },
          stats: { intelligence: 7, moralStanding: 8 },
          flags: { knowsAboutCorruption: true, sistersProtected: true },
          rivalDelta: { brotherPlotProgress: -12 }
        },
        nextScene: "assassination_attempt"
      },
      {
        text: "13 yaşındaki kardeşine 25 Altın ve gizli mühür vererek saraydaki hizmetçileri örgütlemesini sağla",
        consequence: "Saray içinde görünmez bir muhbir ağı kur (+10 Zeka, Casus Ağı Aktif)",
        goldCost: 25,
        statChange: {
          relationships: { sister13: 10 },
          stats: { intelligence: 10, politicalPower: 6 },
          flags: { hasSpyNetwork: true, knowsAboutCorruption: true, sistersProtected: true }
        },
        nextScene: "assassination_attempt"
      },
      {
        text: "⚔️ [Anında Misilleme] Gümüş Hançer'ini kuşanıp doğrudan Anzak'ın antrenman avlusunu bas!",
        consequence: "Anzak ile Birebir Kılıç Düellosu başlatır!",
        specialAction: "startDuel",
        statChange: {
          relationships: { sister13: 8, sister9: 8 },
          flags: { sistersProtected: true, brothersConfronted: true }
        },
        nextScene: "assassination_attempt"
      }
    ]
  },

  assassination_attempt: {
    chapter: 2,
    title: "Karanlıkta Çelik Parıltısı - Suikast Girişimi!",
    location: "Saray Koridorları — Gece 03:00",
    description: "Kız kardeşlerini güvenli odaya yerleştirdikten hemen sonra, balkon perdeleri gece rüzgarıyla savruluyor! Fısıltı Ormanı'ndan kiralanmış iki maskeli suikastçı, zehirli hançerleriyle odana dalıyor!\n\n'Prens Anzak ve Lord Adem'in selamı var!' diye tıslıyor içlerinden biri. Muhafızlar yetişene kadar ilk hamleyi sen yapmak zorundasın!",
    choices: [
      {
        text: "🗡️ [Gümüş Hançer] Hançerini çekip şamdandaki mumları devir ve karanlıkta karşı saldırıya geç!",
        consequence: "Suikastçılardan birini avla, diğerini sağ yakala (+8 Askeri Destek, +6 Karizma)",
        requiresItem: "Gümüş Hançer",
        statChange: {
          stats: { militarySupport: 8, charisma: 6, politicalPower: 5 },
          flags: { knowsAboutCorruption: true },
          rivalDelta: { brotherPlotProgress: -15 }
        },
        nextScene: "diplomatic_crossroads"
      },
      {
        text: "🧠 [Zeka >= 60] Odadaki gizli geçidi kullanıp suikastçıları muhafızların pusu kurduğu koridora çek!",
        consequence: "Taktiksel deha! İki suikastçıyı da konuşmaları için Baş Danışman'a teslim et",
        requiresStat: { stat: "intelligence", value: 60, label: "Zeka" },
        statChange: {
          stats: { intelligence: 8, politicalPower: 10 },
          relationships: { advisor: 12 },
          flags: { knowsAboutCorruption: true },
          rivalDelta: { brotherPlotProgress: -20 }
        },
        nextScene: "diplomatic_crossroads"
      },
      {
        text: "Suikastçılara 60 Altın fırlat: 'Adem'in size ödediğinin iki katını veriyorum, şimdi onu satın!'",
        consequence: "Suikastçıları çift taraflı ajana dönüştür (-60 Altın, +10 Politik Güç, Casus Ağı)",
        goldCost: 60,
        statChange: {
          stats: { politicalPower: 10, intelligence: 6 },
          flags: { hasSpyNetwork: true, knowsAboutCorruption: true },
          rivalDelta: { brotherPlotProgress: -25 }
        },
        nextScene: "diplomatic_crossroads"
      },
      {
        text: "Odanın ağır meşe masasını siper alıp nöbetçiler gelene kadar savunmada kal",
        consequence: "Yaralanmadan kurtul ama suikastçılar pencereden kaçar (+3 Askeri Destek)",
        statChange: { stats: { militarySupport: 3 } },
        nextScene: "diplomatic_crossroads"
      }
    ]
  },

  // ================= BÖLÜM 3: BÜYÜK DİPLOMASİ VE EYALET SEFERİ =================
  diplomatic_crossroads: {
    chapter: 3,
    title: "Üçlü Yol Ayrımı - Müttefik Arayışı",
    location: "Başkent Lalo — Şafak Vakti",
    description: "Geceki suikast girişiminden sağ çıktın. Sabah olduğunda Baş Danışman elinde üç acil davet mektubuyla odana giriyor:\n\n1. **Büyük Pazar Meydanı:** Anzak'ın vergi tahsildarları halka ve Furry tüccarlarına zulmediyor; halk isyanın eşiğinde.\n2. **Batı Furry Limanı:** Furry Cumhuriyeti Senatosu, imparatorlukla olan kaderini görüşmek üzere seni bekliyor.\n3. **Güney DOXE Manastırı ve Kuzey Dağları:** DOXE Başrahibi ve Dağ Klanları şefleri sınırda elçilerini bekliyor.\n\nÖnce başkentteki yangını söndürmek için Büyük Pazar'a iniyorsun!",
    choices: [
      {
        text: "Büyük Pazar Meydanı'na in ve halkın karşısına çık",
        consequence: "Başkentteki krize müdahale et",
        statChange: { stats: { publicSupport: 4 } },
        nextScene: "marketplace_morning"
      }
    ]
  },

  marketplace_morning: {
    chapter: 3,
    title: "Büyük Pazar Meydanı - Zincirler ve Kıvılcım",
    location: "Başkent Lalo — Ticaret Meydanı",
    description: "Pazar meydanı öfkeli kalabalıkla kaynıyor! Anzak'ın armasını taşıyan zırhlı tahsildarlar, vergi borcunu ödeyemeyen yaşlı bir demirciyi ve ailesini demir zincirlere vurmuş, Güneydeki köle tüccarlarına teslim etmeye çalışıyor.\n\nFurry Cumhuriyeti'nin Baş Elçisi pençelerini sıkmış öfkeyle izliyor: 'Prens Tutu! Kardeşin Anzak bizim kervanlarımızdan da haraç kesiyor. Eğer bu zorbalığa dur demezseniz Furry limanlarını kapatacağız!'",
    choices: [
      {
        text: "Kraliyet Mührü'nü havaya kaldır: 'Zincirleri kırın! Hiçbir İmparatorluk vatandaşı köle yapılamaz!'",
        consequence: "Halkın ve DOXE'nin kahramanı ol (+20 Halk, +18 DOXE, +12 Ahlak, -12 Anzak)",
        requiresItem: "Kraliyet Mührü",
        statChange: {
          relationships: { people: 20, furries: 10, anzak: -12 },
          worldRelations: { doxe: 18 },
          stats: { publicSupport: 18, moralStanding: 12, politicalPower: 6 },
          worldState: { slavery: "Kısıtlandı" }
        },
        nextScene: "faction_envoy_summit"
      },
      {
        text: "Ailenin borcunu kendi kesenden öde (35 Altın) ve Furry Elçisine ticaret güvencesi ver (+85 Altın Gümrük Geliri)",
        consequence: "Pragmatik diplomasi: Hem halkı kurtar hem de hazineyi doldur (+50 Net Altın, +15 Furry)",
        goldCost: 35,
        statChange: {
          inventory: { gold: 85 },
          relationships: { people: 12, furries: 15 },
          stats: { charisma: 8, publicSupport: 10 },
          worldState: { economicState: "Canlanıyor" }
        },
        nextScene: "faction_envoy_summit"
      },
      {
        text: "Anzak'ın tahsildarlarını görevden alıp kendi askeri muhafızlarını pazarın güvenliğine ata",
        consequence: "Başkent kontrolünü ele geçir (+12 Politik Güç, +10 Askeri Destek, Kardeş Darbesi -10%)",
        statChange: {
          stats: { politicalPower: 12, militarySupport: 10 },
          rivalDelta: { brotherPlotProgress: -10 }
        },
        nextScene: "faction_envoy_summit"
      }
    ]
  },

  faction_envoy_summit: {
    chapter: 3,
    title: "Sınır Elçileri Zirvesi - Üç Büyük Güç",
    location: "Başkent Lalo — Elçilik Sarayı",
    description: "Pazar yerindeki hamlenin ardından üç dış gücün temsilcileri Elçilik Sarayı'nda huzuruna çıktı:\n\n• **Furry Cumhuriyeti Mareşali:** 'Prensim, ordunuza elit Furry Keskin Nişancıları vermeye hazırız, yeter ki batı sınırındaki imtiyazlarımızı koruyun.'\n• **DOXE Baş Engizisyoncusu:** 'Köleliği lanetleyen duruşunuzu duyduk. Eğer bize resmi söz verirseniz, Vampir-Kara Elf ordusuna karşı Kutsal Paladinlerimizi göndereceğiz.'\n• **Kuzey Dağ Klanları Şefi:** 'Biz lafa değil çeliğe bakarız Tutu! Bize 40 Altın demir dövme fonu ver, Dağ Baltacıları senin için kan döksün!'",
    choices: [
      {
        text: "🐾 Furry Cumhuriyeti ile 'Kardeşlik ve Okçu Birliği' anlaşması imzala",
        consequence: "Orduna +3 Furry Okçu Taburu katılır, +20 Furry İlişkisi, +50 Altın",
        statChange: {
          relationships: { furries: 20 },
          inventory: { gold: 50 },
          armyDelta: { furryArchers: 3 },
          stats: { politicalPower: 8 }
        },
        nextScene: "eastern_front_crisis"
      },
      {
        text: "⚖️ DOXE Kutsal Krallığı ile 'Özgürlük ve Işık Paktı' imzala (Köleliği tamamen lağvet)",
        consequence: "Orduna +3 DOXE Kutsal Paladin Taburu katılır (Vampirlere karşı 2x güçlü!), +25 DOXE",
        statChange: {
          worldRelations: { doxe: 25 },
          relationships: { people: 15 },
          armyDelta: { doxePaladins: 3 },
          stats: { moralStanding: 15, publicSupport: 12 },
          worldState: { slavery: "Tamamen Kaldırıldı", diplomaticStanding: "Kutsal İttifak" },
          flags: { doxeAlliance: true }
        },
        nextScene: "eastern_front_crisis"
      },
      {
        text: "⚒️ Kuzey Dağ Klanlarına 40 Altın ödeyip 'Kuzeyin Baltaları' lejyonunu kirala",
        consequence: "Orduna +4 Dağ Baltacısı Taburu katılır (+25 Dağ Kabileleri, +15 Askeri Destek)",
        goldCost: 40,
        statChange: {
          worldRelations: { mountainTribes: 25 },
          armyDelta: { mountainAxemen: 4 },
          stats: { militarySupport: 15 }
        },
        nextScene: "eastern_front_crisis"
      },
      {
        text: "🧠 [Karizma >= 70] Üç elçiyi de ortak 'Vampir-Kara Elf Karşıtı Koalisyon' çatısında birleştir!",
        consequence: "Efsanevi diplomatik zafer! Her üç ordudan da (+2 Okçu, +2 Paladin, +2 Baltacı) destek al!",
        requiresStat: { stat: "charisma", value: 70, label: "Karizma" },
        statChange: {
          relationships: { furries: 15 },
          worldRelations: { doxe: 20, mountainTribes: 20 },
          armyDelta: { furryArchers: 2, doxePaladins: 2, mountainAxemen: 2 },
          stats: { politicalPower: 15, charisma: 10 },
          worldState: { diplomaticStanding: "Büyük Koalisyon" }
        },
        nextScene: "eastern_front_crisis"
      }
    ]
  },

  // ================= BÖLÜM 4: DOĞU CEPHESİ VE DARBE GECESİ =================
  eastern_front_crisis: {
    chapter: 4,
    title: "Doğu Kızıl Geçidi - Kanlı Şafak",
    location: "Doğu Sınırı — Kızıl Geçit Kalesi",
    description: "Elçilerle anlaşmalar tamamlanır tamamlanmaz doğudan korkulan haber geldi: Vampir Lordu Malakor ve Kara Elf Başbüyücüsü, Gölge Kalesi'nden çıkarak Doğu Kızıl Geçidi'ne tam kapsamlı bir istila başlattı!\n\nAynı anda başkentten gelen bir güvercin, baban İmparator Lalo'nun komaya girdiğini ve kardeşlerin Anzak ile Adem'in senin yokluğunda saray muhafızlarını darbe için topladığını bildiriyor!",
    choices: [
      {
        text: "🎲 [Büyük Meydan Muharebesi] Ordunun başında Doğu Kızıl Geçidi'nde Vampir-Kara Elf ordusunu ez, sonra muzaffer bir komutan olarak başkente dön!",
        consequence: "Gelişmiş Taktiksel Savaş Motorunu açar! Zafer kazanırsan tüm ordu sana biat eder.",
        specialAction: "startBattle",
        statChange: { stats: { militarySupport: 12, politicalPower: 10 } },
        nextScene: "shadow_summit"
      },
      {
        text: "Doğu savunmasını Lord Komutan Vex'e bırak ve derhal Başkent'e dönüp kardeşlerinin darbesini bastır!",
        consequence: "İç politikaya odaklan (+10 Politik Güç, Kardeşlerin Darbe Hazırlığı -25%)",
        statChange: {
          stats: { politicalPower: 10, intelligence: 6 },
          rivalDelta: { brotherPlotProgress: -25 }
        },
        nextScene: "shadow_summit"
      }
    ]
  },

  shadow_summit: {
    chapter: 4,
    title: "Kader Gecesi - Altın Tahtın Sınavı",
    location: "Başkent Lalo — Taht Odası",
    description: "Fırtınalı bir gece yarısı... Meşalelerin aydınlattığı Taht Odası'nda tüm soylular, komutanlar ve elçiler toplanmış durumda. İmparator Lalo ölüm döşeğinde son nefeslerini verirken, Anzak ve Adem kılıçlarını çekmiş tahtın önünde duruyor.\n\nAnzak gürlüyor: 'Babamız artık yönetemez! En büyük oğul olarak tacı ben alıyorum!'\nAdem ise elindeki sahte fermanı sallıyor: 'Tutu saray geleneklerini bozdu, onu tutuklayın!'\n\nSalonun kapıları ardına kadar açılıyor ve sen içeri giriyorsun. Şimdiye kadar biriktirdiğin tüm güç, ittifak, istihbarat ve askeri zaferlerin konuşma vakti!",
    choices: [
      {
        text: "🏆 [Büyük Koalisyon & Reform Tacı] Furry, DOXE, Dağ Klanları ve özgürleştirdiğin Halkla birlikte Taht Odası'na yürü!",
        consequence: "Altın Çağ Finali (Gereksinim: Halk Desteği >= 60 veya Kölelik Kaldırıldı)",
        requiresCustom: (s) => s.stats.publicSupport >= 60 || s.decrees.abolishSlavery || s.flags.doxeAlliance,
        customReason: "Halk Desteği 60+ veya Kölelik Reformu/DOXE İttifakı gerekli",
        nextScene: "ending_golden_coalition"
      },
      {
        text: "🕵️ [Gölge İmparatoru] Suikastçı itiraflarını ve Anzak ile Adem'in ihanet belgelerini Konsey'in önüne fırlat!",
        consequence: "Makyavelist İstihbarat Zaferi (Gereksinim: Casus Ağı veya Yolsuzluk Kanıtı)",
        requiresCustom: (s) => s.flags.hasSpyNetwork || s.flags.knowsAboutCorruption,
        customReason: "Casus Ağı veya Yolsuzluk Kanıtı gerekli",
        nextScene: "ending_shadow_master"
      },
      {
        text: "⚔️ [Muzaffer Mareşal] Doğu Sınırı Zaferi'nin sancağını yere sapla ve ordunun mutlak biatıyla tahta otur!",
        consequence: "Demir Taç Zaferi (Gereksinim: Doğu Zaferi veya Anzak Düello Zaferi veya Askeri Destek >= 55)",
        requiresCustom: (s) => s.flags.easternVictory || s.flags.anzakDefeated || s.stats.militarySupport >= 55,
        customReason: "Doğu Zaferi, Anzak Düello Zaferi veya Askeri Destek 55+ gerekli",
        nextScene: "ending_iron_conqueror"
      },
      {
        text: "🤝 [Hanedan Uzlaşısı] Kardeşlerine kan dökmek yerine İmparatorluğu Üçlü Konsey olarak yönetmeyi teklif et (100 Altın + Karizma)",
        consequence: "Birleşik Hanedan Finali (Gereksinim: 100 Altın veya Karizma >= 70)",
        requiresCustom: (s) => s.inventory.gold >= 100 || s.stats.charisma >= 70,
        customReason: "100 Altın veya Karizma 70+ gerekli",
        nextScene: "ending_triumvirate"
      },
      {
        text: "🗡️ [Son Kan Düellosu] 'Tahtı isteyen kılıcımı geçsin!' diyerek Anzak'ı herkesin önünde ölümüne düelloya çağır!",
        consequence: "Her şeyi birebir kılıç düellosunun sonucuna bağla!",
        specialAction: "startDuel",
        nextScene: "ending_iron_conqueror"
      }
    ]
  },

  // ================= 5 FARKLI FİNAL BÖLÜMÜ =================
  ending_golden_coalition: {
    chapter: 5,
    title: "FİNAL 1: Şafağın ve Özgürlüğün İmparatoru",
    location: "Yeni Lalo İmparatorluğu — Altın Çağ",
    isEnding: true,
    endingBadge: "🌟 En İyi Son: Büyük Koalisyon & Özgürlük",
    description: "Taht Odası'nın kapılarından içeri yalnızca sen girmedin; arkanda Furry Cumhuriyeti'nin elçileri, DOXE Krallığı'nın parlayan zırhlı Paladinleri, Kuzey Dağları'nın şefleri ve zincirlerini kırdığın binlerce başkent vatandaşı vardı!\n\nAnzak ve Adem'in paralı askerleri bu muazzam birlik karşısında kılıçlarını yere bıraktı. Baban İmparator Lalo, son nefesini vermeden önce gülümseyerek İmparatorluk Tacı'nı bizzat senin başına koydu.\n\nSaltanatının ilk haftasında birleşik koalisyon ordusuyla Doğu sınırındaki Vampir-Kara Elf İttifakı'nı tarihten sildin. Kölelik ebediyen kaldırıldı, Furry ticaret yollarıyla hazine dolup taştı ve küçük kız kardeşlerin (9 ve 13) barış dolu bir sarayda büyüdü. Tarih seni 'Büyük İmparator Tutu' olarak altın harflerle yazdı!",
    choices: []
  },

  ending_shadow_master: {
    chapter: 5,
    title: "FİNAL 2: Gölgelerin ve Aklın Hükümdarı",
    location: "Başkent Lalo — Yüksek Divan",
    isEnding: true,
    endingBadge: "🕵️ Stratejik Zafer: Gölge İmparator",
    description: "Anzak kılıcını kaldırmaya fırsat bile bulamadan Baş Danışman ve kurduğun Gölge Casus Ağı harekete geçti. Gece odana gönderilen suikastçıların itirafları ve kardeşlerinin Güney Baronlarıyla yaptığı ihanet mektupları tüm Konsey üyelerine dağıtıldı.\n\nTek bir damla kardeş kanı dökülmeden, kendi komutanları Anzak ve Adem'i tutuklayıp sürgüne gönderdi. Vampir-Kara Elf ordusu ise casuslarının doğu vadisindeki ikmal depolarını havaya uçurmasıyla kış ortasında dağılıp yok oldu.\n\nKılıcını kınından bile çıkarmadan, yalnızca keskin zekan ve istihbarat ağınla tüm düşmanlarını dize getirdin!",
    choices: []
  },

  ending_iron_conqueror: {
    chapter: 5,
    title: "FİNAL 3: Çelik ve Zafer İmparatoru",
    location: "Doğu Sınırı & Altın Taht",
    isEnding: true,
    endingBadge: "⚔️ Askeri Mutlakiyet: Fatih Tutu",
    description: "Üzerinde savaş meydanının tozu, elinde Gümüş Hançer'in ve arkanda Doğu Kızıl Geçidi'nin muzaffer lejyonlarıyla Taht Odası'na girdin. Anzak'ın kılıcı senin iraden karşısında kırıldı.\n\nOrdunun ve Lord Komutan Vex'in tam desteğiyle tahta çıktın. Vampir-Kara Elf İttifakı'nın Gölge Kalesi'ni dahi fethederek imparatorluk sınırlarını iki katına çıkardın. Demir yumruğun ve askeri dehan sayesinde hiçbir iç veya dış düşman bir daha Lalo Hanedanı'na yan gözle bakamadı!",
    choices: []
  },

  ending_triumvirate: {
    chapter: 5,
    title: "FİNAL 4: Üç Kardeşin Demir Paktı (Triumvirlik)",
    location: "Başkent Lalo — Hanedan Konseyi",
    isEnding: true,
    endingBadge: "👑 Diplomatik Deha: Birleşik Hanedan",
    description: "Herkes kardeş kanı dökülmesini beklerken sen üstün karizman ve siyasi gücünle Anzak ve Adem'i dize getirdin ama onları yok etmedin. 'Babamızın mirasını birbirimizi boğazlayarak değil, dünyayı fethederek büyüteceğiz!' dedin.\n\nSen Yüce İmparator olarak tahta geçtin; Anzak'ı Doğu Orduları Başkomutanı olarak Vampir cephesine, Adem'i ise Ticaret ve Hazine Nazırı olarak görevlendirdin. Üç kardeşin birleşen gücü karşısında Vampir-Kara Elf İttifakı darmadağın oldu!",
    choices: []
  }
};