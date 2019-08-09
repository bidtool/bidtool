function spin(){
  document.documentElement.style.transitionDuration="60s";
  document.documentElement.style.transitionTimingFunction="ease-in";
  document.documentElement.style.transform="rotate(360000deg)";
}

/*********************************************************************
* pull from database:
*********************************************************************/
  // TODO: Add SDKs for Firebase products that you want to use (i did this in the html file right under <body>)
  //   https://firebase.google.com/docs/web/setup#config-web-app

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCIdGaIIh2TkJkbVg_5AKsIFGEwRCtMnxE",
    authDomain: "fir-project-aa1d3.firebaseapp.com",
    databaseURL: "https://fir-project-aa1d3.firebaseio.com",
    projectId: "fir-project-aa1d3",
    storageBucket: "",
    messagingSenderId: "256990324187",
    appId: "1:256990324187:web:e7b1ee4e1a3f4c37"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
//var database = firebase.database();

//this is for the drop down list when choosing an rvalue.
document.querySelector(".dropdown").addEventListener("click", function() {
  window.showState = function (str) {
    var dropdown = document.getElementById('Acntname');
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);
}
});
 
/*********************************************************************
* the w3 schools stuff that helped form the page
*********************************************************************/
// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

/*********************************************************************
* Main logic methods:
* make the list of objects (each quote will have a list of objects, or
* materials with their own aspects, add to the list/take away from 
* abilities are needed. garbage collection should be automatic.)
*********************************************************************/
var materials = [];

// this crazy function takes care of all discount logic. right now it returns the price, since if there is a discount, it must be entered by hand.
function runDiscount(){
var newPrice = prompt('This Item Qualifies for a Discount! Please Calculate and Enter its New Price',.24);
return newPrice;
  //Discount stuff is wierd right now. discounts are calculated individually by the person making the bid, so it cant really 
    //be automated till there is a set rule on discounts. the following if statements will be commented out till then.
      //calc discount stuff. (its a little confusing)
    /* if (rVal == "R13") {
        if (bags >= 12){
           if (dscnt == 0 || dscnt == null){
            price = price;
           }
           else{
              price = price-(price*(dscnt/100));
                }
        }
        else {
          price = price;
        }
        
    } else if (bags >= 15) {
        if (dscnt == 0 || dscnt == null){
          price = price;
        }
        else{
            price = price-(price*(dscnt/100));
              }

    } else {
      price = price;
    } */
}
/*********************************************************************
* set variables, get from db, then send all that stuff to fill the objects
*********************************************************************/
function begin(rVal){

  //format the incoming rvalue number to look right when it gets sent to the database query.
  if (rVal == 130 || rVal == 138){
    var rVal = rVal-100;
    var rVal = "R"+rVal+"C";
  }
  else{
    var rVal = "R"+rVal;
  }

  // set a few important variables. THE POPUP QUESTIONS!
  var price;
  var sqFt;
  var dstbtr = document.getElementById('distributor').value;
  var location = document.getElementById('location').value;
  //var tax = parseFloat(document.getElementById('taxes').value);
  var width = prompt('Enter Width: (type 15,16,19,23,24, or 15x105)                           ...or Plancks constant for a surprise',15);
if (width == "6.626e-34" || width == "6.626x10^-34" || width == "6.62607004 × 10-34 m2 kg / s"){
      spin();
}

  var answer = window.confirm("Is this Kraft Faced?");
  //run checker on width variable to make sure its one of the real options.
  if (width == 15 || width == 16 || width == 19 || width == 23 || width == 24 || width == "15x105") {
    width = width;
  }
  else {
    while (width != 15 || width != 16 || width != 19 || width != 23 || width != 24 || width != "15x105") 
    {
      width = prompt('SORRY! you can only type 15,16,19,23,24, or 15x105',15);
      if (width == 15 || width == 16 || width == 19 || width == 23 || width == 24 || width == "15x105") {
        break;
      }
    }
  }
  //while (width != 15 || width != 16 || width != 23 || width != 24) {
    //width = prompt('SORRY! you can only type 15,16,23, or 24',15);
  //}

  var max = prompt('Square Foot Amount',100);
  //var dscnt = prompt('What Discount For This Item?');
  var cover;
  if (answer) {
      var cover = "Faced";
  }
  else {
      var cover = "Unfaced";
  }

// get square feet per bag from the database for the specific type.
var dbRef1 = firebase.database().ref().child("SquareFeet").child(cover).child(location).child(rVal).child(width);
dbRef1.once('value', snap => { 
})
function loadSF() { 
  return dbRef1.once("value"); 
}; 
//check if the sqFt returns from the DB as null, send it back with a working width to try again.
  console.log(loadSF());

//now add "K" to to rval, needed to get the right price, will be taken off again later to display correctly.
if (cover == "Faced"){
  rVal = rVal+"K";
}
else{
  rVal = rVal;
}
//get price per sf from the database.
var dbRef2 = firebase.database().ref().child(dstbtr).child(rVal);
dbRef2.once('value', snap => { 
})
 function loadData() { 
   return dbRef2.once("value"); 
 }; 
 
 loadData().then((snap) => { 
      price = snap.val();
      loadSF().then((snapSF)=>{
        sqFt = snapSF.val();
        price = snap.val();
          // finish the calculated variables [all in THIS "loadSF" scope!] then send all the variables over to fill an object in the list.
          //calculate how many bags based on overall square feet given and overall square feet they will get
  // figure bags
      if (max < sqFt){
           var bags = 1;
          }
      else{
           var bags = max / sqFt;
          }
  // figure discount
  if (rVal == "R13") {
      if (bags >= 12){
        price = runDiscount();
        }
      else{
            price = price;
          }
  } else if (bags >= 15) {
     price = runDiscount();
    }
  else{
        price = price;
          }
  //remove the "K" so rVal displays right.
          if (cover == "Faced"){
   rVal = rVal.substring(0, rVal.length - 1);
          }
  //make number smaller.
  var num = 2
  var multiplier = Math.pow(10, num);
  bags = Math.round(bags * multiplier) / multiplier;
  // make the numbers rounded correctly...
  var bags = Math.round(bags);
  //make the overall sqft number smaller
  var SFtotal = bags * sqFt;
  SFtotal = Math.round(SFtotal * multiplier) / multiplier;
  max = Math.round(max * multiplier) / multiplier;
  //make item endprice.
  var cost = SFtotal*price;
  cost = Math.round(cost * multiplier) / multiplier;
  cost.toFixed(2);
  price = Math.round(price * multiplier) / multiplier;

        plusBtn(price,sqFt,rVal,cover,width,bags,SFtotal,cost);
      })
    });
}

/*********************************************************************
* rest of the methods to create/kill quotes
*********************************************************************/
// this makes the array and sends it to the display.
function plusBtn(price,sqFt, rVal, cover,width,bags,SFtotal,cost){
    materials.push(new Material(price, sqFt, rVal, cover,width,bags,SFtotal,cost));
    display_array();
}

//this is the object that goes to the array and populates it.
function Material(price, sqFt, rVal, cover,width,bags,SFtotal,cost) {
    this.price = price;
    this.sqFt = sqFt;
    this.rVal = rVal;
  if (cover == "Faced"){
    this.cover = "Kraft Faced";
  }
  else{
    this.cover = cover;
  }
    //this.dscnt = discount;
    this.width = width;
    this.bags = bags;
    this.SFtotal = SFtotal;
    this.cost = cost.toFixed(2);
}

function display_array()
{   
  var e = "<hr/>";   
   for (var y=0; y<materials.length; y++)
   {
     //e += "Price: " + materials[y].price +"-SQFT: " +  materials[y].sqFt + "<br/>";
     //R-13x15" Kraft Faced (125.94 sq ft in a bag/17 bags=2140.98 sq ft)($0.38)=$813.57
     e += materials[y].rVal + "x" + materials[y].width + "\"" + " " + materials[y].cover + 
         " (" + materials[y].sqFt + " SF/bag| " + materials[y].bags+" bags="+materials[y].SFtotal+" total SF)( $" + materials[y].price + 
         " per SF)=$"+materials[y].cost + "<br/>" + "<br/>";
   }
    // var e = materials.join();
   document.getElementById("showList").innerHTML = e;
}

function displayEndTotals(){
  var num = 2
  var multiplier = Math.pow(10, num);
  var tax = parseFloat(document.getElementById('taxes').value);
  if (tax == undefined){
    tax = 0;
  }
  var subtotal=0;
  for (var y=0; y<materials.length; y++)
   {
     var comp = parseFloat(materials[y].cost);
     subtotal += comp;
   }
  var withTax = subtotal+(subtotal*(tax/100));

  subtotal = Math.round(subtotal * multiplier) / multiplier;
  //make decimals right-
  subtotal = subtotal.toFixed(2);
  withTax = Math.round(withTax * multiplier) / multiplier;
  withTax = withTax.toFixed(2);
  withTax = makeBold(withTax);

  document.getElementById("showTotals").innerHTML = "SubTotal = $"+subtotal+"<br>"+"TotalWtx = "+withTax;
}

//pops one of the items off the array
function killOne(){
    materials.pop();
}

function makeBold(withTax) {
  var getBold = "$"+withTax.toString();
  var makeBlue = getBold.fontcolor("blue");
  var result = makeBlue.bold();
  return result;
}

