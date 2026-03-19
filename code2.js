gdjs.TitleCode = {};
gdjs.TitleCode.localVariables = [];
gdjs.TitleCode.idToCallbackMap = new Map();
gdjs.TitleCode.GDNewTextObjects1= [];
gdjs.TitleCode.GDNewTextObjects2= [];
gdjs.TitleCode.GDStartObjects1= [];
gdjs.TitleCode.GDStartObjects2= [];
gdjs.TitleCode.GDREALSCOREObjects1= [];
gdjs.TitleCode.GDREALSCOREObjects2= [];
gdjs.TitleCode.GDSCORE2Objects1= [];
gdjs.TitleCode.GDSCORE2Objects2= [];


gdjs.TitleCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Start"), gdjs.TitleCode.GDStartObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.TitleCode.GDStartObjects1.length;i<l;++i) {
    if ( gdjs.TitleCode.GDStartObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.TitleCode.GDStartObjects1[k] = gdjs.TitleCode.GDStartObjects1[i];
        ++k;
    }
}
gdjs.TitleCode.GDStartObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Battle", false);
}
}

}


};

gdjs.TitleCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.TitleCode.GDNewTextObjects1.length = 0;
gdjs.TitleCode.GDNewTextObjects2.length = 0;
gdjs.TitleCode.GDStartObjects1.length = 0;
gdjs.TitleCode.GDStartObjects2.length = 0;
gdjs.TitleCode.GDREALSCOREObjects1.length = 0;
gdjs.TitleCode.GDREALSCOREObjects2.length = 0;
gdjs.TitleCode.GDSCORE2Objects1.length = 0;
gdjs.TitleCode.GDSCORE2Objects2.length = 0;

gdjs.TitleCode.eventsList0(runtimeScene);
gdjs.TitleCode.GDNewTextObjects1.length = 0;
gdjs.TitleCode.GDNewTextObjects2.length = 0;
gdjs.TitleCode.GDStartObjects1.length = 0;
gdjs.TitleCode.GDStartObjects2.length = 0;
gdjs.TitleCode.GDREALSCOREObjects1.length = 0;
gdjs.TitleCode.GDREALSCOREObjects2.length = 0;
gdjs.TitleCode.GDSCORE2Objects1.length = 0;
gdjs.TitleCode.GDSCORE2Objects2.length = 0;


return;

}

gdjs['TitleCode'] = gdjs.TitleCode;
