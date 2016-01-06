function json2url(json)
{
	json.t = Math.random();
	var arr=[];
	for(var name in json)
	{
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function ajax(json)
{
	if(! json.url)
	{
		alert('go away');
		return;
	}
	//创建对象
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	json.data = json.data || {};
	json.type = json.type || 'get';
	json.timeout = json.timeout || 5000;
	//2.连接服务器（打开和服务器的连接）
	//3.发送
	switch(json.type.toLowerCase())
	{
		case 'get':
			oAjax.open('GET', json.url+'?'+json2url(json.data), true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST', json.url, true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			
			oAjax.send(json2url(json.data));
			break;
	}
	//4.接收
	var timer = null;
	oAjax.onreadystatechange=function ()
	{
	
		if(oAjax.readyState==4)
		{
			clearTimeout(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				//alert('成功了：'+oAjax.responseText);
				
				json.success && json.success(oAjax.responseText);
			}
			else
			{
				//alert('失败了');
				json.error && json.error(oAjax.status);
			}
		}
	};
	//网络超时
	
	timer = setTimeout(function(){
		oAjax.onreadystatechange=null;
		alert('网络超时了');
	},json.timeout);
}