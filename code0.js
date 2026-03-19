gdjs.BattleCode = {};
gdjs.BattleCode.localVariables = [];
gdjs.BattleCode.idToCallbackMap = new Map();
gdjs.BattleCode.GDPaddleObjects1= [];
gdjs.BattleCode.GDPaddleObjects2= [];
gdjs.BattleCode.GDShadedDarkJoystickObjects1= [];
gdjs.BattleCode.GDShadedDarkJoystickObjects2= [];
gdjs.BattleCode.GDBallObjects1= [];
gdjs.BattleCode.GDBallObjects2= [];
gdjs.BattleCode.GDWallLeftObjects1= [];
gdjs.BattleCode.GDWallLeftObjects2= [];
gdjs.BattleCode.GDWallRightObjects1= [];
gdjs.BattleCode.GDWallRightObjects2= [];
gdjs.BattleCode.GDWallTopObjects1= [];
gdjs.BattleCode.GDWallTopObjects2= [];
gdjs.BattleCode.GDWallBottomObjects1= [];
gdjs.BattleCode.GDWallBottomObjects2= [];
gdjs.BattleCode.GDHPObjects1= [];
gdjs.BattleCode.GDHPObjects2= [];
gdjs.BattleCode.GDNewTextObjects1= [];
gdjs.BattleCode.GDNewTextObjects2= [];
gdjs.BattleCode.GDTimeObjects1= [];
gdjs.BattleCode.GDTimeObjects2= [];
gdjs.BattleCode.GDREALSCOREObjects1= [];
gdjs.BattleCode.GDREALSCOREObjects2= [];
gdjs.BattleCode.GDSCORE2Objects1= [];
gdjs.BattleCode.GDSCORE2Objects2= [];


gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDPaddleObjects1Objects = Hashtable.newFrom({"Paddle": gdjs.BattleCode.GDPaddleObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallLeftObjects1Objects = Hashtable.newFrom({"WallLeft": gdjs.BattleCode.GDWallLeftObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallLeftObjects1Objects = Hashtable.newFrom({"WallLeft": gdjs.BattleCode.GDWallLeftObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDPaddleObjects1Objects = Hashtable.newFrom({"Paddle": gdjs.BattleCode.GDPaddleObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallRightObjects1Objects = Hashtable.newFrom({"WallRight": gdjs.BattleCode.GDWallRightObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallRightObjects1Objects = Hashtable.newFrom({"WallRight": gdjs.BattleCode.GDWallRightObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects = Hashtable.newFrom({"Ball": gdjs.BattleCode.GDBallObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallLeftObjects1Objects = Hashtable.newFrom({"WallLeft": gdjs.BattleCode.GDWallLeftObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects = Hashtable.newFrom({"Ball": gdjs.BattleCode.GDBallObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallRightObjects1Objects = Hashtable.newFrom({"WallRight": gdjs.BattleCode.GDWallRightObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects = Hashtable.newFrom({"Ball": gdjs.BattleCode.GDBallObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallTopObjects1Objects = Hashtable.newFrom({"WallTop": gdjs.BattleCode.GDWallTopObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects = Hashtable.newFrom({"Ball": gdjs.BattleCode.GDBallObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDPaddleObjects1Objects = Hashtable.newFrom({"Paddle": gdjs.BattleCode.GDPaddleObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects = Hashtable.newFrom({"Ball": gdjs.BattleCode.GDBallObjects1});
gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallBottomObjects1Objects = Hashtable.newFrom({"WallBottom": gdjs.BattleCode.GDWallBottomObjects1});
gdjs.BattleCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Paddle"), gdjs.BattleCode.GDPaddleObjects1);
gdjs.copyArray(runtimeScene.getObjects("REALSCORE"), gdjs.BattleCode.GDREALSCOREObjects1);
{for(var i = 0, len = gdjs.BattleCode.GDPaddleObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDPaddleObjects1[i].setY(480);
}
}
{for(var i = 0, len = gdjs.BattleCode.GDREALSCOREObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDREALSCOREObjects1[i].getBehavior("Text").setText(gdjs.evtTools.common.toString(runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber()));
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Paddle"), gdjs.BattleCode.GDPaddleObjects1);
gdjs.copyArray(runtimeScene.getObjects("WallLeft"), gdjs.BattleCode.GDWallLeftObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDPaddleObjects1Objects, gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallLeftObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDPaddleObjects1 */
/* Reuse gdjs.BattleCode.GDWallLeftObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDPaddleObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDPaddleObjects1[i].separateFromObjectsList(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallLeftObjects1Objects, false);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Paddle"), gdjs.BattleCode.GDPaddleObjects1);
gdjs.copyArray(runtimeScene.getObjects("WallRight"), gdjs.BattleCode.GDWallRightObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDPaddleObjects1Objects, gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallRightObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDPaddleObjects1 */
/* Reuse gdjs.BattleCode.GDWallRightObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDPaddleObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDPaddleObjects1[i].separateFromObjectsList(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallRightObjects1Objects, false);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDBallObjects1.length;i<l;++i) {
    if ( gdjs.BattleCode.GDBallObjects1[i].getVariableNumber(gdjs.BattleCode.GDBallObjects1[i].getVariables().getFromIndex(0)) == 1 ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDBallObjects1[k] = gdjs.BattleCode.GDBallObjects1[i];
        ++k;
    }
}
gdjs.BattleCode.GDBallObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").simulateRightKey();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDBallObjects1.length;i<l;++i) {
    if ( gdjs.BattleCode.GDBallObjects1[i].getVariableNumber(gdjs.BattleCode.GDBallObjects1[i].getVariables().getFromIndex(0)) == -(1) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDBallObjects1[k] = gdjs.BattleCode.GDBallObjects1[i];
        ++k;
    }
}
gdjs.BattleCode.GDBallObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").simulateLeftKey();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDBallObjects1.length;i<l;++i) {
    if ( gdjs.BattleCode.GDBallObjects1[i].getVariableNumber(gdjs.BattleCode.GDBallObjects1[i].getVariables().getFromIndex(1)) == 1 ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDBallObjects1[k] = gdjs.BattleCode.GDBallObjects1[i];
        ++k;
    }
}
gdjs.BattleCode.GDBallObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").simulateUpKey();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDBallObjects1.length;i<l;++i) {
    if ( gdjs.BattleCode.GDBallObjects1[i].getVariableNumber(gdjs.BattleCode.GDBallObjects1[i].getVariables().getFromIndex(1)) == -(1) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDBallObjects1[k] = gdjs.BattleCode.GDBallObjects1[i];
        ++k;
    }
}
gdjs.BattleCode.GDBallObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").simulateDownKey();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);
gdjs.copyArray(runtimeScene.getObjects("WallLeft"), gdjs.BattleCode.GDWallLeftObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects, gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallLeftObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].returnVariable(gdjs.BattleCode.GDBallObjects1[i].getVariables().getFromIndex(0)).setNumber(1);
}
}
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").setMaxSpeed(gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").getMaxSpeed() + (15));
}
}
{runtimeScene.getGame().getVariables().getFromIndex(0).add(gdjs.randomInRange(3, 20));
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);
gdjs.copyArray(runtimeScene.getObjects("WallRight"), gdjs.BattleCode.GDWallRightObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects, gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallRightObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").setMaxSpeed(gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").getMaxSpeed() + (15));
}
}
{runtimeScene.getGame().getVariables().getFromIndex(0).add(gdjs.randomInRange(3, 20));
}
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].returnVariable(gdjs.BattleCode.GDBallObjects1[i].getVariables().getFromIndex(0)).setNumber(-(1));
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);
gdjs.copyArray(runtimeScene.getObjects("WallTop"), gdjs.BattleCode.GDWallTopObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects, gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallTopObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").setMaxSpeed(gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").getMaxSpeed() + (20));
}
}
{runtimeScene.getGame().getVariables().getFromIndex(0).add(gdjs.randomInRange(3, 20));
}
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].returnVariable(gdjs.BattleCode.GDBallObjects1[i].getVariables().getFromIndex(1)).setNumber(-(1));
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);
gdjs.copyArray(runtimeScene.getObjects("Paddle"), gdjs.BattleCode.GDPaddleObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects, gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDPaddleObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].returnVariable(gdjs.BattleCode.GDBallObjects1[i].getVariables().getFromIndex(1)).setNumber(1);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Ball"), gdjs.BattleCode.GDBallObjects1);
gdjs.copyArray(runtimeScene.getObjects("WallBottom"), gdjs.BattleCode.GDWallBottomObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDBallObjects1Objects, gdjs.BattleCode.mapOfGDgdjs_9546BattleCode_9546GDWallBottomObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.BattleCode.GDBallObjects1 */
gdjs.copyArray(runtimeScene.getObjects("HP"), gdjs.BattleCode.GDHPObjects1);
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].getBehavior("TopDownMovement").setMaxSpeed(200);
}
}
{for(var i = 0, len = gdjs.BattleCode.GDBallObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDBallObjects1[i].setY(230);
}
}
{for(var i = 0, len = gdjs.BattleCode.GDHPObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDHPObjects1[i].SetValue(gdjs.BattleCode.GDHPObjects1[i].Value(null) - (10), null);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("HP"), gdjs.BattleCode.GDHPObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDHPObjects1.length;i<l;++i) {
    if ( gdjs.BattleCode.GDHPObjects1[i].IsEmpty(null) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDHPObjects1[k] = gdjs.BattleCode.GDHPObjects1[i];
        ++k;
    }
}
gdjs.BattleCode.GDHPObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "GameOver", false);
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Time"), gdjs.BattleCode.GDTimeObjects1);
{for(var i = 0, len = gdjs.BattleCode.GDTimeObjects1.length ;i < len;++i) {
    gdjs.BattleCode.GDTimeObjects1[i].SetValue(gdjs.BattleCode.GDTimeObjects1[i].Value(null) - (gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene)), null);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Time"), gdjs.BattleCode.GDTimeObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.BattleCode.GDTimeObjects1.length;i<l;++i) {
    if ( gdjs.BattleCode.GDTimeObjects1[i].IsEmpty(null) ) {
        isConditionTrue_0 = true;
        gdjs.BattleCode.GDTimeObjects1[k] = gdjs.BattleCode.GDTimeObjects1[i];
        ++k;
    }
}
gdjs.BattleCode.GDTimeObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "GameOver", false);
}
}

}


};

gdjs.BattleCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.BattleCode.GDPaddleObjects1.length = 0;
gdjs.BattleCode.GDPaddleObjects2.length = 0;
gdjs.BattleCode.GDShadedDarkJoystickObjects1.length = 0;
gdjs.BattleCode.GDShadedDarkJoystickObjects2.length = 0;
gdjs.BattleCode.GDBallObjects1.length = 0;
gdjs.BattleCode.GDBallObjects2.length = 0;
gdjs.BattleCode.GDWallLeftObjects1.length = 0;
gdjs.BattleCode.GDWallLeftObjects2.length = 0;
gdjs.BattleCode.GDWallRightObjects1.length = 0;
gdjs.BattleCode.GDWallRightObjects2.length = 0;
gdjs.BattleCode.GDWallTopObjects1.length = 0;
gdjs.BattleCode.GDWallTopObjects2.length = 0;
gdjs.BattleCode.GDWallBottomObjects1.length = 0;
gdjs.BattleCode.GDWallBottomObjects2.length = 0;
gdjs.BattleCode.GDHPObjects1.length = 0;
gdjs.BattleCode.GDHPObjects2.length = 0;
gdjs.BattleCode.GDNewTextObjects1.length = 0;
gdjs.BattleCode.GDNewTextObjects2.length = 0;
gdjs.BattleCode.GDTimeObjects1.length = 0;
gdjs.BattleCode.GDTimeObjects2.length = 0;
gdjs.BattleCode.GDREALSCOREObjects1.length = 0;
gdjs.BattleCode.GDREALSCOREObjects2.length = 0;
gdjs.BattleCode.GDSCORE2Objects1.length = 0;
gdjs.BattleCode.GDSCORE2Objects2.length = 0;

gdjs.BattleCode.eventsList0(runtimeScene);
gdjs.BattleCode.GDPaddleObjects1.length = 0;
gdjs.BattleCode.GDPaddleObjects2.length = 0;
gdjs.BattleCode.GDShadedDarkJoystickObjects1.length = 0;
gdjs.BattleCode.GDShadedDarkJoystickObjects2.length = 0;
gdjs.BattleCode.GDBallObjects1.length = 0;
gdjs.BattleCode.GDBallObjects2.length = 0;
gdjs.BattleCode.GDWallLeftObjects1.length = 0;
gdjs.BattleCode.GDWallLeftObjects2.length = 0;
gdjs.BattleCode.GDWallRightObjects1.length = 0;
gdjs.BattleCode.GDWallRightObjects2.length = 0;
gdjs.BattleCode.GDWallTopObjects1.length = 0;
gdjs.BattleCode.GDWallTopObjects2.length = 0;
gdjs.BattleCode.GDWallBottomObjects1.length = 0;
gdjs.BattleCode.GDWallBottomObjects2.length = 0;
gdjs.BattleCode.GDHPObjects1.length = 0;
gdjs.BattleCode.GDHPObjects2.length = 0;
gdjs.BattleCode.GDNewTextObjects1.length = 0;
gdjs.BattleCode.GDNewTextObjects2.length = 0;
gdjs.BattleCode.GDTimeObjects1.length = 0;
gdjs.BattleCode.GDTimeObjects2.length = 0;
gdjs.BattleCode.GDREALSCOREObjects1.length = 0;
gdjs.BattleCode.GDREALSCOREObjects2.length = 0;
gdjs.BattleCode.GDSCORE2Objects1.length = 0;
gdjs.BattleCode.GDSCORE2Objects2.length = 0;


return;

}

gdjs['BattleCode'] = gdjs.BattleCode;
