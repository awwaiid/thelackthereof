---
title: NoiseGen
createdAt: 2012-05-22T19:48-04:00
editedAt: 2014-10-01T18:15-04:00
---

= NoiseGen =

20-Minute Software Synth

[[YouTube:pMZ4ilLzKW8]]

Digital sound isn't really much more than a stream of floating point numbers from -1..1 sent to the sound card at a constant rate. So... let's use that concept to generate some noise using simple programming. Here I'm using 'unit generators', built in high-level dynamic programming languages, to make my speakers jump around a bit.

; Perl: [http://github.com/awwaiid/perl-noise github] | [http://thelackthereof.org/projects/perl/Audio-NoiseGen/ local browse] | [http://thelackthereof.org/projects/perl/Audio-NoiseGen/.git local git]
; Python: [http://github.com/awwaiid/python-noise github] | [http://thelackthereof.org/projects/python/noisegen/ local browse] | [http://thelackthereof.org/projects/python/noisegen/.git local git]
; Ruby: [http://github.com/awwaiid/ruby-noise github] | [http://thelackthereof.org/projects/ruby/noisegen/ local browse] | [http://thelackthereof.org/projects/ruby/noisegen/.git local git]

<code>
  # Alien Death Ray Sound?
  
  my $lfo = sine( freq => 5 );
  
  my $vfreq = sub {
    $lfo->() * 100 + 440
  }
  
  play( gen =>
    sine( freq => $vfreq )
  )
</code>

=== News ===
* 2012.06.23 - Presented at YAPC::NA 2012. Video is up on [http://youtu.be/pMZ4ilLzKW8 YouTube]!
* 2012.05.31 - Presented NoiseGen at [http://www.meetup.com/Arlington-Ruby/events/63925872/ Arlington Ruby]


