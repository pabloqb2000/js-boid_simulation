let simulation;
let viewRSld, sepSld, cohSld, algSld, avdSld, maxVelSld, nBoidsSld;
let fovBtn, showInfoBtn, hideBtn;

function setup() {
	textFont("Orbitron");
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements
	viewRSld   = new Slider(5, 200,  25, 0,0, width/12, height/60, null, "View radius", true, 0, () => simulation.viewR = viewRSld.value);
	sepSld     = new Slider(0, 1, 0.14, 0,0, width/12, height/60, null, "Separation", true, 2, () => simulation.separation = sepSld.value);
	cohSld     = new Slider(0, 1, 0.12, 0,0, width/12, height/60, null, "Cohesion", true, 2, () => simulation.cohesion = cohSld.value);
	algSld     = new Slider(0, 1, 0.05, 0,0, width/12, height/60, null, "Aligment", true, 2, () => simulation.alignment = algSld.value);
	avdSld     = new Slider(0, 1, 0.25, 0,0, width/10, height/60, null, "Avoidance", true, 2, () => simulation.avoidance = avdSld.value);
	maxVelSld  = new Slider(1,10, 2.4, 0,0, width/12, height/60, null, "Max vel", true, 0, () => simulation.maxVel = maxVelSld.value);
	nBoidsSld  = new Slider(5, 500, 100, 0,0, width/12, height/60, null, "Boids", true, 0, changeNBoids);
	fovBtn     = new ToggleButton(0,0, width/12, height/30, "show FOV", () => simulation.fov = fovBtn.active);
	showInfoBtn= new ToggleButton(0,0, width/12, height/30, "show Info", () => simulation.info = showInfoBtn.active);
	hideBtn    = new Button(0,0, width/12, height/30, "Hide UI", hideUI);

	// Create simulation
	simulation = new BoidSimulation(nBoidsSld.value, width, height);

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	background(32);	
	// Update and draw simulation
	simulation.update();
	simulation.draw();

	// Draw UI and draggable elements
	UI.update();
	UI.draw();
	Drag.update();
	Drag.draw();

	// Draw frame rate
	if(showInfoBtn.active) {
		textSize(30);
		fill(230);
		noStroke();
		textAlign(CENTER);
		text(frameRate().toFixed(2) + " fps", width/2, 60);
	}
}

/**
 * Change the number of boids in the simulation
 */
function changeNBoids() {
	let newN = nBoidsSld.value;
	let oldN = simulation.boids.length;
	if(newN > oldN) {
		for(let i = 0; i < newN - oldN; i++)
			simulation.newBoid();
	} else {
		simulation.boids = simulation.boids.splice(0, newN);
	}
}

/**
 * Hide or show the UI
 */
function hideUI(visible=false) {
	viewRSld.visible = visible;
	sepSld.visible = visible;
	cohSld.visible = visible;
	algSld.visible = visible;
	avdSld.visible = visible;
	maxVelSld.visible = visible;
	nBoidsSld.visible = visible;
	fovBtn.visible = visible;
	showInfoBtn.visible = visible;
	hideBtn.visible = visible;
}
