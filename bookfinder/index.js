$(document).ready(function(){
  $("#isbn").keyup(function(e){
    if(e.which == 13) {
      sendData()
    }

  })
  if (!window.clipboardData){
    $("#paste").addClass("hide")
    $("#paste").click(function(){
      if (window.clipboardData){
        $("#isbn").val(window.clipboardData.getData('Text'))
        sendData()
      } else {
        Materialize.toast("Your browser doesn't allow paste data.",4000)
      }
    })
  }

  $("#send").click(function(){
    sendData()
  })
  initDhtmlx()
})
function sendData(){
  $('#modal1').openModal();
  isbnNo = $("#isbn").val()
  validIsbn(isbnNo) && fetchIsbn($("#isbn").val())
}
function validIsbn(n){
  valid = true
  msg = ""
  if (!(n.length == 10 || n.length == 13)){
    valid = false
    msg = "The ISBN that you entered was not valid. The ISBN should be 10 or 13 digits."
    $('#modal1').closeModal();
    Materialize.toast(msg, 4000)
  }
  if (!n){
    $('#modal1').closeModal();
    valid = false
  }
  return valid
}
function getJSON(url) {
  var scriptOld = document.getElementById("jsonScript")
  if (scriptOld)
    scriptOld.parentNode.removeChild(scriptOld)

  var script = document.createElement('script')
  script.setAttribute('src', url)
  script.setAttribute('id', 'jsonScript')
  script.setAttribute('type', 'text/javascript')
  document.getElementsByTagName('head')[0].appendChild(script)
}

function fetchIsbn(isbn){
   var yql="select * from html where url = 'https://bookscouter.com/tools/historic.php?isbn="+isbn+"'"
   yql="http://query.yahooapis.com/v1/public/yql?q=" +
       encodeURIComponent(yql) +
       "&format=json" +
       "&callback=encontrado"
   getJSON(yql);
}
function encontrado(o){
  var table = false
  var title = false
  try{
    title = o.query.results.body.div.div[1].div[3].div.div.div[2].div.h2
    table = o.query.results.body.div.div[1].div[3].div.div.div[2].table.tbody.tr[1].td
  }
  catch(err) {
    title = false
    table = false
  }
  title = (title == "null" ? false : title)
  if (!title || !table){
      msg = "Book #"+$("#isbn").val()+" not found."
      Materialize.toast(msg, 4000)
      $('#modal1').closeModal();
      return
  }
  str = ""
  addItem(title,table)
  $("#isbn").val("")
  $("#isbn").focus()
  $('#modal1').closeModal();
}
function initDhtmlx(){
			myGrid = new dhtmlXGridObject('gridbox');
			myGrid.setImagePath("dhtmlxgrid/imgs/");
			myGrid.setHeader("ISBN,Title,Date,Max Price,Avg Price,# Prices");
			myGrid.setInitWidths("100,*,100,50,50,50");
			myGrid.setColAlign("right,left,left,right,right,right");
			myGrid.setColTypes("ro,ro,ro,ro,ro,ro");
			myGrid.setColSorting("str,str,str,int,int,int");
      myGrid.attachHeader("#text_filter,#text_filter,,,,");
			myGrid.init();
}
function addItem(title,items){
  strItems = $("#isbn").val()+","+title.split(",").join(".")+","
  for (item in items){
    if (item == 1 || item == 2){
      items[item] = items[item].split("$").join("")
    }
    strItems += items[item]+((item == items.length - 1) ? "" : ",")
  }
  var count=myGrid.getRowsNum();
  myGrid.addRow(count++,strItems)
}
