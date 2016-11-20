// JavaScript Document
// callback = function(data){}
function getText(url,callback){
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.setRequestHeader("Content-type","text/plain;charset=utf-8");
	request.send();
	
	request.onreadystatechange = function(){
		if(request.readyState === 4 && request.status === 200){
			callback(request.responseText);
		}
	};
}
//通过Ajax获取XML
function getXML(url,callback){
	var request = new XMLHttpRequest();
	request.open("GET",url);
	request.send();
	
	request.onreadystatechange = function(){
		if(request.readyState === 4 && request.status === 200){
			callback(request.responseXML);
		}
	};
}
//扩展的clear方法
Node.prototype.empty = function(){
	Array.prototype.slice.call(this.children,0).forEach(function(item){
			item.parentNode.removeChild(item);
		});
};

//编码表单数据，参数为对象
function encodeFormData(data){
	if(!data){
		return "";
	}
	var pairs = [];
	// data={a:"terry 张三",b:123,c:function(){}}
	for(var name in data){
		if(!data.hasOwnProperty(name)){
			continue;
		}
		if(typeof data[name] == "function"){
			continue;
		}
		var value = data[name].toString();
		name = encodeURIComponent(name).replace("%20","+");//编码名字
		value = encodeURIComponent(value).replace("%20","+");//编码值
		pairs.push(name+"="+value);
		
	}
	return pairs.join('&');
}

//url http://172.16.8.184:80/Javascript/js/ajax.js?jsonp=getJSONP.cb0	
//跨域JSONP方法
getJSONP.counter = 0;//回调函数名称计数器
function getJSONP(url,callback){
	var cbnum = "cb"+getJSONP.counter++;//cb0
	var cbname = "getJSONP."+cbnum;//getJSONP.cb0

	if(url.indexOf("?") === -1){
		url += "?jsonp="+cbname;
	}else{
		url += "&jsonp="+cbname;
	}
	//为每个请求创建了一个全新的内部回调函数，作为getJSON函数的一个属性储存。getJSONP[cb0] = function(){}
	getJSONP[cbnum]= function(response){
		try{
			callback(response);
		}finally{
			//清理工作：删除回调函数
			delete getJSONP[cbnum];//移除script元素
			script.parentNode.removeChild(script);	
		}
	}
	var script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}






