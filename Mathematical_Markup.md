---
title: Mathematical_Markup
createdAt: 2004-06-18T06:26-04:00
editedAt: 2005-03-15T14:11-05:00
---

I've taught this wiki to use LaTeX for mathematical markup, using the [http://www.oddmuse.org/cgi-bin/oddmuse/LaTeX_Extension LaTeX module extension] for OddMuse. You simply wrap your math like this: <nowiki>$$ x^2 $$</nowiki> to get something like $$x^2$$. This page is to document some of the ways this can be used. Please choose 'Edit text of this page' at the bottom to play!

Note: Since IE sucks and can't use transparent PNGs by default I have used [http://www.dynarch.com/mishoo/articles.epl?art_id=430 PieNG] from mishoo to turn transparent PNG support in IE on. Yes it is in there... just not turned on. But they are here. Hopefully.

We can do nifty integrals, like $$ \int^{\infty}_{0}{x^2} $$. Heck, we can even do summations such as $$ \sum _{i=0} ^{\infty+2} x^2 + 3i $$. Fun, eh?  For limits we can do $$ \lim_{x \rightarrow 0} x^3=0 $$.

Fractions are done like this: $$ \frac{x^2}{\sqrt{3x}} $$ or this: $$ {dy\over dx} $$

|| \Gamma  || $$\Gamma$$  || \Delta  || $$\Delta$$  ||
|| \Lambda || $$\Lambda$$ || \Phi    || $$\Phi$$    ||
|| \Pi     || $$\Pi$$     || \Psi    || $$\Psi$$    ||

$$ \Sigma \Theta \Upsilon \Xi \Omega \alpha \beta \gamma \delta \epsilon \zeta \eta \theta \iota \kappa \lambda \mu \nu \xi \pi \rho \sigma \tau \upsilon \phi \chi \psi \omega $$

$$\left(\begin{array}{cc} 1 & 0 \\ 0 & \phi\\ \end{array}\right)$$

nice! -- Oliver

nifty! -- Sean

----

trying : $$ \mathcal{P} $$ or $$\mathbb{R} $$ seems not to work, what about pstricks?

To get AMS stuff (like the above) to work add these things to the template file:
<pre>
   \usepackage{amsmath}
   \usepackage{amssymb}
   \usepackage{amsxtra}
</pre>

Also, is it possible that the size of the text fits with the size of the latex formulas?

Brock: I don't have pstricks on there now but I suppose I could add it. As to the sizing... since I am rendering an image I just picked a size that happens to be pleasing to me. The size can be adjusted in the configuration of the script. (Other info on this script can be found in the above link to the module).

I can't see anything? $$\sum_{ij}+\alpha^{\beta}$$

If you can't see anything there is a good chance it is because you are using IE. Sorry :( . But not too sorry.


