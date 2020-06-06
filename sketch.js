let simulation;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements

	// Create simulation
	simulation = new BoidSimulation(20, width, height);

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	// Draw UI and draggable elements
	background(32);
	UI.update();
	UI.draw();
	Drag.update();
	Drag.draw();

	simulation.update();
	simulation.draw();

}
