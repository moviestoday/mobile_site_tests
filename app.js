/**
 * Created by Bishaka on 25/02/2016.
 */
function getContrastYIQ(hexcolor){
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

$(document).ready(function(){
    var vague = $('#menu').Vague({
        intensity:50      // Blur Intensity
    });
    vague.blur();

    var colorThief = new ColorThief();
    var dc = colorThief.getColor($("#img")[0]);
    var color = tinycolor({r:dc[0],g:dc[1],b:dc[2]});
    var contrast = getContrastYIQ(color.toHexString());
    $("#dcolor").css('background-color',color.toHexString());
    $("#dcolor").css('color',color.darken(70).toHslString());
});