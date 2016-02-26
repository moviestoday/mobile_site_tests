/**
 * Created by Bishaka on 25/02/2016.
 */
function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function getContrastYIQ(hexcolor){
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

$(document).ready(function(){
    var vague = $('#menu').Vague({
        intensity:50      // Blur Intensity
    });
    vague.blur();

    var colorThief = new ColorThief();
    var dc = colorThief.getColor($("#img")[0]);
    var hsl = rgbToHsl(dc[0],dc[1],dc[2])
    var hex = rgb2hex( 'rgb('+dc[0]+','+dc[1]+','+dc[2]+')' );
    var contrast = getContrastYIQ(hex);
    $("#dcolor").css('background-color',hex);
    console.log(dc);
    console.log(contrast);
    console.log(hsl);
    $("#dcolor").css('color','hsl('+hsl[0]*100+','+hsl[1]*100+','+hsl[2]*100+')');
});