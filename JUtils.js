/** Thousands Format
 *
 * 123456789 => 123,456,789
 * 123456789.123 => 123,456,789.123 */
export const formatMoney = (money) => {
    return money.replace(new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',')  
}


/** Parse URL Parameters
 *
 * const name = getQueryByName('name')
 * const age = getQueryByName('age') */
export const getQueryByName = (name) => {
    const queryNameRegex = new RegExp(`[?&]${name}=([^&]*)(&|$)`)
    const queryNameMatch = window.location.search.match(queryNameRegex)
    // Generally, it will be decoded by decodeURIComponent
    return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : ''
}


/** camelCase String
 *
 * foo Bar => fooBar
 * foo-bar---- => fooBar
 * foo_bar__ => fooBar */
export const camelCase = (string) => {
    const camelCaseRegex = /[-_\s]+(.)?/g
    return string.replace(camelCaseRegex, (match, char) => {
        return char ? char.toUpperCase() : ''
    })
}


/** Lowercase to Uppercase
 *
 * hello world => Hello World
 * hello WORLD => Hello World */
export const capitalize = (string) => {
    const capitalizeRegex = /(?:^|\s+)\w/g
    return string.toLowerCase().replace(capitalizeRegex, (match) => match.toUpperCase())
}


/** The trimString() method is used to remove whitespace at the beginning and end of the string */
export const trimString = (str) => {
    return str.replace(/^\s*|\s*$/g, '') // or str.replace(/^\s*(.*?)\s*$/g, '$1')
}


/** HTML Escape
 * console.log(escape(`
 *  <div>
 *      <p>hello world</p>
 *  </div>
 *  `))
 *  &lt;div&gt;
 *      &lt;p&gt;hello world&lt;/p&gt;
 *  &lt;/div&gt; */
export const escape = (string) => {
    const escapeMaps = {
        '&': 'amp',
        '<': 'lt',
        '>': 'gt',
        '"': 'quot',
        "'": '#39'
    }
    // The effect here is the same as that of /[&amp;<> "']/g
    const escapeRegexp = new RegExp(`[${Object.keys(escapeMaps).join('')}]`, 'g')
    return string.replace(escapeRegexp, (match) => `&${escapeMaps[match]};`)
}


/** HTML Escaping
 * console.log(unescape(`
 *  &lt;div&gt;
 *      &lt;p&gt;hello world&lt;/p&gt;
 *  &lt;/div&gt;
 *  `))
 *  <div>
 *      <p>hello world</p>
 *  </div> */
export const unescape = (string) => {
    const unescapeMaps = {
        'amp': '&',
        'lt': '<',
        'gt': '>',
        'quot': '"',
        '#39': "'"
    }
    const unescapeRegexp = /&([^;]+);/g
    return string.replace(unescapeRegexp, (match, unescapeKey) => {
        return unescapeMaps[ unescapeKey ] || match
    })
}


/** Check 24-Hour Clock
 *
 * check24TimeRegexp.test('01:14') => true
 * check24TimeRegexp.test('23:60') => false
 * check24TimeRegexp.test('1:1') => true */
export const check24TimeRegexp = /^(?:(?:0?|1)\d|2[0-3]):(?:0?|[1-5])\d$/;


/** Check Date Format
 * 
 * checkDateRegexp.test('2021-08-22') => true
 * checkDateRegexp.test('2021/08/22') => true
 * checkDateRegexp.test('2021.08.22') => true
 * checkDateRegexp.test('2021.08/22') => false
 * checkDateRegexp.test('2021/08-22') => false */
export const checkDateRegexp = /^\d{4}([-\.\/])(?:0[1-9]|1[0-2])\1(?:0[1-9]|[12]\d|3[01])$/;


/** Match Colors
 *
 * const colorString = '#12f3a1 #ffBabd #FFF #123 #586';
 * console.log(colorString.match(matchColorRegex)); => [ '#12f3a1', '#ffBabd', '#FFF', '#123', '#586' ] */
export const matchColorRegex = /#(?:[\da-fA-F]{6}|[\da-fA-F]{3})/g;


/** Determine HTTPS/HTTP
 *
 * console.log(checkProtocol.test('https://google.com/')) // true
 * console.log(checkProtocol.test('http://google.com/')) // true
 * console.log(checkProtocol.test('//google.com/')) // false */
export const checkProtocol = /^https?:/;


/** Check Version Number
 *
 * console.log(versionRegexp.test('1.1.1')) // true
 * console.log(versionRegexp.test('1.000.1')) //true
 * console.log(versionRegexp.test('1.000.1.1')) //false */
export const versionRegexp = /^(?:\d+\.){2}\d+$/;


/** Get Web Page Img Address
 *
 * console.log(matchImgs(document.body.innerHTML)) */
export const matchImgs = (sHtml) => {
    const imgUrlRegex = /<img[^>]+src="((?:https?:)?\/\/[^"]+)"[^>]*?>/gi
    let matchImgUrls = []

    sHtml.replace(imgUrlRegex, (match, $1) => {
        $1 && matchImgUrls.push($1)
    })
    return matchImgUrls
}


/** Format Phone Number
 *
 * let mobile = '18379836654'
 * console.log(mobile.replace(mobileReg, '-')) // 183-7983-6654 */
export let mobileReg = /(?=(\d{4})+$)/g;



/** User Profile Avatar
 *
 * <img id="avatar" alt="Avatar">
 * document.getElementById("avatar").src = generateAvatar("Kiarash Soleimanzadeh", "white", "#009578"); */
 export const generateAvatar = (text, foregroundColor, backgroundColor) => {
    const firstLetters = text.match(/(\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(firstLetters, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}



/** Create a hexadecimal color based on a string
 *
 * stringToColor("Kiarash Soleimanzadeh"); */
 export const stringToColor = (str) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }
