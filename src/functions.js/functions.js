 
export function saltKey(){

    var count = 0;
    var i = 0;
    var sKey =  "PyV1ZfWeaxQw";
     for ( i = 0;  i  < sKey.length ;  i++) {
          count +=  sKey[i].charCodeAt(0);
     }
     return  count;
 }

export function decode(str) { 
    var data =  '' ;
    var salt =  saltKey();
    var arrayData = str.split("x"); 
    var i = 0;
    for ( i = 0;  i <  arrayData.length;  i++) { 
        data +=  chr(arrayData[i] - salt - i) ; 
    }
    return  data;
     
   }
   
     function chr(n) {
    if (n < 128) {
        return String.fromCharCode(n);
    } else {
        return "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "[n - 128];
    }
}

export function encode(x) { 
    var number = ''  ;
    return number
   }

   export function financialFloat(x) {  
    const number = Number.parseFloat(x).toFixed(2); 
    return number
   }