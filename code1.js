gdjs.GameOverCode = {};
gdjs.GameOverCode.localVariables = [];
gdjs.GameOverCode.idToCallbackMap = new Map();
gdjs.GameOverCode.GDReturnObjects1= [];
gdjs.GameOverCode.GDReturnObjects2= [];
gdjs.GameOverCode.GDLabelObjects1= [];
gdjs.GameOverCode.GDLabelObjects2= [];
gdjs.GameOverCode.GDREALSCOREObjects1= [];
gdjs.GameOverCode.GDREALSCOREObjects2= [];
gdjs.GameOverCode.GDSCORE2Objects1= [];
gdjs.GameOverCode.GDSCORE2Objects2= [];


gdjs.GameOverCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Return"), gdjs.GameOverCode.GDReturnObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameOverCode.GDReturnObjects1.length;i<l;++i) {
    if ( gdjs.GameOverCode.GDReturnObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.GameOverCode.GDReturnObjects1[k] = gdjs.GameOverCode.GDReturnObjects1[i];
        ++k;
    }
}
gdjs.GameOverCode.GDReturnObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Title", false);
}
{runtimeScene.getGame().getVariables().getFromIndex(0).setNumber(0);
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("REALSCORE"), gdjs.GameOverCode.GDREALSCOREObjects1);
{for(var i = 0, len = gdjs.GameOverCode.GDREALSCOREObjects1.length ;i < len;++i) {
    gdjs.GameOverCode.GDREALSCOREObjects1[i].getBehavior("Text").setText(gdjs.evtTools.common.toString(runtimeScene.getGame().getVariables().getFromIndex(0).getAsNumber()));
}
}
}

}


};

gdjs.GameOverCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.GameOverCode.GDReturnObjects1.length = 0;
gdjs.GameOverCode.GDReturnObjects2.length = 0;
gdjs.GameOverCode.GDLabelObjects1.length = 0;
gdjs.GameOverCode.GDLabelObjects2.length = 0;
gdjs.GameOverCode.GDREALSCOREObjects1.length = 0;
gdjs.GameOverCode.GDREALSCOREObjects2.length = 0;
gdjs.GameOverCode.GDSCORE2Objects1.length = 0;
gdjs.GameOverCode.GDSCORE2Objects2.length = 0;

gdjs.GameOverCode.eventsList0(runtimeScene);
gdjs.GameOverCode.GDReturnObjects1.length = 0;
gdjs.GameOverCode.GDReturnObjects2.length = 0;
gdjs.GameOverCode.GDLabelObjects1.length = 0;
gdjs.GameOverCode.GDLabelObjects2.length = 0;
gdjs.GameOverCode.GDREALSCOREObjects1.length = 0;
gdjs.GameOverCode.GDREALSCOREObjects2.length = 0;
gdjs.GameOverCode.GDSCORE2Objects1.length = 0;
gdjs.GameOverCode.GDSCORE2Objects2.length = 0;


return;

}

gdjs['GameOverCode'] = gdjs.GameOverCode;
