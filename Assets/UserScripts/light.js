// dynamic lighting effects

var THRESH = 3.0;
var DELAY = 1.0;
var LIGHT_SCALE = 0.06;

var color_idx = 0;
var counter = 0.0;
var prev_amp_sum = 0.0;

var color_cycle : Color[];

function Start() {
  color_cycle = new Color[5];

  color_cycle[0] = Color.white;
  color_cycle[1] = Color.red;
  color_cycle[2] = Color.yellow;
  color_cycle[3] = Color.blue;
  color_cycle[4] = Color.magenta;
}

function Update() {
  var amp_sum = 0.0;
  for (var i = 0; i < spectrum.note_amps.length; ++i) {
    amp_sum += spectrum.note_amps[i];
  }

  counter += Time.deltaTime;

  if ((amp_sum - prev_amp_sum) > THRESH && counter > DELAY) {
    ++color_idx;
    if (color_idx == 5) color_idx = 0;
    light.color = color_cycle[color_idx];
    counter = 0.0;
  }

  prev_amplitude = amp_sum;
  light.intensity = LIGHT_SCALE * amp_sum;

  Debug.Log(light.intensity);
}