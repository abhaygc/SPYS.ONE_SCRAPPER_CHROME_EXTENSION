var all_rows = document.querySelectorAll('.spy1xx[onmouseover] , .spy1x[onmouseover]');
//var ip_addresses = []
var https = {'hia':[],'anm':[],'noa':[]}
var http = {'hia':[],'anm':[],'noa':[]}
var socks = {'hia':[],'anm':[],'noa':[]}

console.log(all_rows.length);
for(tr of all_rows)
{
  tds = tr.querySelectorAll('td');
  // console.log("tds : ",tds)
  // console.log("Protocol : "+tds[1].innerText);
  if(tds.length<=1){
    continue;
  }
  if(tds[1].innerText.includes("HTTPS")){
    //console.log('In https');
    if(tds[2].innerText=="HIA"){
      https['hia'].push(tds[0].innerText)
    }
    else if(tds[2].innerText=="ANM"){
      https['anm'].push(tds[0].innerText)
    }
    else{
      https['noa'].push(tds[0].innerText)
    }
  }
  else if(tds[1].innerText.includes("HTTP")){
    //console.log('In http');
    if(tds[2].innerText=="HIA"){
      http['hia'].push(tds[0].innerText)
    }
    else if(tds[2].innerText=="ANM"){
      http['anm'].push(tds[0].innerText)
    }
    else{
      http['noa'].push(tds[0].innerText)
    }
  }
  else{
    //console.log('In socks');
    if(tds[2].innerText=="HIA"){
      socks['hia'].push(tds[0].innerText)
    }
    else if(tds[2].innerText=="ANM"){
      socks['anm'].push(tds[0].innerText)
    }
    else{
      socks['noa'].push(tds[0].innerText)
    }

  }

}

chrome.storage.sync.set({'https': https, 'http': http, 'socks':socks}, function() {
  //console.log('Settings saved');
});

chrome.storage.sync.get(['https', 'http','socks'], function(items) {
  //console.log(items);
  https=items['https']
  http=items['http']
  socks=items['socks']
  /*
  console.log('https')
  console.log(https);
  console.log('http')
  console.log(http);
  console.log('socks')
  console.log(socks);
  */
});
/*
window.localStorage.setItem('https',JSON.stringify(https))
window.localStorage.setItem('http',JSON.stringify(http))
window.localStorage.setItem('socks',JSON.stringify(socks))
*/

