/**
*  @filename    UndergroundPassage.js
*  @author      loshmi
*  @desc        Move and clear Underground passage level 2
*
*/

const UndergroundPassage = new Runnable(
  function UndergroundPassage() {
    Pather.useWaypoint(sdk.areas.StonyField);
    Precast.doPrecast(true);

    if (!Pather.moveToExit([sdk.areas.UndergroundPassageLvl1, sdk.areas.UndergroundPassageLvl2], true)) {
      throw new Error("Failed to move to Underground passage level 2");
    }

    Attack.clearLevel();

    return true;
  },
  {
    startArea: sdk.areas.StonyField
  }
);
