


var Base64 = {
 

  // private property

  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",


  // public method for encoding

  encode : function (input) {

      var output = "";

      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;

      var i = 0;


      input = Base64._utf8_encode(input);


      while (i < input.length) {


          chr1 = input.charCodeAt(i++);

          chr2 = input.charCodeAt(i++);

          chr3 = input.charCodeAt(i++);


          enc1 = chr1 >> 2;

          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);

          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);

          enc4 = chr3 & 63;


          if (isNaN(chr2)) {

              enc3 = enc4 = 64;

          } else if (isNaN(chr3)) {

              enc4 = 64;

          }


          output = output +

          this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +

          this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);


      }


      return output;

  },


  // public method for decoding

  decode : function (input) {

      var output = "";

      var chr1, chr2, chr3;

      var enc1, enc2, enc3, enc4;

      var i = 0;


      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");


      while (i < input.length) {


          enc1 = this._keyStr.indexOf(input.charAt(i++));

          enc2 = this._keyStr.indexOf(input.charAt(i++));

          enc3 = this._keyStr.indexOf(input.charAt(i++));

          enc4 = this._keyStr.indexOf(input.charAt(i++));


          chr1 = (enc1 << 2) | (enc2 >> 4);

          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);

          chr3 = ((enc3 & 3) << 6) | enc4;


          output = output + String.fromCharCode(chr1);


          if (enc3 != 64) {

              output = output + String.fromCharCode(chr2);

          }

          if (enc4 != 64) {

              output = output + String.fromCharCode(chr3);

          }


      }


      output = Base64._utf8_decode(output);


      return output;


  },


  // private method for UTF-8 encoding

  _utf8_encode : function (string) {

      string = string.replace(/\r\n/g,"\n");

      var utftext = "";


      for (var n = 0; n < string.length; n++) {


          var c = string.charCodeAt(n);


          if (c < 128) {

              utftext += String.fromCharCode(c);

          }

          else if((c > 127) && (c < 2048)) {

              utftext += String.fromCharCode((c >> 6) | 192);

              utftext += String.fromCharCode((c & 63) | 128);

          }

          else {

              utftext += String.fromCharCode((c >> 12) | 224);

              utftext += String.fromCharCode(((c >> 6) & 63) | 128);

              utftext += String.fromCharCode((c & 63) | 128);

          }


      }


      return utftext;

  },


  // private method for UTF-8 decoding

  _utf8_decode : function (utftext) {

      var string = "";

      var i = 0;

      var c = c1 = c2 = 0;


      while ( i < utftext.length ) {


          c = utftext.charCodeAt(i);


          if (c < 128) {

              string += String.fromCharCode(c);

              i++;

          }

          else if((c > 191) && (c < 224)) {

              c2 = utftext.charCodeAt(i+1);

              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));

              i += 2;

          }

          else {

              c2 = utftext.charCodeAt(i+1);

              c3 = utftext.charCodeAt(i+2);

              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));

              i += 3;

          }


      }


      return string;

  }

}

function make_base_auth(user, password) {
  var tok = user + ':' + password;
  var hash = Base64.encode(tok);
  return "Basic " + hash;
}

var auth = make_base_auth('1446','0eae4a4e-40d5-4de4-957c-670cb7904e2a');

console.log(auth)


var city_name = document.getElementsByClassName('sorth1')[0].innerText; 
city_name = city_name.substring(0, city_name.indexOf(':')); //Belgrade

var e = document.getElementsByClassName('sr-hotel__name'); // elements that hold the hotel name

var arr = [...e] // convert HTMLOBJECT into array

var nRequest = [];
var nResult = [];
for (var i = 0; i < arr.length - 1; i++) {
  
  title_element = arr[i]; // the title as a element
  title_text = title_element.innerText; // the title as a text
  (function (i, title_element, title_text) {

    URL = 'https://partner.ostrovok.ru/api/b2b/v2/multicomplete?data={"query":"' + title_text + " " + city_name + '","format":"json","lang":"en"}';

    nRequest[i] = new XMLHttpRequest();
    //AUTH 
    var auth = make_base_auth('1446', '0eae4a4e-40d5-4de4-957c-670cb7904e2a');

    nRequest[i].open("GET", URL, true);
    // Headers - Authentification
    nRequest[i].setRequestHeader('Authorization', auth);
    nRequest[i].withCredentials = true;


    nRequest[i].onreadystatechange = function (oEvent) {
      if (nRequest[i].readyState === 4) {
        if (nRequest[i].status === 200) {
          console.log(nRequest[i].responseText);

          // Print response as json
          res_as_json = JSON.parse(nRequest[i].responseText);
          
          potential_hotel = res_as_json["result"]["hotels"]; // Object of a hotel

   

          if(potential_hotel){
            // If its not undefined
            
                                    // list of hotels, span.sr-hotel__name , "Hotel centar balasevic"
            return nResult[i]  =  [potential_hotel, title_element, title_text];
            
          }
          //  alert(nRequest[i].responseText);
          console.log(title_element, title_text, i)

        } else {
          console.log("Error", nRequest[i].statusText);
        }
      }
    };
    nRequest[i].send(null);
  })(i, title_element, title_text);
}


