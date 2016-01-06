// JavaScript Document
window.onload = function(){
	var aTab = getByClass(document,'j-tab');
	for(var i=0; i<aTab.length; i++)
	{
		tab(aTab[i]);
	}
	//点击改变内容
	(function(){
		var ochoice = getByClass(document,'choice')[0];
		var aEm = ochoice.getElementsByTagName('em');
		var oDiv = ochoice.getElementsByTagName('div')[0];
		aEm[1].onclick = function(){
			var sTem = aEm[0].innerHTML;
			aEm[0].innerHTML = this.innerHTML;
			this.innerHTML=sTem;
			oDiv.className='j-box';
		};
	})();
	//搜索框js
	var oSearchBtn = document.getElementById('searchBtn');
	var oTxt = document.getElementById('txt');
	//改变搜索框内容
	(function(){
		
		oSearchBtn.onclick = oTxt.onfocus = function(){
			oSearchBtn.style.display='none';	
			oTxt.focus();
		};
		var oDiv = getByClass(document,'option-list')[0];	
		var aList = oDiv.getElementsByTagName('a');
		
		for(var i=0; i<aList.length; i++)
		{
			aList[i].onclick = function(){
				oSearchBtn.innerHTML=this.innerHTML;	
			};
		}
		oTxt.onblur = function(){
			if(oTxt.value=='')
			{
				oSearchBtn.style.display='block';
			}	
		};
	})();	
};