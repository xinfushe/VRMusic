// visual elements for harmonic spectrum

var NUM_ROWS = 1;
var SPACING = 0.4;
var BAR_HEIGHT = 70.0;
var HALF_BAR_HEIGHT = BAR_HEIGHT / 2.0;
var BAR_DIAM = 0.4;
var THRESH = 0.03;
var MAX_HEIGHT = HALF_BAR_HEIGHT;  // bar transform position is at its center
var MIN_HEIGHT = -MAX_HEIGHT;
var DIST_FROM_SPAWN = 4.0;
var FALL_SCALE = 10.0;

var bar_grid : GameObject[, ];

// instantiate spectrum bars
function Start() {
  var glowMaterial = Resources.Load("GlowMaterial", Material);

  bar_grid = new GameObject[NUM_ROWS, spectrum.NUM_NOTES];

  for (var i = 0; i < NUM_ROWS; ++i) {
    for (var j = 0; j < spectrum.NUM_NOTES; ++j) {
      // create cube
      bar_grid[i, j] = new GameObject();
      bar_grid[i, j] = GameObject.CreatePrimitive(PrimitiveType.Cube);

      // set dimensions
      bar_grid[i, j].transform.localScale =
          Vector3(BAR_DIAM, BAR_HEIGHT, BAR_DIAM);
      bar_grid[i, j].transform.position =
          Vector3(SPACING * (j - spectrum.NUM_NOTES / 2.0), MIN_HEIGHT,
                  DIST_FROM_SPAWN + i);

      // set material & color
      bar_grid[i, j].renderer.sharedMaterial = glowMaterial;
      bar_grid[i, j].renderer.sharedMaterial.color = Color.green;
      bar_grid[i, j].renderer.sharedMaterial.color.a = 1.0;
    }
  }
}

var counter = 0.0;

function Update() {
  // "wave" effect
  counter += Time.deltaTime;
  if (counter > THRESH) {
    counter = 0.0;
    for (var i = NUM_ROWS - 1; i > 0; --i) {
      for (var j = 0; j < spectrum.NUM_NOTES; ++j) {
        bar_grid[i, j].transform.position.y =
            bar_grid[i - 1, j].transform.position.y;
      }
    }
  }

  // update bar heights
  for (var k = 0; k < spectrum.NUM_NOTES; ++k) {
    bar_grid[0, k].transform.position.y =
        100 * spectrum.note_amps[k] + MIN_HEIGHT;

    // prevent bar from detaching from plane
    if (bar_grid[0, k].transform.position.y > MAX_HEIGHT) {
      bar_grid[0, k].transform.position.y = MAX_HEIGHT;
    } else if (bar_grid[0, k].transform.position.y < MIN_HEIGHT) {
      bar_grid[0, k].transform.position.y = MIN_HEIGHT;
    }
  }
}