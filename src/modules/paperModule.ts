import paper from 'paper';

export default function(container: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 250;
  container.appendChild(canvas);

  // Create a Paper.js scope
  const scope = new paper.PaperScope();
  scope.setup(canvas);

  const circle = new scope.Path.Circle({
    center: scope.view.center,
    radius: 50,
    fillColor: 'blue'
  });

  const text = new scope.PointText({
    point: scope.view.center,
    content: 'Paper.js',
    fillColor: 'white',
    fontFamily: 'Arial',
    fontSize: 20,
    justification: 'center'
  });

  // Adjust text position to center it within the circle
  text.position = circle.position;

  // Create a group with the circle and text
  const group = new scope.Group([circle, text]);

  // Add animation
  // scope.view.onFrame = (event: paper.Event) => {
  scope.view.onFrame = () => {
    group.rotate(1); // Rotate 1 degree per frame
  };

  // Start the view
  scope.view.update();
}