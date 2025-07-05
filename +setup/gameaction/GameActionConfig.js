/**
*  @filename    GameActionConfig.js
*  @author      theBGuy
*  @desc        Configuration file for GameAction system
*
*/

(function (module) {
  module.exports = {
    LogNames: true, // Put account/character name on the picture
    LogItemLevel: true, // Add item level to the picture
    LogEquipped: false, // include equipped items
    LogMerc: false, // include items merc has equipped (if alive)
    SaveScreenShot: false, // Save pictures in jpg format (saved in 'Images' folder)
    IngameTime: 60, // Time to wait before leaving game
  };
})(module);
