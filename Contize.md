---
title: Contize
createdAt: 2004-07-27T05:01-04:00
editedAt: 2007-09-28T12:28-04:00
---

== Fake Continuations for a Perl Object ==
Contize is a sort of proxy object. You create an instance of your original object, and then give it to Contize. Contize then takes over that object (and you work with the Contize object but pretend it is still the original) and lets the object pretend that it can be suspended and restarted.

This is a pretty trick concept, and the best way to get your brain around the whole thing is to contemplate why I created it in the first place, namely so that I can do [[Continuation-based Web Programming]] in Perl CGI programs (See [[Web Programming With Contize]]. Well... actually the ''best'' way to make sense of this is to see some code, and the most relevant code is CGI programming stuff. So lets see some!

<code>
#!/usr/bin/perl

package WebGuess;
use strict;
use Contize;

sub new {
  my $self = {};
  bless $self;
  $self = new Contize($self);
  return $self;
}

sub setNumber {
  my $self = shift;
  $self->{number} = int(rand(100)) + 1;
}

sub display {
  my ($self, $content) = @_;
  print $content;
  $self->suspend();
}

sub getNum {
  my $self = shift;
  $self->display(<<"END");
    <form method="POST">
      Enter Guess: <input name="num">
      <input type=submit value="Guess"> <input type=submit name="done"><br>
    </form>
END
  return $::q->param('num');
}

sub run {
  my $self = shift;
  $self->setNumber();
  my $guess;
  my $tries = 0;
  print "Hi! I'm thinking of a number from 1 to 100... can you guess it?<br>\n";
  do {
    $tries++;
    $guess = $self->getNum();
    print "It is smaller than $guess.<br>\n" if($guess > $self->{number});
    print "It is bigger than $guess.<br>\n" if($guess < $self->{number});
  } until ($guess == $self->{number});
  print "You got it! My number was in fact $self->{number}.<br>\n";
  print "It took you $tries tries.<br>\n";
}

package Main;

use strict;
use CGI;
use CGI::Session;
use Data::Dumper;

# Set up the CGI session and print the header
$::q = new CGI();
my $session = new CGI::Session(undef, $::q, {Directory=>'/tmp'});
print $session->header();

# If there is a guess object in the session use it, otherwise create a new
# WebGuess object and Contize it.
my $g = $session->param('guess') || new WebGuess();

# Fix stuff -- most importantly the Data::Dumper version of the object doesn't
# get recreated correctly (I don't know why)... so to work around it I re-eval
# the thing. And we must reset the callstack and the callcount.
my $VAR1;
eval(Dumper($g));
$g = $VAR1;
$g->reset();

# Add the WebGuess object to the session
$session->param('guess', $g);

# Enter the main loop of the WebGuess object
until($::q->param('done')) {
  $g->run();
}

# We won't get here until that exits cleanly (never!)
print "Done.";
</code>

Now this is long and maybe a bit complicated... but it shows the idea (and some warts that I am still working out, such as having to re-eval through Data::Dumper to fix the sessionization of the main object).

As a much larger example, and also to work out more problems (both conceptual and practical) I am working on [[EPFarms Panel]] as a testbed application for this method and this module.

== See Also ==
* cpan:Contize on CPAN
* [[Web Programming With Contize]]
* [[Continuation-based Web Programming]]

