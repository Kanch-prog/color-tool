const hexInput = document.getElementById('hexInput');
const inputColor = document.getElementById('inputColor');
const alteredColor = document.getElementById('alteredColor');
const alteredColorText = document.getElementById('alteredColorText');
const slider = document.getElementById('slider');
const sliderText = document.getElementById('sliderText');
const lightenText = document.getElementById('lightenText');
const darkenText = document.getElementById('darkenText');
const toggleBtn = document.getElementById('toggleBtn');

toggleBtn.addEventListener('click', () => {
  if(toggleBtn.classList.contains('toggled')){
    toggleBtn.classList.remove('toggled');
    lightenText.classList.remove('unselected');
    darkenText.classList.add('unselected');
  } else {
    toggleBtn.classList.add('toggled');
    lightenText.classList.add('unselected');
    darkenText.classList.remove('unselected');
  }
  reset(); 
})

hexInput.addEventListener('keyup', () => {
  
  const hex = hexInput.value;
  if(!isValidHex(hex)) return;
  
  const strippedHex = hex.replace('#', '');

  inputColor.style.backgroundColor = "#" + strippedHex; 
  reset(); 
})
//Get a reference to hexInput and inputColor DOM elements
//Create a keyup event handler for hexInput
//Check if hex color is valid
//If hex color is valid, update the background color of inputColor
const isValidHex = (hex) => {
    if(!hex) return false;
    
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}


//Create a function to convert Hex to RGB
//this should work with 3 or 6 character hex values
//Hint - useParseInt(16) to convert a hex value to a decimal value
//should return an object with 3 properties - r,g, and b
//Test your function with a few different use cases
const convertHexToRGB = (hex) => {
  if(!isValidHex(hex)) return null;
  
  let strippedHex = hex.replace('#', '');

  if(strippedHex.length === 3){
    strippedHex = strippedHex[0] + strippedHex[0] 
    + strippedHex[1] + strippedHex[1] 
    + strippedHex[2] + strippedHex[2];
  }
  
  const r  = parseInt(strippedHex.substring(0,2), 16);
  const g  = parseInt(strippedHex.substring(2,4), 16);
  const b  = parseInt(strippedHex.substring(4,6), 16);
  
  return {r,g,b};
}
//create the function converRGBToHex
//take in 3 parameters - r,g, and b
//for each (r,g,b) - create a hex pair that is two characters long
//return hex value starting with a hashtag
//example - r.toString(16)
const convertRGBToHex = (r,g,b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
}

const alterColor = (hex, percentage) => {
  const {r, g, b} = convertHexToRGB(hex);
  
  const amount = Math.floor((percentage/100) * 255);
  
  const newR = increaseWithin0To255(r,amount);
  const newG = increaseWithin0To255(g,amount);
  const newB = increaseWithin0To255(b,amount)
  return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
  // const newHex = hex + amount;
  // if(newHex > 255) return 255;
  // if(newHex < 0) return 0;
  // return newHex;
  return Math.min(255, Math.max(0, hex + amount));
}

alterColor("fff", 10)

//get a reference to the slider and sliderText DOM elements
//create an input event listener for slider element
//display the value of the slider 
slider.addEventListener('input', () => {
  if(!isValidHex(hexInput.value)) return;
  
  sliderText.textContent = `${slider.value}%`;
  //calulcate the appropriate value for the color alteration
  //between positive and negative
  const valueAddition  = 
    toggleBtn.classList.contains('toggled') ? 
    -slider.value 
    : slider.value;
  //Create the alterColor function which accepts hex value and percentage
//convert the hex value to rgb
//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value
  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`; 
})

const reset = () =>{ 
  slider.value = 0;
  sliderText.innerText=`0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`; 

}




