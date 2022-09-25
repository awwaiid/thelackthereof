---
title: Pocket_Operator_PO-33
image: /content/PO33
tags: []
createdAt: 2019-08-25T16:14-04:00
updatedAt: 2019-08-25T22:03-04:00
---

The Pocket Operator PO-33 Knock-Out is a super fun sampler and step-sequencer made by Teenage Engineering! I got one in August 2019, and am using it to play around with sample-based music.

See also [[Music Gear and Setup]]

right:PO33 In 2019 I got a [https://teenage.engineering/products/po/metal#po-33 Pocket Operator PO-33], part of the "Metal" series of devices from [https://teenage.engineering/ Teenage Engineering]. This is a sampler and step-sequencer in a pocket-calculator-esq form factor. Very fun! These are some notes.

Resources:
* [https://www.reddit.com/r/pocketoperators/ Reddit - r/pocketoperators] - very active community

Data
* Sound 1-8, "Melodic"
  * Single sound per button
* Sound 9-16, "Drump"
  * 16 sound-slices per button
  * Each slice is an independent thing

Controls:
* "sound" button
* "pattern" button
* "bpm" button
* Rotator-A (left)
* Rotator-B (right)
* "record" button
* "FX" button
* "play" button
* "write" button
* Melodic buttons
  * Button-1
  * Button-2
  * Button-3
  * Button-4
  * Button-5
  * Button-6
  * Button-7
  * Button-8
* Drum buttons
  * Button-9
  * Button-10
  * Button-11
  * Button-12
  * Button-13
  * Button-14
  * Button-15
  * Button-16

Map of modes and inputs and displays:
* Current selections
  * You currently have one sound selected
    * Press "sound" -- assigned sounds are dim-lit, current sound is flashing bright-lit
  * You currently have one active pattern, though you may be in part of a pattern-chain
    * Press "pattern" -- assigned patterns are dim-lit, patterns in the current pattern-chain are bright-lit, current pattern is flashing bright-lit
  * You currently have one FX selected
    * "FLT" - Filter
      * Displays "?" on the screen below feedback area (upper-right)
      * Rotator A (left) LPF, noF, HPF
      * Rotator B (right) Res (Resonance)
    * "tri" - Trim
      * No trim-mode indicator
      * Display at bottom of screen indicates start/length of slice
      * Rotator A (left) - slice start offset
      * Rotator B (right) - slice length
    * "ton" - Tone
      * Displays "!" in a quote-bubble below feedback area (upper-right) when in tone-mode
      * Rotator A (left) - Display "Ptc", indicates slow-down or speed-up of sample, amount indicated on bottom scale
      * Rotator B (right) - Display "UoL" for "volume", indicates volume level of sample, amount indicated on bottom scale
* Perform mode "PrF" (default)
  * Button-1 through Button-16 -- Trigger sound
    * If current sound is melodic, pitch will change based on which button you press
    * If current sound is drum, each button 1-16 will trigger one of the drum slices
* Edit mode (press/release "write", record-icon displayed when in edit mode)
  * Buttons will be dim-lit on each of the 16 steps that are assigned for the current sound
  * Buttons will be bright-lit on each of the 16 steps with the current sound-tone or sound-slice
  * Long-press a dim-lit button to switch the current slice to that button
* Play Mode
  * Press the "play" button to start/stop play-mode
  * Play (right-triangle) indicator appears on the screen to the left of the clock
  * During play-mode the 1-16 buttons will bright-lit on each step
  * Each step also flashes the play-button on the beat
  * The entire pattern-chain will play
  * The current pattern number is displayed, like "P-1" through "P-16"
    * During chains it will change from one pattern to the next as it plays
  * Write+(1..16) - add the current sound (melodic note or drum-trigger) at the current step
  * Hold down "FX"
    * Current step switches from bright-lit to dim-lit
    * Current effect (1-16) is bright-lit
    * No-effect (16) is bright-lit by default
* Play+Edit Mode
* Play+Perform Mode
  * Sound bright-lit blink when triggered
    * If a drum is on button-10, then every time ANY drum on button-10 is triggered then button-10 will light up
* Record Mode
  * Hold down the "record" button
  * Blinks "rEc"
  * Displays monitor scale of volume level of input
  * Additionally hold down 1-16 to record to a sound
  * If the target sound is a drum (9-16), at the end of the recording the sound will be sliced
    * Slicing is done based on "transients", bits of silence
  * Record+Sound -> Delete current sound
    * Displays "dEL" during deletion, which can take a second or two
  * Record+Pattern -> Clear the current pattern
    * Displays "cLr" during clearing, which can take a second or two
    * Clears only the current pattern in the pattern chain, keeps the chain sequence
* Backup Mode
  * Press write+sound+play
  * Cancel by pressing any button
* Restore Mode
  * Press write+sound+record
  * Cancel by pressing any button


