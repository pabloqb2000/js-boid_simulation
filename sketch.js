let simulation;
let viewRSld, sepSld, cohSld, algSld, avdSld, maxVelSld;
let fovBtn;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements
	viewRSld = new Slider(5, 200,  25, 0,0, width/12, height/60, null, "View radius", true, 0, () => simulation.viewR = viewRSld.value);
	sepSld   = new Slider(0, 1, 0.125, 0,0, width/12, height/60, null, "Separation", true, 2, () => simulation.separation = sepSld.value);
	cohSld   = new Slider(0, 1,  0.12, 0,0, width/12, height/60, null, "Cohesion", true, 2, () => simulation.cohesion = cohSld.value);
	algSld   = new Slider(0, 1,  0.05, 0,0, width/12, height/60, null, "Aligment", true, 2, () => simulation.alignment = algSld.value);
	avdSld   = new Slider(0, 1,  0.15 , 0,0, width/10, height/60, null, "Avoidance", true, 2, () => simulation.avoidance = avdSld.value);
	maxVelSld= new Slider(1,10, 3, 0,0, width/12, height/60, null, "Max vel", true, 0, () => simulation.maxVel = maxVelSld.value);
	fovBtn   = new ToggleButton(0,0, width/12, height/30, "show FOV", () => simulation.fov = fovBtn.active);


	// Create simulation
	simulation = new BoidSimulation(100, width, height);

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
}
