var LetterHelper = function(){

};

LetterHelper.draw = function(canvas, commands){
    var context = canvas.getContext("2d");
    LetterHelper.fillPaths(context, commands);
    LetterHelper.drawOutlines(context, commands);
};

LetterHelper.drawPolygonPaths = function(g, paths){
    var i, j, pathLen, path, point, len, p;
    var w = 100, h = 100;
    var start;
    len = paths.length;
    console.log("paths", paths);
    for(i = 0; i < len; i++){
        path = paths[i];
        pathLen = path.length;
        for(j = 0; j < pathLen; j++){
            point = path[j];
            p = {'x':point.x*w, 'y':point.y*h};
            if(path[j].type === LetterConsts.MOVE_TO){
                if(start){
                    g.lineTo(start.x, start.y);
                }
                g.moveTo(p.x, p.y);
                start = p;
            }
            else if(path[j].type === LetterConsts.LINE_TO){
                g.lineTo(p.x, p.y);
            }
            else if(path[j].type === LetterConsts.QUAD_BEZ_CURVE_TO){
                var cp = {'x':point.x1*w, 'y':point.y1*h};
                g.quadraticCurveTo(cp.x, cp.y, p.x, p.y);
            }
            else if(path[j].type === LetterConsts.END && start){
                // back to the start?
                g.lineTo(start.x, start.y);
            }
        }
    }
};

LetterHelper.fillPaths = function(context, paths){
    context.setStrokeStyle(1);
    context.beginStroke("#000000");
    context.beginFill("red");
    LetterHelper.drawPolygonPaths(context, paths);
};

LetterHelper.drawOutlines = function(context, paths){
    context.strokeStyle = "#000000";
    context.lineWidth = 1;
    //context.beginPath();
    LetterHelper.drawPolygonPaths(context, paths);
    context.stroke();
};



