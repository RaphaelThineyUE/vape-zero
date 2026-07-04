import { Quest, BlackMarketItem, SquadPost, Operative, ChatMessage } from './types';

export const AVATARS = {
  mainProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYVuZBTgMYR9aaHdiVR3HMnq-fOQWzM66BOrR8a30QoWqXJUIlg4L4sFt9H-7r80CZTbuEJHd6TgVGsRhXw-DwyB5wxhzbqVPe7wOfEh80CB6nwjmpxvMiyNfsKogjXKb0pp3bgWRNJAl2NmR-7ZGsTRqSUB9SGjPYBCfBgIR3zUHC7vUxOQM1Bll2NfH2ZQheQcJg04wlx9mvDYYxA8D0N49wiF5eBNN0MY1UJE4T5wO8d2LRMDZx',
  craveProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnIHcnVOx2_MYOxvHCebP50cVl2886pcps0sJN5TBW-zU8CyLqHiJEr7ybnOY8S1PAGxSXAs8gNA9gxh4TzswBJqeonZuQGIcLXkYJuXDlRED7BZrYRx9FOYffl9_bS0Jq9o0oLzl_9WZaUOVOSP7uj4kwwO4w1EI97AomanDLzyRYSyr71-boqy4LdmDa-Uh1-hOeQePPJe7hEkVR-EU2X6Tqm8kSdt1nohCy0Akwnot6CNF69DPD',
  questProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9yiPFoFqkfhZUmEBLINJWhMVMiX7emyT7F4BwqpiyQmFDW70--a3xj6fgqa5bBaPEYjatGL8kdTIt7-i4DtQVLjIuVWYe0c8iYNkOXoIJtZv6S2q0779LlAhL9YgYvgT4uexdKhQo5DemCgR8GfVrBeL-zCtsvyQE_2py_PQJbzlCAsDS8jWZjB4uFx_fDFkI3D19GrCV2XitwsD6KueZ6wnM26P4_1vCL3fMor7tuDrSUdoPQeu3',
  squadFeed: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB76zwFzJ_CHetb04fvK4dQPXUws5wxC8mSMEvjTkDuCs9yk64Jyzi06O_nI5X-eTQN2FiXq_-q5hr3XrXmRFg-OMBmK64Vr943cAUnjcesriAdr24-WSgsn9IARyFoYiIxI_5b3FMKHIqktfFg6iYAkyznwQ41gQdlkuSgL_4KNYqkpiRJ_RK_W7JUl6W1qZVvdomhRAhgyjtl47QsGRZPNpZMHYtDdAXHqs1fswhIPreLmS3tNhK1',
  alex: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQr2DLxZXOrazKy5UnZefDMi8v2onFv0PJMBtsJUbbw60xww-4o1wh6oTCNZkWoyJk35_pQTPdbkUNj_QNHO6IcOJFDWWX2ky5V00dxefOytZ1GMawAHsjJ9BQERpXxz82MDo9-y7nlxhsj403XS7k2Q823StBVrQHx7ncZOHtocbFa8oo6fRb41n_GnmU1m0TfdJDJwxWwWwyU3SyjdOpa_AICsK1PSPoPfYCEebt11Fdnzvo3ZHN',
  sam: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmQC2ZvBsciiL5byijCOenVtdKvs1M_jcSlFT6cfefSvkDSwx3NdgZcGn7nbmXidq7xFc7LrIvTjx5tuiTUHVGT1pBEzqXzxa2l5fURiwfNq_m6UBZJFC0ESsMZqgJZEDFXcJP-aarDni6XAwEygpRVxPrsM4GpYBFrImYeZNQ95-7ZPrya6PLxXXZFis3jHhDlG3R86HvaZKGN59An3xZ_mzKocQG-WnJh6equPtANVrLjeJFx7xN',
  ghost: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt_UzBEyPbOo5CmSsfPdF3QqqSdLGS-_4F6K0adAE_eq03aEi_3bNLdM4Cd5fklZP2AmWjAl3Rz0m7NKNBrqFAdLYY6_Djm_yIL6YKpweZl472_kOoNICMn4Bw4CWqmSrlDYWQrtRmBEpKRbQmB8gLirsoYK7rqwWREaMJo9hYihZnKRYBANrMt5GlA-0JWBFinSG5eNL9Wpj-HYmBK4lJQjm_oGKW7uDnCblfrXpsIfMXkxWaJuU4',
  cyberPhantom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBUBxzNfKOPVe2ML4bFf0yidoPJorbRT8P36xXR-AIqlgYfR23IPpx5qzQNLhJ4zpRiC6gDst3ucIuSqjjtJ7XnqTX542iOFqAS1rX9Q4lYCIfov4c_05gQnS5Cnj5rgIbCsmimifRmOGRUhLNJKtbRRC66CpYE237NmoYsWtg1UPW-cypt7sqjAtJS4XZL60PH6eeEQXK7m2NLf6eJB6BB72gnF1M2qDm5WSE-lWxqAje7d1i1pFt',
  neonRider: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJOK-6Ft-S9y0MXckr7tDWAlQruWmb-HNX_Iesvet8foouPGH0O_NDjxce6ywa3IwghnDa52kL3jN0iVAsTKlEaSqmcxuV4ii0f7tWcCnbQxb5QVhlIfzsB40NVxHb7PhBoXjK09pWJoW35uX4d8M2XQ1K5i87GhTBsuZADYdLZkEUBPk2PyGbrcvP336QmwHqU9WQgZBPv9WdUgYZgOq1N12SGGrMF3isbal56v63Y821J27U_rOW',
  viper0x: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXNJManJyMeoFRKi-rRSNbvjHocWZV-_SFPBS5PneoS01iz31ghBvWmFDYUnluuN1N0lJz3iclAYbBU9pTlwk-qI4udH1j-qgemdFVK6DrUSkEe3HCXbH1jXEsUqjPakdIAMTxJRMkriqNCEjQC3rk-IuprwYI9m-wALz9etWAvtSbq3NbjKYRkkJogc7U_CvIEQrMIhSYTJhSa6Jy7_V8PxCJAQu9deNyOZiRI_Bg84CcY6xqt_xS',
  viper9: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiBbLp5wmvJZm9ObvkN4JV5Bctw1F9tw5PtPhZRkkeVMEoJcBegRS-nNlzHx_2f_X4ABTWYDD_ifVAlsMIy490MSofoO3fKGJ-4Qci4XTkrk5p4Urtxc4R62EVwDErN-P7yXA2VybtgMgRdq_2ORe39X6HeI1jKKJPx6ouiK2bo8mqwSUF05Cpq7D1nXnM56d8dhiHQFnelxgbuoITDDkvN8-W-V8GaGfRmdWnPFAnpuXkSTRMg0O9',
  ghostOps: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTF06lRd8y0wpMsLuqYv4cLqkHDefgO04lm07mXncCWY8JXyJ2Fizgeg27n04H6GC4awm2WE0tdZbXUvztn8gWdhEJLqQBQwkqf9uwhanZZApwXaavOiPIUv9oWcQv5FftDG998dzLfJI5lJDAImSRxS1PV6qC48sOpmu5AAdWJLU-AAWdG-1DuOpB1wDTR7j7vV23AG8HSErTS3Oft3Q4X8VXlcEOMvEkrowC23YlLvKW3MHDVRd3',
  netRunner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtbO4Smzcg78IJ_Hn2YXPVPrVLXm8KJXQGleC-YdwxDPbqW0ayzYvIQzJkg4Fhky65-M5OcrYn1YJvKrTCn1eRZbCwwKvNIg3_W5loL7TXm7Rbb3VuMvSdcWeXk7bFukXtnslIz9GeJfwvcjbnZvDdRXXhNeglhOxXAwO2xaC0o2Fmq6eacppNgTVBeC0LC1asjz0-zE_SdComuLL4YV3n_IWzMUvr4_ZqaiFmKy4sG3i5NnD8wCDd',
  vanguardProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAj6F3H5hEPvTPOwrFxUUawYJIxkepGDiAqzzkR-rJT6BnGutGiIdwNFLDHcwTvPaaWF8XXTsxQY-Ubzo2oWx1P_UWlqkDawnhuOmzeGC3gj_XvngByiGcwGYoLujs2GlKBsE32rTK24LKFiQBSCFhqOq_Af-3R2tB-SJdSF2xRtsXvTu6SAs36I4d1M6QT435Gbez1U0t8bpQCoZ0Y5zzgVN6IDFcbtC6qNmyos8ACiyGLeS3sxMns',
  pixelRipper: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlbv-9P7hwBgAVI4lJcF6So0pK81vzUzGZsWOd8tXXjuHTO9UMtOtvTqNG1CShOPL269nhxWdoVUyZo878DZrZEHGAy1FNQIPMiXyN8jL55GS9HqmiW6QPqKJGOunwsclC6f4HVKCyVZl-jeZlQxDJN4-6ligxlc-iLNDczw0xvQxif_vfINAd3k0Y0M4EwX-nlagTmTdRjRsiEGK2e1KY4ow6rWVjRj8K1d5Ilno2bh7WZTgpP0wT',
  neoVixen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrGbioHv14lL68oWiqeEhh0M2sVjcY9R-jBS2pNwQe-Sr_h1I_-9jsCn7KgkAxtFj___Iq6bOvclnal-g-B7JsP1JOKcxiPe-29fu4gb41HpzJ2p_DDEOX9qDk6UXnV8XoY8Ul0KmYD3Xd5F9knk8ajyw-ePCPzkeVdtnmCm8uKk_4nT8zEueLxU7rV2Kq67bPIPmUx9kAWN1-cFUu4uQ6SlULLzMKjK4XBa-g39ftf2BSzJXy7mDk',
  zeroSmok: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUdk-LKIKmSuT-x6he05ZLzCGW7q2c8hTEtndTFqBHmbwycc19YLiY1wz6JyoUyyXc_JMobDttkmH_EESl6kYGPWfj1xRaqm_ViYLXn6dJ6Xlf67KNDea_9xc0ItYG-XjQTahd3PPf021LJu_MqqMlrhFpIeDwsUnbqo5rbLYmIp_4r6faGQMo2syFsEqRy_Z8Z4EEhpWd0nLMGrnbUj1dFLdjc4Ja7ET7hlGS-Y40idMt-Rl4ih3T',
  squadCommandAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW1wAmIHpqeXoOTDSKHGM4W0XBxnBWYWuRRfkRVyNR2eErYS_ne5e0fSjAtnr5tcNySr83_np2Z2wPcZynd3R9sxANCHB387I6XciXQp80_hpnFK7WFUzuEc6noTyT80cBFjcdZrcik6khTWldbIrIRJ-B320NKBgldhiCVXQRAPVMoZ8fxHSpbc9zNtJSB26LwstW2BisqhmUSeSTMJZcsKYOcBr-y_w2unryAlMwDOuzK7hdKXQs',
  shopHeaderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJgolGc0uMxLTVUdB97uEYGFBcApHfJBbtfSZtPVurk0jYt0p9ZhV-ceriZSA1tJ8EUpTsN-nZoCwf14LjG4dtxnBkbTsDWJTkzv-oCM5Q9jOtgc8ypBPNewIjhELe0NqhF4Q3yojGlLRghsNHkFo1WLJLmvDch6Cr_MTFQ3oBLKCIGSsH1Df1I3Ji0cpJKnrzkUiGFSHLarDBEd8o03byPR9DIGuPg52VH5HcJ_W8Osp-KoCr13UL',
  gearVisor: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwycJhfalZVXJMc0Gdv9jMHh97gRuBuslKmoc0y9BMrjLH9-2YxWEIxwDZYuJj_FXyaaHNlLWgPvgOziiD0UzhtDtKq_P7YQ5Vc4cH_260AES0nGADVbsYRPAnDxub5YAlvSVcwXShDNYRN6VdFVbwWWw1XmlCq84326vCluSe55L_bYb59jq-MoQ7zRX1hVZw2f87KZU8-sKrqVsQh_ELGWgpVBPLX0Gp5hM3tzCBf14m71sfrWyE',
  gearSkin: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc32RZAWI0XdL6oxujfWXasawU8_JDeV1XUWlloAXaoaT68gepTbPABN2HrDOxQdXcetkL8n16VIUk5v29F4stR6LyDjTsXeaESkDOyNG-aHfTyGeUcaFQQEo9AMZHE-2nTszhmc_TbC2PieyZ2u9nmC08aPojWI7ulOlyTb0krqjObtFXtykUl7Y5JFeZ7LGPCBWnE1SzAHLJBQGl8QAnrqdQXgWPGeegmFioPjDFC6JXTDrXKNd8',
  gearAura: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCucRnRW7grB19wHUNMTQLQA6rDFFYi-JZNat87P8TaWhtCMHdkRa_7RYdYlaB7FMJB6S10SV70FrfiJ50G2t6dGm9PhzZeBd6xKlxrfAnASCZgSDDLPJByFXtQ74566K5yHnUlbTT7gKOP2Vei9bDrI9caJRwp9fjWVrt_ltrKcsIWWj965igA3pwjrd5iv4AfR0rh02OcXQnQ-hLkf-5tazHYvqocHqYK4jw16KN82ZNGbgMx-ivP',
  gearCompanion: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBayt7vRdu_uqiKOQfdah6kzlUUr1pE4LlDweo9muO0rHBjXkPEf99GS9GGcVKpWsqO-KmyowYAmNMWkY3djA8ySBcYW1cn-PzjOJROzAsjc5bC84oFRXThY5T938-EjgIVclLkzuiBcWPHAhahUxdywz8vbjuMHY44BYpDlgMZ5eGIXiwZUqIvoBMefwaJ2vc5NOaNufBtmYaxOlY0V6MP_1jK9vTh_bTD553u-PYJlxwLm7GpIugX',
  gameProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCUJvGfLF5M3C_BTU3eW0S03VL235TFgcHkCci0443JJcuBkq58xVNVOy0NwXUXpZH78S3ukV0S4XcZm-k7AE2JTJjlydEYDBVNmfqQdUc0kku7ghVvI4ZJ14X4Kaz43smsTJDR_lfxMIGpy6gGhuTzom0S4Mm20Ielzna3IG2Y7gV4Stao4Wx7lR8GSR8qOJ4uwuibE1CJbq-ZJxUc9oFt6TMC17zkabiDRqQuwBAgStLatA0G3pM',
  sidebarProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRQTqKb5bjG0hmlz4btxS5dWIr0oWocDhXCzFtHS9voWB7ou-g_q30tEfZ9IDuawYTNSS7vUaramHzcWkkTm3-aEEHNa0UrxX5QineWWcpf-b6XfiR43SYzA-PmKleMCyHO2J0sv__BlRUwaRYTjGY-UarSI8-b59mxpK-VanBtUec7DKsum4TKAF31I9MBwV2JuhABB1Wcbnm0UqUfgFDB-rMc12UlF5TRu2Z_kHK8UCkENPlGETS'
};

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'quest-1',
    title: 'Zen Master',
    description: 'Complete 3 guided breathing sessions today.',
    reward: 250,
    progressCurrent: 2,
    progressTarget: 3,
    claimed: false,
    statusType: 'lime'
  },
  {
    id: 'quest-2',
    title: 'Shadow Runner',
    description: 'Log 5,000 steps to outrun the cravings.',
    reward: 500,
    progressCurrent: 4120,
    progressTarget: 5000,
    claimed: false,
    statusType: 'cyan'
  },
  {
    id: 'quest-3',
    title: 'Early Bird',
    description: 'Log your mood before 9:00 AM.',
    reward: 100,
    progressCurrent: 1,
    progressTarget: 1,
    claimed: true,
    statusType: 'gray'
  },
  {
    id: 'quest-4',
    title: 'Squad Support',
    description: 'Send a motivation ping to 5 squad members in the live feed.',
    reward: 150,
    progressCurrent: 1,
    progressTarget: 5,
    claimed: false,
    statusType: 'pink'
  }
];

export const INITIAL_MARKET_ITEMS: BlackMarketItem[] = [
  {
    id: 'item-1',
    name: 'Cyber-Ronin Mask',
    category: 'Epic Visor Accessory',
    rarity: 'EPIC',
    price: 450,
    image: AVATARS.gearVisor,
    owned: false,
    unlockedAt: 'LVL 15',
    badgeStyle: 'bg-primary-container text-on-primary-container neon-glow-lime'
  },
  {
    id: 'item-2',
    name: 'Chromium Rebel',
    category: 'Full Body Legendary Exosuit',
    rarity: 'LEGENDARY',
    price: 12000,
    image: AVATARS.gearSkin,
    owned: false,
    unlockedAt: 'LIMITED TIME',
    badgeStyle: 'bg-on-tertiary-container text-white shadow-[0_0_15px_rgba(198,0,93,0.4)]'
  },
  {
    id: 'item-3',
    name: 'Static Pulse',
    category: 'Swirling Digital Aura',
    rarity: 'RARE',
    price: 2200,
    image: AVATARS.gearAura,
    owned: false,
    unlockedAt: 'AVAILABLE',
    badgeStyle: 'bg-secondary-container text-on-secondary-container'
  },
  {
    id: 'item-4',
    name: 'Sentinel Drone X-1',
    category: 'Autonomous Tactical Companion',
    rarity: 'ELITE',
    price: 8500,
    image: AVATARS.gearCompanion,
    owned: false,
    unlockedAt: 'SQUAD LEADER ONLY',
    badgeStyle: 'bg-primary-container text-on-primary-container neon-glow-lime'
  }
];

export const INITIAL_SQUAD_POSTS: SquadPost[] = [
  {
    id: 'post-1',
    author: 'Alex_Run',
    avatar: AVATARS.alex,
    timeAgo: '2 hours ago',
    content: '"Level 30 reached. Lungs feel like they\'re made of titanium. Let\'s go!"',
    streakDays: 30,
    type: 'streak',
    congratsCount: 14,
    hasCongratulated: false,
    hasSupported: false,
    supportsCount: 4
  },
  {
    id: 'post-2',
    author: 'Sam_Vibe',
    avatar: AVATARS.sam,
    timeAgo: '5 hours ago',
    content: 'Golden Lungs unlocked for 500 hours of pure oxygen intake.',
    badgeTitle: 'Golden Lungs',
    badgeDetail: 'Unlocked for 500 hours of pure oxygen intake.',
    type: 'badge',
    congratsCount: 0,
    hasCongratulated: false,
    hasSupported: false,
    supportsCount: 0
  },
  {
    id: 'post-3',
    author: 'Ghost_04',
    avatar: AVATARS.ghost,
    timeAgo: 'Yesterday',
    content: '"Nearly there. $450 saved from not buying packs. Next stop: The Open Road."',
    progressPercent: 85,
    progressLabel: 'SAVED FOR SQUAD BIKE',
    type: 'progress',
    congratsCount: 12,
    hasCongratulated: false,
    hasSupported: false,
    supportsCount: 8
  }
];

export const INITIAL_OPERATIVES: Operative[] = [
  { id: 'op-1', name: 'CyberPhantom_01', rank: 'Captain', streak: 24, status: 'stable', avatar: AVATARS.cyberPhantom },
  { id: 'op-2', name: 'Neon_Rider', rank: 'Elite', streak: 12, status: 'stable', avatar: AVATARS.neonRider },
  { id: 'op-3', name: 'Viper_0x', rank: 'Bronze', streak: 2, status: 'vulnerable', avatar: AVATARS.viper0x },
  { id: 'op-4', name: 'Vesper', rank: 'Stalker', streak: 12, status: 'stable', avatar: AVATARS.cyberPhantom },
  { id: 'op-5', name: 'Z3ro', rank: 'Ghost', streak: 89, status: 'stable', avatar: AVATARS.sam },
  { id: 'op-6', name: 'Cipher', rank: 'Enforcer', streak: 21, status: 'stable', avatar: AVATARS.ghost },
  { id: 'op-7', name: 'Echo', rank: 'Stalker', streak: 15, status: 'stable', avatar: AVATARS.mainProfile },
  { id: 'op-8', name: 'Vortex', rank: 'Recruit', streak: 1, status: 'vulnerable', avatar: AVATARS.viper9 },
  { id: 'op-9', name: 'Shadow', rank: 'Ghost', streak: 124, status: 'stable', avatar: AVATARS.pixelRipper },
  { id: 'op-10', name: 'Blaze', rank: 'Enforcer', streak: 33, status: 'stable', avatar: AVATARS.neoVixen },
  { id: 'op-11', name: 'Frost', rank: 'Captain', streak: 56, status: 'stable', avatar: AVATARS.zeroSmok },
  { id: 'op-12', name: 'Rogue', rank: 'Stalker', streak: 9, status: 'stable', avatar: AVATARS.vanguardProfile },
  { id: 'op-13', name: 'Pulse', rank: 'Recruit', streak: 3, status: 'stable', avatar: AVATARS.cyberPhantom },
  { id: 'op-14', name: 'Nova', rank: 'Enforcer', streak: 18, status: 'stable', avatar: AVATARS.shopHeaderAvatar },
  { id: 'op-15', name: 'Titan', rank: 'Captain', streak: 72, status: 'stable', avatar: AVATARS.mainProfile },
  { id: 'op-16', name: 'Drift', rank: 'Ghost', streak: 95, status: 'stable', avatar: AVATARS.sam },
  { id: 'op-17', name: 'Bolt', rank: 'Stalker', streak: 14, status: 'stable', avatar: AVATARS.pixelRipper },
  { id: 'op-18', name: 'Onyx', rank: 'Recruit', streak: 6, status: 'vulnerable', avatar: AVATARS.zeroSmok },
  { id: 'op-19', name: 'Raven', rank: 'Enforcer', streak: 29, status: 'stable', avatar: AVATARS.neoVixen },
  { id: 'op-20', name: 'Spike', rank: 'Captain', streak: 41, status: 'stable', avatar: AVATARS.vanguardProfile },
  { id: 'op-21', name: 'Talon', rank: 'Ghost', streak: 112, status: 'stable', avatar: AVATARS.cyberPhantom },
  { id: 'op-22', name: 'Aero', rank: 'Stalker', streak: 8, status: 'stable', avatar: AVATARS.mainProfile },
  { id: 'op-23', name: 'Quake', rank: 'Recruit', streak: 2, status: 'stable', avatar: AVATARS.sam },
  { id: 'op-24', name: 'Zen', rank: 'Ghost', streak: 156, status: 'stable', avatar: AVATARS.pixelRipper },
  { id: 'op-25', name: 'Wraith', rank: 'Enforcer', streak: 25, status: 'stable', avatar: AVATARS.zeroSmok }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    author: 'Neon_Rider',
    avatar: AVATARS.neonRider,
    content: 'Holding strong through the morning cravings. We got this team! 🦾',
    timeAgo: '2 MINS AGO',
    borderColor: 'border-primary-container'
  },
  {
    id: 'msg-2',
    author: 'Viper_0x',
    avatar: AVATARS.viper0x,
    content: 'Just hit 48 hours clean. Levels up! ⚡️',
    timeAgo: '15 MINS AGO',
    borderColor: 'border-surface-variant'
  }
];
