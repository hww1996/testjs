var camera,scene,renderer,nowControlMesh,AllMesh=[];

function init(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,10000);
	renderer=new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);
}

//create model

var Tube=function(){
	this.name="tube";
	this.mesh=new THREE.Object3D();
	var StandTop=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,0.2),new THREE.MeshBasicMaterial({color:0xff0000}));
	StandTop.position.set(0,1.9,0);
	StandTop.name="StandTop"
	this.mesh.add(StandTop);
	var BrockTop=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,0.8),new THREE.MeshBasicMaterial({color:0x00ff00}));
	BrockTop.position.set(0,1.4,0);
	BrockTop.name="BrockTop";
	this.mesh.add(BrockTop);
	var FillingButtom=new THREE.Mesh(new THREE.CylinderGeometry(1,1,3),new THREE.MeshBasicMaterial({color:0x0000ff}));
	FillingButtom.position.set(0,-0.5,0);
	FillingButtom.name="FillingButtom";
	this.mesh.add(FillingButtom);
}

var Breakable_Brick=function(){
	this.name="brick";
	this.mesh=new THREE.Object3D();
	var standable=new THREE.Mesh(new THREE.CubeGeometry(1,0.2,1),new THREE.MeshBasicMaterial({color:0xff0000}));
	standable.position.set(0,0.4,0);
	standable.name="standable";
	this.mesh.add(standable);
	var filling=new THREE.Mesh(new THREE.CubeGeometry(1,0.6,1),new THREE.MeshBasicMaterial({color:0x00ff00}));
	filling.name="filling";
	this.mesh.add(filling);
	var breakable=new THREE.Mesh(new THREE.CubeGeometry(1,0.2,1),new THREE.MeshBasicMaterial({color:0x0000ff}));
	breakable.position.set(0,-0.4,0);
	breakable.name="breakable";
	this.mesh.add(breakable);
}

var tube,brick;
	
var Robot=function(){
	this.name="tank";
	this.mesh=new THREE.Object3D();
	var TopSphere=new THREE.Mesh(new THREE.SphereGeometry(0.3,8,6,0,Math.PI*2,0,Math.PI/2),new THREE.MeshBasicMaterial({color:0xff0000}));
	TopSphere.name="TopSphere";
	TopSphere.position.set(0,0.6,0);
	this.mesh.add(TopSphere);
	var RobotBody=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,0.6),new THREE.MeshBasicMaterial({color:0x00ff00}));
	RobotBody.position.set(0,0.3,0);
	RobotBody.name="RobotBody";
	this.mesh.add(RobotBody);
	
	var RobotWheelBody1=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.8),new THREE.MeshBasicMaterial({color:0x0000ff}));
	RobotWheelBody1.rotation.z=Math.PI/2;
	RobotWheelBody1.name="RobotWheelBody1";
	RobotWheelBody1.position.set(0,-0.1,0.3);
	this.mesh.add(RobotWheelBody1);
	var RobotWheelLeft1=new THREE.Mesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI),new THREE.MeshBasicMaterial({color:0xff0000}));
	RobotWheelLeft1.name="RobotWheelLeft1";
	RobotWheelLeft1.rotation.y=Math.PI/2;
	RobotWheelLeft1.position.set(0.4,-0.1,0.3);
	this.mesh.add(RobotWheelLeft1);
	var RobotWheelRight1=new THREE.Mesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI),new THREE.MeshBasicMaterial({color:0xff0000}));
	RobotWheelRight1.name="RobotWheelRight1";
	RobotWheelRight1.rotation.y=-Math.PI/2;
	RobotWheelRight1.position.set(-0.4,-0.1,0.3);
	this.mesh.add(RobotWheelRight1);
	
	var RobotWheelBody2=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.8),new THREE.MeshBasicMaterial({color:0x0000ff}));
	RobotWheelBody2.rotation.z=Math.PI/2;
	RobotWheelBody2.name="RobotWheelBody2";
	RobotWheelBody2.position.set(0,-0.1,-0.3);
	this.mesh.add(RobotWheelBody2);
	var RobotWheelLeft2=new THREE.Mesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI),new THREE.MeshBasicMaterial({color:0xff0000}));
	RobotWheelLeft2.name="RobotWheelLeft2";
	RobotWheelLeft2.rotation.y=Math.PI/2;
	RobotWheelLeft2.position.set(0.4,-0.1,-0.3);
	this.mesh.add(RobotWheelLeft2);
	var RobotWheelRight2=new THREE.Mesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI),new THREE.MeshBasicMaterial({color:0xff0000}));
	RobotWheelRight2.name="RobotWheelRight2";
	RobotWheelRight2.rotation.y=-Math.PI/2;
	RobotWheelRight2.position.set(-0.4,-0.1,-0.3);
	this.mesh.add(RobotWheelRight2);
	
	var Gun=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.1,0.2),new THREE.MeshBasicMaterial({color:0x0000ff}));
	Gun.name="Gun";
	Gun.rotation.z=Math.PI/2;
	Gun.position.set(0.4,0.3,0);
	this.mesh.add(Gun);
	//robot.mesh.children[8].position.x=-robot.mesh.children[8].position.x; 
}


var Cloud=function(){
	this.mesh=new THREE.Object3D();
	var n=5;
	for(var i=0;i<n;i++){
		var h=Math.random()*2;
		var CubeMesh=new THREE.Mesh(new THREE.CubeGeometry(h,h,h),new THREE.MeshBasicMaterial({color:0xffffff}));
		CubeMesh.position.set(-2+Math.random()*4,0,0);
		CubeMesh.rotation.set(Math.random()*0.5,Math.random()*0.5,Math.random()*0.5);
		CubeMesh.name="Cloud"+i;
		this.mesh.add(CubeMesh);
	}
	this.name="Cloud";
}

var robot,cloud;
function createGeometry(){
	//create
	tube=new Tube();
	tube.mesh.position.set(3,0,0);
	push(tube.mesh);
	brick=new Breakable_Brick();
	brick.mesh.position.set(-3,0,0);
	push(brick.mesh);
	robot=new Robot();
	robot.mesh.position.set(-3,1,0);
	push(robot.mesh);
	cloud=new Cloud();
	cloud.mesh.position.set(0,5,0);
	if(cloud.mesh instanceof THREE.Object3D){
		alert("yes");
	}
	else{
		alert("no");
	}
	push(cloud.mesh);
}

function push(mesh){
	AllMesh.push(mesh);
	scene.add(mesh);
}

function initCamera(){
	camera.position.set(0,0,30);
	camera.lookAt(new THREE.Vector3(0,0,0));
}


function mouselistener(et){
	var x=et.clientX-window.innerWidth/2;
	var y=window.innerHeight/2-et.clientY;
	var scale=camera.position.z*Math.tan(Math.PI/6)/(window.innerHeight/2);
	var cx=x*scale;
	var cy=y*scale;
	var ray=new THREE.Raycaster(new THREE.Vector3(cx,cy,camera.position.z),new THREE.Vector3(0,0,-1));
	var ChooseResult=ray.intersectObjects(AllMesh,true);
	if(ChooseResult.length>0){
		//nowControlMesh=ChooseResult[0].object;
		var found=false;
		for(var i=0;i<AllMesh.length;i++){
			for(var j=0;j<AllMesh[i].children.length;j++){
				if(AllMesh[i].children[j].uuid==ChooseResult[0].object.uuid){
					nowControlMesh=AllMesh[i];
					found=true;
					break;
				}
			}
			if(found)
				break;
		}
	}
}

function keymainListen(et,mesh){
	switch(et.keyCode){
		case 37:
			mesh.rotation.y+=0.1;
			break;
		case 39:
			mesh.rotation.y-=0.1;
			break;
		case 38:
			mesh.rotation.x+=0.1;
			break;
		case 40:
			mesh.rotation.x-=0.1;
			break;
		case 87:
			mesh.rotation.z+=0.1;
			break;
		case 83:
			mesh.rotation.z-=0.1;
			break;
		default:
			break;
	}
}



function keylisten(et){
	if(nowControlMesh){
		keymainListen(et,nowControlMesh
		//mesh as the watching object
		)
	}
	else{
		console.log("you didn't choose the object");
	}
}


function loop(){
	renderer.render(scene,camera);
	requestAnimationFrame(loop);
}

function main(){
	init();
	createGeometry();
	initCamera();
	document.addEventListener('mousedown',mouselistener,false);
	document.addEventListener('keydown',keylisten,false);
	loop();
}
main();