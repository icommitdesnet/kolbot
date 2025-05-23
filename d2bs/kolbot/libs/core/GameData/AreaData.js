/**
*  @filename    AreaData.js
*  @author      Nishimura-Katsuo, theBGuy
*  @desc        area data library
*
*/
(function (module, require) {
  const MonsterData = require("./MonsterData");
  const SUPER = [
    0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0,
    1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0,
    4, 0, 0, 1, 0, 1, 4, 0, 2, 3, 1, 0, 1, 1, 0, 0, 0,
    1, 3, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5, 1, 1, 1, 1, 3
  ];
  const AREA_LOCALE_STRING = [
    5389, 5055, 5054, 5053, 5052, 5051, 5050, 5049, 5048,
    5047, 5046, 5045, 5044, 5043, 5042, 5041, 5040, 5039,
    5038, 5037, 5036, 5035, 5034, 5033, 5032, 5031, 5030,
    5029, 5028, 5027, 5026, 5025, 5024, 5023, 5022, 5021,
    5020, 5019, 5018, 788, 852, 851, 850, 849, 848, 847,
    846, 845, 844, 843, 842, 841, 840, 839, 838, 837, 836,
    835, 834, 833, 832, 831, 830, 829, 828, 827, 826, 826,
    826, 826, 826, 826, 826, 825, 824, 820, 819, 818, 817,
    816, 815, 814, 813, 812, 810, 811, 809, 808, 806, 805,
    807, 804, 845, 844, 803, 802, 801, 800, 799, 798, 797,
    796, 795, 790, 792, 793, 794, 791, 789, 22646, 22647,
    22648, 22649, 22650, 22651, 22652, 22653, 22654, 22655,
    22656, 22657, 22658, 22659, 22660, 22662, 21865, 21866,
    21867, 22663, 22664, 22665, 22667, 22666, 5389, 5389, 5389, 5018
  ];
  const MONSTER_KEYS = [
    ["mon1", "mon2", "mon3", "mon4", "mon5", "mon6", "mon7", "mon8", "mon9", "mon10"],
    ["nmon1", "nmon2", "nmon3", "nmon4", "nmon5", "nmon6", "nmon7", "nmon8", "nmon9", "nmon10"],
  ][me.diff && 1]; // mon is for normal, nmon is for nm/hell, umon is specific to picking champion/uniques in normal
  const LocaleStringName = require("./LocaleStringID").LocaleStringName;
  const AREA_INDEX_COUNT = 137;
  
  /**
   * @typedef {Object} AreaDataObj
   * @property {number} Super - Number of super uniques present in this area
   * @property {number} Index - Area ID
   * @property {number} Act - Act this area is in [0-4]
   * @property {number} MonsterDensity - Value used to determine monster population density
   * @property {Object} ChampionPacks - Champion packs information
   * @property {number} ChampionPacks.Min - Minimum number of champion or unique packs that spawn here
   * @property {number} ChampionPacks.Max - Maximum number of champion or unique packs that spawn here
   * @property {number} Waypoint - Number in waypoint menu that leads to this area
   * @property {number} Level - Level of area (use GameData.areaLevel)
   * @property {Object} Size - Size of the area
   * @property {number} Size.x - Width of area
   * @property {number} Size.y - Depth of area
   * @property {number[]} Monsters - Array of monsters that can spawn in this area
   * @property {string} LocaleString - Locale string index for getLocaleString
   * @property {string} InternalName - Internal name
   * @property {function(number): boolean} hasMonsterType - Check if this area has a monster of a certain type
   * @property {function(function(any, number): void): void} forEachMonster - Iterate through each monster in this area and apply a callback function
   * @property {function(function(any, number, any): void): void} forEachMonsterAndMinion - Iterate through each monster and minion in this area and apply a callback function
   * @property {function(): AreaDataObj} townArea - Check if area is a town area
   * @property {function(): boolean} haveWaypoint - Check if the area has a waypoint
   * @property {function(): (AreaDataObj|undefined)} nearestWaypointArea - Find nearest waypoint in area
   * @property {function(): (PresetUnit|undefined)} waypointPreset - Get the waypoint preset unit
   */

  /**
   * @typedef {Object} Dungeons
   * @property {number[]} DenOfEvil
   * @property {number[]} Hole
   * @property {number[]} Pit
   * @property {number[]} Cave
   * @property {number[]} UndergroundPassage
   * @property {number[]} Cellar
   * @property {number[]} A2Sewers
   * @property {number[]} StonyTomb
   * @property {number[]} HallsOfDead
   * @property {number[]} ClawViperTemple
   * @property {number[]} MaggotLair
   * @property {number[]} Tombs
   * @property {number[]} Swamp
   * @property {number[]} FlayerDungeon
   * @property {number[]} A3Sewers
   * @property {number[]} HighLevelForgottenTemples
   * @property {number[]} LowLevelForgottenTemples
   * @property {number[]} RedPortalPits
   */

  /** @type {AreaDataObj[]} */
  const AreaData = new Array(AREA_INDEX_COUNT);

  for (let i = 0; i < AreaData.length; i++) {
    let index = i;
    AreaData[i] = ({
      Super: SUPER[index],
      Index: index,
      Act: getBaseStat("levels", index, "Act"),
      MonsterDensity: getBaseStat("levels", index, ["MonDen", "MonDen(N)", "MonDen(H)"][me.diff]),
      ChampionPacks: ({
        Min: getBaseStat("levels", index, ["MonUMin", "MonUMin(N)", "MonUMin(H)"][me.diff]),
        Max: getBaseStat("levels", index, ["MonUMax", "MonUMax(N)", "MonUMax(H)"][me.diff])
      }),
      Waypoint: getBaseStat("levels", index, "Waypoint"),
      Level: getBaseStat("levels", index, ["MonLvl1Ex", "MonLvl2Ex", "MonLvl3Ex"][me.diff]),
      Size: (() => {
        if (index === 111) { // frigid highlands doesn't specify size, manual measurement
          return { x: 210, y: 710 };
        }

        if (index === 112) { // arreat plateau doesn't specify size, manual measurement
          return { x: 690, y: 230 };
        }

        return {
          x: getBaseStat("leveldefs", index, ["SizeX", "SizeX(N)", "SizeX(H)"][me.diff]),
          y: getBaseStat("leveldefs", index, ["SizeY", "SizeY(N)", "SizeY(H)"][me.diff])
        };
      })(),
      Monsters: (MONSTER_KEYS.map(key => getBaseStat("levels", index, key)).filter(key => key !== 65535)),
      /**
       * Check if this area has a monster of a certain type
       * @function
       * @param {number} type - monster type to check for
       * @returns {boolean}
       */
      hasMonsterType: function (type) {
        return this.Monsters.some(monId => MonsterData[monId].Type === type);
      },
      /**
       * Iterate through each monster in this area and apply a callback function
       * @function
       * @param {function} cb - callback function to apply to each monster
       */
      forEachMonster: function (cb) {
        if (typeof cb === "function") {
          this.Monsters.forEach(monID => {
            cb(
              MonsterData[monID],
              MonsterData[monID].Rarity * (MonsterData[monID].GroupCount.Min + MonsterData[monID].GroupCount.Max) / 2
            );
          });
        }
      },
      /**
       * Iterate through each monster and minion in this area and apply a callback function
       * @function
       * @param {function} cb - callback function to apply to each monster
       */
      forEachMonsterAndMinion: function (cb) {
        if (typeof cb === "function") {
          this.Monsters.forEach(monID => {
            let rarity = (MonsterData[monID].Rarity
              * (MonsterData[monID].GroupCount.Min + MonsterData[monID].GroupCount.Max) / 2);
            cb(MonsterData[monID], rarity, null);
            MonsterData[monID].Minions.forEach(minionID => {
              let minionrarity = (MonsterData[monID].Rarity
                * (MonsterData[monID].MinionCount.Min
                + MonsterData[monID].MinionCount.Max) / 2 / MonsterData[monID].Minions.length);
              cb(MonsterData[minionID], minionrarity, MonsterData[monID]);
            });
          });
        }
      },
      LocaleString: getLocaleString(AREA_LOCALE_STRING[index]),
      InternalName: LocaleStringName[AREA_LOCALE_STRING[index]],
      /**
       * Check if area is a town area
       * @function
       */
      townArea: function () {
        return AreaData[
          [
            sdk.areas.RogueEncampment, sdk.areas.LutGholein,
            sdk.areas.KurastDocktown, sdk.areas.PandemoniumFortress, sdk.areas.Harrogath
          ][this.Act]];
      },
      /**
       * @function
       */
      haveWaypoint: function () {
        // get the last area that got a WP
        let wpArea = this.nearestWaypointArea();

        // If you dont need a wp, we want at least the town's wp
        return me.haveWaypoint((wpArea || this.townArea().Index));
      },
      /**
       * Find nearest waypoint in area
       * @function
       */
      nearestWaypointArea: function () {
        // plot toward this are
        const plot = Pather.plotCourse(this.Index, this.townArea().Index);

        // get the last area that got a WP
        return plot.course.filter(el => Pather.wpAreas.indexOf(el) > -1).last();
      },
      /** 
       * @function
       * @return {PresetUnit|undefined}
       */
      waypointPreset: function () {
        const wpIDs = [119, 145, 156, 157, 237, 238, 288, 323, 324, 398, 402, 429, 494, 496, 511, 539];
        for (let i = 0, preset, wpArea = this.nearestWaypointArea(); i < wpIDs.length || preset; i++) {
          if ((preset = Game.getPresetObject(wpArea, wpIDs[i]))) {
            return preset;
          }
        }

        return undefined;
      },
    });
  }

  /**
   * @function
   * @static
   * @name AreaData.findByName
   * @param {string} whatToFind
   * @param {function(AreaDataObj): boolean} [filter] - Optional filter function to restrict which areas are considered
   * @returns {AreaDataObj}
   */
  AreaData.findByName = function (whatToFind, filter) {
    if (!whatToFind || typeof whatToFind !== "string") {
      return AreaData[1];
    }
  
    const searchTerm = whatToFind.toLowerCase().trim();

    const areaPool = typeof filter === "function"
      ? AreaData.filter(area => area && area.LocaleString && filter(area))
      : AreaData.filter(area => area && area.LocaleString);

    if (areaPool.length === 0) {
      return AreaData[1];
    }
  
    // First attempt: Look for exact matches or contains
    const exactMatches = areaPool.filter(function (area) {
      if (!area || !area.LocaleString) return false;
    
      const localeLower = area.LocaleString.toLowerCase();
      const internalLower = area.InternalName ? area.InternalName.toLowerCase() : "";
    
      // Exact match gets highest priority
      if (localeLower === searchTerm || internalLower === searchTerm) {
        return true;
      }
    
      // Contains match gets second priority (handles partial names like "worldstone")
      if (localeLower.includes(searchTerm) || internalLower.includes(searchTerm)) {
        return true;
      }
    
      return false;
    });
  
    // If we found exact or contains matches, sort them by length (shorter names first)
    // This helps prioritize more specific matches when partial names are given
    if (exactMatches.length > 0) {
      exactMatches.sort(function (a, b) {
        const aLocale = a.LocaleString.toLowerCase();
        const bLocale = b.LocaleString.toLowerCase();
      
        // If one contains the term exactly at the start, prioritize it
        const aStartsWith = aLocale.startsWith(searchTerm);
        const bStartsWith = bLocale.startsWith(searchTerm);
      
        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
      
        // Otherwise sort by shortest containing name
        return aLocale.length - bLocale.length;
      });
    
      return exactMatches[0];
    }
  
    // Fallback: Use the diffCount approach for fuzzy matching
    let matches = areaPool
      .map(area => {
        const localeDiff = area.LocaleString ? searchTerm.diffCount(area.LocaleString.toLowerCase()) : Infinity;
        const internalDiff = area.InternalName ? searchTerm.diffCount(area.InternalName.toLowerCase()) : Infinity;
        return [Math.min(localeDiff, internalDiff), area];
      })
      .sort((a, b) => a[0] - b[0]);
  
    return matches[0][1];
  };

  /**
   * @type {Dungeons}
   */
  AreaData.dungeons = {
    DenOfEvil: [sdk.areas.DenofEvil],

    Hole: [sdk.areas.HoleLvl1, sdk.areas.HoleLvl2, ],

    Pit: [sdk.areas.PitLvl1, sdk.areas.PitLvl2],

    Cave: [sdk.areas.CaveLvl1, sdk.areas.CaveLvl2],

    UndergroundPassage: [sdk.areas.UndergroundPassageLvl1, sdk.areas.UndergroundPassageLvl2, ],

    Cellar: [
      sdk.areas.TowerCellarLvl1, sdk.areas.TowerCellarLvl2,
      sdk.areas.TowerCellarLvl3, sdk.areas.TowerCellarLvl4, sdk.areas.TowerCellarLvl5,
    ],

    // act 2
    A2Sewers: [sdk.areas.A2SewersLvl1, sdk.areas.A2SewersLvl2, sdk.areas.A2SewersLvl3, ],

    StonyTomb: [sdk.areas.StonyTombLvl1, sdk.areas.StonyTombLvl2, ],

    HallsOfDead: [sdk.areas.HallsoftheDeadLvl1, sdk.areas.HallsoftheDeadLvl2, sdk.areas.HallsoftheDeadLvl3, ],

    ClawViperTemple: [sdk.areas.ClawViperTempleLvl1, sdk.areas.ClawViperTempleLvl2, ],

    MaggotLair: [sdk.areas.MaggotLairLvl1, sdk.areas.MaggotLairLvl2, sdk.areas.MaggotLairLvl3, ],

    Tombs: [
      sdk.areas.TalRashasTomb1, sdk.areas.TalRashasTomb2, sdk.areas.TalRashasTomb3,
      sdk.areas.TalRashasTomb4, sdk.areas.TalRashasTomb5, sdk.areas.TalRashasTomb6, sdk.areas.TalRashasTomb7,
    ],

    // act 3
    Swamp: [sdk.areas.SwampyPitLvl1, sdk.areas.SwampyPitLvl2, sdk.areas.SwampyPitLvl3, ],

    FlayerDungeon: [sdk.areas.FlayerDungeonLvl1, sdk.areas.FlayerDungeonLvl2, sdk.areas.FlayerDungeonLvl3, ],

    A3Sewers: [sdk.areas.A3SewersLvl1, sdk.areas.A3SewersLvl2, ],

    HighLevelForgottenTemples: [sdk.areas.ForgottenTemple, sdk.areas.RuinedFane, sdk.areas.DisusedReliquary],

    LowLevelForgottenTemples: [sdk.areas.RuinedTemple, sdk.areas.DisusedFane, sdk.areas.ForgottenReliquary],

    // act 4 has no areas like that

    // act 5
    RedPortalPits: [sdk.areas.Abaddon, sdk.areas.PitofAcheron, sdk.areas.InfernalPit, ],
  };

  module.exports = AreaData;
})(module, require);
