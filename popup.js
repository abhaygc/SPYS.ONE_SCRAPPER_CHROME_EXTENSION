window.onload=function(){
  /*
  var https = JSON.parse(window.localStorage.getItem('https'));
  var http = JSON.parse(window.localStorage.getItem('http'));
  var socks = JSON.parse(window.localStorage.getItem('socks'));
  */
 // Read it using the storage API
  chrome.storage.sync.get(['https', 'http','socks'], function(items) {
    https=items['https']
    http=items['http']
    socks=items['socks']
    chkItems(https,http,socks);
  });
  
}
function chkItems(https,http,socks){
  if(https['hia'].length!=0 || https['anm'].length!=0 || https['noa'].length !=0){
    var httpsDiv = document.createElement('div');
    httpsDiv.setAttribute('class','protocolHeader')
    httpsDiv.setAttribute('id','https')
    httpsDiv.innerHTML="<h3 class='protocol'>HTTPS ("+(https['hia'].length+https['anm'].length+https['noa'].length)+
    ")</h3> <button class='copy_btn' id='https_btn'>Copy all of HTTPS</button>"
    document.getElementsByTagName('body')[0].append(httpsDiv);
    loadProxies(https,'https')
  }
  if(http['hia'].length!=0 || http['anm'].length!=0 || http['noa'].length !=0){
    var httpDiv = document.createElement('div');
    httpDiv.setAttribute('class','protocolHeader')
    httpDiv.setAttribute('id','http')
    httpDiv.innerHTML="<h3 class='protocol'>HTTP ("+(http['hia'].length+http['anm'].length+http['noa'].length)+
    ")</h3> <button class='copy_btn' id='http_btn'>Copy all of HTTP</button>"
    document.getElementsByTagName('body')[0].append(httpDiv);
    loadProxies(http,'http')
  }
  if(socks['hia'].length!=0 || socks['anm'].length!=0 || socks['noa'].length !=0){
    var socksDiv = document.createElement('div');
    socksDiv.setAttribute('class','protocolHeader')
    socksDiv.setAttribute('id','socks')
    socksDiv.innerHTML="<h3 class='protocol'>SOCKS ("+(socks['hia'].length+socks['anm'].length+socks['noa'].length)+
    ")</h3> <button class='copy_btn' id='socks_btn'>Copy all of SOCKS</button>"
    document.getElementsByTagName('body')[0].append(socksDiv);
    loadProxies(socks,'socks')
  }
  addClickListener();
}
function loadProxies(proxies,type){
  for(subType in proxies)
  {
    if(proxies[subType].length!=0){
      var subtypeDiv = document.createElement('div');
      subtypeDiv.setAttribute('class','subProtocolHeader')
      subtypeDiv.setAttribute('id',type+'-'+subType)
      subtypeDiv.innerHTML="<h3 class='protocol'>"+subType+"("+proxies[subType].length+
      ")</h3> <button class='copy_btn' id='"+type+"_"+subType+"_btn'>Copy all "+type+"-"+subType+"</button>"+
      "<div style='margin-top:10px'><textarea>"+proxies[subType].join('\n')+"</textarea></div>"
      document.getElementById(type).append(subtypeDiv);
    }
  }
}
function addClickListener(){
  var copy_btns = document.getElementsByClassName('copy_btn');
  for(btn of copy_btns){
    btn.addEventListener('click',copyToClipBoard);
  }
}
function copyToClipBoard(element){
  //console.log(element.target.id);
  var all_textareas = document.querySelectorAll('#'+element.target.id+' ~ div textarea');
  //console.log(all_textareas.length);
  proxiesToCopy = ""
  for(textarea of all_textareas){
    proxiesToCopy+=textarea.textContent+'\n';
  }
  //console.log(proxiesToCopy);
  var temp_textarea = document.createElement('textarea');
  temp_textarea.value = proxiesToCopy;
  document.body.appendChild(temp_textarea);
  temp_textarea.select();
  document.execCommand('copy');
  document.body.removeChild(temp_textarea);
}