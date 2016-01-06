window.onload=function(){
		var oT = document.getElementById('tj_txt');
	var oBtn = document.getElementById('btn1');
	var oMsgBox = document.getElementById('msg-box');
	var oPageBox = document.getElementById('pageBox');
	var oFirst = oMsgBox.parentNode.firstElementChild;
	var URL = 'weibo.php';
	var nowPage=1;
	//按回车键创建留言
	document.onkeydown=function(ev){
		var oEvent = ev || event;
		if(oEvent.keyCode==13)
		{
			create();		
		}	
	};
	//点击创建留言
	oBtn.onclick = function(){
		create();	
	};
	function create()
	{
		if(oT.value == '')return;
		ajax({
			url:URL,
			data:{
				act:'add',
				content:(oT.value)	
			},
			success:function(str){
				var json = eval('('+str+')');
				if(json.error)
				{
					alert('添加留言失败了');
				}
				else
				{
					oFirst.style.display='none';
					var oDiv = createMsg(decodeURIComponent(oT.value),json.time,0,0,json.id);
					
					oMsgBox.children[0] ? oMsgBox.insertBefore(oDiv,oMsgBox.children[0]) : oMsgBox.appendChild(oDiv);
					oT.value='';
					
					if(oMsgBox.children.length>3)
					{
						oMsgBox.removeChild(oMsgBox.children[3]);
					}
					
					//当前页码创建留言的时候自动跳转的第一个页面
					for(var i=0; i<oPageBox.children.length;i++)
					{
						oPageBox.children[i].className='';
					}
					oPageBox.children[0].className = 'active';
					getPageMsg(1);
					//页码状态
					getAllPage();
					
				}
			}	
		});	
	}
	//创建留言
	function createMsg(content,time,acc,ref,id)
	{
		var oDate = new Date();
		oDate.setTime(time*1000);
		var sDate=oDate.getFullYear()+'-'+toDub(oDate.getMonth()+1)+'-'+toDub(oDate.getDate())+' '+toDub(oDate.getHours())+':'+toDub(oDate.getMinutes())+':'+toDub(oDate.getSeconds());
		var oDiv = document.createElement('div');
		oDiv.innerHTML = '<p class="replyContent">'+content+'</p>'
					+'<p class="operation">'
					+'<span class="replyTime">'+sDate+'</span>'
					+'<span class="handle">'
					+'<a href="javascript:;" class="top">'+acc+'</a>'
					+'<a href="javascript:;" class="down_icon">'+ref+'</a>'
					+'<a href="javascript:;" class="cut">删除</a>'
					+'</span></p>';	
		oDiv.className = 'reply';
		var aA=oDiv.getElementsByTagName('a');
		aA[2].onclick = function(){
			var s = window.confirm('您确认要删除吗？')
			if(s)
			{
				ajax({
					url:URL,
					data:{
						act:'del',
						id:id		
					},
					success:function(str){
						var json = eval('('+str+')');
						if(json.error)
						{
							alert('删除留言失败了');
						}
						else
						{
							oMsgBox.removeChild(oDiv);	
							//重新获取当前页面信息
							getPageMsg(nowPage);
							//刷新页码
							getAllPage();
						}
					}	
				});	
			}
		};
		return oDiv;
	}
	//补0
	function toDub(n)
	{
		return n=n<10 ? '0'+n : n+'';	
	}
	//获取一页数据weibo.php?act=get&page=1	
	getPageMsg(1);
	function getPageMsg(n)
	{
		ajax({
			url:URL,
			data:{
				act:'get',
				page:n	
			},
			success:function(str){
				oMsgBox.innerHTML='';
				
				nowPage=n;
				var arr = eval('('+str+')');
				if(arr.length!=0)
				{
					oFirst.style.display='none';
				}
				else
				{
					oFirst.style.display='block';	
				}
				for(var i=0; i<arr.length; i++)
				{
					var oDiv=createMsg(arr[i].content,arr[i].time,arr[i].acc,arr[i].ref,arr[i].id);
					oMsgBox.appendChild(oDiv);
				}
			}	
		});
	}
	//获取总页数
	getAllPage();
	function getAllPage()
	{
		ajax({
			url:URL,
			data:{
				act:'get_page_count'	
			},
			success:function (str){
				oPageBox.innerHTML='';
				var json = eval('('+str+')');
				for(var i=0; i<json.count;i++)
				{
					var oA = document.createElement('a');
					oA.href='javascript:;';
					oA.innerHTML = i+1;
					oPageBox.appendChild(oA);
					if(i==0)
					{
						oA.className='active';
					}
					oA.onclick = function(){
						for(var i=0; i<oPageBox.children.length;i++)
						{
							oPageBox.children[i].className='';	
						}	
						this.className='active';
						getPageMsg(this.innerHTML);
						nowPage=this.innerHTML;
					};
				}
				//当前页码样式
				for(var i=0; i<oPageBox.children.length;i++)
				{
					oPageBox.children[i].className='';	
				}	
				oPageBox.children[nowPage-1].className='active';
				
			}
		});	
	}
	var json={
		width:document.documentElement.clientWidth,
		height:document.documentElement.clientHeight	
	};
	var oBox = document.getElementById('box');
	oBox.style.width=json.width+'px';
	oBox.style.height=json.height+'px';	
	oBox.style.backgroundSize=json.width+'px '+json.height+'px';
};