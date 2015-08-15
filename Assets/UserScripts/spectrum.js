// sorts linear spectrum into harmonic model of ~5 octaves

var TWO_TWELFTH = Mathf.Pow(2, 1.0 / 12);
var NUM_BINS = 8192;
var MAX_FREQ : float = AudioSettings.outputSampleRate / 2;
var BIN_SIZE = MAX_FREQ / NUM_BINS;
var MIDDLE_A = 440;
var NUM_NOTES = 108;
var MIDDLE_A_IDX = 40;

var bin_idx = 0;

var bins : float[];
var note_amps : float[];
var note_freqs : float[];

var min_note_bin = 0;
var max_note_bin = 0;

function Start() {
  bins = new float[NUM_BINS];
  note_amps = new float[NUM_NOTES];
  note_freqs = new float[NUM_NOTES + 1];

  for (var i = 0; i < NUM_NOTES + 1; ++i) {
    note_freqs[i] = MIDDLE_A * Mathf.Pow(TWO_TWELFTH, i - MIDDLE_A_IDX);
  }

  min_note_bin = Mathf.Floor(note_freqs[0] * NUM_BINS / MAX_FREQ);
  max_note_bin = Mathf.Floor(note_freqs[NUM_NOTES] * NUM_BINS / MAX_FREQ);
}

function Update() {
  for (var i = 0; i < note_amps.length; ++i) {
    note_amps[i] = 0;
  }

  AudioListener.GetSpectrumData(bins, 0, FFTWindow.Blackman);

  var note_idx = 0;
  for (var j = min_note_bin; j <= max_note_bin; ++j) {
    while (j * MAX_FREQ / NUM_BINS >= note_freqs[note_idx + 1]) {
      ++note_idx;
    }

    note_amps[note_idx] += bins[j];
  }
}