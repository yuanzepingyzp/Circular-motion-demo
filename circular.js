window.onload=function(){
	new Ball(100,100,15,[200,200]);
}
var tool={
	getdistance:function(p1,p2){
		return Math.sqrt(Math.pow((p1[0]-p2[0]),2)+Math.pow((p1[1]-p2[1]),2));
	}
}


function Ball(x,y,r,center){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	this.x=x;
	this.y=y;
	this.r=r;
	this.R=0;
	this.a=0;
	this.center=center;
	this.render=function(){
		drawMath.circle(context,this.x,this.y,this.r);
	};
	this.circular=function(){
		this.R=tool.getdistance([this.x,this.y],this.center);
		var This=this;
		drawMath.clear(context,this.x,this.y,this.r);
		this.a=this.a+Math.PI/360;
		this.x=this.R*Math.cos(this.a)+this.center[0];
		this.y=this.R*Math.sin(this.a)+this.center[1];
		console.log(this.x);
		this.render();
		circular=window.requestAnimationFrame(function(){This.circular()});
	};
	this.init=(function(This){
		This.render();
		This.circular();
	})(this);
}

var drawMath={
	clear:function(context,x,y,r){
		context.clearRect(x-r-1,y-r-1,2*r+2,2*r+2);
	},
	circle:function(context,x,y,r){
		context.beginPath();
		context.arc(x,y,r,0,2*Math.PI);
		context.fillStyle="rgb(100,200,200)";
		context.fill();
	},
	line:function(context,x,y,length,width,color){
		context.beginPath();
		context.moveTo(x,y);
		context.lineTo(x,y+length);
		context.lineWidth=width;
		context.strokeStyle=color;
		context.stroke();
	}
}
