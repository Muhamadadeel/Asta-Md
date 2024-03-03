/** The dBinary function takes a string of binary numbers separated by spaces, converts each binary number to its corresponding ASCII character, and then returns a single string containing all the ASCII characters. It does this in three steps:

It splits the input string str into an array of binary numbers, newBin, using the split method.
It creates an empty array binCode to store the ASCII characters.
It loops through each binary number in newBin, converts it to an ASCII character using String.fromCharCode(parseInt(newBin[i], 2)), and pushes it to binCode.
It returns the final string containing all the ASCII characters, joined together with the join method.
The eBinary function takes a string str of ASCII characters, converts each character to its binary representation, and then returns a single string containing all the binary numbers separated by spaces. It does this in three steps:

It creates an empty string res to store the binary numbers.
It splits the input string str into individual characters using the spread operator (...), and then maps over each character, converting it to its binary representation using char.charCodeAt(0).toString(2).
It joins all the binary numbers together into a single string with the join method, and then returns the final string. */





async function dBinary(str) {
    var newBin = str.split(" ")
    var binCode = []
    for (i = 0; i < newBin.length; i++) {
        binCode.push(String.fromCharCode(parseInt(newBin[i], 2)))
      }
    return binCode.join("")
    }
    
    async function eBinary(str = ''){    
    let res = ''
    res = str.split('').map(char => {       
    return char.charCodeAt(0).toString(2);  
     }).join(' ')
    return res
    }
  
    module.exports = { dBinary, eBinary }