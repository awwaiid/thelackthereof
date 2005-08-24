---
title: Mathematical_Markup
createdAt: 2005-08-24T13:56-04:00
editedAt: 2005-08-24T13:56-04:00
---

I've taught this wiki to use LaTeX for mathematical markup, using the [http://www.oddmuse.org/cgi-bin/oddmuse/LaTeX_Extension LaTeX module extension] for OddMuse. You simply wrap your math like this: <nowiki>$$ x^2 $$</nowiki> to get something like $$x^2$$. This page is to document some of the ways this can be used. Please choose 'Edit text of this page' at the bottom to play!

We can do nifty integrals, like $$ \int^{\infty}_{0}{x^2} $$. Heck, we can even do summations such as $$ \sum _{i=0} ^{\infty+2} x^2 + 3i $$. Fun, eh?  For limits we can do $$ \lim_{x \rightarrow 0} x^3=0 $$.

$$\LaTeX\$$

Fractions are done like this: $$ \frac{x^2}{\sqrt{3x}} $$ or this: $$ {dy\over dx} $$

|| \Gamma  || $$\Gamma$$  || \Delta  || $$\Delta$$  ||
|| \Lambda || $$\Lambda$$ || \Phi    || $$\Phi$$    ||
|| \Pi     || $$\Pi$$     || \Psi    || $$\Psi$$    ||

More symbols - $$ \Sigma \Theta \Upsilon \Xi \Omega \alpha \beta \gamma \delta \epsilon \zeta \eta \theta \iota \kappa \lambda \mu \nu \xi \pi \rho \sigma \tau \upsilon \phi \chi \psi \omega $$

$$e^{i\pi}=-1$$

$$\left(\begin{array}{cc} 1 & 0 \\ 0 & \phi\\ \end{array}\right)$$

----

In order to get $$ \mathcal{P} $$ and $$\mathbb{R} $$ to work, I added these to the latex template file:
<pre>
   \usepackage{amsmath}
   \usepackage{amssymb}
   \usepackage{amsxtra}
</pre>

The size of the rendered equations can be tweeked by editing the conversion command in the extension.

----

$$\nabla\cdot\vec{B}=0$$


----

$$\sigma_{xz}^{i-\frac{1}{2},j-\frac{1}{2}}=\mu^{i-\frac{1}{2},j-\frac{1}{2}}(\frac{\partial u_x^{i-\frac{1}{2},j-\frac{1}{2}}}{\partial z}+\frac{\partial u_z^{i-\frac{1}{2},j-\frac{1}{2}}}{\partial x})$$

----

